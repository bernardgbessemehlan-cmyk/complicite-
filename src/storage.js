// ============================================================
// STORAGE SERVICE — COMPLICITÉ
// Persistance des couples, des scores et des questions personnalisées
// Fichiers JSON locaux : data/couples.json et data/custom_questions.json
// ============================================================

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const COUPLES_FILE = path.join(DATA_DIR, 'couples.json');
const QUESTIONS_FILE = path.join(DATA_DIR, 'custom_questions.json');
const CLAIMS_FILE = path.join(DATA_DIR, 'claims.json');

// Assurer l'existence du dossier data
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialiser les fichiers si inexistants
if (!fs.existsSync(COUPLES_FILE)) {
  fs.writeFileSync(COUPLES_FILE, JSON.stringify({}, null, 2), 'utf8');
}
if (!fs.existsSync(QUESTIONS_FILE)) {
  fs.writeFileSync(QUESTIONS_FILE, JSON.stringify([], null, 2), 'utf8');
}
if (!fs.existsSync(CLAIMS_FILE)) {
  fs.writeFileSync(CLAIMS_FILE, JSON.stringify([], null, 2), 'utf8');
}

function loadCouples() {
  try {
    const raw = fs.readFileSync(COUPLES_FILE, 'utf8');
    const data = JSON.parse(raw || '{}');
    // Migration à la volée pour assurer la rétrocompatibilité
    for (const [code, c] of Object.entries(data)) {
      if (c.player1Id && !c.player1UserId) {
        c.player1UserId = c.player1Id;
      }
      if (c.player2Id && !c.player2UserId) {
        c.player2UserId = c.player2Id;
      }
      if (!c.player1Name) c.player1Name = 'Joueur 1';
      if (!c.player1Role) c.player1Role = 'HOMME';
      if (!Array.isArray(c.usedQuestionIds)) c.usedQuestionIds = [];
    }
    return data;
  } catch (err) {
    console.error('Erreur lecture couples.json:', err.message);
    return {};
  }
}

function saveCouples(couplesData) {
  try {
    // Nettoyer les objets non sérialisables (ex: timeouts NodeJS)
    const sanitized = {};
    for (const [code, c] of Object.entries(couplesData)) {
      sanitized[code] = {
        code: c.code,
        player1Id: c.player1Id,
        player1UserId: c.player1UserId || c.player1Id || null,
        player1Name: c.player1Name || 'Joueur 1',
        player1Role: c.player1Role || 'HOMME',
        player2Id: c.player2Id || null,
        player2UserId: c.player2UserId || (c.player2Id ? c.player2Id : null),
        player2Name: c.player2Name || null,
        player2Role: c.player2Role || null,
        player1Ready: !!c.player1Ready,
        player2Ready: !!c.player2Ready,
        currentLevel: c.currentLevel || 1,
        currentLevelId: c.currentLevelId || null,
        levelScores: c.levelScores || new Array(20).fill(0),
        currentLevelScore: c.currentLevelScore || 0,
        giftsEarned: c.giftsEarned || [],
        pendingGiftClaim: c.pendingGiftClaim || null,
        levelStarted: !!c.levelStarted,
        isPaused: !!c.isPaused,
        currentQuestionIndex: c.currentQuestionIndex || 0,
        currentTimer: c.currentTimer || 20,
        remainingTimer: c.remainingTimer || 20,
        answers: c.answers || {},
        usedQuestionIds: Array.isArray(c.usedQuestionIds) ? c.usedQuestionIds : [],
        createdAt: c.createdAt || Date.now(),
        updatedAt: c.updatedAt || Date.now()
      };
    }
    fs.writeFileSync(COUPLES_FILE, JSON.stringify(sanitized, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur écriture couples.json:', err.message);
  }
}

function loadCustomQuestions() {
  try {
    const raw = fs.readFileSync(QUESTIONS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Erreur lecture custom_questions.json:', err.message);
    return [];
  }
}

function saveCustomQuestions(questionsList) {
  try {
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(questionsList, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur écriture custom_questions.json:', err.message);
  }
}

function loadClaims() {
  try {
    const raw = fs.readFileSync(CLAIMS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Erreur lecture claims.json:', err.message);
    return [];
  }
}

function saveClaims(claimsList) {
  try {
    fs.writeFileSync(CLAIMS_FILE, JSON.stringify(claimsList, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur écriture claims.json:', err.message);
  }
}

function addClaim(claim) {
  const claims = loadClaims();
  // Vérifier doublon éventuel par coupleCode et levelId
  const existing = claims.find(c => c.coupleCode === claim.coupleCode && c.levelId === claim.levelId);
  if (existing) {
    return { success: false, duplicate: true, claim: existing };
  }
  claims.push(claim);
  saveClaims(claims);
  return { success: true, claim };
}

function updateClaimStatus(claimId, newStatus) {
  const claims = loadClaims();
  const idx = claims.findIndex(c => c.id === claimId);
  if (idx === -1) return null;
  claims[idx].status = newStatus;
  claims[idx].updatedAt = Date.now();
  saveClaims(claims);
  return claims[idx];
}

const DELETED_COUPLES_FILE = path.join(DATA_DIR, 'deleted_couples.json');
if (!fs.existsSync(DELETED_COUPLES_FILE)) {
  fs.writeFileSync(DELETED_COUPLES_FILE, JSON.stringify([], null, 2), 'utf8');
}

function loadDeletedCouples() {
  try {
    const raw = fs.readFileSync(DELETED_COUPLES_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Erreur lecture deleted_couples.json:', err.message);
    return [];
  }
}

function archiveDeletedCouple(coupleData, reason = 'admin_deletion') {
  try {
    const deletedList = loadDeletedCouples();
    deletedList.push({
      ...coupleData,
      deletedAt: Date.now(),
      deletionReason: reason
    });
    fs.writeFileSync(DELETED_COUPLES_FILE, JSON.stringify(deletedList, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur écriture deleted_couples.json:', err.message);
  }
}

module.exports = {
  loadCouples,
  saveCouples,
  loadCustomQuestions,
  saveCustomQuestions,
  loadClaims,
  saveClaims,
  addClaim,
  updateClaimStatus,
  loadDeletedCouples,
  archiveDeletedCouple
};

