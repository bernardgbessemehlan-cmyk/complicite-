// ============================================================
// SERVEUR BACKEND — COMPLICITÉ
// WebSocket + Express avec Persistance JSON, Pause/Reprise et Admin
// ============================================================

const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { 
  LEVELS, 
  compareAnswers, 
  normalizeRole, 
  selectQuestions, 
  MINI_GAMES, 
  QUESTION_TYPES,
  questionBank
} = require('./src/data/questions');
const storage = require('./src/storage');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ============================================================
// SÉCURITÉ & AUTHENTIFICATION ADMIN
// ============================================================
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'jeu2026';
const adminSessions = new Map(); // token => { createdAt, expiresAt }

function generateAdminToken() {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  adminSessions.set(token, {
    createdAt: now,
    expiresAt: now + (7 * 24 * 3600 * 1000) // Valide 7 jours
  });
  return token;
}

function isValidAdminToken(token) {
  if (!token) return false;
  const session = adminSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    adminSessions.delete(token);
    return false;
  }
  return true;
}

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (!isValidAdminToken(token)) {
    return res.status(401).json({ error: 'Accès administrateur non autorisé. Veuillez vous connecter.' });
  }
  next();
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Charger les questions personnalisées au démarrage
let customQuestions = storage.loadCustomQuestions();

// ============================================================
// ÉTAT GLOBAL (EN MÉMOIRE + PERSISTÉ)
// ============================================================

const couples = storage.loadCouples() || {}; // coupleCode => CoupleState
const players = {};       // playerId => PlayerState
const wsConnections = {}; // playerId => ws

// Reconstruire l'index des players depuis les couples persistés
for (const [code, c] of Object.entries(couples)) {
  if (c.player1Id) {
    players[c.player1Id] = {
      id: c.player1Id,
      userId: c.player1UserId || c.player1Id,
      name: c.player1Name || 'Joueur 1',
      role: c.player1Role || 'HOMME',
      coupleCode: code,
      isHost: true
    };
  }
  if (c.player2Id) {
    players[c.player2Id] = {
      id: c.player2Id,
      userId: c.player2UserId || c.player2Id,
      name: c.player2Name || 'Joueur 2',
      role: c.player2Role || 'FEMME',
      coupleCode: code,
      isHost: false
    };
  }
}

// Récupérer la liste des couples appartenant à un utilisateur
function getUserCouples(userId, coupleCodes = [], currentName = null) {
  const result = [];
  const processedCodes = new Set();

  for (const c of Object.values(couples)) {
    const isPlayer1 = (userId && ((c.player1UserId && c.player1UserId === userId) || (c.player1Id && c.player1Id === userId)));
    const isPlayer2 = (userId && ((c.player2UserId && c.player2UserId === userId) || (c.player2Id && c.player2Id === userId)));
    const codeMatches = Array.isArray(coupleCodes) && coupleCodes.includes(c.code);

    if (isPlayer1 || isPlayer2 || codeMatches) {
      if (processedCodes.has(c.code)) continue;
      processedCodes.add(c.code);

      let isHost = isPlayer1;
      if (!isPlayer1 && !isPlayer2 && codeMatches) {
        if (currentName && c.player2Name && c.player2Name.trim().toLowerCase() === currentName.trim().toLowerCase()) {
          isHost = false;
          if (userId) c.player2UserId = userId;
        } else if (currentName && c.player1Name && c.player1Name.trim().toLowerCase() === currentName.trim().toLowerCase()) {
          isHost = true;
          if (userId) c.player1UserId = userId;
        } else if (!c.player2Id) {
          isHost = true;
          if (userId) c.player1UserId = userId;
        } else {
          isHost = true;
        }
      }

      const partnerName = isHost ? (c.player2Name || null) : c.player1Name;
      const partnerRole = isHost ? c.player2Role : c.player1Role;
      const myName = isHost ? c.player1Name : (c.player2Name || currentName || 'Moi');
      const myRole = isHost ? c.player1Role : (c.player2Role || 'FEMME');
      const partnerId = isHost ? c.player2Id : c.player1Id;
      const partnerConnected = !!partnerId && !!wsConnections[partnerId];
      const totalScore = (c.levelScores || []).reduce((a, b) => a + b, 0);

      result.push({
        code: c.code,
        isHost,
        partnerName,
        partnerRole,
        myName,
        myRole,
        myPlayerId: isHost ? c.player1Id : c.player2Id,
        currentLevel: c.currentLevel || 1,
        totalScore,
        giftsEarned: c.giftsEarned || [],
        partnerConnected,
        hasPartner: !!c.player2Id,
        levelStarted: !!c.levelStarted,
        isPaused: !!c.isPaused,
        createdAt: c.createdAt || Date.now(),
        updatedAt: c.updatedAt || c.createdAt || Date.now()
      });
    }
  }

  // Trier par les plus récemment mis à jour ou créés
  result.sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
  return result;
}

// Sauvegarde automatique avec debounce
let saveTimeout = null;
function queueSave() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    storage.saveCouples(couples);
  }, 500);
}

// ============================================================
// UTILITAIRES WEBSOCKET
// ============================================================

function generateCode(length = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function send(ws, data) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

function sendToPlayer(playerId, data) {
  const ws = wsConnections[playerId];
  send(ws, data);
}

function sendToCouple(coupleCode, data, excludePlayerId = null) {
  const couple = couples[coupleCode];
  if (!couple) return;
  for (const pid of [couple.player1Id, couple.player2Id]) {
    if (pid && pid !== excludePlayerId) {
      sendToPlayer(pid, data);
    }
  }
}

function broadcastToCouple(coupleCode, data) {
  sendToCouple(coupleCode, data);
}

// Diffuser les mises à jour aux admins connectés
const adminSockets = new Set();
function broadcastToAdmins(payload) {
  const msg = JSON.stringify(payload);
  adminSockets.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) ws.send(msg);
  });
}

// ============================================================
// LOGIQUE DE QUESTIONS & NIVEAUX
// ============================================================

function buildLevelQuestions(levelId, couple = null) {
  const levelDef = LEVELS.find(l => l.id === levelId);
  if (!levelDef) return [];

  const allQuestions = [];
  // Historique des questions déjà jouées par ce couple pour éviter toute répétition
  const playedByCouple = (couple && Array.isArray(couple.usedQuestionIds)) ? [...couple.usedQuestionIds] : [];
  const usedIds = [...playedByCouple];

  for (const mg of levelDef.miniGames) {
    const questions = selectQuestions(mg.cats, mg.count, usedIds);
    questions.forEach(q => usedIds.push(q.id));
    
    // Injecter les questions customs si disponibles pour cette catégorie
    const matchingCustom = customQuestions.filter(cq => 
      mg.cats.includes(cq.category) && !usedIds.includes(cq.id)
    );
    matchingCustom.forEach(cq => {
      questions.unshift(cq);
      usedIds.push(cq.id);
    });

    const tagged = questions.map(q => ({
      ...q,
      miniGameType: mg.type,
      miniGameName: getMiniGameName(mg.type)
    }));
    
    allQuestions.push(...tagged);
  }

  // GARANTIE ABSOLUE : Toujours exactement 50 questions par niveau
  if (allQuestions.length < 50) {
    const needed = 50 - allQuestions.length;
    const allCategories = Object.keys(questionBank);
    const fillerQuestions = selectQuestions(allCategories, needed, usedIds);
    fillerQuestions.forEach(q => {
      usedIds.push(q.id);
      allQuestions.push({
        ...q,
        miniGameType: q.miniGameType || MINI_GAMES.CONNAISSANCE,
        miniGameName: q.miniGameName || getMiniGameName(q.miniGameType || MINI_GAMES.CONNAISSANCE)
      });
    });
  }

  // Enregistrer toutes les questions de ce niveau dans l'historique du couple
  if (couple) {
    if (!Array.isArray(couple.usedQuestionIds)) couple.usedQuestionIds = [];
    allQuestions.forEach(q => {
      if (!couple.usedQuestionIds.includes(q.id)) {
        couple.usedQuestionIds.push(q.id);
      }
    });
  }

  return allQuestions.slice(0, 50);
}

