// ============================================================
// BANQUE DE QUESTIONS — COMPLICITÉ
// Application de Jeu de Couples à Distance
// ============================================================

const QUESTION_TYPES = {
  MOI_LUI: 'MOI_LUI',        // MOI / LUI / NOUS LES DEUX
  OUI_NON: 'OUI_NON',        // OUI / NON
  ECRIT: 'ECRIT',            // Réponse écrite libre
  CHOIX_MULTIPLE: 'CHOIX_MULTIPLE', // QCM (A/B/C/D)
  CLASSEMENT: 'CLASSEMENT',  // Classement d'éléments
  MEME_PENSEE: 'MEME_PENSEE' // Synchronisation de pensée
};

const MINI_GAMES = {
  DEVINE_MON_CHOIX: 'DEVINE_MON_CHOIX',
  HABITUDES: 'HABITUDES',
  CONNAISSANCE: 'CONNAISSANCE',
  GOUTS: 'GOUTS',
  MEMOIRE: 'MEMOIRE',
  CLASSEMENT: 'CLASSEMENT',
  QUI_FAIT_CA: 'QUI_FAIT_CA',
  MEME_PENSEE: 'MEME_PENSEE',
  MEMOIRE_FLASH: 'MEMOIRE_FLASH',
  CHOIX_IMPOSSIBLE: 'CHOIX_IMPOSSIBLE',
  CARTE_MYSTERE: 'CARTE_MYSTERE',
  SCENARIOS: 'SCENARIOS',
  SYNCHRONISATION: 'SYNCHRONISATION',
  EPREUVE_SURPRISE: 'EPREUVE_SURPRISE'
};

