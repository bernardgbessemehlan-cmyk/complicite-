// ============================================================
// APP.JS — COMPLICITÉ
// Logique Frontend — WebSocket + UI
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // STATE
  // ============================================================

  let ws = null;
  let playerId = localStorage.getItem('complicite_playerId');
  let coupleCode = localStorage.getItem('complicite_coupleCode');
  let playerName = localStorage.getItem('complicite_playerName') || '';
  let playerRole = localStorage.getItem('complicite_playerRole') || 'HOMME';
  let joinRole = 'FEMME';
  let joinLinkCode = null;
  let joinLinkRole = 'FEMME';
  let inviteLink = '';

  // Identifiant persistant de l'utilisateur sur cet appareil/navigateur
  let userId = localStorage.getItem('complicite_userId');
  if (!userId) {
    userId = playerId || ('usr_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now());
    localStorage.setItem('complicite_userId', userId);
  }

  // Liste locale des couples de cet utilisateur
  let userCouplesList = [];
  try {
    const rawCouples = localStorage.getItem('complicite_my_couples');
    userCouplesList = rawCouples ? JSON.parse(rawCouples) : [];
  } catch {
    userCouplesList = [];
  }

  // Migration des données existantes
  if (coupleCode && !userCouplesList.some(c => c.code === coupleCode)) {
    userCouplesList.push({
      code: coupleCode,
      myPlayerId: playerId,
      partnerName: 'Partenaire',
      partnerRole: 'FEMME',
      myName: playerName || 'Moi',
      myRole: playerRole,
      isHost: true,
      currentLevel: 1,
      totalScore: 0,
      hasPartner: false,
      updatedAt: Date.now()
    });
    localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));
  }

  let currentQuestionIndex = 0;
  let currentAnswer = null;
  let timerInterval = null;
  let timerSeconds = 20;
  let hasAnswered = false;
  let currentQuestionData = null;
  let currentLevelScore = 0;
  let totalQuestions = 50;
  let levelScores = new Array(20).fill(0);
  let totalScore = 0;
  let giftsEarned = [];
  let currentLevel = 1;
  let partnerName = '';
  let partnerConnected = false;
  let dragSrcEl = null;
  let isHost = false;
  let activePendingClaim = null;

  // ============================================================
  // GESTION DES COUPLES MULTIPLES (API & UI)
  // ============================================================

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function fetchUserCouples() {
    try {
      const storedCodes = userCouplesList.map(c => c.code);
      const res = await fetch('/api/user/couples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          coupleCodes: storedCodes,
          playerName
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.couples)) {
          userCouplesList = data.couples;
          localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));
        }
      }
    } catch (err) {
      console.warn('Erreur synchronisation couples:', err);
    }
    renderCouplesList();
  }

  function renderCouplesList() {
    const container = el('couples-list');
    if (!container) return;

    if (userCouplesList.length === 0) {
      container.innerHTML = `
        <div class="empty-couples-state">
          <div class="empty-couples-icon">💌</div>
          <h3 class="empty-couples-title">Aucun couple pour le moment</h3>
          <p class="empty-couples-desc">Créez votre premier espace de jeu ou rejoignez votre partenaire avec un code.</p>
        </div>
      `;
      return;
    }

    if (playerName) {
      const greetingEl = el('user-greeting-name');
      if (greetingEl) greetingEl.textContent = playerName;
    }

    let html = '';
    for (const c of userCouplesList) {
      const pName = c.partnerName || (c.hasPartner ? 'Votre partenaire' : 'En attente de partenaire... ⏳');
      const isWaiting = !c.hasPartner;
      const avatarEmoji = isWaiting ? '⏳' : (c.partnerRole === 'HOMME' ? '👨' : '👩');
      const statusClass = isWaiting ? 'waiting' : (c.partnerConnected ? 'online' : 'offline');
      const statusText = isWaiting ? 'En attente...' : (c.partnerConnected ? 'En ligne 🟢' : 'Hors ligne ⚪');
      const giftCount = (c.giftsEarned || []).length;

      html += `
        <div class="couple-card" id="card-couple-${c.code}">
          <div class="couple-card-top">
            <div class="couple-card-partner">
              <div class="couple-avatar-wrap ${isWaiting ? 'waiting' : ''}">
                <span>${avatarEmoji}</span>
                <span class="partner-status-dot ${statusClass}" title="${statusText}"></span>
              </div>
              <div class="couple-info-text">
                <div class="couple-partner-name">${escapeHtml(pName)}</div>
                <div class="couple-code-pill">Code : <strong>${c.code}</strong></div>
              </div>
            </div>
            <div class="couple-status-badge ${statusClass}">
              ${statusText}
            </div>
          </div>

          <div class="couple-card-stats">
            <span class="stat-chip level">
              <span>🎯 Niveau :</span>
              <strong>${c.currentLevel || 1} / 20</strong>
            </span>
            <span class="stat-chip score">
              <span>❤️ Score :</span>
              <strong>${c.totalScore || 0} pts</strong>
            </span>
            ${giftCount > 0 ? `
              <span class="stat-chip gift">
                <span>🎁 Récompenses :</span>
                <strong>${giftCount}</strong>
              </span>
            ` : ''}
          </div>

          <div class="couple-card-action">
            ${isWaiting ? `
              <button class="btn-lobby-couple" onclick="selectCoupleSession('${c.code}', true)">
                <span>🔗 Accéder au salon d'invitation</span>
              </button>
            ` : `
              <button class="btn-continue-couple" onclick="selectCoupleSession('${c.code}', false)">
                <span>Continuer la partie →</span>
              </button>
            `}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  // ============================================================
  // WEBSOCKET
  // ============================================================

  const WS_URL = `ws://${location.hostname}:${location.port}`;

  function connectWS() {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('✅ WebSocket connecté');
      hide('disconnect-banner');

      // Tenter une reconnexion si on a déjà un ID et couple actif
      if (playerId && coupleCode) {
        sendWS({
          type: 'RECONNECT',
          existingPlayerId: playerId,
          coupleCode,
          userId
        });
      }

      // Synchroniser la liste des couples
      fetchUserCouples();
    };

    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      handleMessage(data);
    };

    ws.onclose = () => {
      console.log('❌ WebSocket fermé — reconnexion dans 3s');
      show('disconnect-banner');
      setTimeout(connectWS, 3000);
    };

    ws.onerror = (err) => {
      console.error('WS Error:', err);
    };
  }

  function sendWS(data) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }

  // Ping keep-alive
  setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      sendWS({ type: 'PING' });
    }
  }, 25000);

  // ============================================================
  // MESSAGE HANDLER
  // ============================================================

  function handleMessage(data) {
    console.log('📩', data.type, data);

    switch (data.type) {
      case 'COUPLE_CREATED':
        onCoupleCreated(data);
        break;
      case 'COUPLE_JOINED':
        onCoupleJoined(data);
        break;
      case 'COUPLE_SELECTED':
        onCoupleSelected(data);
        break;
      case 'USER_COUPLES_DATA':
        if (Array.isArray(data.couples)) {
          userCouplesList = data.couples;
          localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));
          renderCouplesList();
        }
        break;
      case 'SWITCHED_COUPLE':
        hideLoading();
        fetchUserCouples();
        showScreen('screen-couples-select');
        break;
      case 'PARTNER_JOINED':
        onPartnerJoined(data);
        break;
      case 'RECONNECTED':
        onReconnected(data);
        break;
      case 'READINESS_UPDATE':
        onReadinessUpdate(data);
        break;
      case 'LEVEL_START':
        onLevelStart(data);
        break;
      case 'QUESTION':
        onQuestion(data);
        break;
      case 'PARTNER_ANSWERED':
        onPartnerAnswered();
        break;
      case 'QUESTION_RESULT':
        onQuestionResult(data);
        break;
      case 'LEVEL_END':
        onLevelEnd(data);
        break;
      case 'PARTNER_DISCONNECTED':
        onPartnerDisconnected(data);
        break;
      case 'PARTNER_RECONNECTED':
        onPartnerReconnected(data);
        break;
      case 'GAME_PAUSED':
        onGamePaused(data);
        break;
      case 'GAME_RESUMED':
        onGameResumed(data);
        break;
      case 'GAME_QUIT':
        onGameQuit(data);
        break;
      case 'COUPLE_DELETED':
        onCoupleDeleted(data);
        break;
      case 'STATE_REFRESH':
        sendWS({ type: 'GET_STATE' });
        break;
      case 'STATE':
        onState(data);
        break;
      case 'PARTNER_FILLING_CLAIM':
        onPartnerFillingClaim(data);
        break;
      case 'GIFT_CLAIM_SUCCESS':
        onGiftClaimSuccess(data);
        break;
      case 'ERROR':
        hideLoading();
        showToast('❌ ' + data.message, 'error');
        break;
      case 'PONG':
        break;
    }
  }

  // ============================================================
  // EVENT HANDLERS
  // ============================================================

  function onCoupleCreated(data) {
    hideLoading();
    playerId = data.playerId;
    coupleCode = data.coupleCode;
    playerName = data.playerName;
    playerRole = data.playerRole;
    if (data.userId) userId = data.userId;
    isHost = true;
    partnerName = 'Partenaire';
    partnerConnected = false;
    currentLevel = 1;
    totalScore = 0;
    levelScores = new Array(20).fill(0);
    giftsEarned = [];

    localStorage.setItem('complicite_userId', userId);
    localStorage.setItem('complicite_playerId', playerId);
    localStorage.setItem('complicite_coupleCode', coupleCode);
    localStorage.setItem('complicite_playerName', playerName);
    localStorage.setItem('complicite_playerRole', playerRole);

    const newCouple = {
      code: coupleCode,
      isHost: true,
      partnerName: null,
      partnerRole: null,
      myName: playerName,
      myRole: playerRole,
      myPlayerId: playerId,
      currentLevel: 1,
      totalScore: 0,
      giftsEarned: [],
      partnerConnected: false,
      hasPartner: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const existingIdx = userCouplesList.findIndex(c => c.code === coupleCode);
    if (existingIdx >= 0) {
      userCouplesList[existingIdx] = newCouple;
    } else {
      userCouplesList.unshift(newCouple);
    }
    localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));

    // Générer le lien d'invitation
    inviteLink = getInviteLink(coupleCode);

    // Configurer le lobby
    el('invite-link-text').textContent = inviteLink;
    el('lobby-name-1').textContent = playerName;
    el('lobby-avatar-circle-2').textContent = '?';
    el('lobby-status-2').textContent = '⏳ En attente...';
    el('lobby-status-2').className = 'avatar-status waiting';
    show('invite-section');
    el('btn-ready').disabled = true;
    el('btn-ready').textContent = '⏳ En attente du partenaire...';

    showScreen('screen-lobby');
    showToast('✅ Espace créé ! Partagez le lien avec votre partenaire');
  }

  function onCoupleJoined(data) {
    hideLoading();
    playerId = data.playerId;
    coupleCode = data.coupleCode;
    playerName = data.playerName;
    playerRole = data.playerRole;
    partnerName = data.partnerName || 'Partenaire';
    if (data.userId) userId = data.userId;
    isHost = false;
    partnerConnected = true;

    localStorage.setItem('complicite_userId', userId);
    localStorage.setItem('complicite_playerId', playerId);
    localStorage.setItem('complicite_coupleCode', coupleCode);
    localStorage.setItem('complicite_playerName', playerName);
    localStorage.setItem('complicite_playerRole', playerRole);

    const newCouple = {
      code: coupleCode,
      isHost: false,
      partnerName: partnerName,
      partnerRole: data.partnerRole || (playerRole === 'HOMME' ? 'FEMME' : 'HOMME'),
      myName: playerName,
      myRole: playerRole,
      myPlayerId: playerId,
      currentLevel: 1,
      totalScore: 0,
      giftsEarned: [],
      partnerConnected: true,
      hasPartner: true,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const existingIdx = userCouplesList.findIndex(c => c.code === coupleCode);
    if (existingIdx >= 0) {
      userCouplesList[existingIdx] = newCouple;
    } else {
      userCouplesList.unshift(newCouple);
    }
    localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));

    // Configurer le lobby
    el('lobby-name-1').textContent = partnerName;
    el('lobby-name-2').textContent = playerName;
    el('lobby-avatar-circle-2').textContent = playerRole === 'FEMME' ? '👩' : '👨';
    el('lobby-status-2').textContent = '✓ Connecté';
    el('lobby-status-2').className = 'avatar-status ready';
    hide('invite-section');

    el('btn-ready').disabled = false;
    el('btn-ready').innerHTML = '<span>Je suis prêt(e) ! 💕</span>';

    showScreen('screen-lobby');
    showToast('✅ Rejoint ! Bienvenue ' + playerName + ' !');
  }

  function onCoupleSelected(data) {
    hideLoading();
    playerId = data.playerId;
    coupleCode = data.coupleCode;
    playerName = data.playerName;
    playerRole = data.playerRole;
    partnerName = data.partnerName || 'Partenaire';
    isHost = !!data.isHost;
    partnerConnected = !!data.partnerConnected;

    localStorage.setItem('complicite_playerId', playerId);
    localStorage.setItem('complicite_coupleCode', coupleCode);
    localStorage.setItem('complicite_playerName', playerName);
    localStorage.setItem('complicite_playerRole', playerRole);

    if (data.coupleState) {
      const state = data.coupleState;
      currentLevel = state.currentLevel || 1;
      levelScores = state.levelScores || new Array(20).fill(0);
      giftsEarned = state.giftsEarned || [];
      totalScore = state.totalScore || 0;
      activePendingClaim = state.pendingGiftClaim || null;
    }

    // Mettre à jour l'entrée correspondante dans userCouplesList
    const idx = userCouplesList.findIndex(c => c.code === coupleCode);
    if (idx >= 0) {
      userCouplesList[idx].currentLevel = currentLevel;
      userCouplesList[idx].totalScore = totalScore;
      userCouplesList[idx].partnerName = partnerName;
      userCouplesList[idx].partnerConnected = partnerConnected;
      userCouplesList[idx].hasPartner = !!data.hasPartner;
      userCouplesList[idx].giftsEarned = giftsEarned;
      localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));
    }

    if (!data.hasPartner) {
      inviteLink = getInviteLink(coupleCode);
      el('invite-link-text').textContent = inviteLink;
      el('lobby-name-1').textContent = playerName;
      el('lobby-avatar-circle-2').textContent = '?';
      el('lobby-status-2').textContent = '⏳ En attente...';
      el('lobby-status-2').className = 'avatar-status waiting';
      show('invite-section');
      el('btn-ready').disabled = true;
      el('btn-ready').textContent = '⏳ En attente du partenaire...';
      showScreen('screen-lobby');
      showToast('Salon de jeu avec ' + (partnerName || 'partenaire'));
    } else {
      updateDashboard();
      if (activePendingClaim) {
        setTimeout(() => showGiftClaimModal(activePendingClaim), 600);
      }
      showScreen('screen-dashboard');
      showToast('Partie avec ' + partnerName + ' reprise !');
    }
  }

  function onPartnerJoined(data) {
    partnerName = data.partnerName || 'Partenaire';
    partnerConnected = true;

    // Mettre à jour dans la liste des couples
    const idx = userCouplesList.findIndex(c => c.code === coupleCode);
    if (idx >= 0) {
      userCouplesList[idx].partnerName = partnerName;
      userCouplesList[idx].partnerRole = data.partnerRole || (playerRole === 'HOMME' ? 'FEMME' : 'HOMME');
      userCouplesList[idx].hasPartner = true;
      userCouplesList[idx].partnerConnected = true;
      localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));
    }

    el('lobby-avatar-circle-2').textContent = data.partnerRole === 'FEMME' ? '👩' : '👨';
    el('lobby-name-2').textContent = partnerName;
    el('lobby-status-2').textContent = '✓ Connecté';
    el('lobby-status-2').className = 'avatar-status ready';
    hide('invite-section');

    el('btn-ready').disabled = false;
    el('btn-ready').innerHTML = '<span>Je suis prêt(e) ! 💕</span>';

    showToast('💕 ' + partnerName + ' a rejoint !');

    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  }

  function onReconnected(data) {
    hideLoading();
    playerId = data.playerId;
    playerName = data.playerName;
    playerRole = data.playerRole;
    coupleCode = data.coupleCode;
    hide('disconnect-banner');

    if (data.isHost !== undefined) isHost = data.isHost;
    if (data.partnerName) partnerName = data.partnerName;

    if (data.coupleState) {
      const state = data.coupleState;
      currentLevel = state.currentLevel || 1;
      levelScores = state.levelScores || new Array(20).fill(0);
      giftsEarned = state.giftsEarned || [];
      totalScore = state.totalScore || 0;

      if (state.pendingGiftClaim) {
        setTimeout(() => showGiftClaimModal(state.pendingGiftClaim), 600);
      }
    }

    // Mettre à jour l'entrée correspondante dans userCouplesList
    const idx = userCouplesList.findIndex(c => c.code === coupleCode);
    if (idx >= 0) {
      userCouplesList[idx].currentLevel = currentLevel;
      userCouplesList[idx].totalScore = totalScore;
      userCouplesList[idx].partnerName = partnerName;
      userCouplesList[idx].hasPartner = !!data.hasPartner;
      localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));
    }

    // Demander l'état actuel
    sendWS({ type: 'GET_STATE' });
  }

  function onState(data) {
    hideLoading();
    currentLevel = data.currentLevel || 1;
    levelScores = data.levelScores || new Array(20).fill(0);
    totalScore = data.totalScore || 0;
    giftsEarned = data.giftsEarned || [];
    partnerConnected = data.partnerConnected;
    if (data.isHost !== undefined) isHost = data.isHost;
    if (data.player2Name) partnerName = data.player2Name;

    updateDashboard();

    if (data.pendingGiftClaim) {
      setTimeout(() => showGiftClaimModal(data.pendingGiftClaim), 600);
    }

    const activeScreen = document.querySelector('.screen.active');
    // Ne basculer vers le dashboard que si l'utilisateur est déjà dans une partie active
    if (activeScreen && (activeScreen.id === 'screen-dashboard' || activeScreen.id === 'screen-level-start' || activeScreen.id === 'screen-game')) {
      updateDashboard();
    }
  }

  function onReadinessUpdate(data) {
    const isPlayer1 = playerRole === 'HOMME' || (data.player1Name === playerName);
    const myReady = isPlayer1 ? data.player1Ready : data.player2Ready;
    const partnerReady = isPlayer1 ? data.player2Ready : data.player1Ready;

    if (partnerReady) {
      el('partner-ready-info').style.display = 'block';
    }

    if (myReady && partnerReady) {
      showToast('🎮 Les deux joueurs sont prêts !');
    }
  }

  function onLevelStart(data) {
    currentLevelScore = 0;
    currentQuestionIndex = 0;
    hasAnswered = false;

    // Afficher l'écran de démarrage du niveau
    el('ls-badge').textContent = 'NIVEAU ' + data.levelId;
    el('ls-emoji').textContent = data.levelEmoji || '💫';
    el('ls-name').textContent = data.levelName;
    el('ls-theme').textContent = data.levelTheme;

    showScreen('screen-level-start');

    // Countdown animé
    let count = 3;
    el('ls-countdown-num').textContent = count;
    const cdInterval = setInterval(() => {
      count--;
      if (count > 0) {
        el('ls-countdown-num').textContent = count;
        if (navigator.vibrate) navigator.vibrate(50);
      } else {
        clearInterval(cdInterval);
        el('ls-countdown-num').textContent = '🎯';
      }
    }, 1000);
  }

  function onQuestion(data) {
    clearTimer();
    hasAnswered = false;
    currentAnswer = null;
    currentQuestionData = data.question;
    currentQuestionIndex = data.questionIndex;
    totalQuestions = data.totalQuestions;
    currentLevelScore = data.levelScore;
    totalScore = data.totalScore;

    showScreen('screen-game');
    renderQuestion(data);

    // Démarrer le timer
    startTimer(data.question.timer, data.question.type);

    // Réinitialiser l'indicateur partenaire
    el('partner-dot').className = 'partner-dot';
    el('partner-indicator-text').textContent = 'En attente de la réponse du partenaire...';

    // Flash memory: afficher le contenu flash avant la question
    if (data.question.flashContent && data.question.flashDuration) {
      renderFlashContent(data.question.flashContent, data.question.flashDuration, data.question.question);
    } else {
      hide('flash-content');
    }
  }

  function onPartnerAnswered() {
    el('partner-dot').className = 'partner-dot answered';
    el('partner-indicator-text').textContent = '✅ Partenaire a répondu !';
    if (navigator.vibrate) navigator.vibrate(50);
  }

  function onQuestionResult(data) {
    clearTimer();

    // Afficher l'écran résultat
    const isMatch = data.isMatch;
    const reason = data.reason;

    el('result-icon').textContent = isMatch ? '💕' : (reason === 'TIMEOUT' ? '⏰' : '💔');
    el('result-title').textContent = isMatch ? 'MATCH !' : (reason === 'TIMEOUT' ? 'TEMPS EXPIRÉ !' : 'PAS DE MATCH');
    el('result-subtitle').textContent = isMatch
      ? 'Vous avez la même réponse !'
      : (reason === 'TIMEOUT' ? 'Le temps est écoulé' : 'Vos réponses sont différentes');

    el('result-p1-name').textContent = playerName;
    el('result-p2-name').textContent = partnerName || 'Partenaire';

    el('result-p1-answer').textContent = formatAnswer(data.player1Answer) || '—';
    el('result-p2-answer').textContent = formatAnswer(data.player2Answer) || '—';

    el('result-points').textContent = isMatch ? '+1 ❤️' : '0 points';
    el('result-level-score').textContent = data.levelScore + '/' + data.totalQuestions;

    // Mise à jour
    currentLevelScore = data.levelScore;
    totalScore = data.totalScore;

    // Update progress in game header
    el('game-level-score').textContent = data.levelScore;

    showScreen('screen-result');

    if (navigator.vibrate) {
      navigator.vibrate(isMatch ? [100, 50, 100, 50, 200] : [300]);
    }
  }

  function onLevelEnd(data) {
    clearTimer();
    levelScores = new Array(20).fill(0);
    // Rebuild from data
    totalScore = data.totalScore;
    currentLevel = data.nextLevelId || 20;
    giftsEarned = data.giftsEarned || [];

    if (data.isSeasonEnd) {
      renderSeasonEnd(data);
      showScreen('screen-season-end');
      return;
    }

    // Configurer l'écran de fin de niveau
    el('le-badge').textContent = 'NIVEAU ' + data.levelId + ' TERMINÉ';
    el('le-emoji').textContent = getScoreEmoji(data.levelScore, data.levelMax);
    el('le-level-score').textContent = data.levelScore;
    el('le-level-max').textContent = data.levelMax;
    el('le-total-score').textContent = data.totalScore;
    el('le-total-max').textContent = data.totalMax;

    // Cadeau gagné
    if (data.giftEarned) {
      el('gift-earned-banner').style.display = 'block';
      el('gift-earned-name').textContent = data.giftEarned.name;
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);
    } else {
      el('gift-earned-banner').style.display = 'none';
    }

    // Prochaine récompense
    if (data.nextReward) {
      el('next-reward-hint').style.display = 'block';
      el('nrh-name').textContent = '🎁 Niveau ' + data.nextReward.afterLevel;
      el('nrh-progress').textContent = 'Score requis : ' + data.nextReward.threshold + '/' + data.nextReward.max;
    } else {
      el('next-reward-hint').style.display = 'none';
    }

    el('btn-next-level-text').textContent = data.nextLevelId ? 'Niveau Suivant →' : 'Voir le bilan final';

    showScreen('screen-level-end');
    updateDashboard();

    // Mettre à jour l'entrée du couple dans userCouplesList
    const cIdx = userCouplesList.findIndex(c => c.code === coupleCode);
    if (cIdx >= 0) {
      userCouplesList[cIdx].currentLevel = data.nextLevelId || currentLevel;
      userCouplesList[cIdx].totalScore = totalScore;
      userCouplesList[cIdx].giftsEarned = giftsEarned;
      userCouplesList[cIdx].updatedAt = Date.now();
      localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));
    }

    // Déclenchement automatique de la réclamation obligatoire de cadeau
    if (data.pendingGiftClaim) {
      setTimeout(() => {
        showGiftClaimModal(data.pendingGiftClaim);
      }, 1200);
    }
  }

  function onPartnerDisconnected(data) {
    partnerConnected = false;
    const name = data?.partnerName || partnerName || 'Votre partenaire';
    showToast(`⚠️ ${name} a perdu la connexion`, 'warning');
    updatePartnerStatus(false);
  }

  function onPartnerReconnected(data) {
    partnerConnected = true;
    const name = data?.partnerName || partnerName || 'Votre partenaire';
    showToast(`🎉 ${name} s'est reconnecté(e) !`, 'info');
    updatePartnerStatus(true);
    hide('pause-overlay');
  }

  function onGamePaused(data) {
    clearTimer();
    partnerConnected = false;
    updatePartnerStatus(false);
    el('pause-desc').textContent = data?.message || "Votre partenaire a perdu sa connexion Internet. Le jeu est automatiquement mis en pause sans perte de vos points.";
    el('pause-overlay').style.display = 'flex';
  }

  function onGameResumed(data) {
    partnerConnected = true;
    updatePartnerStatus(true);
    el('pause-overlay').style.display = 'none';
    showToast(data?.message || '🎉 Reprise de la partie !', 'info');
  }

  function onGameQuit(data) {
    clearTimer();
    el('pause-overlay').style.display = 'none';
    el('quit-modal-overlay').style.display = 'none';
    
    // Notification claire
    const isMe = data.quitterId === playerId;
    if (isMe) {
      showToast('🚪 Vous avez quitté la partie. Retour aux niveaux.', 'info');
    } else {
      showToast(`🚪 ${data.quitterName || 'Votre partenaire'} a quitté la partie.`, 'warning');
    }

    goToDashboard();
  }

  function onCoupleDeleted(data) {
    clearTimer();
    hideLoading();
    el('pause-overlay').style.display = 'none';
    el('quit-modal-overlay').style.display = 'none';

    // Retirer ce couple supprimé du stockage local
    const deletedCode = coupleCode;
    userCouplesList = userCouplesList.filter(c => c.code !== deletedCode);
    localStorage.setItem('complicite_my_couples', JSON.stringify(userCouplesList));

    // Réinitialiser les identifiants de session active
    localStorage.removeItem('complicite_playerId');
    localStorage.removeItem('complicite_coupleCode');
    playerId = null;
    coupleCode = null;

    showToast('⚠️ ' + (data?.message || 'Ce couple a été supprimé par l’administrateur.'), 'warning');

    // Si l'utilisateur possède d'autres couples actifs, lui proposer de choisir
    if (userCouplesList.length > 0) {
      setTimeout(() => {
        renderCouplesSelectScreen();
        showScreen('screen-couples-select');
      }, 1200);
    } else {
      setTimeout(() => {
        showScreen('screen-welcome');
      }, 1200);
    }
  }

  // ============================================================
  // RENDER QUESTION
  // ============================================================

  function renderQuestion(data) {
    const q = data.question;
    const levelId = parseInt((data.miniGameType || ''), 10) || currentLevel;

    // Header
    el('game-level-label').textContent = 'NIVEAU ' + (data.levelId || currentLevel);
    el('game-minigame-name').textContent = data.miniGameName || '';
    el('game-level-score').textContent = data.levelScore || 0;
    el('game-total-q').textContent = data.totalQuestions || 50;

    // Mini-game badge
    el('minigame-badge-text').textContent = data.miniGameName || '';

    // Question number
    el('question-number').textContent = 'Épreuve ' + (data.questionIndex + 1) + '/' + data.totalQuestions;

    // Question text
    el('question-text').textContent = q.question || q.text;

    // Progress bar
    const pct = ((data.questionIndex) / data.totalQuestions) * 100;
    el('game-progress-fill').style.width = pct + '%';

    // Render answer area
    renderAnswerArea(q);
  }

  function renderAnswerArea(q) {
    const area = el('answer-area');
    area.innerHTML = '';
    area.className = 'answer-area';

    if (q.type === 'MOI_LUI') {
      area.innerHTML = `
        <div class="moi-lui-group">
          <button class="answer-btn answer-btn-moi" onclick="selectAnswer('MOI', this)" id="ans-moi">
            <span>👤 MOI</span>
          </button>
          <button class="answer-btn answer-btn-lui" onclick="selectAnswer('LUI', this)" id="ans-lui">
            <span>👥 LUI / ELLE</span>
          </button>
          <button class="answer-btn answer-btn-nous" onclick="selectAnswer('NOUS_DEUX', this)" id="ans-nous">
            <span>💑 NOUS LES DEUX</span>
          </button>
        </div>
      `;
    } else if (q.type === 'OUI_NON') {
      area.innerHTML = `
        <div class="oui-non-group">
          <button class="answer-btn answer-btn-oui flex-1" onclick="selectAnswer('OUI', this)">✅ OUI</button>
          <button class="answer-btn answer-btn-non flex-1" onclick="selectAnswer('NON', this)">❌ NON</button>
        </div>
      `;
    } else if (q.type === 'ECRIT' || q.type === 'MEME_PENSEE') {
      area.innerHTML = `
        <div class="text-answer-wrapper">
          <textarea class="text-answer-input" id="text-answer" placeholder="Écrivez votre réponse ici..." rows="3"></textarea>
          <button class="btn-submit-text" onclick="submitTextAnswer()">✅ Valider ma réponse</button>
        </div>
      `;
      // Focus after a short delay
      setTimeout(() => {
        const ta = el('text-answer');
        if (ta) ta.focus();
      }, 300);
    } else if (q.type === 'CHOIX_MULTIPLE') {
      const opts = q.options || [];
      if (opts.length === 2) {
        // Choix impossible ou synchronisation — 2 gros boutons
        area.innerHTML = opts.map((opt, i) =>
          `<button class="answer-btn" onclick="selectAnswer(${i}, this)" style="padding: 20px;">${opt}</button>`
        ).join('');
      } else {
        // Grid 2x2
        const grid = document.createElement('div');
        grid.className = 'options-grid';
        opts.forEach((opt, i) => {
          const btn = document.createElement('button');
          btn.className = 'answer-btn';
          btn.textContent = opt;
          btn.onclick = () => selectAnswer(i, btn);
          grid.appendChild(btn);
        });
        area.appendChild(grid);
      }
    } else if (q.type === 'CLASSEMENT') {
      renderClassement(q.items || []);
    }
  }

  function renderFlashContent(items, duration, afterQuestion) {
    const flashEl = el('flash-content');
    const flashItems = el('flash-items');
    flashItems.innerHTML = '';

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'flash-item';
      div.textContent = item;
      flashItems.appendChild(div);
    });

    show('flash-content');
    el('question-text').style.opacity = '0.3';

    // Animer la barre de temps
    const fill = el('flash-timer-fill');
    fill.style.transition = 'none';
    fill.style.width = '100%';
    setTimeout(() => {
      fill.style.transition = `width ${duration}ms linear`;
      fill.style.width = '0%';
    }, 50);

    // Cacher après la durée
    setTimeout(() => {
      hide('flash-content');
      el('question-text').style.opacity = '1';
      if (afterQuestion) el('question-text').textContent = afterQuestion;
    }, duration);
  }

  function renderClassement(items) {
    const area = el('answer-area');
    const label = document.createElement('div');
    label.className = 'classement-label';
    label.textContent = '↕️ Glissez pour classer (du préféré au moins préféré)';
    area.appendChild(label);

    const container = document.createElement('div');
    container.className = 'classement-container';
    container.id = 'classement-container';

    let order = [...items];

    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'classement-item';
      div.draggable = true;
      div.dataset.index = index;
      div.dataset.text = item;
      div.innerHTML = `
        <div class="classement-rank">${index + 1}</div>
        <div class="classement-text">${item}</div>
        <div class="classement-handle">⠿</div>
      `;

      // Drag events
      div.addEventListener('dragstart', (e) => {
        dragSrcEl = div;
        e.dataTransfer.effectAllowed = 'move';
        div.classList.add('dragging');
      });

      div.addEventListener('dragend', () => {
        div.classList.remove('dragging');
        updateClassementRanks();
      });

      div.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });

      div.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dragSrcEl !== div) {
          const parent = container;
          const nodes = [...parent.querySelectorAll('.classement-item')];
          const srcIdx = nodes.indexOf(dragSrcEl);
          const dstIdx = nodes.indexOf(div);
          if (srcIdx < dstIdx) {
            parent.insertBefore(dragSrcEl, div.nextSibling);
          } else {
            parent.insertBefore(dragSrcEl, div);
          }
          updateClassementRanks();
        }
      });

      // Touch support for mobile
      setupTouchDrag(div, container);

      container.appendChild(div);
    });

    area.appendChild(container);

    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn-submit-classement';
    submitBtn.textContent = '✅ Valider mon classement';
    submitBtn.onclick = submitClassement;
    area.appendChild(submitBtn);
  }

  function updateClassementRanks() {
    const container = el('classement-container');
    if (!container) return;
    const items = container.querySelectorAll('.classement-item');
    items.forEach((item, i) => {
      item.querySelector('.classement-rank').textContent = i + 1;
    });
  }

  function setupTouchDrag(item, container) {
    let startY = 0;
    let clone = null;

    item.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      item.classList.add('dragging');
    }, { passive: true });

    item.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const items = [...container.querySelectorAll('.classement-item:not(.dragging)')];
      const after = getDragAfterElement(container, currentY);
      if (after === null) {
        container.appendChild(item);
      } else {
        container.insertBefore(item, after);
      }
      updateClassementRanks();
    }, { passive: false });

    item.addEventListener('touchend', () => {
      item.classList.remove('dragging');
      updateClassementRanks();
    });
  }

  function getDragAfterElement(container, y) {
    const items = [...container.querySelectorAll('.classement-item:not(.dragging)')];
    return items.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element || null;
  }

  // ============================================================
  // TIMER
  // ============================================================

  function startTimer(seconds, questionType) {
    timerSeconds = seconds;
    const total = seconds;
    const circumference = 2 * Math.PI * 44; // r=44

    updateTimerDisplay(seconds, total, circumference, questionType);

    timerInterval = setInterval(() => {
      timerSeconds--;

      if (timerSeconds <= 0) {
        clearTimer();
        if (!hasAnswered) {
          submitAnswerToServer(null); // Timeout
        }
        return;
      }

      updateTimerDisplay(timerSeconds, total, circumference, questionType);
    }, 1000);
  }

  function updateTimerDisplay(seconds, total, circumference, questionType) {
    el('timer-number').textContent = seconds;
    const ratio = seconds / total;
    const offset = circumference * (1 - ratio);
    el('timer-ring-fill').style.strokeDashoffset = offset;

    // Couleur selon urgence
    const fill = el('timer-ring-fill');
    if (ratio > 0.5) {
      fill.classList.remove('warning', 'danger');
    } else if (ratio > 0.25) {
      fill.classList.remove('danger');
      fill.classList.add('warning');
    } else {
      fill.classList.remove('warning');
      fill.classList.add('danger');
      // Vibration d'alerte sur les 5 dernières secondes
      if (seconds <= 5 && navigator.vibrate) {
        navigator.vibrate(30);
      }
    }
  }

  function clearTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // ============================================================
  // ANSWER SUBMISSION
  // ============================================================

  window.selectAnswer = function(value, btn) {
    if (hasAnswered) return;
    hasAnswered = true;
    currentAnswer = value;

    // Visual feedback
    const btns = btn.closest('.answer-area').querySelectorAll('.answer-btn, button');
    btns.forEach(b => b.style.opacity = '0.4');
    btn.style.opacity = '1';
    btn.classList.add('selected');

    submitAnswerToServer(value);
  };

  window.submitTextAnswer = function() {
    if (hasAnswered) return;
    const input = el('text-answer');
    if (!input) return;
    const val = input.value.trim();
    if (!val) {
      showToast('⚠️ Veuillez écrire une réponse', 'warning');
      return;
    }
    hasAnswered = true;
    input.disabled = true;
    document.querySelector('.btn-submit-text').disabled = true;
    submitAnswerToServer(val);
  };

  function submitClassement() {
    if (hasAnswered) return;
    const container = el('classement-container');
    if (!container) return;
    const items = [...container.querySelectorAll('.classement-item')];
    const order = items.map(i => i.dataset.text);
    hasAnswered = true;
    document.querySelector('.btn-submit-classement').disabled = true;
    submitAnswerToServer(order);
  }

  function submitAnswerToServer(answer) {
    clearTimer();
    sendWS({
      type: 'SUBMIT_ANSWER',
      questionIndex: currentQuestionIndex,
      answer: answer,
    });

    // Afficher "En attente du partenaire"
    el('partner-dot').className = 'partner-dot typing';
    el('partner-indicator-text').textContent = '✅ Réponse envoyée — En attente de ton partenaire...';
  }

  // ============================================================
  // DASHBOARD UPDATE
  // ============================================================

  function updateDashboard() {
    const total = totalScore;
    const max = currentLevel * 50;
    const allMax = 1000;

    el('dash-total-score').textContent = total;
    el('dash-total-max').textContent = allMax;

    const pct = (total / allMax) * 100;
    el('dash-score-bar').style.width = Math.min(pct, 100) + '%';

    // Niveau actuel
    const levelNames = [
      '', 'Première Connexion', 'On Se Découvre', 'Nos Habitudes', 'Notre Histoire',
      'Complices', 'Bonne Mémoire', 'Je Te Connais', 'Même Longueur d\'Onde',
      'Dans Ta Tête', 'Ça Devient Sérieux', 'Connexion Profonde', 'Sommes-nous Vraiment Complices ?',
      'Synchronisation', 'Grande Complicité', 'Niveau Expert', 'Presque Parfait',
      'Dernière Ligne Droite', 'Contre la Montre', 'Avant la Finale', 'L\'Épreuve Ultime'
    ];
    const levelEmojis = ['','💫','🔍','🌙','🎁','🤝','🧠','👁️','📡','🌀','⚡','💜','🎁','🎯','🏅','⭐','💫','🏃','⏱️','🔮','🏆'];
    const levelThemes = ['','Découverte','Découverte','Découverte','Découverte — Récompense','Complicité','Complicité','Complicité','Complicité','Connaissance Profonde','Connaissance Profonde','Connaissance Profonde','Connaissance Profonde','Connaissance Profonde','Expert','Expert','Expert','Expert','Phase Finale','Phase Finale','Phase Finale'];

    const lvl = currentLevel;
    el('dash-level-num').textContent = 'NIVEAU ' + lvl;
    el('dash-level-name').textContent = levelNames[lvl] || 'Niveau ' + lvl;
    el('dash-level-theme').textContent = (levelEmojis[lvl] || '') + ' ' + (levelThemes[lvl] || '');

    // Récompenses
    const rewards = [
      { afterLevel: 4, threshold: 190, max: 200, name: 'Cadeau Mystère N°1', giftId: 1 },
      { afterLevel: 12, threshold: 570, max: 600, name: 'Cadeau Mystère N°2', giftId: 2 },
      { afterLevel: 20, threshold: 950, max: 1000, name: '🏆 Grand Cadeau Final', giftId: 3 },
    ];

    // Mettre à jour les cadeaux
    rewards.forEach((r, i) => {
      const giftEl = el('gift-' + (i + 1));
      if (giftEl) {
        const icon = giftEl.querySelector('.gift-icon');
        if (giftsEarned.includes(r.giftId)) {
          giftEl.classList.add('earned');
          icon.classList.remove('locked');
          icon.textContent = '🎁';
        }
      }
    });

    // Prochaine récompense
    let nextReward = null;
    for (const r of rewards) {
      if (!giftsEarned.includes(r.giftId)) {
        nextReward = r;
        break;
      }
    }

    if (nextReward) {
      el('reward-track-name').textContent = nextReward.name;
      const scoreNeeded = nextReward.threshold;
      const remaining = Math.max(0, scoreNeeded - total);
      el('reward-track-score').textContent = total + '/' + nextReward.max;
      el('reward-track-needed').textContent = remaining > 0 ? 'Il manque ' + remaining + ' pts' : '✅ Score atteint !';
      const fillPct = Math.min((total / nextReward.max) * 100, 100);
      el('reward-track-fill').style.width = fillPct + '%';
      show('reward-track-card');
    } else {
      hide('reward-track-card');
    }

    updatePartnerStatus(partnerConnected);
  }

  function updatePartnerStatus(connected) {
    const pill = el('partner-status-pill');
    const dot = pill?.querySelector('.status-dot');
    const text = el('partner-status-text');
    if (dot) dot.className = 'status-dot ' + (connected ? 'green' : 'red');
    if (text) text.textContent = connected
      ? (partnerName ? partnerName + ' connecté(e)' : 'Partenaire connecté')
      : 'Partenaire déconnecté';
  }

  function renderSeasonEnd(data) {
    el('se-score').textContent = data.totalScore;

    const resultEl = el('season-end-result');
    if (data.seasonSuccess) {
      resultEl.innerHTML = `
        <div style="color: #F4C842; font-size: 1.2rem; font-weight: 800; margin: 8px 0;">🏆 FÉLICITATIONS !</div>
        <div style="color: rgba(255,255,255,0.7);">Vous avez réussi la Saison 1 !</div>
        <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 8px;">🎁 Grand Cadeau Final Gagné !</div>
      `;
    } else {
      resultEl.innerHTML = `
        <div style="color: rgba(255,255,255,0.7);">Belle performance !</div>
        <div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 8px;">Score requis pour le grand cadeau : 950/1000</div>
      `;
    }

    const giftsEl = el('season-end-gifts');
    giftsEl.innerHTML = '';
    if (giftsEarned.length > 0) {
      giftsEl.innerHTML = '<div style="font-size: 0.8rem; color: rgba(255,255,255,0.5); margin-bottom: 8px;">Récompenses gagnées :</div>';
      const names = ['Cadeau Mystère N°1', 'Cadeau Mystère N°2', '🏆 Grand Cadeau Final'];
      giftsEarned.forEach(id => {
        const div = document.createElement('div');
        div.style.cssText = 'color: #F4C842; font-weight: 700; margin: 4px 0;';
        div.textContent = '🎁 ' + (names[id - 1] || 'Cadeau ' + id);
        giftsEl.appendChild(div);
      });
    }
  }

  // ============================================================
  // ACTIONS UTILISATEUR (exposées globalement)
  // ============================================================

  window.showScreen = function(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });
    const screen = el(screenId);
    if (screen) {
      screen.style.display = 'flex';
      screen.classList.add('active');
    }
  };

  window.startNewCoupleFlow = function() {
    if (el('create-name')) {
      el('create-name').value = playerName || '';
    }
    if (playerRole) {
      selectRole(playerRole);
    }
    showScreen('screen-create');
  };

  window.navBackFromCreation = function() {
    if (userCouplesList && userCouplesList.length > 0) {
      showCouplesSelectScreen();
    } else {
      showScreen('screen-welcome');
    }
  };

  window.showCouplesSelectScreen = function() {
    if (coupleCode && playerId) {
      sendWS({
        type: 'SWITCH_COUPLE',
        coupleCode,
        playerId
      });
    }
    fetchUserCouples();
    showScreen('screen-couples-select');
  };

  window.selectCoupleSession = function(code, isLobby) {
    coupleCode = code;
    showLoading('Connexion à la partie...');
    sendWS({
      type: 'SELECT_COUPLE',
      coupleCode: code,
      userId,
      playerName,
      playerId
    });
  };

  window.handleSplashStart = function() {
    if (userCouplesList && userCouplesList.length > 0) {
      showCouplesSelectScreen();
    } else {
      showScreen('screen-welcome');
    }
  };

  window.createCouple = function() {
    const name = el('create-name').value.trim();
    if (!name) { showToast('⚠️ Entrez votre prénom', 'warning'); return; }

    playerName = name;
    localStorage.setItem('complicite_playerName', name);
    localStorage.setItem('complicite_playerRole', playerRole);

    showLoading('Création de votre espace...');
    sendWS({ type: 'CREATE_COUPLE', name, role: playerRole, userId });
  };

  // ============================================================
  // INVITE LINK FUNCTIONS
  // ============================================================

  function getInviteLink(code) {
    const base = window.location.origin + window.location.pathname;
    return base + '?join=' + encodeURIComponent(code);
  }

  window.copyInviteLink = function() {
    if (!inviteLink) return;
    navigator.clipboard.writeText(inviteLink).then(() => {
      const btn = document.querySelector('.btn-copy-link');
      if (btn) {
        btn.classList.add('copied');
        const spanEl = btn.querySelector('span');
        if (spanEl) spanEl.textContent = '✓ Copié !';
        setTimeout(() => {
          btn.classList.remove('copied');
          if (spanEl) spanEl.textContent = 'Copier';
        }, 2000);
      }
      showToast('✅ Lien copié !', 'info');
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = inviteLink;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('✅ Lien copié !', 'info');
    });
  };

  window.shareVia = function(platform) {
    if (!inviteLink) return;
    const shareText = '💕 Rejoins-moi sur Complicité, le jeu des couples à distance ! Clique sur ce lien pour commencer à jouer ensemble :';
    const fullMessage = shareText + '\n' + inviteLink;

    switch (platform) {
      case 'whatsapp':
        window.open('https://wa.me/?text=' + encodeURIComponent(fullMessage), '_blank');
        break;
      case 'messenger':
        window.open('https://www.facebook.com/dialog/send?link=' + encodeURIComponent(inviteLink) + '&app_id=&redirect_uri=' + encodeURIComponent(window.location.href), '_blank');
        break;
      case 'facebook':
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(inviteLink) + '&quote=' + encodeURIComponent(shareText), '_blank');
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: 'Complicité — Jeu des Couples',
            text: shareText,
            url: inviteLink
          }).catch(() => {
            // User cancelled, do nothing
          });
        } else {
          // Fallback: just copy the link
          window.copyInviteLink();
          showToast('📋 Lien copié ! Collez-le dans votre application préférée.', 'info');
        }
        break;
    }
  };

  window.lobbyGoBack = function() {
    if (userCouplesList && userCouplesList.length > 0) {
      showCouplesSelectScreen();
    } else {
      showScreen('screen-welcome');
    }
  };

  window.selectJoinLinkRole = function(role) {
    joinLinkRole = role;
    el('join-link-role-homme').classList.toggle('active', role === 'HOMME');
    el('join-link-role-femme').classList.toggle('active', role === 'FEMME');
  };

  window.joinViaLink = function() {
    if (!joinLinkCode) {
      showToast('⚠️ Lien d\'invitation invalide', 'warning');
      return;
    }

    const name = el('join-link-name').value.trim();
    if (!name) {
      showToast('⚠️ Entrez votre prénom', 'warning');
      return;
    }

    playerName = name;
    playerRole = joinLinkRole;
    localStorage.setItem('complicite_playerName', name);
    localStorage.setItem('complicite_playerRole', joinLinkRole);

    showLoading('Connexion à votre partenaire...');
    sendWS({ type: 'JOIN_COUPLE', coupleCode: joinLinkCode, name, role: joinLinkRole, userId });

    // Clean the URL to remove ?join= parameter after joining
    if (window.history.replaceState) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  };

  window.joinCouple = function() {
    const name = el('join-name').value.trim();
    const code = el('join-code').value.trim().toUpperCase();

    if (!name) { showToast('⚠️ Entrez votre prénom', 'warning'); return; }
    if (code.length < 4) { showToast('⚠️ Entrez le code (6 caractères)', 'warning'); return; }

    playerName = name;
    playerRole = joinRole;
    localStorage.setItem('complicite_playerName', name);
    localStorage.setItem('complicite_playerRole', joinRole);

    showLoading('Connexion à votre partenaire...');
    sendWS({ type: 'JOIN_COUPLE', coupleCode: code, name, role: joinRole, userId });
  };

  window.selectRole = function(role) {
    playerRole = role;
    el('role-homme').classList.toggle('active', role === 'HOMME');
    el('role-femme').classList.toggle('active', role === 'FEMME');
  };

  window.selectJoinRole = function(role) {
    joinRole = role;
    el('join-role-homme').classList.toggle('active', role === 'HOMME');
    el('join-role-femme').classList.toggle('active', role === 'FEMME');
  };

  window.playerReady = function() {
    el('btn-ready').disabled = true;
    el('btn-ready').innerHTML = '<span>✅ Prêt(e) ! En attente du partenaire...</span>';
    sendWS({ type: 'PLAYER_READY' });
  };

  window.readyToPlay = function() {
    el('btn-play-level').disabled = true;
    el('btn-play-level').innerHTML = '<span>⏳ En attente du partenaire...</span>';
    el('partner-ready-info').style.display = 'none';
    sendWS({ type: 'PLAYER_READY' });
  };

  window.goToDashboard = function() {
    sendWS({ type: 'GET_STATE' });
    updateDashboard();
    showScreen('screen-dashboard');
    el('btn-play-level').disabled = false;
    el('btn-play-level').innerHTML = '<span>🎮 Commencer le niveau</span>';
  };

  // ============================================================
  // GESTION RÉCLAMATION CADEAU (SYNCHRO PARTENAIRES)
  // ============================================================

  function showGiftClaimModal(claimInfo) {
    if (!claimInfo) return;
    activePendingClaim = claimInfo;

    // Remplir les informations textuelles
    const levelNumEl = el('claim-level-num');
    const giftNameEl = el('claim-gift-name');
    if (levelNumEl) levelNumEl.textContent = claimInfo.levelId;
    if (giftNameEl) giftNameEl.textContent = claimInfo.giftName || 'Cadeau Mystère';

    const overlay = el('gift-claim-overlay');
    const hostView = el('claim-host-view');
    const partnerView = el('claim-partner-view');
    const successView = el('claim-success-view');

    if (successView) successView.style.display = 'none';

    if (isHost) {
      if (hostView) hostView.style.display = 'block';
      if (partnerView) partnerView.style.display = 'none';
      restoreClaimDraft();
      // Notifier le serveur qu'on est en train de remplir pour informer le partenaire 2
      sendWS({
        type: 'FILLING_CLAIM',
        levelId: claimInfo.levelId,
        giftName: claimInfo.giftName
      });
    } else {
      if (hostView) hostView.style.display = 'none';
      if (partnerView) partnerView.style.display = 'block';
    }

    if (overlay) overlay.style.display = 'flex';
  }

  function saveClaimDraft() {
    const draft = {
      nom: el('claim-nom')?.value || '',
      prenom: el('claim-prenom')?.value || '',
      ville: el('claim-ville')?.value || '',
      adresse: el('claim-adresse')?.value || '',
      whatsapp: el('claim-whatsapp')?.value || ''
    };
    try {
      localStorage.setItem('complicite_claim_draft', JSON.stringify(draft));
    } catch(e) {}

    // Synchronisation en direct vers le partenaire
    if (activePendingClaim) {
      sendWS({
        type: 'FILLING_CLAIM',
        levelId: activePendingClaim.levelId,
        giftName: activePendingClaim.giftName
      });
    }
  }

  function restoreClaimDraft() {
    try {
      const raw = localStorage.getItem('complicite_claim_draft');
      if (raw) {
        const draft = JSON.parse(raw);
        if (el('claim-nom') && draft.nom) el('claim-nom').value = draft.nom;
        if (el('claim-prenom') && draft.prenom) el('claim-prenom').value = draft.prenom;
        if (el('claim-ville') && draft.ville) el('claim-ville').value = draft.ville;
        if (el('claim-adresse') && draft.adresse) el('claim-adresse').value = draft.adresse;
        if (el('claim-whatsapp') && draft.whatsapp) el('claim-whatsapp').value = draft.whatsapp;
      }
    } catch(e) {}
  }

  window.submitGiftClaim = function(e) {
    if (e) e.preventDefault();
    if (!activePendingClaim) return;

    const nom = (el('claim-nom')?.value || '').trim();
    const prenom = (el('claim-prenom')?.value || '').trim();
    const ville = (el('claim-ville')?.value || '').trim();
    const adresse = (el('claim-adresse')?.value || '').trim();
    const whatsapp = (el('claim-whatsapp')?.value || '').trim();

    const errEl = el('claim-error');
    if (!nom || !prenom || !ville || !adresse || !whatsapp) {
      if (errEl) {
        errEl.textContent = '⚠️ Tous les champs sont obligatoires. Veuillez compléter le formulaire.';
        errEl.style.display = 'block';
      }
      return;
    }

    const digits = whatsapp.replace(/[^0-9]/g, '');
    if (digits.length < 6) {
      if (errEl) {
        errEl.textContent = '⚠️ Veuillez entrer un numéro WhatsApp valide.';
        errEl.style.display = 'block';
      }
      return;
    }

    if (errEl) errEl.style.display = 'none';

    const btn = el('btn-submit-claim');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>Envoi des informations... ⏳</span>';
    }

    sendWS({
      type: 'SUBMIT_GIFT_CLAIM',
      levelId: activePendingClaim.levelId,
      giftId: activePendingClaim.giftId,
      formData: { nom, prenom, ville, adresse, whatsapp }
    });
  };

  function onPartnerFillingClaim(data) {
    // Si on est le partenaire 2 et que la modale n'est pas ouverte
    const overlay = el('gift-claim-overlay');
    if (!isHost) {
      const levelNumEl = el('claim-level-num');
      const giftNameEl = el('claim-gift-name');
      if (levelNumEl) levelNumEl.textContent = data.levelId;
      if (giftNameEl) giftNameEl.textContent = data.giftName || 'Cadeau Mystère';

      const hostView = el('claim-host-view');
      const partnerView = el('claim-partner-view');
      const successView = el('claim-success-view');

      if (hostView) hostView.style.display = 'none';
      if (successView) successView.style.display = 'none';
      if (partnerView) partnerView.style.display = 'block';
      if (overlay) overlay.style.display = 'flex';
    }
  }

  function onGiftClaimSuccess(data) {
    const hostView = el('claim-host-view');
    const partnerView = el('claim-partner-view');
    const successView = el('claim-success-view');

    if (hostView) hostView.style.display = 'none';
    if (partnerView) partnerView.style.display = 'none';
    if (successView) successView.style.display = 'block';

    const overlay = el('gift-claim-overlay');
    if (overlay) overlay.style.display = 'flex';

    // Nettoyer le brouillon
    try { localStorage.removeItem('complicite_claim_draft'); } catch(e) {}
    activePendingClaim = null;

    showToast('🎉 ' + (data.message || 'Informations enregistrées avec succès !'));
    if (navigator.vibrate) navigator.vibrate([100, 50, 200, 100, 300]);
  }

  window.continueGameAfterClaim = function() {
    const overlay = el('gift-claim-overlay');
    if (overlay) overlay.style.display = 'none';
    goToDashboard();
  };

  // ============================================================
  // ACCÈS ADMIN SECRET (DISCRET SUR LE CŒUR)
  // ============================================================

  window.openSecretAdminModal = function(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const overlay = el('secret-admin-overlay');
    const passInput = el('secret-admin-pass');
    const errEl = el('secret-admin-error');

    if (errEl) errEl.style.display = 'none';
    if (passInput) passInput.value = '';
    if (overlay) overlay.style.display = 'flex';
    if (passInput) setTimeout(() => passInput.focus(), 150);
  };

  window.closeSecretAdminModal = function() {
    const overlay = el('secret-admin-overlay');
    if (overlay) overlay.style.display = 'none';
  };

  window.handleSecretAdminLogin = async function(e) {
    if (e) e.preventDefault();
    const passInput = el('secret-admin-pass');
    const errEl = el('secret-admin-error');
    const submitBtn = el('btn-secret-admin-submit');
    const password = (passInput?.value || '').trim();

    if (!password) {
      if (errEl) {
        errEl.textContent = 'Veuillez saisir le mot de passe.';
        errEl.style.display = 'block';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Vérification...</span>';
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (data.success && data.token) {
        sessionStorage.setItem('complicite_admin_token', data.token);
        localStorage.setItem('complicite_admin_token', data.token);
        showToast('🔑 Accès autorisé ! Redirection...');
        setTimeout(() => {
          window.location.href = '/admin.html';
        }, 400);
      } else {
        if (errEl) {
          errEl.textContent = data.error || 'Mot de passe incorrect. Accès refusé.';
          errEl.style.display = 'block';
        }
      }
    } catch(err) {
      if (errEl) {
        errEl.textContent = 'Erreur lors de la vérification : ' + err.message;
        errEl.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Déverrouiller</span>';
      }
    }
  };

  window.confirmQuitGame = function() {
    el('quit-modal-overlay').style.display = 'flex';
  };

  window.closeQuitModal = function() {
    el('quit-modal-overlay').style.display = 'none';
  };

  window.sendQuitGame = function() {
    el('quit-modal-overlay').style.display = 'none';
    sendWS({ type: 'QUIT_GAME' });
  };

  // ============================================================
  // UTILS
  // ============================================================

  function el(id) { return document.getElementById(id); }
  function show(id) { const e = el(id); if (e) e.style.display = 'block'; }
  function hide(id) { const e = el(id); if (e) e.style.display = 'none'; }

  function showToast(msg, type = 'info') {
    const toast = el('toast');
    toast.textContent = msg;
    toast.className = 'toast show';
    if (type === 'error') toast.style.borderColor = 'rgba(248,113,113,0.5)';
    else if (type === 'warning') toast.style.borderColor = 'rgba(244,200,66,0.5)';
    else toast.style.borderColor = '';

    setTimeout(() => { toast.classList.remove('show'); }, 3000);
  }

  function showLoading(text = 'Chargement...') {
    el('loading-text').textContent = text;
    el('loading-overlay').style.display = 'flex';
  }

  function hideLoading() {
    el('loading-overlay').style.display = 'none';
  }

  function getScoreEmoji(score, max) {
    const pct = score / max;
    if (pct >= 0.95) return '🏆';
    if (pct >= 0.85) return '🌟';
    if (pct >= 0.70) return '😊';
    if (pct >= 0.50) return '🙂';
    return '💪';
  }

  function formatAnswer(answer) {
    if (answer === null || answer === undefined) return 'Pas de réponse';
    if (answer === 'MOI') return 'MOI';
    if (answer === 'LUI') return 'LUI / ELLE';
    if (answer === 'NOUS_DEUX') return 'NOUS LES DEUX';
    if (answer === 'OUI') return '✅ OUI';
    if (answer === 'NON') return '❌ NON';
    if (Array.isArray(answer)) return answer.join(' › ');
    return String(answer);
  }

  // ============================================================
  // PARTICLES
  // ============================================================

  function initParticles() {
    const container = el('particles');
    const colors = ['#FF6B9D', '#8B5CF6', '#C9956C', '#F4C842', '#FFB3CC'];
    const symbols = ['✦', '·', '♥', '·', '✦', '·'];

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const isHeart = Math.random() > 0.8;
      if (isHeart) {
        particle.textContent = '♥';
        particle.style.fontSize = (Math.random() * 10 + 6) + 'px';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = 'auto';
        particle.style.height = 'auto';
        particle.style.background = 'none';
      } else {
        particle.style.width = (Math.random() * 3 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.filter = 'blur(1px)';
      }

      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = Math.random() * 0.4 + 0.1;

      container.appendChild(particle);
    }
  }

  // ============================================================
  // ÉPREUVE SURPRISE ANIMATION
  // ============================================================

  function showSurpriseAnimation(callback) {
    const overlay = document.createElement('div');
    overlay.className = 'surprise-overlay';
    overlay.innerHTML = `
      <div class="surprise-emoji">🚨</div>
      <div class="surprise-title">ÉPREUVE SURPRISE !</div>
      <div class="surprise-subtitle">Préparez-vous...</div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 2000);
  }

  // ============================================================
  // INIT
  // ============================================================

  function init() {
    initParticles();
    connectWS();

    // Détecter le paramètre ?join=CODE dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');

    if (joinCode) {
      joinLinkCode = joinCode.toUpperCase();

      // Récupérer les infos du couple via l'API REST
      fetch('/api/couple/' + encodeURIComponent(joinLinkCode))
        .then(res => {
          if (!res.ok) throw new Error('Couple non trouvé');
          return res.json();
        })
        .then(data => {
          // Vérifier si le couple a déjà 2 joueurs connectés
          if (data.hasPartner) {
            // Si le joueur a déjà une session active pour ce couple, le reconnecter
            if (playerId && coupleCode === joinLinkCode) {
              showLoading('Reconnexion...');
              showScreen('screen-splash');
              return;
            }
            showToast('⚠️ Ce couple a déjà ses deux partenaires.', 'warning');
            showScreen('screen-welcome');
            return;
          }

          // Afficher le nom du créateur sur l'écran de jonction
          if (data.player1Name) {
            el('join-link-partner-info').style.display = 'flex';
            el('join-link-partner-name').textContent = data.player1Name;
          }

          showScreen('screen-join-link');
        })
        .catch(() => {
          showToast('❌ Lien d\'invitation invalide ou expiré.', 'error');
          showScreen('screen-welcome');
        });

      return;
    }

    // Précharger les couples de l'utilisateur
    fetchUserCouples();

    // Afficher l'écran splash par défaut
    showScreen('screen-splash');

    // Attacher la sauvegarde automatique des champs du formulaire de cadeau
    ['claim-nom', 'claim-prenom', 'claim-ville', 'claim-adresse', 'claim-whatsapp'].forEach(id => {
      const field = el(id);
      if (field) {
        field.addEventListener('input', saveClaimDraft);
      }
    });

    // Service Worker & PWA Installation Logic
    initPwaInstallation();

    console.log('🎮 Complicité — Application initialisée');
  }

  // ============================================================
  // GESTION DU PWA & PROPOSITION DE LA DEUXIÈME VISITE
  // ============================================================
  let deferredInstallPrompt = null;
  const VISITS_KEY = 'complicite_visit_count';
  const LAST_VISIT_TIME_KEY = 'complicite_last_visit_time';
  const DISMISSED_INSTALL_KEY = 'complicite_install_dismissed';

  function isRunningStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true ||
           document.referrer.includes('android-app://');
  }

  function isIosOrSafari() {
    const ua = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isSafari = ua.includes('safari') && !ua.includes('chrome') && !ua.includes('crios') && !ua.includes('fxios');
    return isIos || isSafari;
  }

  function initPwaInstallation() {
    // 1. Enregistrement du Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => {
            console.log('✅ Service Worker Complicité enregistré avec succès :', reg.scope);
          })
          .catch((err) => {
            console.warn('ℹ️ Service Worker non enregistré (mode local ou hors HTTPS) :', err.message);
          });
      });
    }

    // 2. Écoute de l'événement natif d'installation Chrome / Android / Edge
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      console.log('📲 Événement beforeinstallprompt capturé');
    });

    // Écouter si l'utilisateur installe l'application avec succès
    window.addEventListener('appinstalled', () => {
      console.log('🎉 Application Complicité installée !');
      localStorage.setItem(DISMISSED_INSTALL_KEY, 'true');
      const overlay = el('pwa-install-overlay');
      if (overlay) overlay.style.display = 'none';
      showToast('🎉 Complicité a été ajoutée à votre écran d’accueil !', 'success');
      deferredInstallPrompt = null;
    });

    // 3. Détection de la deuxième visite
    trackVisitAndCheckInstallPrompt();
  }

  function trackVisitAndCheckInstallPrompt() {
    // Si déjà installée en mode standalone, ne jamais afficher l'invitation
    if (isRunningStandalone()) {
      return;
    }

    // Si déjà refusée ou fermée définitivement récemment
    const dismissed = localStorage.getItem(DISMISSED_INSTALL_KEY);
    if (dismissed === 'true') {
      return;
    }

    // Calcul du nombre de visites avec debounce pour ne pas compter un simple F5
    const now = Date.now();
    const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_TIME_KEY) || '0', 10);
    let visitCount = parseInt(localStorage.getItem(VISITS_KEY) || '0', 10);

    // Nouvelle visite si plus de 2 minutes se sont écoulées ou première visite
    if (!lastVisit || (now - lastVisit) > 2 * 60 * 1000) {
      visitCount += 1;
      localStorage.setItem(VISITS_KEY, visitCount.toString());
      localStorage.setItem(LAST_VISIT_TIME_KEY, now.toString());
    }

    console.log(`📊 Visite Complicité n° ${visitCount}`);

    // EXIGENCE 2 : « Proposer l'installation lors de la deuxième visite »
    // Première visite : on n'impose rien, parcours totalement direct
    // Deuxième visite (ou ultérieure si pas encore installée/dismissée) : afficher modal élégante
    if (visitCount >= 2) {
      // Laisser le temps à l'interface splash/welcome de s'afficher d'abord (délai doux de 1.8s)
      setTimeout(() => {
        showPwaInstallModal();
      }, 1800);
    }
  }

  function showPwaInstallModal() {
    const overlay = el('pwa-install-overlay');
    if (!overlay) return;

    // Si l'application tourne déjà en standalone, ignorer
    if (isRunningStandalone()) return;

    // Adapter l'affichage selon la plateforme (iOS vs Navigateurs natifs)
    const btnInstall = el('btn-pwa-install');
    const iosBox = el('pwa-ios-instructions');

    if (isIosOrSafari() && !deferredInstallPrompt) {
      // Sur iPhone/Safari, la fenêtre native n'existe pas, on guide l'utilisateur
      if (btnInstall) {
        btnInstall.innerHTML = '<span class="btn-install-icon">📲</span><span>Voir comment installer</span>';
      }
    } else {
      if (btnInstall) {
        btnInstall.innerHTML = '<span class="btn-install-icon">📲</span><span>Installer le jeu</span>';
      }
      if (iosBox) iosBox.style.display = 'none';
    }

    overlay.style.display = 'flex';
  }

  function triggerPwaInstall() {
    if (deferredInstallPrompt) {
      // Déclencheur natif
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted install prompt');
          localStorage.setItem(DISMISSED_INSTALL_KEY, 'true');
          dismissInstallPrompt();
        } else {
          console.log('User dismissed install prompt');
          dismissInstallPrompt();
        }
        deferredInstallPrompt = null;
      });
    } else if (isIosOrSafari()) {
      // Afficher les instructions Safari
      const iosBox = el('pwa-ios-instructions');
      const actions = el('pwa-install-actions');
      if (iosBox) iosBox.style.display = 'block';
      if (actions) actions.style.display = 'none';
    } else {
      // Navigateur desktop sans prompt natif ou déjà installé
      showToast('💡 Pour installer : Cliquez sur le menu de votre navigateur puis « Installer Complicité » ou « Ajouter à l’écran d’accueil »');
      dismissInstallPrompt();
    }
  }

  function dismissInstallPrompt() {
    const overlay = el('pwa-install-overlay');
    if (overlay) overlay.style.display = 'none';
    // Mémoriser le refus pour ne pas importuner à nouveau pendant cette session
    sessionStorage.setItem('complicite_install_dismissed_session', 'true');
    // Marquer pour ne pas spammer à chaque ouverture de page
    localStorage.setItem(DISMISSED_INSTALL_KEY, 'true');
  }

  function handleInstallOverlayClick(e) {
    if (e.target && e.target.id === 'pwa-install-overlay') {
      dismissInstallPrompt();
    }
  }

  // Exposer les méthodes nécessaires globalement pour les onclick HTML
  window.triggerPwaInstall = triggerPwaInstall;
  window.dismissInstallPrompt = dismissInstallPrompt;
  window.handleInstallOverlayClick = handleInstallOverlayClick;

  // Démarrer
  init();

})();