function getMiniGameName(type) {
  const names = {
    DEVINE_MON_CHOIX: 'Devine Mon Choix',
    HABITUDES: 'Nos Habitudes',
    CONNAISSANCE: 'Je Te Connais',
    GOUTS: 'Goûts & Préférences',
    MEMOIRE: 'Mémoire du Couple',
    CLASSEMENT: 'Le Grand Classement',
    QUI_FAIT_CA: 'Qui Fait Ça ?',
    MEME_PENSEE: 'Même Pensée',
    MEMOIRE_FLASH: 'Mémoire Flash',
    CHOIX_IMPOSSIBLE: 'Choix Impossible',
    CARTE_MYSTERE: 'Carte Mystère',
    SCENARIOS: 'Scénarios',
    SYNCHRONISATION: 'Synchronisation',
    EPREUVE_SURPRISE: '🚨 Épreuve Surprise !',
  };
  return names[type] || type;
}

function getCoupleProgress(coupleCode) {
  const couple = couples[coupleCode];
  if (!couple) return null;
  
  const totalScore = (couple.levelScores || []).reduce((a, b) => a + b, 0);
  const totalMax = (couple.levelScores?.length || 20) * 50;
  
  let nextReward = null;
  let giftsEarned = couple.giftsEarned || [];
  
  const rewardLevels = [
    { afterLevel: 4, threshold: 190, max: 200, giftId: 1 },
    { afterLevel: 12, threshold: 570, max: 600, giftId: 2 },
    { afterLevel: 20, threshold: 950, max: 1000, giftId: 3 },
  ];
  
  for (const rl of rewardLevels) {
    if (couple.currentLevel > rl.afterLevel && !giftsEarned.includes(rl.giftId)) {
      const scoreAtCheckpoint = (couple.levelScores || []).slice(0, rl.afterLevel).reduce((a, b) => a + b, 0);
      if (scoreAtCheckpoint >= rl.threshold) {
        if (!giftsEarned.includes(rl.giftId)) {
          couple.giftsEarned.push(rl.giftId);
        }
      }
    }
    if (!giftsEarned.includes(rl.giftId) && couple.currentLevel <= rl.afterLevel) {
      nextReward = rl;
      break;
    }
  }
  
  return { totalScore, totalMax, nextReward, giftsEarned };
}

// ============================================================
// CYCLE DE VIE D'UN NIVEAU (AVEC GESTION PAUSE & TIMER)
// ============================================================

function startLevel(coupleCode, levelId) {
  const couple = couples[coupleCode];
  if (!couple) return;

  const levelDef = LEVELS.find(l => l.id === levelId);
  if (!levelDef) return;

  const questions = buildLevelQuestions(levelId, couple);
  
  couple.currentLevelId = levelId;
  couple.currentLevelDef = levelDef;
  couple.currentQuestions = questions;
  couple.currentQuestionIndex = 0;
  couple.currentLevelScore = 0;
  couple.answers = {};
  couple.levelStarted = true;
  couple.isPaused = false;
  couple.waitingForBothAnswers = true;

  queueSave();

  broadcastToCouple(coupleCode, {
    type: 'LEVEL_START',
    levelId,
    levelName: levelDef.name,
    levelEmoji: levelDef.emoji,
    levelTheme: levelDef.theme,
    totalQuestions: questions.length,
  });

  broadcastToAdmins({ type: 'ADMIN_EVENT', event: 'LEVEL_STARTED', coupleCode, levelId });

  // Envoyer la première question après le décompte de 2.5 secondes
  setTimeout(() => {
    if (couple.levelStarted && !couple.isPaused) {
      sendQuestion(coupleCode);
    }
  }, 2500);
}

function sendQuestion(coupleCode) {
  const couple = couples[coupleCode];
  if (!couple || couple.isPaused) return;

  const { currentQuestions, currentQuestionIndex } = couple;
  if (currentQuestionIndex >= currentQuestions.length) {
    endLevel(coupleCode);
    return;
  }

  const question = currentQuestions[currentQuestionIndex];
  const levelDef = LEVELS.find(l => l.id === couple.currentLevelId);
  const timerReduction = levelDef?.timerReduction || 1;
  const adjustedTimer = Math.max(5, Math.floor((question.timer || 20) * timerReduction));

  if (!couple.answers[currentQuestionIndex]) {
    couple.answers[currentQuestionIndex] = { player1: null, player2: null };
  }
  couple.questionStartTime = Date.now();
  couple.currentTimer = adjustedTimer;
  couple.remainingTimer = adjustedTimer;

  queueSave();

  broadcastToCouple(coupleCode, {
    type: 'QUESTION',
    questionIndex: currentQuestionIndex,
    totalQuestions: currentQuestions.length,
    miniGameType: question.miniGameType,
    miniGameName: question.miniGameName,
    question: {
      id: question.id,
      text: question.text,
      type: question.type,
      timer: adjustedTimer,
      options: question.options || null,
      hint: question.hint || null,
      flashContent: question.flashContent || null,
      flashDuration: question.flashDuration || null,
      question: question.question || null,
      items: question.items || null,
      isChoixImpossible: question.isChoixImpossible || false,
    },
    levelScore: couple.currentLevelScore,
    totalScore: (couple.levelScores || []).reduce((a, b) => a + b, 0) + couple.currentLevelScore,
  });

  // Gestion du timer avec compte à rebours
  if (couple.questionTimer) clearTimeout(couple.questionTimer);
  couple.questionTimer = setTimeout(() => {
    handleTimeout(coupleCode, currentQuestionIndex);
  }, (adjustedTimer + 1.5) * 1000);
}

function handleTimeout(coupleCode, questionIndex) {
  const couple = couples[coupleCode];
  if (!couple || couple.currentQuestionIndex !== questionIndex || couple.isPaused) return;
  resolveQuestion(coupleCode, questionIndex, false, 'TIMEOUT');
}