const questionBank = {
  habitudes_moi_lui: [
    { id: 'h001', text: "Qui dort le plus longtemps le week-end ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h002', text: "Qui utilise le plus son téléphone pendant un repas ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h003', text: "Qui est le plus souvent en retard ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h004', text: "Qui est le plus organisé(e) dans le couple ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h005', text: "Qui est le plus têtu(e) ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h006', text: "Qui mange le plus vite ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h007', text: "Qui se lève le premier le matin ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h008', text: "Qui dépense le plus facilement son argent ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h009', text: "Qui dit le plus souvent 'je t'aime' en premier ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'h010', text: "Qui s'énerve le plus facilement ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'h011', text: "Qui fait le premier pas après une dispute ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'h012', text: "Qui est le plus romantique ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'h013', text: "Qui oublie le plus facilement les dates importantes ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'h014', text: "Qui cuisine le mieux ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'h015', text: "Qui regarde le plus de films et séries ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'h016', text: "Qui est le plus jaloux(se) ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 3 },
    { id: 'h017', text: "Qui est le plus indépendant(e) ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 3 },
    { id: 'h018', text: "Qui s'inquiète le plus pour l'avenir ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 3 },
    { id: 'h019', text: "Qui est le plus courageux(se) dans le couple ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 3 },
    { id: 'h020', text: "Qui est le plus difficile à comprendre ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 3 },
    { id: 'h021', text: "Qui est le plus susceptible de faire la tête longtemps ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'h022', text: "Qui dépense plus d'argent pour les autres que pour lui/elle même ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'h023', text: "Qui est le plus généreux(se) ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h024', text: "Qui est plus susceptible de pleurer pendant un film ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'h025', text: "Qui fait le plus de bruit en mangeant ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
  ],
  habitudes_oui_non: [
    { id: 'hn001', text: "Ton partenaire aime-t-il/elle cuisiner ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 1 },
    { id: 'hn002', text: "Ton partenaire aime-t-il/elle faire du sport régulièrement ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 1 },
    { id: 'hn003', text: "Ton partenaire préfère-t-il/elle les soirées calmes à la maison ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 1 },
    { id: 'hn004', text: "Ton partenaire aime-t-il/elle voyager souvent ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 1 },
    { id: 'hn005', text: "Ton partenaire aime-t-il/elle se lever tôt ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 1 },
    { id: 'hn006', text: "Ton partenaire est-il/elle du genre à garder ses émotions pour lui/elle ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 2 },
    { id: 'hn007', text: "Ton partenaire préférerait-il/elle vivre à l'étranger ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 2 },
    { id: 'hn008', text: "Ton partenaire est-il/elle du type à planifier à l'avance ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 2 },
    { id: 'hn009', text: "Ton partenaire aime-t-il/elle les surprises ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 2 },
    { id: 'hn010', text: "Ton partenaire est-il/elle du genre à pardonner facilement ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 2 },
    { id: 'hn011', text: "Ton partenaire serait-il/elle capable de tout quitter pour toi ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 3 },
    { id: 'hn012', text: "Ton partenaire parle-t-il/elle souvent de votre futur ensemble ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 3 },
    { id: 'hn013', text: "Ton partenaire a-t-il/elle peur de la solitude ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 3 },
    { id: 'hn014', text: "Ton partenaire préfère-t-il/elle résoudre les conflits immédiatement ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 3 },
    { id: 'hn015', text: "Ton partenaire est-il/elle quelqu'un de très ambitieux(se) ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 3 },
    { id: 'hn016', text: "Ton partenaire aime-t-il/elle danser ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 1 },
    { id: 'hn017', text: "Ton partenaire aime-t-il/elle les animaux ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 1 },
    { id: 'hn018', text: "Ton partenaire se considère-t-il/elle comme une personne stressée ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 2 },
    { id: 'hn019', text: "Ton partenaire est-il/elle plus à l'aise en groupe qu'en tête à tête ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 2 },
    { id: 'hn020', text: "Ton partenaire croit-il/elle aux signes du destin ?", type: QUESTION_TYPES.OUI_NON, timer: 20, difficulty: 2 },
  ],
  connaissance_ecrit: [
    { id: 'ce001', text: "Quelle est la date d'anniversaire de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 80, difficulty: 1, hint: "Format : JJ/MM/AAAA" },
    { id: 'ce002', text: "Quelle est la couleur préférée de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 1 },
    { id: 'ce003', text: "Quel est le plat préféré de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 1 },
    { id: 'ce004', text: "Dans quelle ville ton partenaire a-t-il/elle grandi ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 1 },
    { id: 'ce005', text: "Quel est le prénom de la mère de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 2 },
    { id: 'ce006', text: "Quelle est la destination de rêve de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 2 },
    { id: 'ce007', text: "Quel est le rêve professionnel de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 80, difficulty: 2 },
    { id: 'ce008', text: "Quel est le plus grand loisir de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 2 },
    { id: 'ce009', text: "Quel est le film préféré de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 2 },
    { id: 'ce010', text: "Quelle est la peur principale de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 80, difficulty: 3 },
    { id: 'ce011', text: "Quel est le surnom d'enfance de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 3 },
    { id: 'ce012', text: "Quelle est la chanson préférée de ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 2 },
    { id: 'ce013', text: "Quel est le prénom de son/sa meilleur(e) ami(e) ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 2 },
    { id: 'ce014', text: "Quel animal aimerait avoir ton partenaire comme animal de compagnie ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 2 },
    { id: 'ce015', text: "Quelle est la plus grande qualité de ton partenaire selon lui/elle ?", type: QUESTION_TYPES.ECRIT, timer: 80, difficulty: 3 },
  ],
  memoire_couple: [
    { id: 'mc001', text: "En quel mois vous êtes-vous rencontrés pour la première fois ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 1 },
    { id: 'mc002', text: "Où vous êtes-vous rencontrés pour la première fois ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 1 },
    { id: 'mc003', text: "Quel était le premier surnom que vous vous donniez ?", type: QUESTION_TYPES.ECRIT, timer: 80, difficulty: 2 },
    { id: 'mc004', text: "Lors de votre première sortie, où êtes-vous allés ?", type: QUESTION_TYPES.ECRIT, timer: 80, difficulty: 2 },
    { id: 'mc005', text: "Quel est le premier cadeau que tu as offert à ton partenaire ?", type: QUESTION_TYPES.ECRIT, timer: 80, difficulty: 2 },
    { id: 'mc006', text: "En quelle année avez-vous commencé votre relation ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 1 },
    { id: 'mc007', text: "Quel est le premier voyage que vous avez fait ensemble ?", type: QUESTION_TYPES.ECRIT, timer: 80, difficulty: 3 },
    { id: 'mc008', text: "Quel est votre film préféré à regarder ensemble ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 2 },
    { id: 'mc009', text: "Quelle est la date de votre anniversaire de relation ?", type: QUESTION_TYPES.ECRIT, timer: 80, difficulty: 2, hint: "Format : JJ/MM" },
    { id: 'mc010', text: "Quel est votre restaurant préféré en couple ?", type: QUESTION_TYPES.ECRIT, timer: 60, difficulty: 2 },
  ],
  gouts_choix_multiple: [
    { id: 'gm001', text: "Quel cadeau ton partenaire préférerait-il/elle recevoir ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Voyage', 'Argent', 'Restaurant', 'Bijou'] },
    { id: 'gm002', text: "Quelle activité ton partenaire choisirait-il/elle le week-end ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Plage', 'Randonnée', 'Cinéma', 'Rester à la maison'] },
    { id: 'gm003', text: "Si ton partenaire pouvait manger un seul repas pour toujours, lequel ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Pizza', 'Sushi', 'Plat africain', 'Burger'] },
    { id: 'gm004', text: "Ton partenaire préfère quelle ambiance pour se détendre ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Musique', 'Séries', 'Lecture', 'Jeux vidéo'] },
    { id: 'gm005', text: "Si ton partenaire gagnait de l'argent, que ferait-il/elle en premier ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Voyager', 'Investir', 'Shopping', 'Offrir à sa famille'] },
    { id: 'gm006', text: "Quel genre de film ton partenaire préfère-t-il/elle ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Horreur', 'Comédie', 'Romance', 'Action'] },
    { id: 'gm007', text: "Où ton partenaire voudrait-il/elle vivre idéalement ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Grande ville', 'Bord de mer', 'Campagne', 'À l\'étranger'] },
    { id: 'gm008', text: "Si ton partenaire pouvait avoir un superpouvoir, lequel choisirait-il/elle ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Voler', 'Téléportation', 'Lire les pensées', 'Contrôler le temps'] },
    { id: 'gm009', text: "Quel type de musique ton partenaire écoute-t-il/elle le plus ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Afrobeat/Afropop', 'RnB/Soul', 'Pop', 'Gospel'] },
    { id: 'gm010', text: "Ton partenaire préfère quel type de vacances ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['All-inclusive à l\'hôtel', 'Aventure et découverte', 'Plage et détente', 'City trip culturel'] },
    { id: 'gm011', text: "Quelle est la qualité principale que ton partenaire recherche chez un(e) ami(e) ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 3, options: ['Loyauté', 'Humour', 'Intelligence', 'Fiabilité'] },
    { id: 'gm012', text: "Ton partenaire préfère quelle heure de la journée ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Le matin tôt', 'L\'après-midi', 'Le soir', 'La nuit'] },
  ],
  qui_fait_ca: [
    { id: 'qf001', text: "Qui risque de s'endormir pendant un film le soir ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'qf002', text: "Qui est le plus susceptible d'oublier une date importante ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'qf003', text: "Qui fait le premier pas pour se réconcilier après une dispute ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'qf004', text: "Qui serait le plus stressé si le vol est annulé lors d'un voyage ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'qf005', text: "Qui pleure le plus facilement devant un film triste ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'qf006', text: "Qui serait le premier à paniquer en cas de problème ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'qf007', text: "Qui mange les restes le lendemain sans hésiter ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'qf008', text: "Qui prendrait une décision importante sans en parler à l'autre ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 3 },
    { id: 'qf009', text: "Qui est le plus courageux(se) physiquement ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'qf010', text: "Qui est le plus grand fan de shopping ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'qf011', text: "Qui est le meilleur pour garder un secret ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 3 },
    { id: 'qf012', text: "Qui est le plus susceptible de se perdre sans GPS ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'qf013', text: "Qui est le plus patient(e) dans le couple ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'qf014', text: "Qui est le plus susceptible de dépenser tout son salaire le premier jour ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 2 },
    { id: 'qf015', text: "Qui serait le plus difficile à vivre au quotidien ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 3 },
    { id: 'qf016', text: "Qui rit le plus facilement d'une bonne blague ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
    { id: 'qf017', text: "Qui est le plus susceptible de se lever au milieu de la nuit pour manger ?", type: QUESTION_TYPES.MOI_LUI, timer: 20, difficulty: 1 },
  ],
  meme_pensee: [
    { id: 'mp001', text: "Pensez chacun à une couleur. Écrivez la première qui vous vient à l'esprit.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 1 },
    { id: 'mp002', text: "Pensez chacun à un animal. Écrivez le premier qui vous vient à l'esprit.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 1 },
    { id: 'mp003', text: "Pensez chacun à un chiffre entre 1 et 10.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 1 },
    { id: 'mp004', text: "Pensez chacun à un pays. Écrivez le premier qui vous vient à l'esprit.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 2 },
    { id: 'mp005', text: "Pensez chacun à un fruit. Écrivez le premier qui vous vient à l'esprit.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 1 },
    { id: 'mp006', text: "Pensez chacun à une saison. Écrivez la première qui vous vient à l'esprit.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 1 },
    { id: 'mp007', text: "Pensez chacun à un plat. Écrivez le premier qui vous vient à l'esprit.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 2 },
    { id: 'mp008', text: "Pensez à un mot qui décrit votre relation. Écrivez le premier qui vous vient.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 3 },
    { id: 'mp009', text: "Pensez chacun à une destination de vacances de rêve.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 2 },
    { id: 'mp010', text: "Pensez chacun à un prénom. Écrivez le premier qui vous vient à l'esprit.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 3 },
    { id: 'mp011', text: "Pensez à un métier. Écrivez le premier qui vous vient à l'esprit.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 2 },
    { id: 'mp012', text: "Pensez à un objet que vous avez chez vous. Écrivez le premier qui vous vient.", type: QUESTION_TYPES.MEME_PENSEE, timer: 20, difficulty: 3 },
  ],
  choix_impossible: [
    { id: 'ci001', text: "Ton partenaire choisirait plutôt :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Une semaine à la plage', 'Une semaine à la montagne'], isChoixImpossible: true },
    { id: 'ci002', text: "Si ton partenaire devait choisir :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Beaucoup d\'argent mais être seul(e)', 'Être pauvre mais très amoureux(se)'], isChoixImpossible: true },
    { id: 'ci003', text: "Ton partenaire préférerait :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Voyager dans le passé', 'Voyager dans le futur'], isChoixImpossible: true },
    { id: 'ci004', text: "Si ton partenaire devait choisir :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Perdre son téléphone pour 1 mois', 'Ne plus utiliser les réseaux sociaux pendant 1 an'], isChoixImpossible: true },
    { id: 'ci005', text: "Ton partenaire choisirait :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Être très intelligent(e)', 'Être très attirant(e)'], isChoixImpossible: true },
    { id: 'ci006', text: "Si ton partenaire devait choisir :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Chanter partout où il/elle va', 'Danser partout où il/elle va'], isChoixImpossible: true },
    { id: 'ci007', text: "Ton partenaire préférerait :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 3, options: ['Ne jamais dormir et toujours être actif(ve)', 'Dormir 12h mais avoir des rêves incroyables'], isChoixImpossible: true },
    { id: 'ci008', text: "Si ton partenaire devait absolument choisir :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Froid intense toute sa vie', 'Chaleur intense toute sa vie'], isChoixImpossible: true },
    { id: 'ci009', text: "Ton partenaire préférerait :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Parler 100 langues mais ne pas savoir lire', 'Savoir lire 100 langues mais ne pas pouvoir parler'], isChoixImpossible: true },
    { id: 'ci010', text: "Si ton partenaire devait choisir :", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 3, options: ['Avoir la mémoire de tout ce qui s\'est passé', 'Pouvoir effacer tous ses mauvais souvenirs'], isChoixImpossible: true },
  ],
  scenarios: [
    { id: 's001', text: "Vous gagnez 10 millions FCFA ensemble. Que ferait ton partenaire EN PREMIER ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Voyager', 'Investir dans l\'immobilier', 'Offrir à sa famille', 'Épargner'] },
    { id: 's002', text: "Vous êtes bloqués sur une île déserte. Quel objet ton partenaire choisirait-il/elle ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Son téléphone', 'Un couteau', 'Un livre', 'Un miroir'] },
    { id: 's003', text: "Ton partenaire reçoit une offre d\'emploi en Europe. Que ferait-il/elle ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 3, options: ['Accepter et partir', 'Négocier pour que tu viennes aussi', 'Refuser pour rester avec toi', 'Demander du temps pour réfléchir'] },
    { id: 's004', text: "Votre maison est en feu ! Ton partenaire sauve quoi en premier ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Son téléphone', 'Des photos/souvenirs', 'Des bijoux importants', 'Son animal de compagnie'] },
    { id: 's005', text: "Ton partenaire se retrouve seul(e) pour 1 semaine. Que fait-il/elle ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Reste à la maison à se reposer', 'Profite et sort beaucoup', 'T\'appelle tous les jours', 'Part en voyage'] },
    { id: 's006', text: "Si ton partenaire pouvait dîner avec une célébrité, qui choisirait-il/elle ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Un chef d\'État', 'Un artiste qu\'il/elle admire', 'Un sportif de légende', 'Un entrepreneur milliardaire'] },
    { id: 's007', text: "Ton partenaire apprend qu\'il/elle a gagné un voyage pour 2 personnes. Avec qui part-il/elle EN DEHORS de toi ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 3, options: ['Sa mère', 'Son/sa meilleur(e) ami(e)', 'Son frère/sa sœur', 'Il/elle irait seul(e)'] },
    { id: 's008', text: "Ton partenaire est coincé dans un embouteillage énorme. Que fait-il/elle ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Écoute de la musique calmement', 'Klaxonne et s\'énerve', 'T\'appelle pour parler', 'Cherche un autre chemin'] },
  ],
  memoire_flash: [
    { id: 'mf001', text: "Regardez bien cette liste pendant 5 secondes...", question: "Quel objet était dans la liste ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 25, difficulty: 2, flashContent: ['Téléphone', 'Montre', 'Lunettes', 'Clé', 'Tasse'], flashDuration: 5000, options: ['Guitare', 'Montre', 'Ballon', 'Chapeau'], correctAnswer: 1 },
    { id: 'mf002', text: "Regardez bien ces couleurs pendant 4 secondes...", question: "Quelle couleur N\'ÉTAIT PAS dans la liste ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 25, difficulty: 2, flashContent: ['Rouge', 'Bleu', 'Jaune', 'Vert'], flashDuration: 4000, options: ['Rouge', 'Violet', 'Bleu', 'Jaune'], correctAnswer: 1 },
    { id: 'mf003', text: "Mémorisez ces chiffres en 5 secondes...", question: "Quel était le 3ème chiffre de la séquence ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 25, difficulty: 3, flashContent: ['7', '3', '9', '1', '5'], flashDuration: 5000, options: ['3', '7', '9', '1'], correctAnswer: 2 },
    { id: 'mf004', text: "Regardez bien ces animaux pendant 5 secondes...", question: "Quel animal était dans la liste ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 25, difficulty: 2, flashContent: ['Lion', 'Éléphant', 'Girafe', 'Dauphin'], flashDuration: 5000, options: ['Panda', 'Lion', 'Aigle', 'Crocodile'], correctAnswer: 1 },
    { id: 'mf005', text: "Regardez bien ces pays pendant 4 secondes...", question: "Quel pays N\'ÉTAIT PAS dans la liste ?", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 25, difficulty: 3, flashContent: ['France', 'Brésil', 'Japon', 'Australie'], flashDuration: 4000, options: ['France', 'Canada', 'Brésil', 'Japon'], correctAnswer: 1 },
  ],
  synchronisation: [
    { id: 'sy001', text: "Choisissez une couleur que vous associez à l\'amour.", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 1, options: ['Rouge', 'Rose', 'Blanc', 'Violet'] },
    { id: 'sy002', text: "Choisissez un mot qui représente votre relation.", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Passion', 'Sérénité', 'Aventure', 'Profondeur'] },
    { id: 'sy003', text: "Choisissez la saison qui représente le mieux votre amour.", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Printemps', 'Été', 'Automne', 'Hiver'] },
    { id: 'sy004', text: "Choisissez l\'heure de la journée qui représente votre couple.", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 3, options: ['L\'aube', 'Midi', 'Le coucher du soleil', 'La nuit'] },
    { id: 'sy005', text: "Choisissez l\'élément naturel qui vous représente le mieux.", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 3, options: ['Le feu', 'L\'eau', 'Le vent', 'La terre'] },
    { id: 'sy006', text: "Choisissez l\'émotion qui décrit le mieux votre relation en ce moment.", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Bonheur', 'Excitation', 'Paix', 'Nostalgie'] },
    { id: 'sy007', text: "Choisissez un animal qui représente votre couple.", type: QUESTION_TYPES.CHOIX_MULTIPLE, timer: 20, difficulty: 2, options: ['Lion et lionne', 'Dauphin', 'Aigle', 'Cygne'] },
  ],
  classement: [
    { id: 'cl001', text: "Classe ces activités selon ce que ton partenaire préfère (du plus aimé au moins aimé) :", type: QUESTION_TYPES.CLASSEMENT, timer: 40, difficulty: 2, items: ['Cinéma', 'Restaurant', 'Plage', 'Jeux vidéo', 'Sport'] },
    { id: 'cl002', text: "Classe ces qualités selon celles que ton partenaire préfère chez un partenaire :", type: QUESTION_TYPES.CLASSEMENT, timer: 40, difficulty: 3, items: ['Fidélité', 'Humour', 'Générosité', 'Intelligence', 'Beauté'] },
    { id: 'cl003', text: "Classe ces destinations selon les préférences de ton partenaire :", type: QUESTION_TYPES.CLASSEMENT, timer: 40, difficulty: 2, items: ['Paris', 'Dubaï', 'New York', 'Bali', 'Abidjan'] },
    { id: 'cl004', text: "Classe ces dépenses selon la priorité de ton partenaire :", type: QUESTION_TYPES.CLASSEMENT, timer: 40, difficulty: 3, items: ['Logement', 'Nourriture', 'Loisirs', 'Vêtements', 'Épargne'] },
  ],
};

const LEVELS = [
  { id: 1, name: "Première Connexion", theme: "Découverte", emoji: "💫", miniGames: [
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_moi_lui'], count: 5 },
    { type: MINI_GAMES.GOUTS, cats: ['gouts_choix_multiple'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_oui_non'], count: 5 },
    { type: MINI_GAMES.DEVINE_MON_CHOIX, cats: ['gouts_choix_multiple'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
  ]},
  { id: 2, name: "On Se Découvre", theme: "Découverte", emoji: "🔍", miniGames: [
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_moi_lui'], count: 5 },
    { type: MINI_GAMES.DEVINE_MON_CHOIX, cats: ['gouts_choix_multiple'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.GOUTS, cats: ['gouts_choix_multiple'], count: 5 },
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_oui_non'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
  ]},
  { id: 3, name: "Nos Habitudes", theme: "Découverte", emoji: "🌙", miniGames: [
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_moi_lui', 'habitudes_oui_non'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.GOUTS, cats: ['gouts_choix_multiple'], count: 5 },
    { type: MINI_GAMES.DEVINE_MON_CHOIX, cats: ['gouts_choix_multiple'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_moi_lui'], count: 5 },
  ]},
  { id: 4, name: "Notre Histoire", theme: "Découverte", emoji: "🎁", rewardLevel: true, rewardThreshold: 190, rewardMax: 200, rewardGift: 1, miniGames: [
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_moi_lui'], count: 5 },
    { type: MINI_GAMES.DEVINE_MON_CHOIX, cats: ['gouts_choix_multiple'], count: 5 },
  ]},
  { id: 5, name: "Complices", theme: "Complicité", emoji: "🤝", miniGames: [
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_oui_non'], count: 5 },
  ]},
  { id: 6, name: "Bonne Mémoire", theme: "Complicité", emoji: "🧠", miniGames: [
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_moi_lui'], count: 5 },
  ]},
  { id: 7, name: "Je Te Connais", theme: "Complicité", emoji: "👁️", miniGames: [
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.DEVINE_MON_CHOIX, cats: ['gouts_choix_multiple'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_oui_non'], count: 5 },
  ]},
  { id: 8, name: "Même Longueur d'Onde", theme: "Complicité", emoji: "📡", miniGames: [
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.DEVINE_MON_CHOIX, cats: ['gouts_choix_multiple'], count: 5 },
    { type: MINI_GAMES.HABITUDES, cats: ['habitudes_moi_lui'], count: 5 },
  ]},
  { id: 9, name: "Dans Ta Tête", theme: "Connaissance Profonde", emoji: "🌀", miniGames: [
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.DEVINE_MON_CHOIX, cats: ['gouts_choix_multiple'], count: 5 },
  ]},
  { id: 10, name: "Ça Devient Sérieux", theme: "Connaissance Profonde", emoji: "⚡", miniGames: [
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.DEVINE_MON_CHOIX, cats: ['gouts_choix_multiple'], count: 5 },
  ]},
  { id: 11, name: "Connexion Profonde", theme: "Connaissance Profonde", emoji: "💜", miniGames: [
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios', 'choix_impossible', 'synchronisation'], count: 5 },
  ]},
  { id: 12, name: "Sommes-nous Vraiment Complices ?", theme: "Connaissance Profonde", emoji: "🎁", rewardLevel: true, rewardThreshold: 570, rewardMax: 600, rewardGift: 2, miniGames: [
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios', 'choix_impossible'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
  ]},
  { id: 13, name: "Synchronisation", theme: "Connaissance Profonde", emoji: "🎯", miniGames: [
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
  ]},
  { id: 14, name: "Grande Complicité", theme: "Expert", emoji: "🏅", miniGames: [
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios', 'synchronisation'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
  ]},
  { id: 15, name: "Niveau Expert", theme: "Expert", emoji: "⭐", miniGames: [
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios', 'choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
  ]},
  { id: 16, name: "Presque Parfait", theme: "Expert", emoji: "💫", miniGames: [
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios', 'meme_pensee'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
  ]},
  { id: 17, name: "Dernière Ligne Droite", theme: "Expert", emoji: "🏃", miniGames: [
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios', 'synchronisation', 'choix_impossible'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
  ]},
  { id: 18, name: "Contre la Montre", theme: "Phase Finale", emoji: "⏱️", timerReduction: 0.8, miniGames: [
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios', 'choix_impossible', 'synchronisation'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
  ]},
  { id: 19, name: "Avant la Finale", theme: "Phase Finale", emoji: "🔮", timerReduction: 0.75, miniGames: [
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios', 'synchronisation', 'meme_pensee', 'choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
  ]},
  { id: 20, name: "L'Épreuve Ultime", theme: "Phase Finale", emoji: "🏆", rewardLevel: true, rewardThreshold: 950, rewardMax: 1000, rewardGift: 3, isGrandFinal: true, timerReduction: 0.7, miniGames: [
    { type: MINI_GAMES.EPREUVE_SURPRISE, cats: ['scenarios', 'synchronisation', 'meme_pensee', 'choix_impossible', 'connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.SYNCHRONISATION, cats: ['synchronisation'], count: 5 },
    { type: MINI_GAMES.MEMOIRE_FLASH, cats: ['memoire_flash'], count: 5 },
    { type: MINI_GAMES.CLASSEMENT, cats: ['classement'], count: 5 },
    { type: MINI_GAMES.SCENARIOS, cats: ['scenarios'], count: 5 },
    { type: MINI_GAMES.CONNAISSANCE, cats: ['connaissance_ecrit'], count: 5 },
    { type: MINI_GAMES.MEME_PENSEE, cats: ['meme_pensee'], count: 5 },
    { type: MINI_GAMES.QUI_FAIT_CA, cats: ['qui_fait_ca'], count: 5 },
    { type: MINI_GAMES.CHOIX_IMPOSSIBLE, cats: ['choix_impossible'], count: 5 },
    { type: MINI_GAMES.MEMOIRE, cats: ['memoire_couple'], count: 5 },
  ]},
];

function normalizeText(text) {
  if (!text) return '';
  return text.toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ').replace(/[^\w\s]/g, '');
}

function normalizeDate(text) {
  if (!text) return '';
  const normalized = text.trim().toLowerCase();
  const monthNames = { 'janvier':'01','fevrier':'02','mars':'03','avril':'04','mai':'05','juin':'06','juillet':'07','aout':'08','septembre':'09','octobre':'10','novembre':'11','decembre':'12' };
  const p1 = normalized.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
  if (p1) return `${p1[1].padStart(2,'0')}/${p1[2].padStart(2,'0')}/${p1[3]}`;
  const p2 = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g,'').match(/(\d{1,2})\s+(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)\s+(\d{2,4})/);
  if (p2) return `${p2[1].padStart(2,'0')}/${monthNames[p2[2]]}/${p2[3]}`;
  return normalizeText(text);
}

function compareAnswers(type, answer1, answer2, questionData) {
  if (answer1 === null || answer1 === undefined || answer2 === null || answer2 === undefined) return false;
  if (type === 'MOI_LUI') return answer1 === answer2;
  if (type === 'OUI_NON') return answer1.toLowerCase() === answer2.toLowerCase();
  if (type === 'CHOIX_MULTIPLE' || type === 'MEME_PENSEE') return answer1 === answer2;
  if (type === 'ECRIT') {
    const dateKeywords = ['date', 'anniversaire', 'mois', 'annee', 'rencontr'];
    const isDate = dateKeywords.some(kw => normalizeText(questionData?.text || '').includes(kw));
    if (isDate) return normalizeDate(answer1) === normalizeDate(answer2);
    const n1 = normalizeText(answer1), n2 = normalizeText(answer2);
    if (n1 === n2) return true;
    if (n1.length > 2 && n2.length > 2 && (n1.includes(n2) || n2.includes(n1))) return true;
    return false;
  }
  if (type === 'CLASSEMENT') {
    if (!Array.isArray(answer1) || !Array.isArray(answer2)) return false;
    return JSON.stringify(answer1) === JSON.stringify(answer2);
  }
  return false;
}

function normalizeRole(answer, playerRole) {
  if (answer === 'NOUS_DEUX') return 'NOUS_DEUX';
  if (playerRole === 'HOMME') { if (answer === 'MOI') return 'HOMME'; if (answer === 'LUI') return 'FEMME'; }
  else if (playerRole === 'FEMME') { if (answer === 'MOI') return 'FEMME'; if (answer === 'LUI') return 'HOMME'; }
  return answer;
}

function selectQuestions(categories, count, usedIds = []) {
  const all = [];
  for (const cat of categories) { if (questionBank[cat]) all.push(...questionBank[cat]); }
  const available = all.filter(q => !usedIds.includes(q.id));
  return available.sort(() => Math.random() - 0.5).slice(0, Math.min(count, available.length));
}

module.exports = { QUESTION_TYPES, MINI_GAMES, questionBank, LEVELS, normalizeText, normalizeDate, compareAnswers, normalizeRole, selectQuestions };
