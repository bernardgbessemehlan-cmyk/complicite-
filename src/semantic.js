// ============================================================
// MOTEUR SÉMANTIQUE & SYSTÈME D'ÉQUIVALENCES — COMPLICITÉ
// Compare intelligemment les réponses textuelles des partenaires
// ============================================================

// Mots vides français à ignorer lors de l'analyse sémantique
const STOP_WORDS = new Set([
  'le', 'la', 'les', 'l', 'un', 'une', 'des', 'du', 'de', 'd', 'au', 'aux',
  'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'notre', 'nos', 'votre', 'vos', 'leur', 'leurs',
  'ce', 'cet', 'cette', 'ces', 'a', 'en', 'dans', 'sur', 'pour', 'avec', 'sans', 'par',
  'et', 'ou', 'mais', 'donc', 'or', 'ni', 'car', 'que', 'qui', 'quoi', 'dont', 'ou',
  'est', 'c', 'c\'est', 'etre', 'avoir', 'tres', 'plus', 'moins', 'trop', 'bien', 'tellement',
  'faire', 'aller', 'tout', 'toute', 'tous', 'toutes'
]);

// Mois en français et leurs représentations canoniques
const MONTHS_MAP = {
  'janvier': '01', 'janv': '01', 'jan': '01', '01': '01', '1': '01',
  'fevrier': '02', 'fev': '02', 'fevr': '02', '02': '02', '2': '02',
  'mars': '03', 'mar': '03', '03': '03', '3': '03',
  'avril': '04', 'avr': '04', '04': '04', '4': '04',
  'mai': '05', '05': '05', '5': '05',
  'juin': '06', '06': '06', '6': '06',
  'juillet': '07', 'juil': '07', '07': '07', '7': '07',
  'aout': '08', 'aou': '08', '08': '08', '8': '08',
  'septembre': '09', 'sept': '09', 'sep': '09', '09': '09', '9': '09',
  'octobre': '10', 'oct': '10', '10': '10',
  'novembre': '11', 'nov': '11', '11': '11',
  'decembre': '12', 'dec': '12', '12': '12'
};