function submitAnswer(coupleCode, playerId, questionIndex, answer) {
  const couple = couples[coupleCode];
  if (!couple || couple.isPaused) return;
  if (couple.currentQuestionIndex !== questionIndex) return;

  const playerSlot = couple.player1Id === playerId ? 'player1' : 'player2';
  if (!couple.answers[questionIndex]) couple.answers[questionIndex] = { player1: null, player2: null };
  
  if (couple.answers[questionIndex][playerSlot] !== null) return;
  couple.answers[questionIndex][playerSlot] = answer;

  queueSave();

  // Informer le partenaire que l'autre a validé
  const otherPlayerId = couple.player1Id === playerId ? couple.player2Id : couple.player1Id;
  sendToPlayer(otherPlayerId, { type: 'PARTNER_ANSWERED' });

  // Si les deux ont répondu, résoudre immédiatement
  const ans = couple.answers[questionIndex];
  if (ans.player1 !== null && ans.player2 !== null) {
    if (couple.questionTimer) clearTimeout(couple.questionTimer);
    
    const question = couple.currentQuestions[questionIndex];
    let a1 = ans.player1;
    let a2 = ans.player2;
    
    if (question.type === QUESTION_TYPES.MOI_LUI) {
      const p1 = players[couple.player1Id];
      const p2 = players[couple.player2Id];
      a1 = normalizeRole(ans.player1, p1?.role || 'HOMME');
      a2 = normalizeRole(ans.player2, p2?.role || 'FEMME');
    }

    const isMatch = compareAnswers(question.type, a1, a2, question);
    resolveQuestion(coupleCode, questionIndex, isMatch, 'ANSWERED');
  }
}

function resolveQuestion(coupleCode, questionIndex, isMatch, reason) {
  const couple = couples[coupleCode];
  if (!couple) return;

  const question = couple.currentQuestions[questionIndex];
  const ans = couple.answers[questionIndex] || {};

  if (isMatch) {
    couple.currentLevelScore += 1;
  }

  const totalScore = (couple.levelScores || []).reduce((a, b) => a + b, 0) + couple.currentLevelScore;

  broadcastToCouple(coupleCode, {
    type: 'QUESTION_RESULT',
    questionIndex,
    isMatch,
    reason,
    player1Answer: ans.player1,
    player2Answer: ans.player2,
    points: isMatch ? 1 : 0,
    levelScore: couple.currentLevelScore,
    totalScore,
    totalQuestions: couple.currentQuestions.length,
  });

  broadcastToAdmins({
    type: 'ADMIN_EVENT',
    event: 'QUESTION_RESOLVED',
    coupleCode,
    questionIndex,
    isMatch,
    levelScore: couple.currentLevelScore
  });

  // Passer à la question suivante
  couple.currentQuestionIndex += 1;
  queueSave();
  
  if (couple.nextQuestionTimeout) clearTimeout(couple.nextQuestionTimeout);
  couple.nextQuestionTimeout = setTimeout(() => {
    if (!couple.isPaused) {
      if (couple.currentQuestionIndex >= couple.currentQuestions.length) {
        endLevel(coupleCode);
      } else {
        sendQuestion(coupleCode);
      }
    }
  }, 3500);
}

function endLevel(coupleCode) {
  const couple = couples[coupleCode];
  if (!couple) return;

  const levelId = couple.currentLevelId;
  const score = couple.currentLevelScore;
  
  if (!couple.levelScores) couple.levelScores = new Array(20).fill(0);
  couple.levelScores[levelId - 1] = score;
  const totalScore = couple.levelScores.reduce((a, b) => a + b, 0);

  const rewardLevels = [
    { afterLevel: 4, threshold: 190, max: 200, giftId: 1, name: 'Cadeau Mystère N°1' },
    { afterLevel: 12, threshold: 570, max: 600, giftId: 2, name: 'Cadeau Mystère N°2' },
    { afterLevel: 20, threshold: 950, max: 1000, giftId: 3, name: '🏆 GRAND CADEAU FINAL' },
  ];

  let giftEarned = null;
  const rl = rewardLevels.find(r => r.afterLevel === levelId);
  const existingClaims = storage.loadClaims();
  const alreadyClaimed = existingClaims.some(c => c.coupleCode === coupleCode && c.levelId === levelId);

  if (rl && !(couple.giftsEarned || []).includes(rl.giftId)) {
    if (totalScore >= rl.threshold) {
      if (!couple.giftsEarned) couple.giftsEarned = [];
      couple.giftsEarned.push(rl.giftId);
      giftEarned = rl;

      // Si pas encore réclamé, préparer l'étape de réclamation obligatoire
      if (!alreadyClaimed) {
        couple.pendingGiftClaim = {
          levelId,
          giftId: rl.giftId,
          giftName: rl.name,
          threshold: rl.threshold,
          max: rl.max,
          totalScore
        };
      }
    }
  }

  let nextReward = null;
  for (const r of rewardLevels) {
    if (!(couple.giftsEarned || []).includes(r.giftId)) {
      nextReward = r;
      break;
    }
  }

  const nextLevelId = levelId < 20 ? levelId + 1 : null;
  couple.currentLevel = nextLevelId || 20;
  couple.levelStarted = false;
  couple.isPaused = false;

  queueSave();

  broadcastToCouple(coupleCode, {
    type: 'LEVEL_END',
    levelId,
    levelScore: score,
    levelMax: 50,
    totalScore,
    totalMax: levelId * 50,
    giftEarned,
    pendingGiftClaim: couple.pendingGiftClaim || null,
    nextReward,
    nextLevelId,
    giftsEarned: couple.giftsEarned,
    isSeasonEnd: levelId === 20,
    seasonSuccess: levelId === 20 && totalScore >= 950,
  });

  broadcastToAdmins({ type: 'ADMIN_EVENT', event: 'LEVEL_COMPLETED', coupleCode, levelId, totalScore });
}

// ============================================================
// GESTION PAUSE, REPRISE ET ABANDON SYNCHRONISÉS
// ============================================================

function pauseGame(coupleCode, disconnectedPlayerName) {
  const couple = couples[coupleCode];
  if (!couple || !couple.levelStarted || couple.isPaused) return;

  couple.isPaused = true;

  // Calculer le temps restant sur la question
  if (couple.questionStartTime) {
    const elapsed = Math.floor((Date.now() - couple.questionStartTime) / 1000);
    couple.remainingTimer = Math.max(3, (couple.currentTimer || 20) - elapsed);
  }

  if (couple.questionTimer) clearTimeout(couple.questionTimer);
  if (couple.nextQuestionTimeout) clearTimeout(couple.nextQuestionTimeout);

  queueSave();

  broadcastToCouple(coupleCode, {
    type: 'GAME_PAUSED',
    reason: 'DISCONNECT',
    partnerName: disconnectedPlayerName,
    message: `⚠️ ${disconnectedPlayerName || 'Votre partenaire'} a perdu la connexion. Le jeu est en pause automatique. Reprise dès sa reconnexion...`
  });

  broadcastToAdmins({ type: 'ADMIN_EVENT', event: 'GAME_PAUSED', coupleCode });
}

