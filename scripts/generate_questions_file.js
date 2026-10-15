// ============================================================
// SCRIPT QUI GENERE SRC/DATA/QUESTIONS.JS
// ============================================================
const fs = require('fs');
const path = require('path');
const { questionBank, QUESTION_TYPES, MINI_GAMES } = require('./build_expanded_bank');

// Récupérer la définition des LEVELS originaux
const originalQuestionsModule = require('../src/data/questions');
const LEVELS = originalQuestionsModule.LEVELS;

const fileHeader = `// ============================================================
// BANQUE DE QUESTIONS ÉTENDUE & MOTEUR DU JEU — COMPLICITÉ
// Plus de 1000 questions uniques avec système d'équivalences sémantiques
// ============================================================

const { areAnswersEquivalent, cleanText, normalizeCanonicalDate } = require('../semantic');

const QUESTION_TYPES = ${JSON.stringify(QUESTION_TYPES, null, 2)};

const MINI_GAMES = ${JSON.stringify(MINI_GAMES, null, 2)};

const questionBank = ${JSON.stringify(questionBank, null, 2)};

const LEVELS = ${JSON.stringify(LEVELS, null, 2)};

// Normalisation textuelle simple pour compatibilité
function normalizeText(text) {
  return cleanText(text);
}

function normalizeDate(text) {
  return normalizeCanonicalDate(text);
}

// Comparaison d'égalité de rôle
function normalizeRole(answer, playerRole) {
  if (answer === 'NOUS_DEUX') return 'NOUS_DEUX';
  if (playerRole === 'HOMME') {
    if (answer === 'MOI') return 'HOMME';
    if (answer === 'LUI') return 'FEMME';
  } else if (playerRole === 'FEMME') {
    if (answer === 'MOI') return 'FEMME';
    if (answer === 'LUI') return 'HOMME';
  }
  return answer;
}

/**
 * Comparaison centrale des réponses pour tous types de questions
 */
function compareAnswers(type, answer1, answer2, questionData) {
  if (answer1 === null || answer1 === undefined || answer2 === null || answer2 === undefined) {
    return false;
  }

  // 1. Choix Moi / Lui / Nous Deux
  if (type === QUESTION_TYPES.MOI_LUI) {
    return answer1 === answer2;
  }

  // 2. Oui / Non
  if (type === QUESTION_TYPES.OUI_NON) {
    const a1 = String(answer1).trim().toUpperCase();
    const a2 = String(answer2).trim().toUpperCase();
    return a1 === a2;
  }

  // 3. Choix multiple & Synchronisation d'options
  if (type === QUESTION_TYPES.CHOIX_MULTIPLE) {
    return answer1 === answer2 || String(answer1) === String(answer2);
  }

  // 4. Questions Textuelles et Même Pensée (Moteur sémantique + Équivalences personnalisées)
  if (type === QUESTION_TYPES.ECRIT || type === QUESTION_TYPES.MEME_PENSEE) {
    return areAnswersEquivalent(questionData, answer1, answer2);
  }

  // 5. Classement
  if (type === QUESTION_TYPES.CLASSEMENT) {
    if (!Array.isArray(answer1) || !Array.isArray(answer2)) return false;
    return JSON.stringify(answer1) === JSON.stringify(answer2);
  }

  return false;
}

// Familles de catégories compatibles pour secours automatique si une catégorie s'épuise
const SISTER_CATEGORIES = {
  habitudes_moi_lui: ['qui_fait_ca', 'habitudes_oui_non'],
  qui_fait_ca: ['habitudes_moi_lui', 'habitudes_oui_non'],
  habitudes_oui_non: ['habitudes_moi_lui', 'qui_fait_ca'],
  connaissance_ecrit: ['memoire_couple', 'meme_pensee'],
  memoire_couple: ['connaissance_ecrit', 'meme_pensee'],
  meme_pensee: ['connaissance_ecrit', 'memoire_couple'],
  gouts_choix_multiple: ['choix_impossible', 'scenarios', 'synchronisation'],
  choix_impossible: ['gouts_choix_multiple', 'scenarios'],
  scenarios: ['gouts_choix_multiple', 'choix_impossible', 'synchronisation'],
  synchronisation: ['scenarios', 'gouts_choix_multiple', 'choix_impossible'],
  memoire_flash: ['gouts_choix_multiple', 'synchronisation'],
  classement: ['gouts_choix_multiple', 'scenarios']
};

/**
 * Sélection de questions sans répétition garantissant le compte exact
 */
function selectQuestions(categories, count, usedIds = []) {
  const chosen = [];
  const usedSet = new Set(usedIds);

  // 1. Piocher en priorité dans les catégories demandées
  const primaryPool = [];
  for (const cat of categories) {
    if (questionBank[cat]) {
      for (const q of questionBank[cat]) {
        if (!usedSet.has(q.id)) primaryPool.push(q);
      }
    }
  }

  // Mélanger
  primaryPool.sort(() => Math.random() - 0.5);
  for (const q of primaryPool) {
    if (chosen.length >= count) break;
    chosen.push(q);
    usedSet.add(q.id);
  }

  // 2. Si pas assez (ex: fin de saison), piocher dans les catégories sœurs non utilisées
  if (chosen.length < count) {
    const sisterPool = [];
    for (const cat of categories) {
      const sisters = SISTER_CATEGORIES[cat] || [];
      for (const sCat of sisters) {
        if (questionBank[sCat]) {
          for (const q of questionBank[sCat]) {
            if (!usedSet.has(q.id)) sisterPool.push(q);
          }
        }
      }
    }
    sisterPool.sort(() => Math.random() - 0.5);
    for (const q of sisterPool) {
      if (chosen.length >= count) break;
      chosen.push(q);
      usedSet.add(q.id);
    }
  }

  // 3. Si encore insuffisant, piocher dans TOUTES les questions non encore utilisées
  if (chosen.length < count) {
    const globalRemaining = [];
    for (const [catName, qList] of Object.entries(questionBank)) {
      for (const q of qList) {
        if (!usedSet.has(q.id)) globalRemaining.push(q);
      }
    }
    globalRemaining.sort(() => Math.random() - 0.5);
    for (const q of globalRemaining) {
      if (chosen.length >= count) break;
      chosen.push(q);
      usedSet.add(q.id);
    }
  }

  return chosen;
}

module.exports = {
  QUESTION_TYPES,
  MINI_GAMES,
  questionBank,
  LEVELS,
  normalizeText,
  normalizeDate,
  compareAnswers,
  normalizeRole,
  selectQuestions
};
`;

const targetPath = path.join(__dirname, '..', 'src', 'data', 'questions.js');
fs.writeFileSync(targetPath, fileHeader, 'utf8');
console.log('✅ src/data/questions.js généré avec succès ! Taille:', (fs.statSync(targetPath).size / 1024).toFixed(2), 'KB');