// Dictionnaire universel de synonymes et concepts pour les couples
// Chaque groupe regroupe des termes sémantiquement équivalents
const GLOBAL_SYNONYM_GROUPS = [
  // Couleurs et nuances
  ['rouge', 'bordeaux', 'vermeil', 'pourpre', 'rubis'],
  ['bleu', 'bleu ciel', 'bleu marine', 'azur', 'cyan', 'turquoise', 'indigo'],
  ['vert', 'vert pomme', 'kaki', 'vert kaki', 'emeraude', 'olive'],
  ['jaune', 'moutarde', 'ocre', 'dore', 'or'],
  ['rose', 'fuschia', 'fuchsia', 'rose pale', 'magenta'],
  ['violet', 'mauve', 'lilas', 'lavande', 'prune'],
  ['noir', 'sombre', 'ebene'],
  ['blanc', 'ivoire', 'creme', 'neige'],
  ['orange', 'abricot', 'carotte', 'ambre'],
  ['marron', 'brun', 'chocolat', 'noisette'],
  ['gris', 'argent', 'argente', 'anthracite'],

  // Loisirs, activités et sorties
  ['cinema', 'cine', 'aller au cinema', 'regarder un film', 'film', 'salle de cinema'],
  ['restaurant', 'resto', 'diner dehors', 'manger dehors', 'aller au restaurant', 'brasserie'],
  ['dormir', 'dodo', 'faire la sieste', 'sommeil', 'se coucher', 'repos', 'se reposer', 'grasse matinee', 'dormir tard'],
  ['sport', 'muscu', 'musculation', 'fitness', 'gym', 'courir', 'course a pied', 'jogging', 'entrainement'],
  ['voyage', 'voyager', 'partir en voyage', 'tourisme', 'visiter', 'decouvrir d autres pays', 'vacances'],
  ['musique', 'ecouter musique', 'sons', 'ecouter des sons', 'morceaux'],
  ['lecture', 'lire', 'bouquin', 'livre', 'romans'],
  ['jeux video', 'jeux', 'gaming', 'jouer a la console', 'playstation', 'ps5', 'xbox', 'switch'],
  ['series', 'serie', 'netflix', 'tele', 'television', 'mater des series'],
  ['plage', 'mer', 'ocean', 'bord de mer', 'plage de sable'],
  ['fete', 'soiree', 'sortir', 'boite', 'boite de nuit', 'clubbing', 'faire la fete'],
  ['cuisiner', 'cuisine', 'faire a manger', 'preparer de bons plats', 'preparer a manger'],
  ['balade', 'promenade', 'marcher', 'se promener', 'randonnee', 'rando'],
  ['shopping', 'achats', 'magasins', 'faire les boutiques'],

  // Nourriture & Plats
  ['riz', 'tiep', 'thieb', 'tiebou dien', 'riz gras', 'riz au poulet', 'riz au poisson', 'riz blanc'],
  ['alloco', 'aloko', 'banane plantain', 'plantain', 'frites de plantain'],
  ['attieke', 'garba', 'attieke poisson'],
  ['poulet', 'poulet braise', 'poulet roti', 'poulet friture'],
  ['poisson', 'poisson braise', 'carpe braisee', 'poisson grille'],
  ['pates', 'spaghetti', 'spaghetti bolognaise', 'pasta', 'nouilles'],
  ['pizza', 'pizzas'],
  ['burger', 'hamburger', 'hambourger', 'cheeseburger'],
  ['foutou', 'foufou', 'igname', 'foutou banane'],
  ['salade', 'crudites'],
  ['glace', 'creme glacee', 'sorbet'],
  ['chocolat', 'chocolats'],
  ['cafe', 'espresso', 'cappuccino'],
  ['the', 'infusion', 'tisane'],

  // Animaux
  ['chien', 'chiot', 'toutou', 'canin'],
  ['chat', 'chaton', 'minou', 'felin'],
  ['oiseau', 'perroquet'],
  ['lapin', 'lapineau'],
  ['poisson', 'poisson rouge'],
  ['cheval', 'poney'],
  ['lion', 'lionne'],

  // Sentiments, traits & qualités
  ['gentil', 'gentillesse', 'attentionne', 'attention', 'doux', 'douceur', 'bienveillant', 'bienveillance', 'bon coeur'],
  ['drole', 'humour', 'marrant', 'rigolo', 'fait rire', 'amusant', 'sens de l humour'],
  ['intelligent', 'intelligence', 'cultive', 'sage', 'brillant', 'tete'],
  ['fidele', 'fidelite', 'loyal', 'loyaute', 'fiable', 'confiance'],
  ['beau', 'beaute', 'mignon', 'joli', 'charme', 'craquant', 'magnifique', 'charmeur', 'sexy', 'belle'],
  ['amour', 'amoureux', 'je t aime', 'aimer', 'passion', 'romance', 'romantique', 'complicite', 'affection'],
  ['courageux', 'courage', 'brave', 'intrepide'],
  ['calme', 'serain', 'serenite', 'paix', 'tranquille', 'pose', 'zen'],
  ['ambitieux', 'ambition', 'determinate', 'travailleur', 'bosseur'],
  ['tetu', 'obstine', 'tete de mule', 'tete dure'],
  ['genereux', 'generosite', 'donne facilement', 'partageur', 'la main sur le coeur'],
  ['jaloux', 'jalousie', 'possessif'],
  ['sensible', 'sensibilite', 'emotif', 'coeur tendre'],
  ['patient', 'patience'],

  // Villes et Destinations
  ['paris', 'paname', 'la capitale'],
  ['abidjan', 'babi', 'cote d ivoire'],
  ['cotonou', 'benin'],
  ['dakar', 'senegal'],
  ['lome', 'togo'],
  ['douala', 'yaounde', 'cameroun'],
  ['dubai', 'emirats'],
  ['new york', 'nyc', 'la grosse pomme'],
  ['londres', 'london'],

  // Métiers
  ['medecin', 'docteur', 'doctoresse', 'praticien'],
  ['avocat', 'juriste', 'droit'],
  ['enseignant', 'professeur', 'prof', 'instituteur', 'maitre'],
  ['ingenieur', 'ingénieur'],
  ['architecte', 'architecture'],
  ['entrepreneur', 'chef d entreprise', 'patron', 'business', 'homme d affaires', 'femme d affaires'],
  ['artiste', 'peintre', 'chanteur', 'musicien'],
  ['informaticien', 'developpeur', 'programmeur', 'dev', 'codeur', 'ingenieur logiciel']
];