function resumeGame(coupleCode) {
  const couple = couples[coupleCode];
  if (!couple || !couple.levelStarted || !couple.isPaused) return;

  couple.isPaused = false;
  queueSave();

  broadcastToCouple(coupleCode, {
    type: 'GAME_RESUMED',
    message: '🎉 Les deux partenaires sont à nouveau connectés ! Reprise de la partie...'
  });

  broadcastToAdmins({ type: 'ADMIN_EVENT', event: 'GAME_RESUMED', coupleCode });

  // Renvoyer la question avec le temps restant
  setTimeout(() => {
    if (couple.levelStarted && !couple.isPaused) {
      if (couple.currentQuestions && couple.currentQuestionIndex < couple.currentQuestions.length) {
        const question = couple.currentQuestions[couple.currentQuestionIndex];
        const timerToUse = couple.remainingTimer || 15;
        couple.questionStartTime = Date.now();
        couple.currentTimer = timerToUse;

        broadcastToCouple(coupleCode, {
          type: 'QUESTION',
          questionIndex: couple.currentQuestionIndex,
          totalQuestions: couple.currentQuestions.length,
          miniGameType: question.miniGameType,
          miniGameName: question.miniGameName,
          question: {
            id: question.id,
            text: question.text,
            type: question.type,
            timer: timerToUse,
            options: question.options || null,
            hint: question.hint || null,
            flashContent: question.flashContent || null,
            flashDuration: question.flashDuration || null,
            question: question.question || null,
            items: question.items || null,
            isChoixImpossible: question.isChoixImpossible || false,
          },
          levelScore: couple.currentLevelScore,
          totalScore: (couple.levelScores || []).reduce((a, b) => a + b, 0) + couple.currentLevelScore,
        });

        if (couple.questionTimer) clearTimeout(couple.questionTimer);
        couple.questionTimer = setTimeout(() => {
          handleTimeout(coupleCode, couple.currentQuestionIndex);
        }, (timerToUse + 1.5) * 1000);
      }
    }
  }, 2000);
}

function leaveGame(coupleCode, leavingPlayerId) {
  const couple = couples[coupleCode];
  if (!couple) return;

  const leavingPlayer = players[leavingPlayerId];
  const leavingName = leavingPlayer ? leavingPlayer.name : 'Votre partenaire';

  // Annuler les timers
  if (couple.questionTimer) clearTimeout(couple.questionTimer);
  if (couple.nextQuestionTimeout) clearTimeout(couple.nextQuestionTimeout);

  couple.levelStarted = false;
  couple.isPaused = false;
  couple.player1Ready = false;
  couple.player2Ready = false;

  queueSave();

  // Informer les deux joueurs de l'arrêt volontaire
  broadcastToCouple(coupleCode, {
    type: 'GAME_QUIT',
    quitterId: leavingPlayerId,
    quitterName: leavingName,
    message: `${leavingName} a choisi de quitter la partie. Vous êtes redirigé vers le menu des niveaux.`
  });

  broadcastToAdmins({ type: 'ADMIN_EVENT', event: 'GAME_QUIT', coupleCode, quitterName: leavingName });
}

// ============================================================
// WEBSOCKET HANDLERS
// ============================================================

wss.on('connection', (ws) => {
  let playerId = null;
  let isAdmin = false;

  ws.on('message', (raw) => {
    let data;
    try { data = JSON.parse(raw); } catch { return; }

    const { type } = data;

    // ---- CONNEXION ADMIN AVEC TOKEN DE SÉCURITÉ ----
    if (type === 'ADMIN_AUTH') {
      if (!data.token || !isValidAdminToken(data.token)) {
        send(ws, { type: 'ERROR', message: 'Accès administrateur non autorisé. Veuillez vous authentifier.' });
        return;
      }
      isAdmin = true;
      adminSockets.add(ws);
      send(ws, {
        type: 'ADMIN_DATA',
        couples: getAdminCouplesList(),
        claims: storage.loadClaims(),
        customQuestions,
        categories: Object.keys(questionBank),
        levels: LEVELS.map(l => ({ id: l.id, name: l.name, theme: l.theme, emoji: l.emoji }))
      });
      return;
    }

    // ---- ACTIONS ADMIN PROTÉGÉES ----
    if (type === 'ADMIN_DELETE_COUPLE') {
      if (!isAdmin) return;
      const code = data.coupleCode;
      const couple = couples[code];
      if (couple) {
        // 1. Archiver pour traçabilité
        storage.archiveDeletedCouple(couple, 'admin_manual_deletion');

        // 2. Notifier et déconnecter les sessions actives de ce couple
        const p1Id = couple.player1Id;
        const p2Id = couple.player2Id;

        for (const pid of [p1Id, p2Id]) {
          if (pid) {
            sendToPlayer(pid, {
              type: 'COUPLE_DELETED',
              message: 'Cette partie a été clôturée par l’administrateur.'
            });
            if (wsConnections[pid]) {
              try { wsConnections[pid].close(); } catch {}
              delete wsConnections[pid];
            }
            if (players[pid] && players[pid].coupleCode === code) {
              delete players[pid];
            }
          }
        }

        // Nettoyer timers éventuels
        if (couple.questionTimer) clearTimeout(couple.questionTimer);
        if (couple.pauseTimeout) clearTimeout(couple.pauseTimeout);

        // 3. Supprimer de l'objet actif des couples
        delete couples[code];

        // 4. Sauvegarder immédiatement
        storage.saveCouples(couples);

        // 5. Diffuser la mise à jour à tous les administrateurs connectés
        broadcastToAdmins({
          type: 'ADMIN_COUPLE_DELETED',
          coupleCode: code,
          message: `Le couple ${code} a été supprimé avec succès.`
        });
        broadcastToAdmins({
          type: 'ADMIN_DATA',
          couples: getAdminCouplesList(),
          claims: storage.loadClaims(),
          customQuestions
        });
      }
      return;
    }

    if (type === 'ADMIN_RESET_COUPLE') {
      if (!isAdmin) return;
      const c = couples[data.coupleCode];
      if (c) {
        c.currentLevel = 1;
        c.levelScores = new Array(20).fill(0);
        c.currentLevelScore = 0;
        c.giftsEarned = [];
        c.pendingGiftClaim = null;
        c.levelStarted = false;
        c.isPaused = false;
        queueSave();
        broadcastToCouple(data.coupleCode, { type: 'STATE_REFRESH' });
        send(ws, { type: 'ADMIN_DATA', couples: getAdminCouplesList(), claims: storage.loadClaims(), customQuestions });
      }
      return;
    }

    if (type === 'ADMIN_SET_LEVEL') {
      if (!isAdmin) return;
      const c = couples[data.coupleCode];
      if (c && data.level) {
        c.currentLevel = parseInt(data.level, 10);
        c.levelStarted = false;
        c.isPaused = false;
        queueSave();
        broadcastToCouple(data.coupleCode, { type: 'STATE_REFRESH' });
        send(ws, { type: 'ADMIN_DATA', couples: getAdminCouplesList(), claims: storage.loadClaims(), customQuestions });
      }
      return;
    }

    if (type === 'ADMIN_FORCE_NEXT') {
      if (!isAdmin) return;
      const c = couples[data.coupleCode];
      if (c && c.levelStarted) {
        if (c.questionTimer) clearTimeout(c.questionTimer);
        resolveQuestion(data.coupleCode, c.currentQuestionIndex, false, 'ADMIN_FORCE');
        send(ws, { type: 'ADMIN_DATA', couples: getAdminCouplesList(), claims: storage.loadClaims(), customQuestions });
      }
      return;
    }

    if (type === 'ADMIN_UPDATE_CLAIM_STATUS') {
      if (!isAdmin) return;
      const updated = storage.updateClaimStatus(data.claimId, data.status);
      if (updated) {
        broadcastToAdmins({ type: 'ADMIN_CLAIM_UPDATED', claim: updated });
      }
      return;
    }

    if (type === 'ADMIN_SIMULATE_FINISH_LEVEL') {
      if (!isAdmin) return;
      const c = couples[data.coupleCode];
      if (c) {
        c.currentLevelId = data.levelId || c.currentLevel || 4;
        c.currentLevelScore = data.score !== undefined ? data.score : 45;
        if (data.priorScores && Array.isArray(data.priorScores)) {
          c.levelScores = data.priorScores;
        }
        endLevel(data.coupleCode);
      }
      return;
    }

    // ---- CRÉATION / CONNEXION JOUEURS ----

    if (type === 'CREATE_COUPLE') {
      playerId = uuidv4();
      const user_id = data.userId || playerId;
      const coupleCode = generateCode();
      
      players[playerId] = {
        id: playerId,
        userId: user_id,
        name: data.name || 'Joueur 1',
        role: data.role || 'HOMME',
        coupleCode,
        isHost: true,
      };
      
      couples[coupleCode] = {
        code: coupleCode,
        player1Id: playerId,
        player1UserId: user_id,
        player1Name: data.name || 'Joueur 1',
        player1Role: data.role || 'HOMME',
        player2Id: null,
        player2UserId: null,
        player2Name: null,
        player2Role: null,
        player1Ready: false,
        player2Ready: false,
        currentLevel: 1,
        currentLevelId: null,
        levelScores: new Array(20).fill(0),
        currentLevelScore: 0,
        currentQuestions: [],
        currentQuestionIndex: 0,
        answers: {},
        giftsEarned: [],
        pendingGiftClaim: null,
        levelStarted: false,
        isPaused: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      wsConnections[playerId] = ws;
      queueSave();
      
      send(ws, {
        type: 'COUPLE_CREATED',
        playerId,
        userId: user_id,
        coupleCode,
        playerName: players[playerId].name,
        playerRole: players[playerId].role,
      });

      broadcastToAdmins({ type: 'ADMIN_DATA', couples: getAdminCouplesList() });
      return;
    }

    if (type === 'JOIN_COUPLE') {
      const { coupleCode, name, role } = data;
      const user_id = data.userId || uuidv4();
      const couple = couples[coupleCode];
      
      if (!couple) {
        send(ws, { type: 'ERROR', message: 'Code invalide. Vérifiez le code de votre partenaire.' });
        return;
      }
      
      // Si reconnexion en tant que Joueur 2 existant
      if (couple.player2Id && (couple.player2UserId === user_id || couple.player2Name === name)) {
        playerId = couple.player2Id;
      } else if (couple.player2Id && wsConnections[couple.player2Id]) {
        send(ws, { type: 'ERROR', message: 'Ce couple a déjà ses deux partenaires en ligne.' });
        return;
      } else {
        playerId = couple.player2Id || uuidv4();
      }
      
      players[playerId] = {
        id: playerId,
        userId: user_id,
        name: name || couple.player2Name || 'Joueur 2',
        role: role || couple.player2Role || 'FEMME',
        coupleCode,
        isHost: false,
      };
      
      couple.player2Id = playerId;
      couple.player2UserId = user_id;
      couple.player2Name = name || couple.player2Name || 'Joueur 2';
      couple.player2Role = role || couple.player2Role || 'FEMME';
      couple.updatedAt = Date.now();
      wsConnections[playerId] = ws;
      
      queueSave();
      
      const p1 = players[couple.player1Id];
      
      send(ws, {
        type: 'COUPLE_JOINED',
        playerId,
        userId: user_id,
        coupleCode,
        playerName: players[playerId].name,
        playerRole: players[playerId].role,
        partnerName: p1?.name || couple.player1Name,
        partnerRole: p1?.role || couple.player1Role,
      });
      
      sendToPlayer(couple.player1Id, {
        type: 'PARTNER_JOINED',
        partnerName: players[playerId].name,
        partnerRole: players[playerId].role,
      });

      // Si le jeu était en pause suite à une déconnexion, le reprendre !
      if (couple.isPaused) {
        resumeGame(coupleCode);
      }

      broadcastToAdmins({ type: 'ADMIN_DATA', couples: getAdminCouplesList() });
      return;
    }

    if (type === 'SELECT_COUPLE') {
      const { coupleCode, userId, playerName: reqName, playerId: reqPlayerId } = data;
      const couple = couples[coupleCode];
      if (!couple) {
        send(ws, { type: 'ERROR', message: 'Partie introuvable.' });
        return;
      }

      let isHost = true;
      let activePlayerId = null;

      if (couple.player1UserId === userId || couple.player1Id === reqPlayerId) {
        activePlayerId = couple.player1Id;
        isHost = true;
      } else if (couple.player2UserId === userId || couple.player2Id === reqPlayerId) {
        activePlayerId = couple.player2Id;
        isHost = false;
      } else if (reqName && couple.player2Name && couple.player2Name.trim().toLowerCase() === reqName.trim().toLowerCase()) {
        activePlayerId = couple.player2Id;
        couple.player2UserId = userId;
        isHost = false;
      } else if (reqName && couple.player1Name && couple.player1Name.trim().toLowerCase() === reqName.trim().toLowerCase()) {
        activePlayerId = couple.player1Id;
        couple.player1UserId = userId;
        isHost = true;
      } else if (couple.player2Id && couple.player2Id === reqPlayerId) {
        activePlayerId = couple.player2Id;
        isHost = false;
      } else {
        activePlayerId = couple.player1Id || couple.player2Id;
        isHost = (couple.player1Id === activePlayerId);
      }

      if (playerId && playerId !== activePlayerId && wsConnections[playerId] === ws) {
        delete wsConnections[playerId];
      }

      playerId = activePlayerId;
      wsConnections[playerId] = ws;

      players[playerId] = {
        id: playerId,
        userId: isHost ? couple.player1UserId : couple.player2UserId,
        name: isHost ? couple.player1Name : (couple.player2Name || 'Joueur 2'),
        role: isHost ? couple.player1Role : (couple.player2Role || 'FEMME'),
        coupleCode,
        isHost
      };

      const otherId = isHost ? couple.player2Id : couple.player1Id;
      const partnerConnected = !!otherId && !!wsConnections[otherId];

      send(ws, {
        type: 'COUPLE_SELECTED',
        playerId,
        coupleCode,
        isHost,
        playerName: players[playerId].name,
        playerRole: players[playerId].role,
        partnerName: isHost ? couple.player2Name : couple.player1Name,
        partnerRole: isHost ? couple.player2Role : couple.player1Role,
        partnerConnected,
        hasPartner: !!couple.player2Id,
        coupleState: {
          currentLevel: couple.currentLevel,
          levelScores: couple.levelScores || [],
          giftsEarned: couple.giftsEarned || [],
          totalScore: (couple.levelScores || []).reduce((a, b) => a + b, 0),
          pendingGiftClaim: couple.pendingGiftClaim || null,
          levelStarted: couple.levelStarted,
          isPaused: couple.isPaused,
        }
      });

      if (otherId && wsConnections[otherId]) {
        sendToPlayer(otherId, {
          type: 'PARTNER_RECONNECTED',
          partnerName: players[playerId].name
        });
      }

      if (couple.isPaused && !!couple.player2Id && wsConnections[couple.player1Id] && wsConnections[couple.player2Id]) {
        resumeGame(coupleCode);
      }

      broadcastToAdmins({ type: 'ADMIN_DATA', couples: getAdminCouplesList() });
      return;
    }

    if (type === 'SWITCH_COUPLE') {
      const { coupleCode: cCode, playerId: pId } = data;
      if (pId && wsConnections[pId] === ws) {
        delete wsConnections[pId];
      }
      if (cCode && couples[cCode]) {
        const c = couples[cCode];
        if (c.levelStarted) {
          pauseGame(cCode, players[pId]?.name || 'Votre partenaire');
        } else {
          const otherId = c.player1Id === pId ? c.player2Id : c.player1Id;
          if (otherId && wsConnections[otherId]) {
            sendToPlayer(otherId, { type: 'PARTNER_DISCONNECTED', partnerName: players[pId]?.name });
          }
        }
      }
      playerId = null;
      send(ws, { type: 'SWITCHED_COUPLE' });
      broadcastToAdmins({ type: 'ADMIN_DATA', couples: getAdminCouplesList() });
      return;
    }

    if (type === 'GET_USER_COUPLES') {
      const list = getUserCouples(data.userId, data.coupleCodes, data.playerName);
      send(ws, { type: 'USER_COUPLES_DATA', couples: list });
      return;
    }

    if (type === 'RECONNECT') {
      const { existingPlayerId, coupleCode: reqCoupleCode, userId: reqUserId } = data;
      
      let targetPlayerId = existingPlayerId;
      if (!targetPlayerId && reqCoupleCode && couples[reqCoupleCode]) {
        const c = couples[reqCoupleCode];
        if (reqUserId && c.player1UserId === reqUserId) targetPlayerId = c.player1Id;
        else if (reqUserId && c.player2UserId === reqUserId) targetPlayerId = c.player2Id;
        else targetPlayerId = c.player1Id;
      }

      if (targetPlayerId && !players[targetPlayerId]) {
        for (const [code, c] of Object.entries(couples)) {
          if (c.player1Id === targetPlayerId) {
            players[targetPlayerId] = {
              id: targetPlayerId,
              userId: c.player1UserId || targetPlayerId,
              name: c.player1Name || 'Joueur 1',
              role: c.player1Role || 'HOMME',
              coupleCode: code,
              isHost: true
            };
            break;
          } else if (c.player2Id === targetPlayerId) {
            players[targetPlayerId] = {
              id: targetPlayerId,
              userId: c.player2UserId || targetPlayerId,
              name: c.player2Name || 'Joueur 2',
              role: c.player2Role || 'FEMME',
              coupleCode: code,
              isHost: false
            };
            break;
          }
        }
      }

      if (targetPlayerId && players[targetPlayerId]) {
        playerId = targetPlayerId;
        wsConnections[playerId] = ws;
        const player = players[playerId];
        const couple = couples[player.coupleCode];
        
        send(ws, {
          type: 'RECONNECTED',
          playerId,
          coupleCode: player.coupleCode,
          playerName: player.name,
          playerRole: player.role,
          isHost: couple ? (couple.player1Id === playerId) : false,
          partnerName: couple ? (couple.player1Id === playerId ? couple.player2Name : couple.player1Name) : null,
          hasPartner: couple ? !!couple.player2Id : false,
          coupleState: couple ? {
            currentLevel: couple.currentLevel,
            levelScores: couple.levelScores || [],
            giftsEarned: couple.giftsEarned || [],
            totalScore: (couple.levelScores || []).reduce((a, b) => a + b, 0),
            pendingGiftClaim: couple.pendingGiftClaim || null,
            levelStarted: couple.levelStarted,
            isPaused: couple.isPaused,
          } : null,
        });

        // Informer le partenaire de la reconnexion
        if (couple) {
          const otherId = couple.player1Id === playerId ? couple.player2Id : couple.player1Id;
          if (otherId && wsConnections[otherId]) {
            sendToPlayer(otherId, { 
              type: 'PARTNER_RECONNECTED', 
              partnerName: player.name 
            });
          }

          // Si le jeu était en pause et que les 2 sont présents
          const bothPresent = wsConnections[couple.player1Id] && wsConnections[couple.player2Id];
          if (couple.isPaused && bothPresent) {
            resumeGame(player.coupleCode);
          }
        }

        broadcastToAdmins({ type: 'ADMIN_DATA', couples: getAdminCouplesList() });
        return;
      }
    }

    // ---- ACTIONS DE JEU ----

    if (!playerId || !players[playerId]) {
      send(ws, { type: 'ERROR', message: 'Non connecté.' });
      return;
    }

    const player = players[playerId];
    const coupleCode = player.coupleCode;
    const couple = couples[coupleCode];

    if (type === 'PLAYER_READY') {
      if (!couple) return;
      if (couple.player1Id === playerId) couple.player1Ready = true;
      if (couple.player2Id === playerId) couple.player2Ready = true;

      broadcastToCouple(coupleCode, {
        type: 'READINESS_UPDATE',
        player1Ready: couple.player1Ready,
        player2Ready: couple.player2Ready,
        player1Name: players[couple.player1Id]?.name || couple.player1Name,
        player2Name: players[couple.player2Id]?.name || couple.player2Name,
      });

      if (couple.player1Ready && couple.player2Ready && couple.player2Id) {
        couple.player1Ready = false;
        couple.player2Ready = false;
        setTimeout(() => {
          startLevel(coupleCode, couple.currentLevel);
        }, 1500);
      }
      return;
    }

    if (type === 'SUBMIT_ANSWER') {
      const { questionIndex, answer } = data;
      submitAnswer(coupleCode, playerId, questionIndex, answer);
      return;
    }

    // BOUTON QUITTER LA PARTIE
    if (type === 'QUIT_GAME') {
      leaveGame(coupleCode, playerId);
      return;
    }

    // SIGNALEMENT REMPLISSAGE FORMULAIRE CADEAU (Synchro temps réel pour partenaire 2)
    if (type === 'FILLING_CLAIM') {
      if (couple && couple.player2Id) {
        sendToPlayer(couple.player2Id, {
          type: 'PARTNER_FILLING_CLAIM',
          levelId: data.levelId,
          giftName: data.giftName,
          message: '🎁 Votre partenaire est en train de remplir le formulaire nécessaire pour recevoir votre cadeau. Veuillez patienter quelques instants.'
        });
      }
      return;
    }

    // SOUMISSION DU FORMULAIRE DE RÉCLAMATION CADEAU
    if (type === 'SUBMIT_GIFT_CLAIM') {
      const { levelId, giftId, formData } = data;
      if (!couple) return;

      // 1. Vérifier que c'est bien le créateur du couple (Player 1)
      if (couple.player1Id !== playerId) {
        send(ws, { type: 'ERROR', message: 'Seul le partenaire qui a créé le couple peut remplir le formulaire de cadeau.' });
        return;
      }

      // 2. Vérifier les conditions de score du cadeau
      const rewardLevels = [
        { afterLevel: 4, threshold: 190, max: 200, giftId: 1, name: 'Cadeau Mystère N°1' },
        { afterLevel: 12, threshold: 570, max: 600, giftId: 2, name: 'Cadeau Mystère N°2' },
        { afterLevel: 20, threshold: 950, max: 1000, giftId: 3, name: '🏆 GRAND CADEAU FINAL' },
      ];
      const rl = rewardLevels.find(r => r.afterLevel === levelId && r.giftId === giftId);
      const totalScore = (couple.levelScores || []).reduce((a, b) => a + b, 0);

      if (!rl || totalScore < rl.threshold) {
        send(ws, { type: 'ERROR', message: 'Conditions de score requises non remplies pour ce cadeau.' });
        return;
      }

      // 3. Validation des champs
      const nom = (formData?.nom || '').trim();
      const prenom = (formData?.prenom || '').trim();
      const ville = (formData?.ville || '').trim();
      const adresse = (formData?.adresse || '').trim();
      const whatsapp = (formData?.whatsapp || '').trim();

      if (!nom || !prenom || !ville || !adresse || !whatsapp) {
        send(ws, { type: 'ERROR', message: 'Tous les champs sont obligatoires (Nom, Prénom, Ville, Adresse, WhatsApp).' });
        return;
      }

      const digits = whatsapp.replace(/[^0-9]/g, '');
      if (digits.length < 6) {
        send(ws, { type: 'ERROR', message: 'Veuillez saisir un numéro WhatsApp valide.' });
        return;
      }

      // 4. Empêcher les doublons accidentels pour ce couple et ce niveau
      const existingClaims = storage.loadClaims();
      const duplicate = existingClaims.some(c => c.coupleCode === coupleCode && c.levelId === levelId);
      if (duplicate) {
        couple.pendingGiftClaim = null;
        queueSave();
        broadcastToCouple(coupleCode, {
          type: 'GIFT_CLAIM_SUCCESS',
          levelId,
          giftId,
          message: 'Informations déjà enregistrées pour cette récompense ! Le jeu peut reprendre.'
        });
        return;
      }

      // 5. Enregistrer la réclamation dans la base de données
      const newClaim = {
        id: 'claim_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        coupleCode,
        player1Name: couple.player1Name || players[couple.player1Id]?.name || 'Joueur 1',
        player2Name: couple.player2Name || (couple.player2Id ? players[couple.player2Id]?.name : 'Joueur 2'),
        levelId,
        giftId,
        giftName: rl.name,
        scoreAtClaim: totalScore,
        scoreMax: rl.max,
        nom,
        prenom,
        ville,
        adresse,
        whatsapp,
        createdAt: Date.now(),
        status: 'EN_ATTENTE' // 'EN_ATTENTE' | 'EN_COURS' | 'REMIS'
      };

      storage.addClaim(newClaim);
      couple.pendingGiftClaim = null;
      queueSave();

      // 6. Confirmer aux 2 partenaires en direct
      broadcastToCouple(coupleCode, {
        type: 'GIFT_CLAIM_SUCCESS',
        levelId,
        giftId,
        claim: newClaim,
        message: 'Informations envoyées avec succès ! Nous vous contacterons pour la remise de votre cadeau.'
      });

      // 7. Notifier le dashboard admin en temps réel
      broadcastToAdmins({
        type: 'ADMIN_NEW_CLAIM',
        claim: newClaim
      });
      return;
    }

    if (type === 'GET_STATE') {
      if (!couple) return;
      send(ws, {
        type: 'STATE',
        currentLevel: couple.currentLevel,
        levelScores: couple.levelScores || [],
        totalScore: (couple.levelScores || []).reduce((a, b) => a + b, 0),
        giftsEarned: couple.giftsEarned || [],
        pendingGiftClaim: couple.pendingGiftClaim || null,
        player1Name: players[couple.player1Id]?.name || couple.player1Name,
        player2Name: couple.player2Id ? (players[couple.player2Id]?.name || couple.player2Name) : null,
        isHost: couple.player1Id === playerId,
        partnerConnected: !!couple.player2Id && !!wsConnections[couple.player2Id],
        levelStarted: couple.levelStarted,
        isPaused: couple.isPaused,
      });
      return;
    }

    if (type === 'PING') {
      send(ws, { type: 'PONG' });
      return;
    }
  });

  ws.on('close', () => {
    if (isAdmin) {
      adminSockets.delete(ws);
      return;
    }

    if (playerId && players[playerId]) {
      const player = players[playerId];
      delete wsConnections[playerId];
      
      const couple = couples[player.coupleCode];
      if (couple) {
        const otherPlayerId = couple.player1Id === playerId ? couple.player2Id : couple.player1Id;
        
        // Mettre en pause automatique si une épreuve est en cours !
        if (couple.levelStarted) {
          pauseGame(player.coupleCode, player.name);
        } else if (otherPlayerId) {
          sendToPlayer(otherPlayerId, { 
            type: 'PARTNER_DISCONNECTED',
            partnerName: player.name 
          });
        }
      }

      broadcastToAdmins({ type: 'ADMIN_DATA', couples: getAdminCouplesList() });
    }
  });
});

// ============================================================
// API REST POUR LE DASHBOARD ADMIN
// ============================================================

function getAdminCouplesList() {
  return Object.values(couples).map(c => {
    const p1Connected = !!wsConnections[c.player1Id];
    const p2Connected = !!c.player2Id && !!wsConnections[c.player2Id];
    const totalScore = (c.levelScores || []).reduce((a, b) => a + b, 0);

    return {
      code: c.code,
      player1Name: c.player1Name || players[c.player1Id]?.name || 'Joueur 1',
      player1Connected: p1Connected,
      player2Name: c.player2Name || (c.player2Id ? players[c.player2Id]?.name : null),
      player2Connected: p2Connected,
      currentLevel: c.currentLevel || 1,
      currentQuestionIndex: c.currentQuestionIndex || 0,
      totalQuestions: c.currentQuestions ? c.currentQuestions.length : 0,
      totalScore,
      giftsEarned: c.giftsEarned || [],
      levelStarted: !!c.levelStarted,
      isPaused: !!c.isPaused,
      createdAt: c.createdAt || Date.now()
    };
  });
}

// ============================================================
// API AUTH & REST POUR LE DASHBOARD ADMIN
// ============================================================

// Connexion admin (Vérification mot de passe côté serveur)
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: 'Mot de passe administrateur incorrect.' });
  }
  const token = generateAdminToken();
  res.json({ success: true, token });
});