// Nettoyer et normaliser le texte brut
function cleanText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Enlève accents
    .replace(/['’]/g, ' ')                           // Remplace apostrophes par espace
    .replace(/[^\w\s]/g, ' ')                        // Supprime ponctuation
    .replace(/\s+/g, ' ')                            // Espaces multiples
    .trim();
}

// Enlever les petits mots vides du français (articles, prépositions)
function removeStopWords(cleaned) {
  if (!cleaned) return '';
  return cleaned
    .split(' ')
    .filter(w => w.length > 0 && !STOP_WORDS.has(w))
    .join(' ');
}

// Extraire les mots-clés significatifs
function getMeaningfulTokens(cleaned) {
  if (!cleaned) return [];
  return cleaned
    .split(' ')
    .filter(w => w.length >= 2 && !STOP_WORDS.has(w));
}

// Normaliser une date sous un format canonique
function normalizeCanonicalDate(text) {
  if (!text) return '';
  const cleaned = cleanText(text);

  // Format jour/mois/année ou jour-mois-année (ex: 15/10/2026, 15-10, 15/10)
  const pNumeric = cleaned.match(/(\d{1,2})[\s\/\-\.](\d{1,2})(?:[\s\/\-\.](\d{2,4}))?/);
  if (pNumeric) {
    const day = pNumeric[1].padStart(2, '0');
    const month = pNumeric[2].padStart(2, '0');
    const year = pNumeric[3] ? (pNumeric[3].length === 2 ? `20${pNumeric[3]}` : pNumeric[3]) : '';
    return year ? `${day}/${month}/${year}` : `${day}/${month}`;
  }

  // Format jour + mois en lettres (ex: 15 octobre, 15 oct, 15 octobre 2026)
  const pWord = cleaned.match(/(\d{1,2})\s+([a-z]+)(?:\s+(\d{2,4}))?/);
  if (pWord && MONTHS_MAP[pWord[2]]) {
    const day = pWord[1].padStart(2, '0');
    const month = MONTHS_MAP[pWord[2]];
    const year = pWord[3] ? (pWord[3].length === 2 ? `20${pWord[3]}` : pWord[3]) : '';
    return year ? `${day}/${month}/${year}` : `${day}/${month}`;
  }

  // Si c'est juste le mois en lettres ou numéro (ex: "octobre", "oct")
  if (MONTHS_MAP[cleaned]) {
    return MONTHS_MAP[cleaned];
  }

  // Si c'est juste une année (ex: "2023", "2024")
  const pYear = cleaned.match(/\b(19\d{2}|20\d{2})\b/);
  if (pYear) return pYear[1];

  return cleaned;
}

// Distance de Levenshtein (calcul de similarité orthographique)
function levenshtein(a, b) {
  if (!a || !b) return (a || b || '').length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Ratio de similarité basé sur Levenshtein [0 à 1]
function stringSimilarity(s1, s2) {
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshtein(s1, s2);
  return 1 - (dist / maxLen);
}

// Vérifie si deux termes simples appartiennent à un même groupe d'équivalences
function matchesSynonymGroups(t1, t2, customGroups = []) {
  if (!t1 || !t2) return false;
  if (t1 === t2) return true;

  // 1. Groupes personnalisés de la question
  for (const group of customGroups) {
    if (!Array.isArray(group)) continue;
    const cleanedGroup = group.map(cleanText);
    const inG1 = cleanedGroup.some(item => item === t1 || t1.includes(item) || item.includes(t1));
    const inG2 = cleanedGroup.some(item => item === t2 || t2.includes(item) || item.includes(t2));
    if (inG1 && inG2) return true;
  }

  // 2. Groupes universels globaux
  for (const group of GLOBAL_SYNONYM_GROUPS) {
    const cleanedGroup = group.map(cleanText);
    const inG1 = cleanedGroup.some(item => item === t1 || t1.includes(item) || item.includes(t1));
    const inG2 = cleanedGroup.some(item => item === t2 || t2.includes(item) || item.includes(t2));
    if (inG1 && inG2) return true;
  }

  return false;
}

// Mots qui s'opposent catégoriquement (pour éviter les faux positifs)
const CONFLICTING_PAIRS = [
  ['noir', 'blanc'], ['oui', 'non'], ['homme', 'femme'], ['haut', 'bas'],
  ['chaud', 'froid'], ['jour', 'nuit'], ['matin', 'soir'], ['bleu', 'rouge'],
  ['bleu', 'jaune'], ['rouge', 'vert'], ['vert', 'jaune'], ['chat', 'chien'],
  ['mer', 'montagne'], ['ville', 'campagne'], ['pizza', 'sushi'], ['burger', 'pizza']
];

function hasDirectConflict(tokens1, tokens2) {
  for (const [w1, w2] of CONFLICTING_PAIRS) {
    const has1_1 = tokens1.includes(w1);
    const has1_2 = tokens1.includes(w2);
    const has2_1 = tokens2.includes(w1);
    const has2_2 = tokens2.includes(w2);

    if ((has1_1 && has2_2 && !has1_2 && !has2_1) || (has1_2 && has2_1 && !has1_1 && !has2_2)) {
      return true;
    }
  }
  return false;
}

/**
 * Fonction centrale de comparaison sémantique pour Complicité
 * @param {Object} question - La question complète contenant text, type, equivalences, etc.
 * @param {string} raw1 - La réponse du Joueur 1
 * @param {string} raw2 - La réponse du Joueur 2
 * @returns {boolean} - true si les réponses expriment le même sens, false sinon
 */
function areAnswersEquivalent(question, raw1, raw2) {
  if (raw1 === null || raw1 === undefined || raw2 === null || raw2 === undefined) {
    return false;
  }

  const str1 = String(raw1).trim();
  const str2 = String(raw2).trim();
  if (!str1 || !str2) return false;

  // 1. Égalité stricte directe
  if (str1.toLowerCase() === str2.toLowerCase()) return true;

  // 2. Normalisation textuelle de base
  const clean1 = cleanText(str1);
  const clean2 = cleanText(str2);
  if (clean1 === clean2) return true;

  // 3. Détection et validation des dates / mois / années
  const qTextClean = cleanText(question?.text || question?.question || '');
  const dateKeywords = ['date', 'anniversaire', 'mois', 'annee', 'rencontre', 'jour', 'quel mois', 'quelle annee'];
  const isDateQuestion = dateKeywords.some(kw => qTextClean.includes(kw));

  if (isDateQuestion) {
    const date1 = normalizeCanonicalDate(str1);
    const date2 = normalizeCanonicalDate(str2);
    if (date1 && date2 && date1 === date2) return true;
    // Si c'est une question de date et que la canonisation donne des résultats différents, ne pas autoriser le flou sémantique
    if (date1 && date2 && date1 !== date2 && /\d/.test(date1) && /\d/.test(date2)) {
      return false;
    }
  }

  // 4. Nettoyage des mots vides français
  const noStop1 = removeStopWords(clean1);
  const noStop2 = removeStopWords(clean2);
  if (noStop1 && noStop2 && noStop1 === noStop2) return true;

  // 5. Système d'Équivalences personnalisées de la question
  const customEquivalences = Array.isArray(question?.equivalences) ? question.equivalences : [];

  // Cas A: equivalences est un tableau de listes de synonymes [['terme1', 'terme2'], ['autre1', 'autre2']]
  for (const group of customEquivalences) {
    if (Array.isArray(group)) {
      const match1 = group.some(item => {
        const ci = cleanText(item);
        return ci === clean1 || ci === noStop1 || clean1.includes(ci) || ci.includes(clean1);
      });
      const match2 = group.some(item => {
        const ci = cleanText(item);
        return ci === clean2 || ci === noStop2 || clean2.includes(ci) || ci.includes(clean2);
      });
      if (match1 && match2) return true;
    } else if (typeof group === 'string') {
      // Cas simple: liste de synonymes flat
      const match1 = clean1.includes(cleanText(group)) || cleanText(group).includes(clean1);
      const match2 = clean2.includes(cleanText(group)) || cleanText(group).includes(clean2);
      if (match1 && match2) return true;
    }
  }

  // 6. Test d'appartenance à un groupe de synonymes global
  if (matchesSynonymGroups(clean1, clean2, customEquivalences) || 
      matchesSynonymGroups(noStop1, noStop2, customEquivalences)) {
    return true;
  }

  // Extraire les jetons signifiants
  const tokens1 = getMeaningfulTokens(clean1);
  const tokens2 = getMeaningfulTokens(clean2);

  // 7. Vérification des conflits directs (ex: "noir" vs "blanc", "rouge" vs "bleu")
  if (hasDirectConflict(tokens1, tokens2)) {
    return false;
  }

  // 8. Comparaison mot à mot avec les groupes de synonymes
  // Si au moins un mot-clé majeur de chaque côté correspond à un même concept synonyme
  for (const t1 of tokens1) {
    for (const t2 of tokens2) {
      if (matchesSynonymGroups(t1, t2, customEquivalences)) {
        // Si ces mots correspondent et qu'aucun autre mot n'est en contradiction flagrante
        if (tokens1.length <= 2 && tokens2.length <= 2) return true;
      }
    }
  }

  // 9. Tolérance aux fautes de frappe (Levenshtein) sur les expressions courtes
  // Exemple: "spaghetti" vs "spaguetti", "turquoise" vs "turkoise"
  if (noStop1.length >= 4 && noStop2.length >= 4) {
    const sim = stringSimilarity(noStop1, noStop2);
    // Première lettre identique obligatoire pour éviter les faux positifs (ex: "bleu" et "bleme")
    if (sim >= 0.82 && noStop1[0] === noStop2[0]) {
      return true;
    }
  }

  // 10. Recouvrement sémantique des jetons (Jaccard sur mots-clés)
  if (tokens1.length > 0 && tokens2.length > 0) {
    const set2 = new Set(tokens2);
    const intersection = tokens1.filter(t => set2.has(t));
    const union = new Set([...tokens1, ...tokens2]);
    const jaccard = intersection.length / union.size;

    // Si plus de 55% des mots-clés sont identiques et sans conflit
    if (jaccard >= 0.55) return true;

    // Si l'une des réponses est entièrement contenue dans l'autre (ex: "poulet braise" et "poulet")
    const isSubset1 = tokens1.every(t => set2.has(t));
    const isSubset2 = tokens2.every(t => new Set(tokens1).has(t));
    if ((isSubset1 || isSubset2) && intersection.length >= 1) {
      return true;
    }
  }

  return false;
}

module.exports = {
  STOP_WORDS,
  GLOBAL_SYNONYM_GROUPS,
  cleanText,
  removeStopWords,
  normalizeCanonicalDate,
  levenshtein,
  stringSimilarity,
  matchesSynonymGroups,
  areAnswersEquivalent
};