// Vérification de token admin
app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (isValidAdminToken(token)) {
    return res.json({ success: true, valid: true });
  }
  return res.status(401).json({ success: false, valid: false, error: 'Token non valide ou expiré.' });
});

// Obtenir tous les couples (protégé)
app.get('/api/admin/couples', requireAdminAuth, (req, res) => {
  res.json(getAdminCouplesList());
});

// Supprimer un couple (protégé)
app.delete('/api/admin/couples/:code', requireAdminAuth, (req, res) => {
  const code = (req.params.code || '').trim().toUpperCase();
  const couple = couples[code];
  if (!couple) {
    return res.status(404).json({ success: false, error: 'Couple introuvable ou déjà supprimé.' });
  }

  // 1. Archiver pour traçabilité
  storage.archiveDeletedCouple(couple, 'admin_rest_deletion');

  // 2. Notifier et déconnecter les sessions actives de ce couple
  const p1Id = couple.player1Id;
  const p2Id = couple.player2Id;

  for (const pid of [p1Id, p2Id]) {
    if (pid) {
      sendToPlayer(pid, {
        type: 'COUPLE_DELETED',
        message: 'Cette partie a été clôturée par l’administrateur.'
      });
      if (wsConnections[pid]) {
        try { wsConnections[pid].close(); } catch {}
        delete wsConnections[pid];
      }
      if (players[pid] && players[pid].coupleCode === code) {
        delete players[pid];
      }
    }
  }

  // Nettoyer timers éventuels
  if (couple.questionTimer) clearTimeout(couple.questionTimer);
  if (couple.pauseTimeout) clearTimeout(couple.pauseTimeout);

  // 3. Supprimer de l'objet actif des couples
  delete couples[code];

  // 4. Sauvegarder immédiatement
  storage.saveCouples(couples);

  // 5. Diffuser la mise à jour à tous les administrateurs connectés
  broadcastToAdmins({
    type: 'ADMIN_COUPLE_DELETED',
    coupleCode: code,
    message: `Le couple ${code} a été supprimé avec succès.`
  });
  broadcastToAdmins({
    type: 'ADMIN_DATA',
    couples: getAdminCouplesList(),
    claims: storage.loadClaims(),
    customQuestions
  });

  res.json({ success: true, message: `Couple ${code} supprimé avec succès.` });
});


// Obtenir toutes les réclamations de cadeaux (protégé)
app.get('/api/admin/claims', requireAdminAuth, (req, res) => {
  res.json(storage.loadClaims());
});

// Mettre à jour le statut d'une réclamation (protégé)
app.patch('/api/admin/claims/:id/status', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const valid = ['EN_ATTENTE', 'EN_COURS', 'REMIS'];
  if (!valid.includes(status)) {
    return res.status(400).json({ error: 'Statut invalide. Utilisez EN_ATTENTE, EN_COURS ou REMIS.' });
  }

  const updated = storage.updateClaimStatus(id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Demande introuvable.' });
  }

  broadcastToAdmins({ type: 'ADMIN_CLAIM_UPDATED', claim: updated });
  res.json({ success: true, claim: updated });
});

// Obtenir toutes les questions personnalisées et catégories (protégé)
app.get('/api/admin/questions', requireAdminAuth, (req, res) => {
  res.json({
    custom: customQuestions,
    categories: Object.keys(questionBank),
    types: Object.values(QUESTION_TYPES),
    miniGames: Object.values(MINI_GAMES)
  });
});

// Ajouter une nouvelle question ou épreuve (protégé)
app.post('/api/admin/questions', requireAdminAuth, (req, res) => {
  const { category, text, type, timer, options, hint, equivalences } = req.body;
  if (!category || !text || !type) {
    return res.status(400).json({ error: 'Champs category, text et type requis.' });
  }

  let parsedEquivalences = [];
  if (Array.isArray(equivalences)) {
    parsedEquivalences = equivalences;
  } else if (typeof equivalences === 'string' && equivalences.trim()) {
    if (equivalences.includes('|')) {
      parsedEquivalences = equivalences.split('|').map(g => g.split(',').map(s => s.trim()).filter(Boolean));
    } else {
      parsedEquivalences = [equivalences.split(',').map(s => s.trim()).filter(Boolean)];
    }
  }

  const newQ = {
    id: 'cq_' + Date.now(),
    text,
    type,
    category,
    timer: parseInt(timer, 10) || 25,
    difficulty: 2,
    options: Array.isArray(options) ? options : (options ? options.split(',').map(s => s.trim()) : null),
    hint: hint || null,
    equivalences: parsedEquivalences.length > 0 ? parsedEquivalences : undefined,
    isCustom: true
  };

  customQuestions.push(newQ);
  storage.saveCustomQuestions(customQuestions);

  // Ajouter aussi à la banque active en mémoire
  if (!questionBank[category]) questionBank[category] = [];
  questionBank[category].push(newQ);

  broadcastToAdmins({ type: 'ADMIN_QUESTION_ADDED', question: newQ });
  res.json({ success: true, question: newQ });
});

// Supprimer une question personnalisée (protégé)
app.delete('/api/admin/questions/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  customQuestions = customQuestions.filter(q => q.id !== id);
  storage.saveCustomQuestions(customQuestions);
  res.json({ success: true, deletedId: id });
});

// API pour le frontend classique
app.get('/api/levels', (req, res) => {
  res.json(LEVELS.map(l => ({
    id: l.id,
    name: l.name,
    theme: l.theme,
    emoji: l.emoji,
    rewardLevel: l.rewardLevel || false,
    rewardThreshold: l.rewardThreshold,
    rewardMax: l.rewardMax,
    isGrandFinal: l.isGrandFinal || false,
  })));
});

app.get('/api/couple/:code', (req, res) => {
  const couple = couples[req.params.code];
  if (!couple) return res.status(404).json({ error: 'Couple non trouvé' });
  
  res.json({
    code: couple.code,
    hasPartner: !!couple.player2Id,
    currentLevel: couple.currentLevel,
    totalScore: (couple.levelScores || []).reduce((a, b) => a + b, 0),
    giftsEarned: couple.giftsEarned || [],
    player1Name: couple.player1Name || 'Votre partenaire',
  });
});

// API pour récupérer les couples d'un utilisateur
app.post('/api/user/couples', (req, res) => {
  const { userId, coupleCodes, playerName } = req.body || {};
  const list = getUserCouples(userId, coupleCodes, playerName);
  res.json({ success: true, couples: list });
});

app.get('/api/user/:userId/couples', (req, res) => {
  const list = getUserCouples(req.params.userId);
  res.json({ success: true, couples: list });
});

// Fallback to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================
// DÉMARRAGE DU SERVEUR
// ============================================================

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🎮 COMPLICITÉ — Serveur démarré !`);
  console.log(`🌐 Application : http://localhost:${PORT}`);
  console.log(`🛡️ Dashboard Admin : http://localhost:${PORT}/admin.html`);
  console.log(`📡 WebSocket actif sur ws://localhost:${PORT}\n`);
});
