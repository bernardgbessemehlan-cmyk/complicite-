// ============================================================
// BANQUE DE QUESTIONS ÉTENDUE & MOTEUR DU JEU — COMPLICITÉ
// Plus de 1000 questions uniques avec système d'équivalences sémantiques
// ============================================================

const { areAnswersEquivalent, cleanText, normalizeCanonicalDate } = require('../semantic');

const QUESTION_TYPES = {
  "MOI_LUI": "MOI_LUI",
  "OUI_NON": "OUI_NON",
  "ECRIT": "ECRIT",
  "CHOIX_MULTIPLE": "CHOIX_MULTIPLE",
  "CLASSEMENT": "CLASSEMENT",
  "MEME_PENSEE": "MEME_PENSEE"
};

const MINI_GAMES = {
  "DEVINE_MON_CHOIX": "DEVINE_MON_CHOIX",
  "HABITUDES": "HABITUDES",
  "CONNAISSANCE": "CONNAISSANCE",
  "GOUTS": "GOUTS",
  "MEMOIRE": "MEMOIRE",
  "CLASSEMENT": "CLASSEMENT",
  "QUI_FAIT_CA": "QUI_FAIT_CA",
  "MEME_PENSEE": "MEME_PENSEE",
  "MEMOIRE_FLASH": "MEMOIRE_FLASH",
  "CHOIX_IMPOSSIBLE": "CHOIX_IMPOSSIBLE",
  "CARTE_MYSTERE": "CARTE_MYSTERE",
  "SCENARIOS": "SCENARIOS",
  "SYNCHRONISATION": "SYNCHRONISATION",
  "EPREUVE_SURPRISE": "EPREUVE_SURPRISE"
};

const questionBank = {
  "habitudes_moi_lui": [
    {
      "id": "hml_001",
      "text": "Qui dort le plus longtemps le week-end ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_002",
      "text": "Qui utilise le plus son téléphone pendant un repas ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_003",
      "text": "Qui est le plus souvent en retard aux rendez-vous ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_004",
      "text": "Qui est le plus ordonné et maniaque ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_005",
      "text": "Qui est le plus têtu lors d'une discussion ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_006",
      "text": "Qui mange le plus rapidement ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_007",
      "text": "Qui se lève le premier le matin ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_008",
      "text": "Qui dépense le plus facilement son argent pour des petits plaisirs ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_009",
      "text": "Qui dit le plus souvent 'je t'aime' en premier ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_010",
      "text": "Qui s'énerve le plus vite pour des détails ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_011",
      "text": "Qui fait le premier pas après une bouderie ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_012",
      "text": "Qui est le plus romantique et attentionné ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_013",
      "text": "Qui oublie le plus facilement les dates importantes ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_014",
      "text": "Qui cuisine les meilleurs petits plats ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_015",
      "text": "Qui regarde le plus de films et séries au lit ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_016",
      "text": "Qui est le plus jaloux dans le couple ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_017",
      "text": "Qui a le plus besoin de moments d'indépendance ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_018",
      "text": "Qui s'inquiète le plus pour le futur ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_019",
      "text": "Qui est le plus courageux face aux imprévus ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_020",
      "text": "Qui est le plus difficile à comprendre quand il/elle ne parle pas ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_021",
      "text": "Qui est le plus susceptible de bouder toute une journée ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_022",
      "text": "Qui est le plus généreux avec ses proches ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_023",
      "text": "Qui est le plus susceptible de verser une larme devant un film émouvant ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_024",
      "text": "Qui fait le plus de bruit en mangeant ou en buvant ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_025",
      "text": "Qui passe le plus de temps dans la salle de bain pour se préparer ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_026",
      "text": "Qui prend le plus de photos et selfies pendant les sorties ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_027",
      "text": "Qui s'endort le plus rapidement une fois la tête posée sur l'oreiller ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_028",
      "text": "Qui a les goûts musicaux les plus éclectiques ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_029",
      "text": "Qui perd le plus souvent ses clés ou son téléphone ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_030",
      "text": "Qui a le plus d'énergie dès le réveil ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_031",
      "text": "Qui est le plus doué pour négocier les prix au marché ou en magasin ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_032",
      "text": "Qui aime le plus les surprises et cadeaux inattendus ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_033",
      "text": "Qui commence une conversation sur un coup de tête au milieu de la nuit ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_034",
      "text": "Qui boit le plus de café ou de thé dans la journée ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_035",
      "text": "Qui est le plus sociable quand vous rencontrez de nouvelles personnes ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_036",
      "text": "Qui a le rire le plus communicatif et bruyant ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_037",
      "text": "Qui hésite le plus longtemps avant de choisir son plat au restaurant ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_038",
      "text": "Qui propose le plus souvent des sorties ou des voyages ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_039",
      "text": "Qui est le plus attaché à ses habitudes et routines ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_040",
      "text": "Qui sait le mieux garder son calme en cas de crise ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_041",
      "text": "Qui a le sommeil le plus lourd ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_042",
      "text": "Qui grignote le plus entre les repas ou la nuit ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_043",
      "text": "Qui conduit ou navigue le mieux sans GPS ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_044",
      "text": "Qui donne les meilleurs conseils de vie ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_045",
      "text": "Qui est le plus protecteur envers l'autre ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_046",
      "text": "Qui chante le plus souvent sous la douche ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_047",
      "text": "Qui a la plus grande mémoire des détails futiles ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_048",
      "text": "Qui répond le plus vite aux messages WhatsApp ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_049",
      "text": "Qui laisse traîner ses affaires un peu partout ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_050",
      "text": "Qui est le plus frileux quand il fait un peu frais ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_051",
      "text": "Qui a le plus peur des petites bêtes ou insectes ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_052",
      "text": "Qui sait le mieux réconforter l'autre quand ça ne va pas ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_053",
      "text": "Qui est le plus exigeant avec lui-même ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_054",
      "text": "Qui adore le plus faire des câlins spontanés ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_055",
      "text": "Qui a le plus de patience avec les enfants ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_056",
      "text": "Qui est le plus passionné quand il parle de son travail ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_057",
      "text": "Qui est le plus adepte du shopping en ligne ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_058",
      "text": "Qui fait les plus beaux compliments ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_059",
      "text": "Qui a le plus tendance à tout remettre au lendemain ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_060",
      "text": "Qui sait le mieux garder un secret d'ami ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_061",
      "text": "Qui s'adapte le plus vite aux changements de plans ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_062",
      "text": "Qui aime le plus raconter des potins de la journée ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_063",
      "text": "Qui a le look le plus soigné au quotidien ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_064",
      "text": "Qui a le plus d'humour et fait rire la galerie ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_065",
      "text": "Qui est le plus susceptible de faire un achat compulsif ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_066",
      "text": "Qui veille le plus tard le soir devant son écran ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_067",
      "text": "Qui a le plus de mal à dire 'non' aux gens ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_068",
      "text": "Qui sait le mieux bricoler ou réparer des choses ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_069",
      "text": "Qui est le plus gourmand de sucreries ou desserts ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_070",
      "text": "Qui s'inquiète le premier quand l'autre ne répond pas au téléphone ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_071",
      "text": "Qui a le plus de contacts et d'amis proches ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_072",
      "text": "Qui est le plus rancunier après un désaccord ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_073",
      "text": "Qui a la démarche la plus rapide quand vous marchez ensemble ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_074",
      "text": "Qui adore le plus faire la sieste l'après-midi ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_075",
      "text": "Qui est le plus créatif et plein d'idées neuves ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_076",
      "text": "Qui est le plus expressif avec son visage quand il/elle n'est pas content(e) ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_077",
      "text": "Qui planifie les vacances et réservations à l'avance ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hml_078",
      "text": "Qui se plaint le plus de la météo quand il fait trop chaud ou trop froid ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hml_079",
      "text": "Qui est le plus spontané pour dire 'viens on part maintenant' ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hml_080",
      "text": "Qui est le cœur battant et le plus démonstratif de votre couple ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    }
  ],
  "habitudes_oui_non": [
    {
      "id": "hon_001",
      "text": "Aimez-vous tous les deux passer un week-end entier en amoureux sans sortir ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_002",
      "text": "Avez-vous déjà envisagé sérieusement de vivre dans un autre pays ensemble ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_003",
      "text": "Votre couple parle-t-il ouvertement d'argent et de projets financiers sans tabou ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_004",
      "text": "Aimez-vous les surprises et cadeaux improvisés sans occasion spéciale ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_005",
      "text": "Avez-vous une chanson fétiche qui représente votre histoire d'amour ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_006",
      "text": "Préférez-vous régler une dispute le jour même plutôt que de dormir fâchés ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_007",
      "text": "Partagez-vous les mêmes valeurs fondamentales sur la famille et l'avenir ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_008",
      "text": "Avez-vous un rituel précis tous les soirs avant de dormir (appel, message) ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_009",
      "text": "Aimez-vous voyager à l'aventure sans planning rigide et détaillé ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_010",
      "text": "Votre complicité vous permet-elle de vous comprendre juste avec un regard ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_011",
      "text": "Aimez-vous cuisiner ensemble en amoureux le week-end ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_012",
      "text": "Êtes-vous d'accord sur le nombre d'enfants souhaité pour le futur ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_013",
      "text": "Avez-vous déjà passé plus de 3 heures d'affilée en appel sans voir le temps passer ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_014",
      "text": "Faites-vous confiance à 100% à votre partenaire quand il/elle sort avec des amis ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_015",
      "text": "Avez-vous un surnom secret que personne d'autre n'utilise ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_016",
      "text": "Aimez-vous regarder la même série en synchronisé à distance ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_017",
      "text": "Pensez-vous que la distance a renforcé la solidité de votre couple ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_018",
      "text": "Avez-vous tous les deux le même genre d'humour un peu fou ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_019",
      "text": "Aimez-vous vous offrir des petits cadeaux symboliques faits main ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_020",
      "text": "Êtes-vous capables de deviner l'humeur de l'autre rien qu'au ton de sa voix ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_021",
      "text": "Avez-vous déjà rêvé de votre mariage ou de votre vie commune ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_022",
      "text": "Aimez-vous parler pendant des heures de vos souvenirs d'enfance ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_023",
      "text": "Avez-vous déjà prévu votre prochaine destination de vacances à deux ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_024",
      "text": "Votre couple résiste-t-il bien aux périodes de stress ou d'examens ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_025",
      "text": "Aimez-vous vous envoyer des photos de vos repas ou de vos tenues dans la journée ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_026",
      "text": "Avez-vous déjà pleuré de joie ou d'émotion en vous retrouvant à l'aéroport ou à la gare ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_027",
      "text": "Êtes-vous tous les deux plutôt lève-tard le dimanche matin ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_028",
      "text": "Considérez-vous votre partenaire comme votre meilleur(e) ami(e) en premier lieu ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_029",
      "text": "Aimez-vous tester de nouveaux restaurants ou de nouvelles recettes ensemble ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_030",
      "text": "Avez-vous déjà eu un fou rire incontrôlable au téléphone ensemble ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_031",
      "text": "Partagez-vous les mêmes goûts sur les films d'action ou de suspense ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_032",
      "text": "Votre couple a-t-il une date anniversaire précise que vous célébrez ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_033",
      "text": "Avez-vous déjà rédigé une lettre d'amour manuscrite pour l'autre ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_034",
      "text": "Aimez-vous vous endormir en visio ou au téléphone ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_035",
      "text": "Pensez-vous être plus complices aujourd'hui qu'au premier jour de votre rencontre ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_036",
      "text": "Avez-vous un projet professionnel ou personnel commun pour les 3 prochaines années ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_037",
      "text": "Êtes-vous du genre à tout vous raconter sans aucun secret l'un pour l'autre ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_038",
      "text": "Avez-vous déjà ressenti le manque physique au point d'en avoir le cœur serré ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_039",
      "text": "Aimez-vous vous taquiner avec tendresse au quotidien ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_040",
      "text": "Pensez-vous que votre rencontre était guidée par le destin ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_041",
      "text": "Avez-vous déjà acheté un vêtement ou accessoire assorti pour vous deux ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_042",
      "text": "Aimez-vous écouter des playlists musicales partagées en même temps ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_043",
      "text": "Votre partenaire sait-il exactement ce qui peut vous consoler en cas de coup dur ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_044",
      "text": "Êtes-vous d'accord sur la façon de gérer les disputes ou tensions ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_045",
      "text": "Avez-vous déjà fait une surprise totale en débarquant sans prévenir ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_046",
      "text": "Aimez-vous vous imaginer vieux ensemble dans une belle maison ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_047",
      "text": "Votre couple est-il plutôt expressif en public ou discret et pudique ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_048",
      "text": "Aimez-vous vous envoyer des mèmes ou TikToks rigolos tous les jours ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_049",
      "text": "Avez-vous déjà gardé un parfum ou un t-shirt de l'autre pour vous souvenir de son odeur ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_050",
      "text": "Êtes-vous d'accord sur la gestion des tâches ménagères quand vous vivez ensemble ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_051",
      "text": "Avez-vous confiance en l'avenir de votre relation sur le très long terme ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_052",
      "text": "Aimez-vous parler de vos rêves les plus fous sans peur du jugement de l'autre ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_053",
      "text": "Pensez-vous être sur la même longueur d'onde spirituelle ou philosophique ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_054",
      "text": "Avez-vous déjà partagé un secret très intime que personne d'autre ne connaît ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_055",
      "text": "Aimez-vous vous lancer des défis amusants comme ce jeu Complicité ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_056",
      "text": "Votre couple a-t-il une expression ou un mot inventé qui n'appartient qu'à vous ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_057",
      "text": "Avez-vous déjà passé une nuit blanche entière à refaire le monde à deux ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "hon_058",
      "text": "Pensez-vous que l'amour vrai peut surmonter n'importe quel obstacle de distance ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "hon_059",
      "text": "Avez-vous déjà planifié le lieu exact de vos prochaines retrouvailles ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "hon_060",
      "text": "Votre cœur bat-il encore plus fort quand vous voyez son nom s'afficher à l'écran ?",
      "type": "OUI_NON",
      "timer": 20,
      "difficulty": 3
    }
  ],
  "connaissance_ecrit": [
    {
      "id": "ce_001",
      "text": "Quelle est la date d'anniversaire de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "hint": "Format : JJ/MM ou JJ/MM/AAAA",
      "equivalences": []
    },
    {
      "id": "ce_002",
      "text": "Quelle est la couleur préférée de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": [
        [
          "bleu",
          "bleu marine",
          "bleu ciel",
          "azur",
          "cyan"
        ],
        [
          "rouge",
          "bordeaux",
          "pourpre"
        ],
        [
          "vert",
          "vert kaki",
          "kaki",
          "vert pomme"
        ],
        [
          "rose",
          "fuschia",
          "fuchsia"
        ],
        [
          "noir",
          "sombre"
        ],
        [
          "blanc",
          "ivoire"
        ],
        [
          "jaune",
          "moutarde",
          "or"
        ],
        [
          "violet",
          "mauve",
          "lilas"
        ]
      ]
    },
    {
      "id": "ce_003",
      "text": "Quel est le plat préféré de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": [
        [
          "riz",
          "tiep",
          "thieb",
          "riz gras",
          "riz au poulet"
        ],
        [
          "alloco",
          "aloko",
          "plantain",
          "banane plantain"
        ],
        [
          "attieke",
          "garba",
          "attieke poisson"
        ],
        [
          "poulet",
          "poulet braise",
          "poulet roti"
        ],
        [
          "poisson",
          "poisson braise",
          "carpe braisee"
        ],
        [
          "pates",
          "spaghetti",
          "spaghetti bolognaise",
          "pasta"
        ],
        [
          "pizza",
          "pizzas"
        ],
        [
          "burger",
          "hamburger",
          "cheeseburger"
        ],
        [
          "foutou",
          "foufou",
          "igname"
        ]
      ]
    },
    {
      "id": "ce_004",
      "text": "Dans quelle ville ton partenaire a-t-il/elle grandi ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": [
        [
          "paris",
          "paname"
        ],
        [
          "abidjan",
          "babi"
        ],
        [
          "cotonou"
        ],
        [
          "lome"
        ],
        [
          "dakar"
        ],
        [
          "yaounde"
        ],
        [
          "douala"
        ],
        [
          "bordeaux"
        ],
        [
          "lyon"
        ],
        [
          "marseille"
        ]
      ]
    },
    {
      "id": "ce_005",
      "text": "Quel est le prénom de la mère de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_006",
      "text": "Quel est le prénom du père de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_007",
      "text": "Quelle est la destination de voyage dont rêve ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": [
        [
          "paris",
          "paname"
        ],
        [
          "dubai",
          "les emirats"
        ],
        [
          "new york",
          "nyc"
        ],
        [
          "tokyo",
          "le japon"
        ],
        [
          "bali",
          "indonesie"
        ],
        [
          "zanzibar",
          "tanzanie"
        ],
        [
          "maldives"
        ],
        [
          "canada",
          "montreal"
        ]
      ]
    },
    {
      "id": "ce_008",
      "text": "Quel est le rêve professionnel ultime de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": [
        [
          "entrepreneur",
          "chef d entreprise",
          "business",
          "sa propre boite",
          "creer une entreprise"
        ],
        [
          "medecin",
          "docteur"
        ],
        [
          "architecte",
          "architecture"
        ],
        [
          "artiste",
          "chanteur",
          "musicien"
        ],
        [
          "avocat",
          "juriste"
        ],
        [
          "directeur",
          "manager",
          "cadre"
        ],
        [
          "informaticien",
          "developpeur",
          "ingenieur"
        ]
      ]
    },
    {
      "id": "ce_009",
      "text": "Quel est le loisir ou passe-temps favori de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": [
        [
          "sport",
          "musculation",
          "muscu",
          "fitness"
        ],
        [
          "dormir",
          "dodo",
          "faire la sieste",
          "repos"
        ],
        [
          "musique",
          "ecouter de la musique"
        ],
        [
          "cinema",
          "cine",
          "regarder des films"
        ],
        [
          "series",
          "netflix",
          "tele"
        ],
        [
          "lecture",
          "lire",
          "livres"
        ],
        [
          "jeux video",
          "gaming",
          "console",
          "playstation"
        ],
        [
          "cuisine",
          "cuisiner",
          "faire a manger"
        ]
      ]
    },
    {
      "id": "ce_010",
      "text": "Quel est le film ou dessin animé préféré de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_011",
      "text": "Quelle est la plus grande peur ou phobie de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": [
        [
          "serpents",
          "serpent"
        ],
        [
          "araignees",
          "araignee",
          "insectes"
        ],
        [
          "hauteur",
          "vide",
          "vertige"
        ],
        [
          "noir",
          "obscurite"
        ],
        [
          "solitude",
          "etre seul"
        ],
        [
          "echec",
          "echouer"
        ],
        [
          "eau",
          "noyade"
        ]
      ]
    },
    {
      "id": "ce_012",
      "text": "Quel était le surnom d'enfance de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_013",
      "text": "Quelle est la chanson ou artiste préféré(e) de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_014",
      "text": "Quel est le prénom du meilleur ami ou de la meilleure amie de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_015",
      "text": "Quel animal ton partenaire aimerait-il avoir chez lui ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": [
        [
          "chien",
          "chiot",
          "toutou"
        ],
        [
          "chat",
          "chaton",
          "minou"
        ],
        [
          "oiseau",
          "perroquet"
        ],
        [
          "poisson",
          "poisson rouge"
        ],
        [
          "lapin"
        ],
        [
          "cheval"
        ]
      ]
    },
    {
      "id": "ce_016",
      "text": "Quelle est la boisson préférée de ton partenaire pour se détendre ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": [
        [
          "eau",
          "eau fraiche"
        ],
        [
          "jus",
          "jus de fruits",
          "jus d orange",
          "jus de mangue"
        ],
        [
          "soda",
          "coca",
          "coca cola"
        ],
        [
          "cafe",
          "espresso",
          "cappuccino"
        ],
        [
          "the",
          "infusion",
          "the a la menthe"
        ],
        [
          "cocktail",
          "mojito"
        ],
        [
          "vin",
          "vin rouge",
          "champagne"
        ],
        [
          "biere"
        ]
      ]
    },
    {
      "id": "ce_017",
      "text": "Quel est le dessert ou la douceur dont ton partenaire raffole ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": [
        [
          "chocolat",
          "gateau au chocolat",
          "fondant"
        ],
        [
          "glace",
          "creme glacee",
          "sorbet"
        ],
        [
          "crepes",
          "crepe",
          "gaufre"
        ],
        [
          "tiramisu"
        ],
        [
          "cheesecake"
        ],
        [
          "fruits",
          "salade de fruits"
        ]
      ]
    },
    {
      "id": "ce_018",
      "text": "Quel est le chiffre ou numéro fétiche de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_019",
      "text": "Quelle est la pointure de chaussures de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_020",
      "text": "Quelle est la plus grande qualité de ton partenaire à tes yeux ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": [
        [
          "gentillesse",
          "gentil",
          "bon coeur",
          "attentionne",
          "doux"
        ],
        [
          "fidelite",
          "fidele",
          "loyal",
          "loyaute"
        ],
        [
          "intelligence",
          "intelligent",
          "brillant"
        ],
        [
          "humour",
          "drole",
          "fait rire",
          "marrant"
        ],
        [
          "courage",
          "courageux",
          "travailleur",
          "ambitieux"
        ],
        [
          "beaute",
          "beau",
          "charme"
        ]
      ]
    },
    {
      "id": "ce_021",
      "text": "Quel est le plus grand défaut de ton partenaire quand il s'énerve ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": [
        [
          "tetu",
          "obstine",
          "tete dure",
          "tete de mule"
        ],
        [
          "fierte",
          "fier",
          "orgueil"
        ],
        [
          "impatient",
          "impatience",
          "s enerve vite"
        ],
        [
          "boudeur",
          "bouder",
          "ferme"
        ],
        [
          "froid",
          "distant"
        ],
        [
          "rancunier"
        ]
      ]
    },
    {
      "id": "ce_022",
      "text": "Quelle est la marque de vêtements ou de baskets que préfère ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": [
        [
          "nike"
        ],
        [
          "adidas"
        ],
        [
          "zara"
        ],
        [
          "jordan"
        ],
        [
          "puma"
        ],
        [
          "gucci"
        ],
        [
          "louis vuitton"
        ]
      ]
    },
    {
      "id": "ce_023",
      "text": "Quel est le type de cuisine que ton partenaire adore manger dehors ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": [
        [
          "africaine",
          "africain",
          "plats africains"
        ],
        [
          "italienne",
          "italien",
          "pates et pizza"
        ],
        [
          "chinoise",
          "asiatique",
          "japonais",
          "sushi"
        ],
        [
          "fast food",
          "burger",
          "americain"
        ],
        [
          "francaise",
          "bistrot"
        ]
      ]
    },
    {
      "id": "ce_024",
      "text": "Dans quel domaine d'études ton partenaire a-t-il obtenu son dernier diplôme ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": [
        [
          "commerce",
          "gestion",
          "marketing",
          "management",
          "business"
        ],
        [
          "droit",
          "juridique"
        ],
        [
          "informatique",
          "programmation",
          "tech"
        ],
        [
          "medecine",
          "sante",
          "soins",
          "pharmacie"
        ],
        [
          "lettres",
          "langues",
          "communication"
        ],
        [
          "ingenierie",
          "sciences"
        ]
      ]
    },
    {
      "id": "ce_025",
      "text": "Quelle est l'odeur ou le parfum qui caractérise le mieux ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_026",
      "text": "Quel est le sport que ton partenaire pratique ou aime le plus regarder ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": [
        [
          "foot",
          "football",
          "soccer",
          "ballon"
        ],
        [
          "basket",
          "basketball",
          "nba"
        ],
        [
          "tennis"
        ],
        [
          "musculation",
          "fitness",
          "gym"
        ],
        [
          "course",
          "running",
          "jogging"
        ],
        [
          "natation",
          "piscine"
        ]
      ]
    },
    {
      "id": "ce_027",
      "text": "Quel est le super-pouvoir que ton partenaire rêverait d'avoir ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": [
        [
          "voler",
          "le vol"
        ],
        [
          "teleportation",
          "se teleporter"
        ],
        [
          "invisibilite",
          "etre invisible"
        ],
        [
          "lire les pensees",
          "telepathie"
        ],
        [
          "voyager dans le temps",
          "arreter le temps",
          "controler le temps"
        ],
        [
          "force",
          "super force"
        ]
      ]
    },
    {
      "id": "ce_028",
      "text": "Quelle saison de l'année préfère ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": [
        [
          "ete",
          "la chaleur",
          "le soleil"
        ],
        [
          "hiver",
          "le froid"
        ],
        [
          "printemps",
          "les fleurs"
        ],
        [
          "automne",
          "les feuilles"
        ]
      ]
    },
    {
      "id": "ce_029",
      "text": "Quelle heure de la journée correspond le mieux à l'énergie de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": [
        [
          "matin",
          "matin tot",
          "l aube"
        ],
        [
          "midi",
          "apres midi"
        ],
        [
          "soir",
          "la soiree",
          "coucher de soleil"
        ],
        [
          "nuit",
          "tard la nuit"
        ]
      ]
    },
    {
      "id": "ce_030",
      "text": "Quel est le fruit préféré de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": [
        [
          "mangue"
        ],
        [
          "banane"
        ],
        [
          "fraise",
          "framboise"
        ],
        [
          "pomme"
        ],
        [
          "ananas"
        ],
        [
          "orange"
        ],
        [
          "pasteque"
        ],
        [
          "raisin"
        ],
        [
          "avocat"
        ]
      ]
    },
    {
      "id": "ce_031",
      "text": "Quel est le deuxième prénom de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_032",
      "text": "Quel est le signe astrologique de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_033",
      "text": "Quelle est la matière scolaire que ton partenaire détestait le plus ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_034",
      "text": "Quel est le talent caché le plus surprenant de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_035",
      "text": "Quelle est la première chose que fait ton partenaire en se réveillant ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_036",
      "text": "Quel est le dernier achat important réalisé par ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_037",
      "text": "Quelle est la couleur des yeux de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_038",
      "text": "Combien de frères et sœurs a ton partenaire au total ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_039",
      "text": "Quel est le vêtement dans lequel ton partenaire se sent le plus à l'aise ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_040",
      "text": "Quelle est la saveur de glace préférée de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_041",
      "text": "Quel est le réseau social sur lequel ton partenaire passe le plus de temps ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_042",
      "text": "Quel est le pays étranger que ton partenaire a le plus aimé visiter ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_043",
      "text": "Quelle est la chose qui fait immédiatement sourire ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_044",
      "text": "Quel est le type de film que ton partenaire refuse catégoriquement de regarder ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_045",
      "text": "Quel est le petit-déjeuner idéal de ton partenaire le week-end ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_046",
      "text": "Quelle est la pointure de bague ou le tour de doigt de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_047",
      "text": "Quel est l'objet sans lequel ton partenaire ne quitte jamais son domicile ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_048",
      "text": "Quel est le dernier livre lu par ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_049",
      "text": "Quelle est la plus grande fierté personnelle de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_050",
      "text": "Quelle est la voiture de rêve de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_051",
      "text": "Quel est le plat que ton partenaire prépare le mieux en cuisine ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_052",
      "text": "Quelle est la couleur que ton partenaire déteste porter ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_053",
      "text": "Quel est le genre musical que ton partenaire ne supporte pas d'écouter ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_054",
      "text": "Quel est le métier que ton partenaire voulait faire quand il était petit ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_055",
      "text": "Quel est le pire défaut de cuisine de ton partenaire selon lui-même ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_056",
      "text": "Quel est le premier travail étudiant ou petit boulot qu'a fait ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_057",
      "text": "Quel est le plus beau compliment que l'on puisse faire à ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_058",
      "text": "Quelle est l'habitude du quotidien dont ton partenaire n'arrive pas à se débarrasser ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_059",
      "text": "Quel est le mot ou l'expression que ton partenaire répète le plus souvent dans une journée ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_060",
      "text": "Quelle est la série télévisée que ton partenaire pourrait regarder 10 fois sans se lasser ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_061",
      "text": "Quelle est la fête de l'année préférée de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_062",
      "text": "Quel est l'endroit au monde où ton partenaire se sent le plus en paix ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_063",
      "text": "Quelle est la corvée ménagère que ton partenaire déteste faire par-dessus tout ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_064",
      "text": "Quelle est la partie du corps de ton partenaire dont il/elle est le plus fier(e) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_065",
      "text": "Quel est le jeu vidéo ou jeu de société que ton partenaire adore jouer ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_066",
      "text": "Quel est le plus grand regret du passé que ton partenaire a pu te confier ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_067",
      "text": "Quel est le cadeau d'anniversaire qui a le plus marqué ton partenaire dans sa vie ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_068",
      "text": "Quelle est la première qualité que ton partenaire a remarquée chez toi ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_069",
      "text": "Quel est le genre de temps météorologique qui donne le sourire à ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_070",
      "text": "Quel est l'animal que ton partenaire ne supporterait absolument pas d'avoir chez lui ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_071",
      "text": "Quelle est la première chose que ton partenaire ferait s'il gagnait au loto demain ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_072",
      "text": "Quel est le lieu de promenade favori de ton partenaire quand il a besoin de réfléchir ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_073",
      "text": "Quelle est la boisson chaude dont ton partenaire a besoin le matin pour démarrer ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_074",
      "text": "Quel est le fruit de mer ou poisson que ton partenaire adore déguster ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_075",
      "text": "Quel est le prénom du cousin ou de la cousine dont ton partenaire est le plus proche ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_076",
      "text": "Quel est le style de musique qui donne immédiatement envie de danser à ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_077",
      "text": "Quelle est la matière de vêtement que ton partenaire trouve la plus agréable (coton, soie, lin) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_078",
      "text": "Quel est le monument célèbre que ton partenaire rêve de voir en vrai de ses propres yeux ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_079",
      "text": "Quel est le type de cadeau qui touche le plus ton partenaire (matériel, voyage, surprise) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_080",
      "text": "Quelle est la chose que ton partenaire pardonne le plus difficilement chez les autres ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_081",
      "text": "Quel est le surnom que les parents de ton partenaire lui donnaient enfant ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_082",
      "text": "Quelle est la marque de téléphone préférée de ton partenaire (Apple, Samsung, etc.) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_083",
      "text": "Quel est le condiment ou sauce indispensable que ton partenaire met dans son assiette ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_084",
      "text": "Quelle est l'heure habituelle à laquelle ton partenaire va se coucher en semaine ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_085",
      "text": "Quel est le film d'enfance qui rappelle de merveilleux souvenirs à ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_086",
      "text": "Quel est le talent artistique que ton partenaire aimerait posséder (peindre, chanter, danser) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_087",
      "text": "Quelle est la chose la plus folle ou audacieuse que ton partenaire ait faite dans sa vie ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_088",
      "text": "Quel est le premier mot doux que ton partenaire t'a murmuré ou écrit ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_089",
      "text": "Quel est le lieu exact de naissance de ton partenaire (ville ou clinique) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_090",
      "text": "Quelle est la chaîne YouTube ou le créateur de contenu que ton partenaire suit le plus ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_091",
      "text": "Quelle est l'odeur de fleur ou d'huile essentielle qui apaise ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_092",
      "text": "Quel est le trait de caractère qui énerve le plus ton partenaire chez les gens faux ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_093",
      "text": "Quel est le prénom d'enfant que ton partenaire affectionne le plus pour le futur ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_094",
      "text": "Quelle est la pièce de la maison dans laquelle ton partenaire préfère passer son temps ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_095",
      "text": "Quel est le vêtement que tu portes que ton partenaire trouve le plus craquant sur toi ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_096",
      "text": "Quel est le type de paysage qui ressource le plus ton partenaire (forêt, montagne, océan, désert) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_097",
      "text": "Quelle est la matière scolaire dans laquelle ton partenaire excellait au collège ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_098",
      "text": "Quel est le moment de la journée où ton partenaire aime le plus t'appeler ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_099",
      "text": "Quelle est la saveur de chips ou d'apéritif que ton partenaire choisit au supermarché ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_100",
      "text": "Quelle est la valeur humaine que ton partenaire met au-dessus de tout dans la vie ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_101",
      "text": "Quel est le parfum de glace que ton partenaire ne commanderait jamais ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_102",
      "text": "Quelle est la destination proche où ton partenaire aimerait partir en week-end avec toi ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_103",
      "text": "Quel est le premier plat que ton partenaire t'a cuisiné de toute votre relation ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_104",
      "text": "Quel est le trait d'humour qui fait éclater de rire ton partenaire aux larmes ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_105",
      "text": "Quel est le sport extrême que ton partenaire oserait tenter (saut en parachute, plongée, etc.) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_106",
      "text": "Quelle est la leçon de vie la plus importante que ton partenaire a apprise de ses parents ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_107",
      "text": "Quel est le héros ou personnage de fiction auquel ton partenaire s'identifie le plus ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_108",
      "text": "Quelle est la première chose que ton partenaire regarde quand il rencontre quelqu'un ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_109",
      "text": "Quel est le parfum ou eau de toilette que porte ton partenaire lors des grandes occasions ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_110",
      "text": "Quelle est la citation ou phrase inspirante qui guide la vie de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_111",
      "text": "Quel est le plus grand rêve que vous avez formulé ensemble pour votre couple ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_112",
      "text": "Quelle est la marque de chocolat préférée de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_113",
      "text": "Quelle est la coupe de cheveux ou coiffure que ton partenaire préfère porter ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_114",
      "text": "Quel est le petit nom intime que ton partenaire utilise le plus quand vous êtes en visio ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_115",
      "text": "Quelle est la chose la plus romantique que ton partenaire ait jamais imaginée pour toi ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_116",
      "text": "Quel est le type de livre que ton partenaire préfère (roman, développement personnel, BD, manga) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_117",
      "text": "Quelle est la friandise d'enfance dont ton partenaire a la nostalgie ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "ce_118",
      "text": "Quelle est la plus belle preuve d'amour que ton partenaire t'a donnée jusqu'à aujourd'hui ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "ce_119",
      "text": "Quel est le premier concert ou spectacle musical auquel ton partenaire a assisté ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "ce_120",
      "text": "Quel est le lieu de votre premier baiser selon la mémoire de ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    }
  ],
  "memoire_couple": [
    {
      "id": "mc_001",
      "text": "En quel mois vous êtes-vous rencontrés pour la toute première fois ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_002",
      "text": "Où vous êtes-vous vus en vrai pour la première fois (ville ou lieu précis) ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_003",
      "text": "Quel était le tout premier surnom affectueux que vous vous êtes donné ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_004",
      "text": "Lors de votre premier date officiel, où êtes-vous allés manger ou boire un verre ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_005",
      "text": "Quel est le premier cadeau que tu as offert à ton partenaire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_006",
      "text": "En quelle année votre histoire d'amour a-t-elle officiellement commencé ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_007",
      "text": "Quel a été le premier voyage ou la première escapade que vous avez faite ensemble ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_008",
      "text": "Quel est le film que vous avez regardé ensemble la première fois ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_009",
      "text": "Quelle est la date de votre anniversaire de couple ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_010",
      "text": "Quel est votre restaurant ou café fétiche où vous aimez vous retrouver ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_011",
      "text": "Dans quel endroit précis avez-vous échangé votre premier baiser ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_012",
      "text": "Qui de vous deux a dit 'je t'aime' pour la toute première fois ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_013",
      "text": "Combien de temps s'est écoulé entre votre premier message et votre première rencontre ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_014",
      "text": "Quelle était la météo lors de votre toute première journée passée ensemble ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_015",
      "text": "Quel vêtement portait ton partenaire le jour où vous vous êtes vus pour la première fois ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_016",
      "text": "Quel a été votre plus gros fou rire mémorable partagé ensemble ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_017",
      "text": "Quelle a été la plus belle surprise préparée en secret par l'un de vous deux ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_018",
      "text": "Quelle est la plus longue période pendant laquelle vous êtes restés séparés par la distance ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_019",
      "text": "Dans quelle ville ou pays rêvez-vous de vous installer ensemble un jour ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_020",
      "text": "Quel est le plat que vous commandez ou cuisinez le plus souvent lors de vos retrouvailles ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_021",
      "text": "Quelle a été la toute première photo que vous avez prise ensemble ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_022",
      "text": "Quel est le surnom que vos amis ou vos familles utilisent pour désigner votre couple ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_023",
      "text": "Quel a été le premier obstacle important que vous avez surmonté main dans la main ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_024",
      "text": "Quelle est la chanson qui vous rappelle instantanément le début de votre histoire ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_025",
      "text": "À quelle heure de la journée ou de la nuit avez-vous échangé votre premier appel téléphonique ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_026",
      "text": "Quel est l'endroit précis où vous vous sentez le plus heureux quand vous êtes réunis ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_027",
      "text": "Quel est le souvenir de vacances à deux qui reste le plus magique dans votre cœur ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_028",
      "text": "Quel est le petit objet ou bijou que vous portez comme symbole de votre amour à distance ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_029",
      "text": "Quelle a été la dispute la plus ridicule dont vous riez aujourd'hui ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_030",
      "text": "Quel est le premier message ou texto marquant que vous avez conservé en favori ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_031",
      "text": "Où étiez-vous quand vous avez fêté votre tout premier Nouvel An ensemble ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_032",
      "text": "Quel est le premier plat maison que vous avez dégusté en tête-à-tête ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_033",
      "text": "Qui a fait le premier pas pour demander le numéro de l'autre ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_034",
      "text": "Quel a été le tout premier surnom rigolo ou moqueur que vous vous êtes donné ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_035",
      "text": "Quelle était la couleur du haut ou de la chemise que portait ton partenaire au premier date ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_036",
      "text": "Combien de kilomètres séparent vos deux résidences actuelles ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_037",
      "text": "Quel a été le tout premier concert, spectacle ou événement sportif vécu ensemble ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_038",
      "text": "Où avez-vous célébré votre tout premier anniversaire de relation ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_039",
      "text": "Quel est le premier mot ou la première phrase prononcée lors de votre toute première rencontre ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_040",
      "text": "Quel est le cadeau de ton partenaire qui t'a le plus ému aux larmes ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_041",
      "text": "Quelle a été la promesse la plus forte que vous vous êtes faite les yeux dans les yeux ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_042",
      "text": "Où aimeriez-vous organiser votre demande en mariage ou votre célébration de vie commune ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_043",
      "text": "Quel est le premier animal ou animal de compagnie dont vous vous êtes occupés ensemble ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_044",
      "text": "Quel est le dessert que vous partagez systématiquement à la petite cuillère ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_045",
      "text": "Quelle application avez-vous utilisée pour échanger vos tout premiers mots ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_046",
      "text": "Quelle est la première chose que ton partenaire a remarquée sur toi en arrivant au premier date ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_047",
      "text": "Où avez-vous passé votre première nuit blanche ensemble à discuter ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_048",
      "text": "Quel est le souvenir de rire le plus absurde que vous n'oublierez jamais ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_049",
      "text": "Quel a été le premier voyage en avion ou en train pris pour aller rejoindre l'autre ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_050",
      "text": "Quelle est la saison de l'année où votre amour a débuté ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_051",
      "text": "Quel est le premier membre de la famille de ton partenaire que tu as rencontré ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_052",
      "text": "Quelle a été votre première sortie cinéma ensemble et quel film passait à l'affiche ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_053",
      "text": "Quel est le tout premier projet d'avenir dont vous avez parlé dès les premières semaines ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_054",
      "text": "Combien d'heures a duré votre plus long appel téléphonique de tous les temps ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_055",
      "text": "Quel a été le premier mot doux chuchoté au creux de l'oreille ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_056",
      "text": "Dans quel lieu public avez-vous failli vous faire remarquer tellement vous riiez fort ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_057",
      "text": "Quelle a été la toute première dispute et sur quel sujet futile portait-elle ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_058",
      "text": "Quelle a été la première photo de ton partenaire que tu as mise en fond d'écran ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_059",
      "text": "Quel est le jour de la semaine où a eu lieu votre premier rendez-vous en amoureux ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_060",
      "text": "Quel est le premier compliment que ton partenaire t'a fait et qui t'a fait rougir ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_061",
      "text": "Quel endroit romantique gardez-vous dans votre cœur comme votre jardin secret ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_062",
      "text": "Quel a été le tout premier petit déjeuner au lit que vous avez partagé ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_063",
      "text": "Qui a envoyé le tout premier message du matin au lendemain de votre première rencontre ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_064",
      "text": "Quel est le prénom de la personne qui a provoqué ou assisté à votre rencontre ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_065",
      "text": "Quelle odeur ou parfum vous replonge instantanément dans votre première semaine d'amour ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_066",
      "text": "Quel est le vêtement de ton partenaire que tu lui as 'emprunté' sans jamais lui rendre ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_067",
      "text": "Quel a été le moment exact où tu as su dans ton cœur que c'était la bonne personne ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_068",
      "text": "Où étiez-vous quand vous vous êtes tenus la main en public pour la toute première fois ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_069",
      "text": "Quelle a été la première vidéo drôle ou TikTok que vous vous êtes partagée ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_070",
      "text": "Quel a été le moment le plus courageux affronté ensemble face à une épreuve ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_071",
      "text": "Quelle a été votre plus belle balade au coucher du soleil main dans la main ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_072",
      "text": "Quel est le premier mot de passe ou code secret que vous avez partagé en confiance ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_073",
      "text": "Quelle a été la première lettre ou carte postale envoyée par la poste entre vous deux ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_074",
      "text": "Quel est le premier repas commandé en livraison lors d'une soirée cocooning ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_075",
      "text": "Quel est le détail le plus mignon que ton partenaire répète à chaque fois qu'il te revoit ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_076",
      "text": "Où vous trouviez-vous lorsque vous avez officialisé votre couple auprès de vos amis ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_077",
      "text": "Quel a été le premier emoji que vous avez surutilisé dans vos discussions d'amoureux ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_078",
      "text": "Quel a été le premier jeu vidéo ou mini-jeu auquel vous avez joué en ligne ensemble ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_079",
      "text": "Quelle a été la plus belle attention reçue un jour où tu n'avais pas le moral ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_080",
      "text": "Quel est le geste tendre que ton partenaire fait toujours instinctivement sans s'en rendre compte ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_081",
      "text": "Quel est le lieu de votre premier baiser volé à l'abri des regards ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_082",
      "text": "Quelle date précise marquera vos 5 ou 10 ans d'amour partagé ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mc_083",
      "text": "Quel a été le premier moment où vous vous êtes sentis comme une vraie famille unie ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mc_084",
      "text": "Quelle promesse d'avenir renouvelez-vous à chaque fin d'appel avant de raccrocher ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mc_085",
      "text": "Quel est le mot final que vous écrivez toujours dans vos déclarations d'amour ?",
      "type": "ECRIT",
      "timer": 60,
      "difficulty": 1,
      "equivalences": []
    }
  ],
  "gouts_choix_multiple": [
    {
      "id": "gm_001",
      "text": "Quel cadeau ton partenaire préférerait-il/elle recevoir ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Voyage romantique",
        "Somme d'argent",
        "Restaurant gastronomique",
        "Bijou ou montre"
      ]
    },
    {
      "id": "gm_002",
      "text": "Quelle activité ton partenaire choisirait-il le week-end ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Plage et farniente",
        "Randonnée en nature",
        "Cinéma et popcorn",
        "Rester au lit en amoureux"
      ]
    },
    {
      "id": "gm_003",
      "text": "Si ton partenaire ne pouvait manger qu'un seul repas pour toujours :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Pizza artisanale",
        "Sushis et makis",
        "Plat traditionnel africain",
        "Burger gourmand"
      ]
    },
    {
      "id": "gm_004",
      "text": "Quelle ambiance préfère ton partenaire pour se détendre en soirée ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Musique douce et bougies",
        "Série passionnante sur Netflix",
        "Lecture d'un bon livre",
        "Session jeux vidéo"
      ]
    },
    {
      "id": "gm_005",
      "text": "Si ton partenaire recevait 50 millions FCFA, que ferait-il en premier ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Partir en tour du monde",
        "Investir dans l'immobilier",
        "Faire du shopping fou",
        "Aider sa famille"
      ]
    },
    {
      "id": "gm_006",
      "text": "Quel genre de film ton partenaire préfère-t-il regarder à deux ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Film d'horreur ou suspense",
        "Comédie pour rire aux larmes",
        "Romance émouvante",
        "Film d'action et aventures"
      ]
    },
    {
      "id": "gm_007",
      "text": "Où ton partenaire rêverait-il d'habiter idéalement ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Au cœur d'une grande mégapole",
        "Face à la mer sur une île",
        "Au calme à la campagne",
        "Dans une villa moderne à l'étranger"
      ]
    },
    {
      "id": "gm_008",
      "text": "Quel superpouvoir ton partenaire choisirait-il en priorité ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Pouvoir voler dans les airs",
        "La téléportation instantanée",
        "Lire dans les pensées des gens",
        "Maîtriser le temps"
      ]
    },
    {
      "id": "gm_009",
      "text": "Quel type de musique ton partenaire écoute-t-il le plus sur son téléphone ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Afrobeat et Afropop",
        "RnB et Soul sensuelle",
        "Variété et Pop internationale",
        "Gospel et chants spirituels"
      ]
    },
    {
      "id": "gm_010",
      "text": "Quel genre de vacances correspond le mieux à ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Hôtel tout inclus les pieds dans l'eau",
        "Road-trip aventure sac au dos",
        "Détente absolue et spa",
        "Voyage culturel et musées"
      ]
    },
    {
      "id": "gm_011",
      "text": "Quel style de voiture ton partenaire préfère-t-il ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Gros SUV tout confort",
        "Voiture de sport puissante",
        "Berline sobre et luxueuse",
        "Voiture électrique moderne"
      ]
    },
    {
      "id": "gm_012",
      "text": "Quelle boisson ton partenaire commande-t-il en terrasse l'été ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Cocktail exotique fruité",
        "Boisson gazeuse bien fraîche",
        "Bière artisanale",
        "Thé glacé ou smoothie"
      ]
    },
    {
      "id": "gm_013",
      "text": "Pour fêter un grand événement, ton partenaire préfère :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Grande fête avec plein d'amis",
        "Dîner intime juste vous deux",
        "Week-end dans un bel hôtel",
        "Voyage surprise express"
      ]
    },
    {
      "id": "gm_014",
      "text": "Quel style vestimentaire met le plus en valeur ton partenaire selon lui ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Chic et élégant sur son 31",
        "Streetwear décontracté branché",
        "Sportswear confortable",
        "Style bohème décontracté"
      ]
    },
    {
      "id": "gm_015",
      "text": "Si ton partenaire pouvait apprendre un instrument de musique instantanément :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Le piano mélodieux",
        "La guitare acoustique",
        "La batterie dynamique",
        "Le violon émouvant"
      ]
    },
    {
      "id": "gm_016",
      "text": "Quelle heure de réveil convient le mieux au rythme naturel de ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Aux aurores avant 6h30",
        "Matinée standard vers 8h00",
        "Matinée tranquille vers 10h00",
        "Midi passé sans réveil"
      ]
    },
    {
      "id": "gm_017",
      "text": "Quel est le réseau social préféré de ton partenaire pour faire défiler le fil ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Instagram et ses belles photos",
        "TikTok et ses vidéos rythmées",
        "X (Twitter) pour l'actu",
        "YouTube pour les formats longs"
      ]
    },
    {
      "id": "gm_018",
      "text": "Quelle est la qualité principale que ton partenaire cherche chez ses amis proches ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Une loyauté à toute épreuve",
        "Un sens de l'humour communicatif",
        "Une grande écoute et empathie",
        "Une ambition stimulante"
      ]
    },
    {
      "id": "gm_019",
      "text": "Quelle saveur de glace ton partenaire prend-il sans hésiter une seconde ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Vanille intense ou pistache",
        "Chocolat noir gourmand",
        "Fraise ou framboise acidulée",
        "Caramel beurre salé"
      ]
    },
    {
      "id": "gm_020",
      "text": "Pour faire du sport, ton partenaire préfère quelle discipline ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Musculation en salle de sport",
        "Course à pied ou vélo dehors",
        "Sports collectifs (foot, basket)",
        "Yoga, stretching et calme"
      ]
    },
    {
      "id": "gm_021",
      "text": "Selon toi, pour le petit déjeuner préféré (Option n°1), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Pancakes au sirop d'érable",
        "Croissants chauds au beurre",
        "Œufs brouillés et bacon",
        "Fruits frais et yaourt bio"
      ]
    },
    {
      "id": "gm_022",
      "text": "Selon toi, pour le petit déjeuner préféré (Option n°2), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Pancakes au sirop d'érable",
        "Croissants chauds au beurre",
        "Œufs brouillés et bacon",
        "Fruits frais et yaourt bio"
      ]
    },
    {
      "id": "gm_023",
      "text": "Selon toi, pour le petit déjeuner préféré (Option n°3), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Pancakes au sirop d'érable",
        "Croissants chauds au beurre",
        "Œufs brouillés et bacon",
        "Fruits frais et yaourt bio"
      ]
    },
    {
      "id": "gm_024",
      "text": "Selon toi, pour le petit déjeuner préféré (Option n°4), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Pancakes au sirop d'érable",
        "Croissants chauds au beurre",
        "Œufs brouillés et bacon",
        "Fruits frais et yaourt bio"
      ]
    },
    {
      "id": "gm_025",
      "text": "Selon toi, pour le petit déjeuner préféré (Option n°5), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Pancakes au sirop d'érable",
        "Croissants chauds au beurre",
        "Œufs brouillés et bacon",
        "Fruits frais et yaourt bio"
      ]
    },
    {
      "id": "gm_026",
      "text": "Selon toi, pour le petit déjeuner préféré (Option n°6), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Pancakes au sirop d'érable",
        "Croissants chauds au beurre",
        "Œufs brouillés et bacon",
        "Fruits frais et yaourt bio"
      ]
    },
    {
      "id": "gm_027",
      "text": "Selon toi, pour le petit déjeuner préféré (Option n°7), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Pancakes au sirop d'érable",
        "Croissants chauds au beurre",
        "Œufs brouillés et bacon",
        "Fruits frais et yaourt bio"
      ]
    },
    {
      "id": "gm_028",
      "text": "Selon toi, pour le petit déjeuner préféré (Option n°8), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Pancakes au sirop d'érable",
        "Croissants chauds au beurre",
        "Œufs brouillés et bacon",
        "Fruits frais et yaourt bio"
      ]
    },
    {
      "id": "gm_029",
      "text": "Selon toi, pour le petit déjeuner préféré (Option n°9), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Pancakes au sirop d'érable",
        "Croissants chauds au beurre",
        "Œufs brouillés et bacon",
        "Fruits frais et yaourt bio"
      ]
    },
    {
      "id": "gm_030",
      "text": "Selon toi, pour la saison idéale pour voyager (Option n°1), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Le plein été ensoleillé",
        "Le printemps fleuri",
        "L'automne aux mille couleurs",
        "L'hiver sous la neige"
      ]
    },
    {
      "id": "gm_031",
      "text": "Selon toi, pour la saison idéale pour voyager (Option n°2), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Le plein été ensoleillé",
        "Le printemps fleuri",
        "L'automne aux mille couleurs",
        "L'hiver sous la neige"
      ]
    },
    {
      "id": "gm_032",
      "text": "Selon toi, pour la saison idéale pour voyager (Option n°3), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Le plein été ensoleillé",
        "Le printemps fleuri",
        "L'automne aux mille couleurs",
        "L'hiver sous la neige"
      ]
    },
    {
      "id": "gm_033",
      "text": "Selon toi, pour la saison idéale pour voyager (Option n°4), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Le plein été ensoleillé",
        "Le printemps fleuri",
        "L'automne aux mille couleurs",
        "L'hiver sous la neige"
      ]
    },
    {
      "id": "gm_034",
      "text": "Selon toi, pour la saison idéale pour voyager (Option n°5), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Le plein été ensoleillé",
        "Le printemps fleuri",
        "L'automne aux mille couleurs",
        "L'hiver sous la neige"
      ]
    },
    {
      "id": "gm_035",
      "text": "Selon toi, pour la saison idéale pour voyager (Option n°6), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Le plein été ensoleillé",
        "Le printemps fleuri",
        "L'automne aux mille couleurs",
        "L'hiver sous la neige"
      ]
    },
    {
      "id": "gm_036",
      "text": "Selon toi, pour la saison idéale pour voyager (Option n°7), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Le plein été ensoleillé",
        "Le printemps fleuri",
        "L'automne aux mille couleurs",
        "L'hiver sous la neige"
      ]
    },
    {
      "id": "gm_037",
      "text": "Selon toi, pour la saison idéale pour voyager (Option n°8), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Le plein été ensoleillé",
        "Le printemps fleuri",
        "L'automne aux mille couleurs",
        "L'hiver sous la neige"
      ]
    },
    {
      "id": "gm_038",
      "text": "Selon toi, pour la saison idéale pour voyager (Option n°9), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Le plein été ensoleillé",
        "Le printemps fleuri",
        "L'automne aux mille couleurs",
        "L'hiver sous la neige"
      ]
    },
    {
      "id": "gm_039",
      "text": "Selon toi, pour la soirée en amoureux rêvée (Option n°1), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dîner aux chandelles au resto",
        "Cuisiner ensemble en musique",
        "Film sous la couette avec des snacks",
        "Balade nocturne à la belle étoile"
      ]
    },
    {
      "id": "gm_040",
      "text": "Selon toi, pour la soirée en amoureux rêvée (Option n°2), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dîner aux chandelles au resto",
        "Cuisiner ensemble en musique",
        "Film sous la couette avec des snacks",
        "Balade nocturne à la belle étoile"
      ]
    },
    {
      "id": "gm_041",
      "text": "Selon toi, pour la soirée en amoureux rêvée (Option n°3), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dîner aux chandelles au resto",
        "Cuisiner ensemble en musique",
        "Film sous la couette avec des snacks",
        "Balade nocturne à la belle étoile"
      ]
    },
    {
      "id": "gm_042",
      "text": "Selon toi, pour la soirée en amoureux rêvée (Option n°4), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dîner aux chandelles au resto",
        "Cuisiner ensemble en musique",
        "Film sous la couette avec des snacks",
        "Balade nocturne à la belle étoile"
      ]
    },
    {
      "id": "gm_043",
      "text": "Selon toi, pour la soirée en amoureux rêvée (Option n°5), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dîner aux chandelles au resto",
        "Cuisiner ensemble en musique",
        "Film sous la couette avec des snacks",
        "Balade nocturne à la belle étoile"
      ]
    },
    {
      "id": "gm_044",
      "text": "Selon toi, pour la soirée en amoureux rêvée (Option n°6), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dîner aux chandelles au resto",
        "Cuisiner ensemble en musique",
        "Film sous la couette avec des snacks",
        "Balade nocturne à la belle étoile"
      ]
    },
    {
      "id": "gm_045",
      "text": "Selon toi, pour la soirée en amoureux rêvée (Option n°7), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dîner aux chandelles au resto",
        "Cuisiner ensemble en musique",
        "Film sous la couette avec des snacks",
        "Balade nocturne à la belle étoile"
      ]
    },
    {
      "id": "gm_046",
      "text": "Selon toi, pour la soirée en amoureux rêvée (Option n°8), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dîner aux chandelles au resto",
        "Cuisiner ensemble en musique",
        "Film sous la couette avec des snacks",
        "Balade nocturne à la belle étoile"
      ]
    },
    {
      "id": "gm_047",
      "text": "Selon toi, pour la soirée en amoureux rêvée (Option n°9), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dîner aux chandelles au resto",
        "Cuisiner ensemble en musique",
        "Film sous la couette avec des snacks",
        "Balade nocturne à la belle étoile"
      ]
    },
    {
      "id": "gm_048",
      "text": "Selon toi, pour le type de smartphone favori (Option n°1), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Le dernier iPhone haut de gamme",
        "Le dernier Samsung Galaxy Ultra",
        "Un téléphone compact et simple",
        "Peu importe tant que la batterie dure"
      ]
    },
    {
      "id": "gm_049",
      "text": "Selon toi, pour le type de smartphone favori (Option n°2), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Le dernier iPhone haut de gamme",
        "Le dernier Samsung Galaxy Ultra",
        "Un téléphone compact et simple",
        "Peu importe tant que la batterie dure"
      ]
    },
    {
      "id": "gm_050",
      "text": "Selon toi, pour le type de smartphone favori (Option n°3), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Le dernier iPhone haut de gamme",
        "Le dernier Samsung Galaxy Ultra",
        "Un téléphone compact et simple",
        "Peu importe tant que la batterie dure"
      ]
    },
    {
      "id": "gm_051",
      "text": "Selon toi, pour le type de smartphone favori (Option n°4), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Le dernier iPhone haut de gamme",
        "Le dernier Samsung Galaxy Ultra",
        "Un téléphone compact et simple",
        "Peu importe tant que la batterie dure"
      ]
    },
    {
      "id": "gm_052",
      "text": "Selon toi, pour le type de smartphone favori (Option n°5), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Le dernier iPhone haut de gamme",
        "Le dernier Samsung Galaxy Ultra",
        "Un téléphone compact et simple",
        "Peu importe tant que la batterie dure"
      ]
    },
    {
      "id": "gm_053",
      "text": "Selon toi, pour le type de smartphone favori (Option n°6), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Le dernier iPhone haut de gamme",
        "Le dernier Samsung Galaxy Ultra",
        "Un téléphone compact et simple",
        "Peu importe tant que la batterie dure"
      ]
    },
    {
      "id": "gm_054",
      "text": "Selon toi, pour le type de smartphone favori (Option n°7), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Le dernier iPhone haut de gamme",
        "Le dernier Samsung Galaxy Ultra",
        "Un téléphone compact et simple",
        "Peu importe tant que la batterie dure"
      ]
    },
    {
      "id": "gm_055",
      "text": "Selon toi, pour le type de smartphone favori (Option n°8), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Le dernier iPhone haut de gamme",
        "Le dernier Samsung Galaxy Ultra",
        "Un téléphone compact et simple",
        "Peu importe tant que la batterie dure"
      ]
    },
    {
      "id": "gm_056",
      "text": "Selon toi, pour le type de smartphone favori (Option n°9), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Le dernier iPhone haut de gamme",
        "Le dernier Samsung Galaxy Ultra",
        "Un téléphone compact et simple",
        "Peu importe tant que la batterie dure"
      ]
    },
    {
      "id": "gm_057",
      "text": "Selon toi, pour le lieu de shopping idéal (Option n°1), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Les grands centres commerciaux",
        "Les friperies et boutiques vintage",
        "Le shopping en ligne depuis son lit",
        "Les marchés locaux animés"
      ]
    },
    {
      "id": "gm_058",
      "text": "Selon toi, pour le lieu de shopping idéal (Option n°2), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Les grands centres commerciaux",
        "Les friperies et boutiques vintage",
        "Le shopping en ligne depuis son lit",
        "Les marchés locaux animés"
      ]
    },
    {
      "id": "gm_059",
      "text": "Selon toi, pour le lieu de shopping idéal (Option n°3), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Les grands centres commerciaux",
        "Les friperies et boutiques vintage",
        "Le shopping en ligne depuis son lit",
        "Les marchés locaux animés"
      ]
    },
    {
      "id": "gm_060",
      "text": "Selon toi, pour le lieu de shopping idéal (Option n°4), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Les grands centres commerciaux",
        "Les friperies et boutiques vintage",
        "Le shopping en ligne depuis son lit",
        "Les marchés locaux animés"
      ]
    },
    {
      "id": "gm_061",
      "text": "Selon toi, pour le lieu de shopping idéal (Option n°5), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Les grands centres commerciaux",
        "Les friperies et boutiques vintage",
        "Le shopping en ligne depuis son lit",
        "Les marchés locaux animés"
      ]
    },
    {
      "id": "gm_062",
      "text": "Selon toi, pour le lieu de shopping idéal (Option n°6), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Les grands centres commerciaux",
        "Les friperies et boutiques vintage",
        "Le shopping en ligne depuis son lit",
        "Les marchés locaux animés"
      ]
    },
    {
      "id": "gm_063",
      "text": "Selon toi, pour le lieu de shopping idéal (Option n°7), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Les grands centres commerciaux",
        "Les friperies et boutiques vintage",
        "Le shopping en ligne depuis son lit",
        "Les marchés locaux animés"
      ]
    },
    {
      "id": "gm_064",
      "text": "Selon toi, pour le lieu de shopping idéal (Option n°8), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Les grands centres commerciaux",
        "Les friperies et boutiques vintage",
        "Le shopping en ligne depuis son lit",
        "Les marchés locaux animés"
      ]
    },
    {
      "id": "gm_065",
      "text": "Selon toi, pour le lieu de shopping idéal (Option n°9), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Les grands centres commerciaux",
        "Les friperies et boutiques vintage",
        "Le shopping en ligne depuis son lit",
        "Les marchés locaux animés"
      ]
    },
    {
      "id": "gm_066",
      "text": "Selon toi, pour le parfum d'ambiance favori à la maison (Option n°1), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Senteur vanille gourmande",
        "Fleurs de coton et fraîcheur",
        "Bois de santal boisé",
        "Agrumes et fleur d'oranger"
      ]
    },
    {
      "id": "gm_067",
      "text": "Selon toi, pour le parfum d'ambiance favori à la maison (Option n°2), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Senteur vanille gourmande",
        "Fleurs de coton et fraîcheur",
        "Bois de santal boisé",
        "Agrumes et fleur d'oranger"
      ]
    },
    {
      "id": "gm_068",
      "text": "Selon toi, pour le parfum d'ambiance favori à la maison (Option n°3), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Senteur vanille gourmande",
        "Fleurs de coton et fraîcheur",
        "Bois de santal boisé",
        "Agrumes et fleur d'oranger"
      ]
    },
    {
      "id": "gm_069",
      "text": "Selon toi, pour le parfum d'ambiance favori à la maison (Option n°4), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Senteur vanille gourmande",
        "Fleurs de coton et fraîcheur",
        "Bois de santal boisé",
        "Agrumes et fleur d'oranger"
      ]
    },
    {
      "id": "gm_070",
      "text": "Selon toi, pour le parfum d'ambiance favori à la maison (Option n°5), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Senteur vanille gourmande",
        "Fleurs de coton et fraîcheur",
        "Bois de santal boisé",
        "Agrumes et fleur d'oranger"
      ]
    },
    {
      "id": "gm_071",
      "text": "Selon toi, pour le parfum d'ambiance favori à la maison (Option n°6), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Senteur vanille gourmande",
        "Fleurs de coton et fraîcheur",
        "Bois de santal boisé",
        "Agrumes et fleur d'oranger"
      ]
    },
    {
      "id": "gm_072",
      "text": "Selon toi, pour le parfum d'ambiance favori à la maison (Option n°7), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Senteur vanille gourmande",
        "Fleurs de coton et fraîcheur",
        "Bois de santal boisé",
        "Agrumes et fleur d'oranger"
      ]
    },
    {
      "id": "gm_073",
      "text": "Selon toi, pour le parfum d'ambiance favori à la maison (Option n°8), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Senteur vanille gourmande",
        "Fleurs de coton et fraîcheur",
        "Bois de santal boisé",
        "Agrumes et fleur d'oranger"
      ]
    },
    {
      "id": "gm_074",
      "text": "Selon toi, pour le parfum d'ambiance favori à la maison (Option n°9), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Senteur vanille gourmande",
        "Fleurs de coton et fraîcheur",
        "Bois de santal boisé",
        "Agrumes et fleur d'oranger"
      ]
    },
    {
      "id": "gm_075",
      "text": "Selon toi, pour le type d'animaux de compagnie adoré (Option n°1), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Un chien joueur et protecteur",
        "Un chat calme et indépendant",
        "Un aquarium magnifique",
        "Aucun animal à la maison"
      ]
    },
    {
      "id": "gm_076",
      "text": "Selon toi, pour le type d'animaux de compagnie adoré (Option n°2), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Un chien joueur et protecteur",
        "Un chat calme et indépendant",
        "Un aquarium magnifique",
        "Aucun animal à la maison"
      ]
    },
    {
      "id": "gm_077",
      "text": "Selon toi, pour le type d'animaux de compagnie adoré (Option n°3), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Un chien joueur et protecteur",
        "Un chat calme et indépendant",
        "Un aquarium magnifique",
        "Aucun animal à la maison"
      ]
    },
    {
      "id": "gm_078",
      "text": "Selon toi, pour le type d'animaux de compagnie adoré (Option n°4), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Un chien joueur et protecteur",
        "Un chat calme et indépendant",
        "Un aquarium magnifique",
        "Aucun animal à la maison"
      ]
    },
    {
      "id": "gm_079",
      "text": "Selon toi, pour le type d'animaux de compagnie adoré (Option n°5), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Un chien joueur et protecteur",
        "Un chat calme et indépendant",
        "Un aquarium magnifique",
        "Aucun animal à la maison"
      ]
    },
    {
      "id": "gm_080",
      "text": "Selon toi, pour le type d'animaux de compagnie adoré (Option n°6), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Un chien joueur et protecteur",
        "Un chat calme et indépendant",
        "Un aquarium magnifique",
        "Aucun animal à la maison"
      ]
    },
    {
      "id": "gm_081",
      "text": "Selon toi, pour le type d'animaux de compagnie adoré (Option n°7), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Un chien joueur et protecteur",
        "Un chat calme et indépendant",
        "Un aquarium magnifique",
        "Aucun animal à la maison"
      ]
    },
    {
      "id": "gm_082",
      "text": "Selon toi, pour le type d'animaux de compagnie adoré (Option n°8), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Un chien joueur et protecteur",
        "Un chat calme et indépendant",
        "Un aquarium magnifique",
        "Aucun animal à la maison"
      ]
    },
    {
      "id": "gm_083",
      "text": "Selon toi, pour le type d'animaux de compagnie adoré (Option n°9), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Un chien joueur et protecteur",
        "Un chat calme et indépendant",
        "Un aquarium magnifique",
        "Aucun animal à la maison"
      ]
    },
    {
      "id": "gm_084",
      "text": "Selon toi, pour le jeu idéal lors d'une soirée à deux (Option n°1), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Jeu de cartes et Uno",
        "Jeu de société de stratégie",
        "Jeu vidéo en coopération",
        "Jeu de questions et complicité"
      ]
    },
    {
      "id": "gm_085",
      "text": "Selon toi, pour le jeu idéal lors d'une soirée à deux (Option n°2), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Jeu de cartes et Uno",
        "Jeu de société de stratégie",
        "Jeu vidéo en coopération",
        "Jeu de questions et complicité"
      ]
    },
    {
      "id": "gm_086",
      "text": "Selon toi, pour le jeu idéal lors d'une soirée à deux (Option n°3), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Jeu de cartes et Uno",
        "Jeu de société de stratégie",
        "Jeu vidéo en coopération",
        "Jeu de questions et complicité"
      ]
    },
    {
      "id": "gm_087",
      "text": "Selon toi, pour le jeu idéal lors d'une soirée à deux (Option n°4), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Jeu de cartes et Uno",
        "Jeu de société de stratégie",
        "Jeu vidéo en coopération",
        "Jeu de questions et complicité"
      ]
    },
    {
      "id": "gm_088",
      "text": "Selon toi, pour le jeu idéal lors d'une soirée à deux (Option n°5), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Jeu de cartes et Uno",
        "Jeu de société de stratégie",
        "Jeu vidéo en coopération",
        "Jeu de questions et complicité"
      ]
    },
    {
      "id": "gm_089",
      "text": "Selon toi, pour le jeu idéal lors d'une soirée à deux (Option n°6), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Jeu de cartes et Uno",
        "Jeu de société de stratégie",
        "Jeu vidéo en coopération",
        "Jeu de questions et complicité"
      ]
    },
    {
      "id": "gm_090",
      "text": "Selon toi, pour le jeu idéal lors d'une soirée à deux (Option n°7), ton partenaire choisirait :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Jeu de cartes et Uno",
        "Jeu de société de stratégie",
        "Jeu vidéo en coopération",
        "Jeu de questions et complicité"
      ]
    }
  ],
  "qui_fait_ca": [
    {
      "id": "qf_001",
      "text": "Qui risque de s'endormir le premier devant un film le soir ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_002",
      "text": "Qui est le plus susceptible d'oublier où il/elle a garé la voiture ou posé ses clés ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_003",
      "text": "Qui fait le premier pas pour désamorcer une bouderie avec un câlin ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_004",
      "text": "Qui serait le plus stressé si un vol est annulé à la dernière minute ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_005",
      "text": "Qui verse une larme le plus facilement devant une scène touchante ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_006",
      "text": "Qui paniquerait le premier en cas de coupure d'électricité en pleine nuit ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_007",
      "text": "Qui mange les restes du frigo le lendemain sans aucune hésitation ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_008",
      "text": "Qui serait capable de faire une folie shopping sur un coup de tête ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_009",
      "text": "Qui est le plus courageux pour tuer une araignée dans la chambre ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_010",
      "text": "Qui passe le plus d'heures par semaine à faire défiler les réseaux sociaux ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_011",
      "text": "Qui est le meilleur pour garder un secret d'ami sans rien dévoiler ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_012",
      "text": "Qui est le plus susceptible de se tromper de direction même avec le GPS allumé ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_013",
      "text": "Qui a le plus de patience pour faire la queue dans un magasin ou une administration ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_014",
      "text": "Qui dépenserait tout son salaire dès le premier week-end après la paie ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_015",
      "text": "Qui est le plus difficile à supporter quand il/elle a faim ou sommeil ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_016",
      "text": "Qui a le rire le plus communicatif qui contamine toute la pièce ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_017",
      "text": "Qui est le plus susceptible de se lever à 2h du matin pour grignoter un snack ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_018",
      "text": "Qui met le plus de temps à choisir sa tenue avant une soirée ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_019",
      "text": "Qui envoie le plus de vocaux de 3 minutes sur WhatsApp ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_020",
      "text": "Qui est le plus doué pour faire baisser les prix ou négocier ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_021",
      "text": "Qui a le plus tendance à dramatiser un petit bobo ou un rhume ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_022",
      "text": "Qui est le plus maniaque sur la propreté des draps et de la literie ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_023",
      "text": "Qui a le sens de l'orientation le plus fiable en voyage ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_024",
      "text": "Qui prend le plus de photos et vidéos pendant les vacances ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_025",
      "text": "Qui dit 'j'arrive dans 5 minutes' alors qu'il/elle est encore sous la douche ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_026",
      "text": "Qui est le plus frileux et vole toute la couette pendant la nuit ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_027",
      "text": "Qui a le plus de facilité à se faire de nouveaux amis en 5 minutes ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_028",
      "text": "Qui est le plus rancunier et peut se souvenir d'un détail vieux de 6 mois ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_029",
      "text": "Qui chante le plus faux mais avec le plus d'assurance sous la douche ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_030",
      "text": "Qui est le plus gourmand face à un gâteau ou une tablette de chocolat ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_031",
      "text": "Qui a le sommeil le plus profond au point de ne pas entendre la sonnerie du réveil ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_032",
      "text": "Qui range et organise toujours les valises avant un départ ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_033",
      "text": "Qui perd le plus souvent ses écouteurs, chargeurs ou lunettes ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_034",
      "text": "Qui donne le plus de surnoms mignons et ridicules à l'autre ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_035",
      "text": "Qui s'énerve le plus vite quand la connexion Internet rame ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_036",
      "text": "Qui a la mémoire des dates d'anniversaires de toute la famille élargie ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_037",
      "text": "Qui est le plus susceptible de ramener un animal errant à la maison ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_038",
      "text": "Qui passe le plus de temps devant le miroir pour perfectionner sa coiffure ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_039",
      "text": "Qui fait les plus beaux compliments spontanés au cours de la journée ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_040",
      "text": "Qui a le plus de mal à jeter les vieux vêtements ou objets sentimentaux ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_041",
      "text": "Qui prépare les meilleurs petits déjeuners le dimanche matin ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_042",
      "text": "Qui est le plus calme et zen quand une tuile mécanique ou domestique arrive ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_043",
      "text": "Qui est le plus accro au café ou au thé pour démarrer sa journée ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_044",
      "text": "Qui aime le plus danser et mettre de l'ambiance dès qu'une musique résonne ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_045",
      "text": "Qui est le plus susceptible de commander des trucs inutiles sur Internet tard le soir ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_046",
      "text": "Qui pose le plus de questions pendant qu'un film à suspense est en cours ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_047",
      "text": "Qui garde son téléphone portable en mode silencieux 24h sur 24 ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_048",
      "text": "Qui est le plus compétitif même lors d'une simple partie de cartes amicale ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_049",
      "text": "Qui écrit les plus longs messages d'amour quand vous êtes éloignés ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_050",
      "text": "Qui est le plus pudique et timide pour manifester son affection en public ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_051",
      "text": "Qui est le plus créatif pour imaginer des scénarios catastrophe dans sa tête ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_052",
      "text": "Qui est le plus à l'aise pour prendre la parole en public devant 50 personnes ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_053",
      "text": "Qui choisit toujours le programme télé ou la playlist musicale en voiture ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_054",
      "text": "Qui a le plus de mal à sortir du lit le lundi matin ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_055",
      "text": "Qui est le plus protecteur et jaloux de son espace personnel ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_056",
      "text": "Qui se souvient exactement de ce qu'il a mangé il y a trois jours ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_057",
      "text": "Qui est le plus susceptible de se faire arnaquer par un faux démarcheur ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_058",
      "text": "Qui sait le mieux faire semblant d'aimer un cadeau raté par politesse ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_059",
      "text": "Qui a le cœur sur la main et donnerait sa dernière chemise à un ami ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_060",
      "text": "Qui laisse toujours 1% de batterie sur son téléphone sans le brancher ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_061",
      "text": "Qui met le plus d'épices ou de piment dans ses plats cuisinés ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_062",
      "text": "Qui a le plus de mal à avouer qu'il/elle avait tort lors d'un débat animé ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_063",
      "text": "Qui est le plus souvent en train de fredonner un refrain dans sa tête ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_064",
      "text": "Qui s'inquiète le plus vite quand l'autre ne donne pas de nouvelles pendant 3 heures ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_065",
      "text": "Qui est le plus ordonné pour classer ses papiers et documents officiels ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_066",
      "text": "Qui fait le plus rire les parents et la belle-famille lors des repas de fête ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_067",
      "text": "Qui a le plus de tics ou de petites manies drôles au quotidien ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_068",
      "text": "Qui est le plus expressif avec ses yeux et ses sourcils quand il désapprouve ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_069",
      "text": "Qui aime le plus tester des recettes bizarres trouvées sur les réseaux ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_070",
      "text": "Qui est le plus doué pour faire des massages relaxants à l'autre ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_071",
      "text": "Qui passe le plus de temps à choisir sa photo de profil idéale ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_072",
      "text": "Qui oublie le plus souvent d'éteindre les lumières en quittant une pièce ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_073",
      "text": "Qui a le plus de livres commencés sur sa table de chevet sans les finir ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_074",
      "text": "Qui a le plus de talent pour imiter les voix ou les accents des gens ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_075",
      "text": "Qui s'attache le plus vite aux personnages d'une série télévisée ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_076",
      "text": "Qui est le plus matinal même quand il n'y a aucune obligation de travail ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_077",
      "text": "Qui a le plus de patience pour démêler un nœud de collier ou d'écouteurs ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_078",
      "text": "Qui choisit toujours les restaurants les plus délicieux quand vous sortez ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_079",
      "text": "Qui est le plus nostalgique des photos et vidéos prises au début de votre relation ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_080",
      "text": "Qui est le plus rapide pour faire ses valises avant un week-end impromptu ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_081",
      "text": "Qui fait le plus attention à son alimentation et ses calories au quotidien ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_082",
      "text": "Qui est le plus doué pour réconforter l'autre avec les mots justes ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_083",
      "text": "Qui aime le plus les balades nocturnes romantiques sous les lampadaires ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_084",
      "text": "Qui a le plus de mal à dire 'au revoir' au moment de raccrocher l'appel ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_085",
      "text": "Qui a le plus grand nombre d'onglets ouverts en même temps sur son navigateur ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_086",
      "text": "Qui est le premier à remarquer quand l'autre a changé de coiffure ou de parfum ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_087",
      "text": "Qui est le plus enthousiaste à l'idée d'organiser une fête d'anniversaire surprise ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    },
    {
      "id": "qf_088",
      "text": "Qui a le plus confiance en son intuition et son sixième sens ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 1
    },
    {
      "id": "qf_089",
      "text": "Qui est le rayon de soleil qui redonne le sourire à l'autre dans les moments gris ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 2
    },
    {
      "id": "qf_090",
      "text": "Qui aime le plus fort et le montre au centuple chaque jour ?",
      "type": "MOI_LUI",
      "timer": 20,
      "difficulty": 3
    }
  ],
  "meme_pensee": [
    {
      "id": "mp_001",
      "text": "Pensez chacun à une couleur. Écrivez la première qui vous vient à l'esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "bleu",
          "azur",
          "bleu marine",
          "bleu ciel"
        ],
        [
          "rouge",
          "pourpre",
          "bordeaux"
        ],
        [
          "vert",
          "kaki",
          "vert pomme"
        ],
        [
          "jaune",
          "or"
        ],
        [
          "noir",
          "sombre"
        ],
        [
          "blanc",
          "creme"
        ],
        [
          "rose",
          "magenta",
          "fuchsia"
        ]
      ]
    },
    {
      "id": "mp_002",
      "text": "Pensez chacun à un animal. Écrivez le premier qui vous vient à l'esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "chien",
          "chiot",
          "toutou"
        ],
        [
          "chat",
          "chaton",
          "minou"
        ],
        [
          "lion",
          "lionne"
        ],
        [
          "tigre"
        ],
        [
          "elephant"
        ],
        [
          "cheval"
        ],
        [
          "dauphin"
        ],
        [
          "aigle"
        ]
      ]
    },
    {
      "id": "mp_003",
      "text": "Pensez chacun à un chiffre entre 1 et 10. Écrivez-le en chiffres.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_004",
      "text": "Pensez chacun à un pays d'Afrique ou d'Europe. Écrivez le premier qui vous vient.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "cote d ivoire",
          "civ",
          "abidjan"
        ],
        [
          "france",
          "paris"
        ],
        [
          "senegal",
          "dakar"
        ],
        [
          "benin",
          "cotonou"
        ],
        [
          "maroc"
        ],
        [
          "italie",
          "rome"
        ],
        [
          "espagne",
          "madrid"
        ]
      ]
    },
    {
      "id": "mp_005",
      "text": "Pensez chacun à un fruit délicieux. Écrivez le premier qui vous vient.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "mangue"
        ],
        [
          "banane"
        ],
        [
          "pomme"
        ],
        [
          "fraise"
        ],
        [
          "ananas"
        ],
        [
          "orange"
        ],
        [
          "pasteque"
        ],
        [
          "raisin"
        ],
        [
          "peche"
        ]
      ]
    },
    {
      "id": "mp_006",
      "text": "Pensez chacun à une saison de l'année. Écrivez la première qui vous vient.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "ete",
          "l ete"
        ],
        [
          "hiver",
          "l hiver"
        ],
        [
          "printemps",
          "le printemps"
        ],
        [
          "automne",
          "l automne"
        ]
      ]
    },
    {
      "id": "mp_007",
      "text": "Pensez chacun à un plat ou aliment savoureux. Écrivez le premier qui vous vient.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "riz",
          "tiep",
          "thieb"
        ],
        [
          "pizza"
        ],
        [
          "burger",
          "hamburger"
        ],
        [
          "alloco",
          "plantain"
        ],
        [
          "pates",
          "spaghetti"
        ],
        [
          "poulet",
          "poulet braise"
        ],
        [
          "attieke",
          "garba"
        ]
      ]
    },
    {
      "id": "mp_008",
      "text": "Pensez à un mot qui décrit votre couple. Écrivez le premier qui vous vient.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "passion"
        ],
        [
          "complicite",
          "complices",
          "unis"
        ],
        [
          "fidelite",
          "confiance",
          "loyaute"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "force",
          "solide",
          "indestructible"
        ],
        [
          "paix",
          "serenite"
        ]
      ]
    },
    {
      "id": "mp_009",
      "text": "Pensez chacun à une destination de vacances de rêve. Écrivez son nom.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "paris",
          "paname"
        ],
        [
          "dubai"
        ],
        [
          "bali"
        ],
        [
          "maldives"
        ],
        [
          "new york",
          "nyc"
        ],
        [
          "tokyo",
          "japon"
        ],
        [
          "zanzibar"
        ],
        [
          "venise"
        ]
      ]
    },
    {
      "id": "mp_010",
      "text": "Pensez chacun à un prénom féminin court. Écrivez le premier qui vous vient.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_011",
      "text": "Pensez à un métier noble et respecté. Écrivez le premier qui vous vient.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "medecin",
          "docteur"
        ],
        [
          "enseignant",
          "professeur",
          "prof"
        ],
        [
          "avocat",
          "juriste"
        ],
        [
          "pompier"
        ],
        [
          "policier"
        ],
        [
          "pilote"
        ]
      ]
    },
    {
      "id": "mp_012",
      "text": "Pensez à un objet que l'on trouve dans une chambre à coucher.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "lit",
          "matelas"
        ],
        [
          "oreiller",
          "coussin"
        ],
        [
          "armoire",
          "dressing",
          "placard"
        ],
        [
          "table de chevet",
          "chevet"
        ],
        [
          "lampe",
          "veilleuse"
        ],
        [
          "miroir"
        ]
      ]
    },
    {
      "id": "mp_013",
      "text": "Pensez à une boisson rafraîchissante qu'on boit avec des glaçons.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "eau",
          "eau fraiche"
        ],
        [
          "coca",
          "coca cola",
          "soda"
        ],
        [
          "jus",
          "jus d orange",
          "jus de fruits"
        ],
        [
          "citronnade",
          "limonade"
        ],
        [
          "cocktail",
          "mojito"
        ]
      ]
    },
    {
      "id": "mp_014",
      "text": "Pensez à une fleur romantique que l'on offre par amour.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "rose",
          "roses",
          "rose rouge"
        ],
        [
          "tulipe",
          "tulipes"
        ],
        [
          "orchidee",
          "orchidees"
        ],
        [
          "tournesol"
        ],
        [
          "lys"
        ],
        [
          "marguerite"
        ]
      ]
    },
    {
      "id": "mp_015",
      "text": "Pensez à un instrument de musique classique ou moderne.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "piano"
        ],
        [
          "guitare",
          "guitare acoustique"
        ],
        [
          "violon"
        ],
        [
          "batterie"
        ],
        [
          "saxophone",
          "saxo"
        ],
        [
          "flute"
        ]
      ]
    },
    {
      "id": "mp_016",
      "text": "Pensez à un super-héros célèbre de cinéma ou de bande dessinée.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "spiderman",
          "spider man",
          "l homme araignee"
        ],
        [
          "batman"
        ],
        [
          "superman"
        ],
        [
          "iron man",
          "ironman"
        ],
        [
          "thor"
        ],
        [
          "hulk"
        ]
      ]
    },
    {
      "id": "mp_017",
      "text": "Pensez à un genre cinématographique qu'on regarde le soir.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "horreur",
          "film d horreur",
          "epouvante"
        ],
        [
          "comedie",
          "humour",
          "rire"
        ],
        [
          "action",
          "combat"
        ],
        [
          "romance",
          "romantique",
          "amour"
        ],
        [
          "science fiction",
          "sci fi"
        ]
      ]
    },
    {
      "id": "mp_018",
      "text": "Pensez à un vêtement que l'on porte quand il fait très froid.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "manteau",
          "doudoune",
          "anorak"
        ],
        [
          "echarpe",
          "foulard"
        ],
        [
          "bonnet"
        ],
        [
          "gants"
        ],
        [
          "pull",
          "sweat",
          "chandail"
        ]
      ]
    },
    {
      "id": "mp_019",
      "text": "Pensez à une fête célébrée dans le monde entier.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "noel",
          "reveillon"
        ],
        [
          "nouvel an",
          "jour de l an"
        ],
        [
          "saint valentin",
          "valentin"
        ],
        [
          "paques"
        ],
        [
          "halloween"
        ],
        [
          "fete des meres"
        ]
      ]
    },
    {
      "id": "mp_020",
      "text": "Pensez à un élément naturel puissant parmi l'eau, le feu, la terre et l'air.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "eau"
        ],
        [
          "feu"
        ],
        [
          "terre"
        ],
        [
          "air",
          "vent"
        ]
      ]
    },
    {
      "id": "mp_021",
      "text": "Pensez à un dessert sucré qu'on mange à la cuillère.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_022",
      "text": "Pensez à une marque de baskets de sport très connue.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_023",
      "text": "Pensez à une pièce de la maison où l'on passe beaucoup de temps.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_024",
      "text": "Pensez à un moyen de transport pour voyager loin.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_025",
      "text": "Pensez à une saveur de bonbon ou de sucette.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_026",
      "text": "Pensez à un reptile ou animal à écailles.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_027",
      "text": "Pensez à un métal précieux utilisé en bijouterie.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_028",
      "text": "Pensez à un moment de la journée où le soleil se montre.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_029",
      "text": "Pensez à un prénom masculin court et élégant.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_030",
      "text": "Pensez à une émotion positive intense.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_031",
      "text": "Pensez à un légume vert indispensable en cuisine.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_032",
      "text": "Pensez à une application de messagerie instantanée.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_033",
      "text": "Pensez à un jeu de cartes mondialement connu.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_034",
      "text": "Pensez à une grande ville lumière européenne.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_035",
      "text": "Pensez à un sport qui se joue avec un ballon rond.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_036",
      "text": "Pensez à un oiseau au chant harmonieux ou majestueux.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_037",
      "text": "Pensez à un plat typique que l'on commande le vendredi soir.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_038",
      "text": "Pensez à une matière douce comme une caresse.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_039",
      "text": "Pensez à une boisson chaude qu'on boit le matin au réveil.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_040",
      "text": "Pensez à un mot affectueux que vous vous murmurez au creux de l'oreille.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_041",
      "text": "Pensez à une sensation physique agréable en été.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_042",
      "text": "Pensez à un animal marin intelligent qui vit dans l'océan.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_043",
      "text": "Pensez à un phénomène météorologique dans le ciel.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_044",
      "text": "Pensez à une qualité essentielle pour faire durer un couple.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_045",
      "text": "Pensez à un ustensile de cuisine dont on se sert tous les jours.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_046",
      "text": "Pensez à un type de chaussure confortable pour marcher.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_047",
      "text": "Pensez à un artiste chanteur ou chanteuse dont tout le monde parle.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_048",
      "text": "Pensez à une odeur agréable qui rappelle la propreté ou la nature.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_049",
      "text": "Pensez à une lettre de l'alphabet importante pour vous.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_050",
      "text": "Pensez à un chiffre rond entre 10 et 100.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_051",
      "text": "Pensez à une danse sensuelle à pratiquer à deux.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_052",
      "text": "Pensez à un endroit romantique pour une première rencontre.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_053",
      "text": "Pensez à un fruit exotique qui pousse sur un arbre tropical.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_054",
      "text": "Pensez à une saveur de sirop qu'on mélange à de l'eau fraîche.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_055",
      "text": "Pensez à un meuble confortable du salon sur lequel s'allonger.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_056",
      "text": "Pensez à une pierre précieuse de couleur étincelante.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_057",
      "text": "Pensez à une épice qui réchauffe le cœur et le plat.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_058",
      "text": "Pensez à un animal sauvage de la savane africaine.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": []
    },
    {
      "id": "mp_059",
      "text": "Pensez à un monument historique symbole d'une grande ville.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": []
    },
    {
      "id": "mp_060",
      "text": "Pensez à un son de la nature qui apaise immédiatement l'esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": []
    },
    {
      "id": "mp_061",
      "text": "Connexion mentale N°1 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_062",
      "text": "Connexion mentale N°2 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_063",
      "text": "Connexion mentale N°3 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_064",
      "text": "Connexion mentale N°4 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_065",
      "text": "Connexion mentale N°5 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_066",
      "text": "Connexion mentale N°6 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_067",
      "text": "Connexion mentale N°7 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_068",
      "text": "Connexion mentale N°8 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_069",
      "text": "Connexion mentale N°9 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_070",
      "text": "Connexion mentale N°10 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_071",
      "text": "Connexion mentale N°11 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_072",
      "text": "Connexion mentale N°12 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_073",
      "text": "Connexion mentale N°13 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_074",
      "text": "Connexion mentale N°14 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_075",
      "text": "Connexion mentale N°15 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_076",
      "text": "Connexion mentale N°16 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_077",
      "text": "Connexion mentale N°17 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_078",
      "text": "Connexion mentale N°18 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_079",
      "text": "Connexion mentale N°19 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_080",
      "text": "Connexion mentale N°20 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_081",
      "text": "Connexion mentale N°21 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_082",
      "text": "Connexion mentale N°22 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_083",
      "text": "Connexion mentale N°23 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_084",
      "text": "Connexion mentale N°24 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_085",
      "text": "Connexion mentale N°25 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_086",
      "text": "Connexion mentale N°26 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_087",
      "text": "Connexion mentale N°27 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_088",
      "text": "Connexion mentale N°28 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_089",
      "text": "Connexion mentale N°29 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_090",
      "text": "Connexion mentale N°30 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_091",
      "text": "Connexion mentale N°31 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_092",
      "text": "Connexion mentale N°32 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_093",
      "text": "Connexion mentale N°33 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_094",
      "text": "Connexion mentale N°34 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_095",
      "text": "Connexion mentale N°35 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_096",
      "text": "Connexion mentale N°36 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_097",
      "text": "Connexion mentale N°37 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_098",
      "text": "Connexion mentale N°38 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_099",
      "text": "Connexion mentale N°39 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_100",
      "text": "Connexion mentale N°40 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_101",
      "text": "Connexion mentale N°41 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_102",
      "text": "Connexion mentale N°42 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_103",
      "text": "Connexion mentale N°43 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_104",
      "text": "Connexion mentale N°44 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_105",
      "text": "Connexion mentale N°45 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_106",
      "text": "Connexion mentale N°46 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_107",
      "text": "Connexion mentale N°47 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_108",
      "text": "Connexion mentale N°48 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_109",
      "text": "Connexion mentale N°49 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_110",
      "text": "Connexion mentale N°50 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_111",
      "text": "Connexion mentale N°51 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_112",
      "text": "Connexion mentale N°52 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_113",
      "text": "Connexion mentale N°53 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_114",
      "text": "Connexion mentale N°54 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_115",
      "text": "Connexion mentale N°55 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_116",
      "text": "Connexion mentale N°56 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_117",
      "text": "Connexion mentale N°57 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_118",
      "text": "Connexion mentale N°58 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 1,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_119",
      "text": "Connexion mentale N°59 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 2,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    },
    {
      "id": "mp_120",
      "text": "Connexion mentale N°60 : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.",
      "type": "MEME_PENSEE",
      "timer": 20,
      "difficulty": 3,
      "equivalences": [
        [
          "amour",
          "amoureux",
          "je t aime",
          "passion"
        ],
        [
          "tendresse",
          "doux",
          "calin"
        ],
        [
          "bonheur",
          "joie",
          "heureux"
        ],
        [
          "confiance",
          "fidele",
          "loyaute"
        ],
        [
          "manque",
          "tu me manques"
        ]
      ]
    }
  ],
  "choix_impossible": [
    {
      "id": "ci_001",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Une semaine de vacances de rêve à la plage",
        "Une semaine de chalet cosy à la montagne sous la neige"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_002",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Avoir une fortune immense mais être seul au monde",
        "Avoir juste de quoi vivre mais être follement amoureux"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_003",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Voyager dans le passé pour revivre votre rencontre",
        "Voyager dans le futur pour voir votre maison et vos enfants"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_004",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Perdre son téléphone portable pendant 1 mois entier",
        "Ne plus utiliser aucun réseau social pendant 1 an"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_005",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Avoir une intelligence hors du commun",
        "Avoir un charme et une beauté magnétique irrésistible"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_006",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Chanter tout ce que tu dis à haute voix toute la journée",
        "Danser à chaque fois que tu te déplaces dans la rue"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_007",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Ne jamais dormir mais avoir 24h d'énergie par jour",
        "Dormir 10 heures par nuit et faire des rêves extraordinaires"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_008",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Vivre dans un pays où il fait toujours 35°C",
        "Vivre dans un pays où il fait toujours -5°C"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_009",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Parler couramment toutes les langues du monde sans savoir lire",
        "Lire toutes les langues du monde sans pouvoir les parler"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_010",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Se souvenir de chaque seconde passée dans les moindres détails",
        "Pouvoir effacer instantanément tous ses mauvais souvenirs"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_011",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Savoir exactement l'heure et le jour où vous vous marierez",
        "Laisser la vie vous faire une surprise totale"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_012",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Manger son plat préféré à chaque repas pour toujours",
        "Ne plus jamais pouvoir remanger son plat préféré mais tout le reste oui"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_013",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Avoir le pouvoir de voler dans les nuages",
        "Avoir le pouvoir de respirer et nager sous l'eau comme un poisson"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_014",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Ne plus jamais pouvoir chuchoter et toujours parler fort",
        "Ne plus jamais pouvoir crier même en cas d'urgence"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_015",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Pouvoir lire dans les pensées de son partenaire pendant 24h",
        "Avoir la garantie absolue que ton partenaire n'aura jamais de secret"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_016",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Gagner 10 millions FCFA tout de suite sans effort",
        "Gagner 1 milliard FCFA mais dans 15 ans"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_017",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Vivre dans une cabane isolée sur une île paradisiaque à deux",
        "Vivre dans un immense penthouse au sommet d'un gratte-ciel à New York"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_018",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Ne plus jamais avoir à faire la cuisine ni la vaisselle",
        "Ne plus jamais avoir à faire le ménage ni la lessive"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_019",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Tout savoir sur le futur de sa carrière professionnelle",
        "Tout savoir sur la santé et la longévité de ses proches"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_020",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Être célèbre et reconnu dans le monde entier",
        "Être immensément riche dans l'anonymat le plus total"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_021",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Devoir porter des vêtements fluo tous les jours",
        "Devoir porter uniquement du noir et blanc toute sa vie"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_022",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Ne plus pouvoir écouter de musique pendant 2 ans",
        "Ne plus pouvoir regarder de films ou séries pendant 2 ans"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_023",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Avoir un majordome personnel qui prépare tout",
        "Avoir un chauffeur privé disponible jour et nuit"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_024",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Toujours dire toute la vérité sans aucun filtre social",
        "Ne plus jamais pouvoir donner son avis sur rien"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_025",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Pouvoir remonter le temps de 10 minutes à volonté",
        "Pouvoir faire une avance rapide de 10 minutes quand on s'ennuie"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_026",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Être capable de parler et comprendre les animaux",
        "Être capable de maîtriser n'importe quel instrument de musique"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_027",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Ne manger que des aliments salés pour le reste de sa vie",
        "Ne manger que des aliments sucrés pour le reste de sa vie"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_028",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Vivre un amour passionné intense comme dans les films",
        "Vivre un amour paisible, doux et sans aucune tempête"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_029",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Faire une grande fête de mariage avec 500 invités",
        "Faire un mariage intimiste à deux sur une plage au bout du monde"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_030",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Avoir un clone parfait qui fait le travail à votre place",
        "Avoir un robot intelligent qui s'occupe de toutes les corvées"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_031",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°1 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°1 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_032",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°2 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°2 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_033",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°3 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°3 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_034",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°4 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°4 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_035",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°5 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°5 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_036",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°6 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°6 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_037",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°7 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°7 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_038",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°8 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°8 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_039",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°9 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°9 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_040",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°10 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°10 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_041",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°11 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°11 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_042",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°12 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°12 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_043",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°13 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°13 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_044",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°14 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°14 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_045",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°15 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°15 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_046",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°16 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°16 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_047",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°17 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°17 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_048",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°18 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°18 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_049",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°19 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°19 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_050",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°20 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°20 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_051",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°21 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°21 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_052",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°22 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°22 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_053",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°23 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°23 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_054",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°24 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°24 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_055",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°25 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°25 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_056",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°26 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°26 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_057",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°27 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°27 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_058",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°28 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°28 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_059",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°29 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°29 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_060",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°30 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°30 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_061",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°31 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°31 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_062",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°32 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°32 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_063",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°33 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°33 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_064",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°34 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°34 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_065",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°35 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°35 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_066",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°36 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°36 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_067",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°37 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°37 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_068",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°38 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°38 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_069",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°39 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°39 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_070",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°40 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°40 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_071",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°41 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°41 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_072",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°42 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°42 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_073",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°43 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°43 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_074",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°44 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°44 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_075",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°45 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°45 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_076",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°46 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°46 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_077",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°47 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°47 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_078",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°48 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°48 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_079",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°49 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°49 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_080",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°50 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°50 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_081",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°51 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°51 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_082",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°52 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°52 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_083",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°53 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°53 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_084",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°54 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°54 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_085",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°55 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°55 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_086",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°56 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°56 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_087",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°57 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°57 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_088",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°58 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°58 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_089",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°59 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°59 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_090",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°60 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°60 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_091",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°61 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°61 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_092",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°62 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°62 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_093",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°63 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°63 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_094",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°64 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°64 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_095",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°65 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°65 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_096",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°66 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°66 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_097",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°67 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°67 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_098",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Dilemme N°68 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°68 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_099",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Dilemme N°69 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°69 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    },
    {
      "id": "ci_100",
      "text": "Si ton partenaire devait absolument choisir entre ces deux options :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Dilemme N°70 : Partir vivre 1 an d'aventure en van autour du monde",
        "Dilemme N°70 : Construire la villa de ses rêves et ne plus jamais déménager"
      ],
      "isChoixImpossible": true
    }
  ],
  "scenarios": [
    {
      "id": "sc_001",
      "text": "Vous gagnez 10 millions FCFA ensemble. Que ferait ton partenaire EN PREMIER ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Voyager vers une destination de rêve",
        "Investir dans l'immobilier locatif",
        "Aider et gâter sa famille",
        "Épargner sur un compte bloqué"
      ]
    },
    {
      "id": "sc_002",
      "text": "Vous êtes naufragés sur une île déserte. Quel objet unique ton partenaire emporterait-il ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Son smartphone chargé",
        "Un solide couteau de survie",
        "Un grand livre passionnant",
        "Un briquet tempête"
      ]
    },
    {
      "id": "sc_003",
      "text": "Ton partenaire reçoit une offre d'emploi en or à l'étranger. Quelle serait sa réaction ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Accepter et t'embarquer avec lui/elle",
        "Négocier pour que tu aies un poste aussi",
        "Refuser pour préserver votre vie actuelle",
        "Demander 1 mois pour réfléchir à deux"
      ]
    },
    {
      "id": "sc_004",
      "text": "Votre maison prend feu et tout le monde est sain et sauf. Quel objet matériel sauve-t-il ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Son ordinateur ou disque dur de photos",
        "Ses bijoux de valeur et montres",
        "Ses papiers d'identité et passeports",
        "Ses vêtements de créateur"
      ]
    },
    {
      "id": "sc_005",
      "text": "Ton partenaire se retrouve seul chez lui pendant une semaine entière. Que fait-il ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il passe ses journées à se reposer et chiller",
        "Il invite des amis et fait la fête",
        "Il t'appelle en visio 5 fois par jour",
        "Il bricole et réaménage tout l'appartement"
      ]
    },
    {
      "id": "sc_006",
      "text": "Si ton partenaire pouvait dîner en tête-à-tête avec une célébrité vivante, qui choisirait-il ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Un chef d'État respecté",
        "Un artiste musicien qu'il idolâtre",
        "Une légende vivante du sport",
        "Un grand entrepreneur visionnaire"
      ]
    },
    {
      "id": "sc_007",
      "text": "Ton partenaire gagne un voyage VIP pour 2 personnes. Si tu ne peux pas venir, avec qui part-il ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Sa mère ou son père adoré",
        "Son ou sa meilleure amie d'enfance",
        "Son frère ou sa sœur complice",
        "Il préfère reporter le voyage pour toi"
      ]
    },
    {
      "id": "sc_008",
      "text": "Ton partenaire est coincé dans un embouteillage monstre de 2 heures. Quelle est sa parade ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Écouter des podcasts et sa musique zen",
        "S'énerver et klaxonner toutes les 3 minutes",
        "T'appeler pour papoter de tout et de rien",
        "Chercher désespérément une ruelle dérobée"
      ]
    },
    {
      "id": "sc_009",
      "text": "Scénario insolite (Cas n°1) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_010",
      "text": "Scénario insolite (Cas n°2) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_011",
      "text": "Scénario insolite (Cas n°3) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_012",
      "text": "Scénario insolite (Cas n°4) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_013",
      "text": "Scénario insolite (Cas n°5) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_014",
      "text": "Scénario insolite (Cas n°6) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_015",
      "text": "Scénario insolite (Cas n°7) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_016",
      "text": "Scénario insolite (Cas n°8) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_017",
      "text": "Scénario insolite (Cas n°9) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_018",
      "text": "Scénario insolite (Cas n°10) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_019",
      "text": "Scénario insolite (Cas n°11) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_020",
      "text": "Scénario insolite (Cas n°12) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_021",
      "text": "Scénario insolite (Cas n°13) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_022",
      "text": "Scénario insolite (Cas n°14) : Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il refuse poliment par sécurité",
        "Il ouvre immédiatement par curiosité",
        "Il appelle la police directement",
        "Il t'appelle pour te demander conseil"
      ]
    },
    {
      "id": "sc_023",
      "text": "Scénario insolite (Cas n°1) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_024",
      "text": "Scénario insolite (Cas n°2) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_025",
      "text": "Scénario insolite (Cas n°3) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_026",
      "text": "Scénario insolite (Cas n°4) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_027",
      "text": "Scénario insolite (Cas n°5) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_028",
      "text": "Scénario insolite (Cas n°6) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_029",
      "text": "Scénario insolite (Cas n°7) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_030",
      "text": "Scénario insolite (Cas n°8) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_031",
      "text": "Scénario insolite (Cas n°9) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_032",
      "text": "Scénario insolite (Cas n°10) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_033",
      "text": "Scénario insolite (Cas n°11) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_034",
      "text": "Scénario insolite (Cas n°12) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_035",
      "text": "Scénario insolite (Cas n°13) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_036",
      "text": "Scénario insolite (Cas n°14) : Un restaurant se trompe dans sa commande et apporte un mauvais plat :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il mange sans rien dire pour ne pas déranger",
        "Il renvoie poliment l'assiette en cuisine",
        "Il fait un scandale au serveur",
        "Il demande un dessert offert en compensation"
      ]
    },
    {
      "id": "sc_037",
      "text": "Scénario insolite (Cas n°1) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_038",
      "text": "Scénario insolite (Cas n°2) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_039",
      "text": "Scénario insolite (Cas n°3) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_040",
      "text": "Scénario insolite (Cas n°4) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_041",
      "text": "Scénario insolite (Cas n°5) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_042",
      "text": "Scénario insolite (Cas n°6) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_043",
      "text": "Scénario insolite (Cas n°7) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_044",
      "text": "Scénario insolite (Cas n°8) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_045",
      "text": "Scénario insolite (Cas n°9) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_046",
      "text": "Scénario insolite (Cas n°10) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_047",
      "text": "Scénario insolite (Cas n°11) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_048",
      "text": "Scénario insolite (Cas n°12) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_049",
      "text": "Scénario insolite (Cas n°13) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_050",
      "text": "Scénario insolite (Cas n°14) : Une panne de courant générale plonge la ville dans le noir pour 24h :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il allume des bougies et profite du romantisme",
        "Il s'endort immédiatement pour faire passer le temps",
        "Il panique et vérifie la batterie de son téléphone",
        "Il sort dans la rue voir ce qui se passe"
      ]
    },
    {
      "id": "sc_051",
      "text": "Scénario insolite (Cas n°1) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_052",
      "text": "Scénario insolite (Cas n°2) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_053",
      "text": "Scénario insolite (Cas n°3) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_054",
      "text": "Scénario insolite (Cas n°4) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_055",
      "text": "Scénario insolite (Cas n°5) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_056",
      "text": "Scénario insolite (Cas n°6) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_057",
      "text": "Scénario insolite (Cas n°7) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_058",
      "text": "Scénario insolite (Cas n°8) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_059",
      "text": "Scénario insolite (Cas n°9) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_060",
      "text": "Scénario insolite (Cas n°10) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_061",
      "text": "Scénario insolite (Cas n°11) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_062",
      "text": "Scénario insolite (Cas n°12) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_063",
      "text": "Scénario insolite (Cas n°13) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_064",
      "text": "Scénario insolite (Cas n°14) : Votre avion a 8 heures de retard à l'aéroport :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il fait la sieste sur les sièges sans stress",
        "Il fait le tour de tous les magasins duty free",
        "Il râle au comptoir de la compagnie aérienne",
        "Il lit un livre ou regarde une série téléchargée"
      ]
    },
    {
      "id": "sc_065",
      "text": "Scénario insolite (Cas n°1) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_066",
      "text": "Scénario insolite (Cas n°2) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_067",
      "text": "Scénario insolite (Cas n°3) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_068",
      "text": "Scénario insolite (Cas n°4) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_069",
      "text": "Scénario insolite (Cas n°5) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_070",
      "text": "Scénario insolite (Cas n°6) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_071",
      "text": "Scénario insolite (Cas n°7) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_072",
      "text": "Scénario insolite (Cas n°8) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_073",
      "text": "Scénario insolite (Cas n°9) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_074",
      "text": "Scénario insolite (Cas n°10) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_075",
      "text": "Scénario insolite (Cas n°11) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_076",
      "text": "Scénario insolite (Cas n°12) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_077",
      "text": "Scénario insolite (Cas n°13) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_078",
      "text": "Scénario insolite (Cas n°14) : Vous trouvez un chiot abandonné sous la pluie devant votre porte :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il l'adopte immédiatement et l'emmène chez le véto",
        "Il cherche son propriétaire sur les réseaux sociaux",
        "Il le confie à un refuge professionnel",
        "Il lui donne à manger mais le laisse dehors"
      ]
    },
    {
      "id": "sc_079",
      "text": "Scénario insolite (Cas n°1) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_080",
      "text": "Scénario insolite (Cas n°2) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_081",
      "text": "Scénario insolite (Cas n°3) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_082",
      "text": "Scénario insolite (Cas n°4) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_083",
      "text": "Scénario insolite (Cas n°5) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_084",
      "text": "Scénario insolite (Cas n°6) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_085",
      "text": "Scénario insolite (Cas n°7) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_086",
      "text": "Scénario insolite (Cas n°8) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_087",
      "text": "Scénario insolite (Cas n°9) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_088",
      "text": "Scénario insolite (Cas n°10) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_089",
      "text": "Scénario insolite (Cas n°11) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    },
    {
      "id": "sc_090",
      "text": "Scénario insolite (Cas n°12) : Lors d'un karaoké public avec des amis, que fait ton partenaire ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Il prend le micro et chante à tue-tête avec passion",
        "Il chante uniquement en duo avec toi",
        "Il refuse catégoriquement et reste assis",
        "Il filme tout le monde en rigolant"
      ]
    }
  ],
  "memoire_flash": [
    {
      "id": "mf_001",
      "text": "Épreuve Flash N°1 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel objet était bien présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Téléphone",
        "Montre",
        "Lunettes",
        "Clé",
        "Tasse"
      ],
      "flashDuration": 5000,
      "options": [
        "Guitare",
        "Montre",
        "Ballon",
        "Chapeau"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_002",
      "text": "Épreuve Flash N°2 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quelle couleur N'ÉTAIT PAS dans la liste mémorisée ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Rouge",
        "Bleu",
        "Jaune",
        "Vert"
      ],
      "flashDuration": 4000,
      "options": [
        "Rouge",
        "Violet",
        "Bleu",
        "Jaune"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_003",
      "text": "Épreuve Flash N°3 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le 3ème chiffre exact de la séquence ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "7",
        "3",
        "9",
        "1",
        "5"
      ],
      "flashDuration": 5000,
      "options": [
        "3",
        "7",
        "9",
        "1"
      ],
      "correctAnswer": 2
    },
    {
      "id": "mf_004",
      "text": "Épreuve Flash N°4 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel animal sauvage figurait dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Lion",
        "Éléphant",
        "Girafe",
        "Dauphin"
      ],
      "flashDuration": 5000,
      "options": [
        "Panda",
        "Lion",
        "Aigle",
        "Crocodile"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_005",
      "text": "Épreuve Flash N°5 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel pays N'ÉTAIT PAS mentionné dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "France",
        "Brésil",
        "Japon",
        "Australie"
      ],
      "flashDuration": 4000,
      "options": [
        "France",
        "Canada",
        "Brésil",
        "Japon"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_006",
      "text": "Épreuve Flash N°6 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel fruit délicieux était présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Pomme",
        "Banane",
        "Fraise",
        "Mangue"
      ],
      "flashDuration": 4000,
      "options": [
        "Mangue",
        "Ananas",
        "Cerise",
        "Kiwi"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_007",
      "text": "Épreuve Flash N°7 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel moyen de transport N'ÉTAIT PAS dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Avion",
        "Train",
        "Bateau",
        "Vélo"
      ],
      "flashDuration": 4000,
      "options": [
        "Avion",
        "Voiture",
        "Bateau",
        "Vélo"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_008",
      "text": "Épreuve Flash N°8 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le tout premier chiffre de la série ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "2",
        "8",
        "4",
        "6"
      ],
      "flashDuration": 4000,
      "options": [
        "2",
        "8",
        "4",
        "6"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_009",
      "text": "Épreuve Flash N°9 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel objet était bien présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Téléphone",
        "Montre",
        "Lunettes",
        "Clé",
        "Tasse"
      ],
      "flashDuration": 5000,
      "options": [
        "Guitare",
        "Montre",
        "Ballon",
        "Chapeau"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_010",
      "text": "Épreuve Flash N°10 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quelle couleur N'ÉTAIT PAS dans la liste mémorisée ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Rouge",
        "Bleu",
        "Jaune",
        "Vert"
      ],
      "flashDuration": 4000,
      "options": [
        "Rouge",
        "Violet",
        "Bleu",
        "Jaune"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_011",
      "text": "Épreuve Flash N°11 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le 3ème chiffre exact de la séquence ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "7",
        "3",
        "9",
        "1",
        "5"
      ],
      "flashDuration": 5000,
      "options": [
        "3",
        "7",
        "9",
        "1"
      ],
      "correctAnswer": 2
    },
    {
      "id": "mf_012",
      "text": "Épreuve Flash N°12 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel animal sauvage figurait dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Lion",
        "Éléphant",
        "Girafe",
        "Dauphin"
      ],
      "flashDuration": 5000,
      "options": [
        "Panda",
        "Lion",
        "Aigle",
        "Crocodile"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_013",
      "text": "Épreuve Flash N°13 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel pays N'ÉTAIT PAS mentionné dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "France",
        "Brésil",
        "Japon",
        "Australie"
      ],
      "flashDuration": 4000,
      "options": [
        "France",
        "Canada",
        "Brésil",
        "Japon"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_014",
      "text": "Épreuve Flash N°14 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel fruit délicieux était présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Pomme",
        "Banane",
        "Fraise",
        "Mangue"
      ],
      "flashDuration": 4000,
      "options": [
        "Mangue",
        "Ananas",
        "Cerise",
        "Kiwi"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_015",
      "text": "Épreuve Flash N°15 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel moyen de transport N'ÉTAIT PAS dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Avion",
        "Train",
        "Bateau",
        "Vélo"
      ],
      "flashDuration": 4000,
      "options": [
        "Avion",
        "Voiture",
        "Bateau",
        "Vélo"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_016",
      "text": "Épreuve Flash N°16 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le tout premier chiffre de la série ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "2",
        "8",
        "4",
        "6"
      ],
      "flashDuration": 4000,
      "options": [
        "2",
        "8",
        "4",
        "6"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_017",
      "text": "Épreuve Flash N°17 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel objet était bien présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Téléphone",
        "Montre",
        "Lunettes",
        "Clé",
        "Tasse"
      ],
      "flashDuration": 5000,
      "options": [
        "Guitare",
        "Montre",
        "Ballon",
        "Chapeau"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_018",
      "text": "Épreuve Flash N°18 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quelle couleur N'ÉTAIT PAS dans la liste mémorisée ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Rouge",
        "Bleu",
        "Jaune",
        "Vert"
      ],
      "flashDuration": 4000,
      "options": [
        "Rouge",
        "Violet",
        "Bleu",
        "Jaune"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_019",
      "text": "Épreuve Flash N°19 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le 3ème chiffre exact de la séquence ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "7",
        "3",
        "9",
        "1",
        "5"
      ],
      "flashDuration": 5000,
      "options": [
        "3",
        "7",
        "9",
        "1"
      ],
      "correctAnswer": 2
    },
    {
      "id": "mf_020",
      "text": "Épreuve Flash N°20 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel animal sauvage figurait dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Lion",
        "Éléphant",
        "Girafe",
        "Dauphin"
      ],
      "flashDuration": 5000,
      "options": [
        "Panda",
        "Lion",
        "Aigle",
        "Crocodile"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_021",
      "text": "Épreuve Flash N°21 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel pays N'ÉTAIT PAS mentionné dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "France",
        "Brésil",
        "Japon",
        "Australie"
      ],
      "flashDuration": 4000,
      "options": [
        "France",
        "Canada",
        "Brésil",
        "Japon"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_022",
      "text": "Épreuve Flash N°22 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel fruit délicieux était présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Pomme",
        "Banane",
        "Fraise",
        "Mangue"
      ],
      "flashDuration": 4000,
      "options": [
        "Mangue",
        "Ananas",
        "Cerise",
        "Kiwi"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_023",
      "text": "Épreuve Flash N°23 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel moyen de transport N'ÉTAIT PAS dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Avion",
        "Train",
        "Bateau",
        "Vélo"
      ],
      "flashDuration": 4000,
      "options": [
        "Avion",
        "Voiture",
        "Bateau",
        "Vélo"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_024",
      "text": "Épreuve Flash N°24 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le tout premier chiffre de la série ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "2",
        "8",
        "4",
        "6"
      ],
      "flashDuration": 4000,
      "options": [
        "2",
        "8",
        "4",
        "6"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_025",
      "text": "Épreuve Flash N°25 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel objet était bien présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Téléphone",
        "Montre",
        "Lunettes",
        "Clé",
        "Tasse"
      ],
      "flashDuration": 5000,
      "options": [
        "Guitare",
        "Montre",
        "Ballon",
        "Chapeau"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_026",
      "text": "Épreuve Flash N°26 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quelle couleur N'ÉTAIT PAS dans la liste mémorisée ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Rouge",
        "Bleu",
        "Jaune",
        "Vert"
      ],
      "flashDuration": 4000,
      "options": [
        "Rouge",
        "Violet",
        "Bleu",
        "Jaune"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_027",
      "text": "Épreuve Flash N°27 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le 3ème chiffre exact de la séquence ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "7",
        "3",
        "9",
        "1",
        "5"
      ],
      "flashDuration": 5000,
      "options": [
        "3",
        "7",
        "9",
        "1"
      ],
      "correctAnswer": 2
    },
    {
      "id": "mf_028",
      "text": "Épreuve Flash N°28 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel animal sauvage figurait dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Lion",
        "Éléphant",
        "Girafe",
        "Dauphin"
      ],
      "flashDuration": 5000,
      "options": [
        "Panda",
        "Lion",
        "Aigle",
        "Crocodile"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_029",
      "text": "Épreuve Flash N°29 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel pays N'ÉTAIT PAS mentionné dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "France",
        "Brésil",
        "Japon",
        "Australie"
      ],
      "flashDuration": 4000,
      "options": [
        "France",
        "Canada",
        "Brésil",
        "Japon"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_030",
      "text": "Épreuve Flash N°30 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel fruit délicieux était présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Pomme",
        "Banane",
        "Fraise",
        "Mangue"
      ],
      "flashDuration": 4000,
      "options": [
        "Mangue",
        "Ananas",
        "Cerise",
        "Kiwi"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_031",
      "text": "Épreuve Flash N°31 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel moyen de transport N'ÉTAIT PAS dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Avion",
        "Train",
        "Bateau",
        "Vélo"
      ],
      "flashDuration": 4000,
      "options": [
        "Avion",
        "Voiture",
        "Bateau",
        "Vélo"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_032",
      "text": "Épreuve Flash N°32 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le tout premier chiffre de la série ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "2",
        "8",
        "4",
        "6"
      ],
      "flashDuration": 4000,
      "options": [
        "2",
        "8",
        "4",
        "6"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_033",
      "text": "Épreuve Flash N°33 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel objet était bien présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Téléphone",
        "Montre",
        "Lunettes",
        "Clé",
        "Tasse"
      ],
      "flashDuration": 5000,
      "options": [
        "Guitare",
        "Montre",
        "Ballon",
        "Chapeau"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_034",
      "text": "Épreuve Flash N°34 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quelle couleur N'ÉTAIT PAS dans la liste mémorisée ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Rouge",
        "Bleu",
        "Jaune",
        "Vert"
      ],
      "flashDuration": 4000,
      "options": [
        "Rouge",
        "Violet",
        "Bleu",
        "Jaune"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_035",
      "text": "Épreuve Flash N°35 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le 3ème chiffre exact de la séquence ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "7",
        "3",
        "9",
        "1",
        "5"
      ],
      "flashDuration": 5000,
      "options": [
        "3",
        "7",
        "9",
        "1"
      ],
      "correctAnswer": 2
    },
    {
      "id": "mf_036",
      "text": "Épreuve Flash N°36 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel animal sauvage figurait dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Lion",
        "Éléphant",
        "Girafe",
        "Dauphin"
      ],
      "flashDuration": 5000,
      "options": [
        "Panda",
        "Lion",
        "Aigle",
        "Crocodile"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_037",
      "text": "Épreuve Flash N°37 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel pays N'ÉTAIT PAS mentionné dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "France",
        "Brésil",
        "Japon",
        "Australie"
      ],
      "flashDuration": 4000,
      "options": [
        "France",
        "Canada",
        "Brésil",
        "Japon"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_038",
      "text": "Épreuve Flash N°38 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel fruit délicieux était présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Pomme",
        "Banane",
        "Fraise",
        "Mangue"
      ],
      "flashDuration": 4000,
      "options": [
        "Mangue",
        "Ananas",
        "Cerise",
        "Kiwi"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_039",
      "text": "Épreuve Flash N°39 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel moyen de transport N'ÉTAIT PAS dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Avion",
        "Train",
        "Bateau",
        "Vélo"
      ],
      "flashDuration": 4000,
      "options": [
        "Avion",
        "Voiture",
        "Bateau",
        "Vélo"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_040",
      "text": "Épreuve Flash N°40 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le tout premier chiffre de la série ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "2",
        "8",
        "4",
        "6"
      ],
      "flashDuration": 4000,
      "options": [
        "2",
        "8",
        "4",
        "6"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_041",
      "text": "Épreuve Flash N°41 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel objet était bien présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Téléphone",
        "Montre",
        "Lunettes",
        "Clé",
        "Tasse"
      ],
      "flashDuration": 5000,
      "options": [
        "Guitare",
        "Montre",
        "Ballon",
        "Chapeau"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_042",
      "text": "Épreuve Flash N°42 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quelle couleur N'ÉTAIT PAS dans la liste mémorisée ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Rouge",
        "Bleu",
        "Jaune",
        "Vert"
      ],
      "flashDuration": 4000,
      "options": [
        "Rouge",
        "Violet",
        "Bleu",
        "Jaune"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_043",
      "text": "Épreuve Flash N°43 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le 3ème chiffre exact de la séquence ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "7",
        "3",
        "9",
        "1",
        "5"
      ],
      "flashDuration": 5000,
      "options": [
        "3",
        "7",
        "9",
        "1"
      ],
      "correctAnswer": 2
    },
    {
      "id": "mf_044",
      "text": "Épreuve Flash N°44 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel animal sauvage figurait dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Lion",
        "Éléphant",
        "Girafe",
        "Dauphin"
      ],
      "flashDuration": 5000,
      "options": [
        "Panda",
        "Lion",
        "Aigle",
        "Crocodile"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_045",
      "text": "Épreuve Flash N°45 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel pays N'ÉTAIT PAS mentionné dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "France",
        "Brésil",
        "Japon",
        "Australie"
      ],
      "flashDuration": 4000,
      "options": [
        "France",
        "Canada",
        "Brésil",
        "Japon"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_046",
      "text": "Épreuve Flash N°46 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel fruit délicieux était présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Pomme",
        "Banane",
        "Fraise",
        "Mangue"
      ],
      "flashDuration": 4000,
      "options": [
        "Mangue",
        "Ananas",
        "Cerise",
        "Kiwi"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_047",
      "text": "Épreuve Flash N°47 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel moyen de transport N'ÉTAIT PAS dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Avion",
        "Train",
        "Bateau",
        "Vélo"
      ],
      "flashDuration": 4000,
      "options": [
        "Avion",
        "Voiture",
        "Bateau",
        "Vélo"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_048",
      "text": "Épreuve Flash N°48 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le tout premier chiffre de la série ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "2",
        "8",
        "4",
        "6"
      ],
      "flashDuration": 4000,
      "options": [
        "2",
        "8",
        "4",
        "6"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_049",
      "text": "Épreuve Flash N°49 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel objet était bien présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Téléphone",
        "Montre",
        "Lunettes",
        "Clé",
        "Tasse"
      ],
      "flashDuration": 5000,
      "options": [
        "Guitare",
        "Montre",
        "Ballon",
        "Chapeau"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_050",
      "text": "Épreuve Flash N°50 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quelle couleur N'ÉTAIT PAS dans la liste mémorisée ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "Rouge",
        "Bleu",
        "Jaune",
        "Vert"
      ],
      "flashDuration": 4000,
      "options": [
        "Rouge",
        "Violet",
        "Bleu",
        "Jaune"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_051",
      "text": "Épreuve Flash N°51 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le 3ème chiffre exact de la séquence ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "7",
        "3",
        "9",
        "1",
        "5"
      ],
      "flashDuration": 5000,
      "options": [
        "3",
        "7",
        "9",
        "1"
      ],
      "correctAnswer": 2
    },
    {
      "id": "mf_052",
      "text": "Épreuve Flash N°52 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel animal sauvage figurait dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Lion",
        "Éléphant",
        "Girafe",
        "Dauphin"
      ],
      "flashDuration": 5000,
      "options": [
        "Panda",
        "Lion",
        "Aigle",
        "Crocodile"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_053",
      "text": "Épreuve Flash N°53 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel pays N'ÉTAIT PAS mentionné dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "France",
        "Brésil",
        "Japon",
        "Australie"
      ],
      "flashDuration": 4000,
      "options": [
        "France",
        "Canada",
        "Brésil",
        "Japon"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_054",
      "text": "Épreuve Flash N°54 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel fruit délicieux était présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Pomme",
        "Banane",
        "Fraise",
        "Mangue"
      ],
      "flashDuration": 4000,
      "options": [
        "Mangue",
        "Ananas",
        "Cerise",
        "Kiwi"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_055",
      "text": "Épreuve Flash N°55 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel moyen de transport N'ÉTAIT PAS dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Avion",
        "Train",
        "Bateau",
        "Vélo"
      ],
      "flashDuration": 4000,
      "options": [
        "Avion",
        "Voiture",
        "Bateau",
        "Vélo"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_056",
      "text": "Épreuve Flash N°56 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le tout premier chiffre de la série ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "2",
        "8",
        "4",
        "6"
      ],
      "flashDuration": 4000,
      "options": [
        "2",
        "8",
        "4",
        "6"
      ],
      "correctAnswer": 0
    },
    {
      "id": "mf_057",
      "text": "Épreuve Flash N°57 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel objet était bien présent dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Téléphone",
        "Montre",
        "Lunettes",
        "Clé",
        "Tasse"
      ],
      "flashDuration": 5000,
      "options": [
        "Guitare",
        "Montre",
        "Ballon",
        "Chapeau"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_058",
      "text": "Épreuve Flash N°58 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quelle couleur N'ÉTAIT PAS dans la liste mémorisée ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 2,
      "flashContent": [
        "Rouge",
        "Bleu",
        "Jaune",
        "Vert"
      ],
      "flashDuration": 4000,
      "options": [
        "Rouge",
        "Violet",
        "Bleu",
        "Jaune"
      ],
      "correctAnswer": 1
    },
    {
      "id": "mf_059",
      "text": "Épreuve Flash N°59 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel était le 3ème chiffre exact de la séquence ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 3,
      "flashContent": [
        "7",
        "3",
        "9",
        "1",
        "5"
      ],
      "flashDuration": 5000,
      "options": [
        "3",
        "7",
        "9",
        "1"
      ],
      "correctAnswer": 2
    },
    {
      "id": "mf_060",
      "text": "Épreuve Flash N°60 : Mémorisez attentivement ces éléments pendant quelques secondes...",
      "question": "Quel animal sauvage figurait dans la liste ?",
      "type": "CHOIX_MULTIPLE",
      "timer": 25,
      "difficulty": 1,
      "flashContent": [
        "Lion",
        "Éléphant",
        "Girafe",
        "Dauphin"
      ],
      "flashDuration": 5000,
      "options": [
        "Panda",
        "Lion",
        "Aigle",
        "Crocodile"
      ],
      "correctAnswer": 1
    }
  ],
  "synchronisation": [
    {
      "id": "sy_001",
      "text": "Choisissez une couleur que vous associez tous les deux à votre amour.",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Rouge passion",
        "Rose poudré",
        "Blanc pur",
        "Violet profond"
      ]
    },
    {
      "id": "sy_002",
      "text": "Choisissez le mot qui représente le mieux l'énergie de votre relation en ce moment.",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Passion vibrante",
        "Sérénité apaisante",
        "Aventure excitante",
        "Profondeur indestructible"
      ]
    },
    {
      "id": "sy_003",
      "text": "Choisissez la saison de l'année qui incarne le mieux votre histoire d'amour.",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Printemps et renouveau",
        "Été chaud et radieux",
        "Automne doux et flamboyant",
        "Hiver chaleureux au coin du feu"
      ]
    },
    {
      "id": "sy_004",
      "text": "Choisissez l'heure de la journée qui correspond le plus à vos moments de complicité.",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "L'aube naissante",
        "Le zénith de midi",
        "Le coucher de soleil doré",
        "Le silence de la nuit"
      ]
    },
    {
      "id": "sy_005",
      "text": "Choisissez l'élément naturel qui symbolise la force de votre union.",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Le feu ardent",
        "L'eau bienfaisante",
        "Le vent libre",
        "La terre solide"
      ]
    },
    {
      "id": "sy_006",
      "text": "Choisissez l'émotion dominante de votre couple aujourd'hui.",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Un bonheur immense",
        "Une grande excitation",
        "Une paix intérieure",
        "Un doux manque de l'autre"
      ]
    },
    {
      "id": "sy_007",
      "text": "Choisissez l'animal totem qui veille sur votre couple.",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Lion et Lionne majestueux",
        "Dauphins complices",
        "Aigles fidèles",
        "Cygnes inséparables"
      ]
    },
    {
      "id": "sy_008",
      "text": "Choisissez le lieu parfait pour vous ressourcer en tête-à-tête.",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Plage de sable fin au coucher du soleil",
        "Chalet intime perché en montagne",
        "Suite d'un grand hôtel urbain chic",
        "Maison de campagne au milieu des arbres"
      ]
    },
    {
      "id": "sy_009",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_010",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_011",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_012",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_013",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_014",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_015",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_016",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_017",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_018",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_019",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_020",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_021",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_022",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_023",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_024",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_025",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_026",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_027",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_028",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_029",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_030",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_031",
      "text": "Synchronisation du cœur : Choisissez ensemble le super-pouvoir idéal pour votre couple :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "La téléportation pour vous voir en 1 seconde",
        "L'immortalité pour vous aimer toujours",
        "La guérison pour ne jamais souffrir",
        "L'invisibilité pour vous aimer en secret"
      ]
    },
    {
      "id": "sy_032",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_033",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_034",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_035",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_036",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_037",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_038",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_039",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_040",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_041",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_042",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_043",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_044",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_045",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_046",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_047",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_048",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_049",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_050",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_051",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_052",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_053",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_054",
      "text": "Synchronisation du cœur : Choisissez ensemble la mélodie idéale de votre histoire :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Une ballade romantique au piano",
        "Un rythme Afrobeat dansant et joyeux",
        "Un slow RnB chaleureux et sensuel",
        "Une symphonie classique grandiose"
      ]
    },
    {
      "id": "sy_055",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_056",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_057",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_058",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_059",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_060",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_061",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_062",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_063",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_064",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_065",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_066",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_067",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_068",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_069",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_070",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_071",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_072",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_073",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_074",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_075",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_076",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_077",
      "text": "Synchronisation du cœur : Choisissez ensemble la saveur qui caractérise vos baisers :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Douce comme le miel",
        "Gourmande comme le chocolat noir",
        "Pétillante comme un fruit rouge",
        "Exotique comme la vanille"
      ]
    },
    {
      "id": "sy_078",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_079",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_080",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_081",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_082",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_083",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_084",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_085",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_086",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_087",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_088",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_089",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_090",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_091",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_092",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_093",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_094",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_095",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_096",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_097",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_098",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 2,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_099",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 3,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    },
    {
      "id": "sy_100",
      "text": "Synchronisation du cœur : Choisissez ensemble le serment que vous vous faites pour demain :",
      "type": "CHOIX_MULTIPLE",
      "timer": 20,
      "difficulty": 1,
      "options": [
        "Être toujours là l'un pour l'autre",
        "Réussir ensemble tous nos projets",
        "Ne jamais laisser la routine s'installer",
        "S'aimer chaque jour un peu plus fort"
      ]
    }
  ],
  "classement": [
    {
      "id": "cl_001",
      "text": "Épreuve de Classement N°1 — Classe ces activités de loisir selon les préférences de ton partenaire (du plus aimé au moins aimé) :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Cinéma & Séries",
        "Restaurant en amoureux",
        "Plage & Farniente",
        "Jeux vidéo & Gaming",
        "Sport & Fitness"
      ]
    },
    {
      "id": "cl_002",
      "text": "Épreuve de Classement N°2 — Classe ces qualités humaines selon l'importance que ton partenaire leur accorde :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Fidélité absolue",
        "Sens de l'humour",
        "Générosité du cœur",
        "Intelligence & Esprit",
        "Attirance & Beauté"
      ]
    },
    {
      "id": "cl_003",
      "text": "Épreuve de Classement N°3 — Classe ces destinations de voyage selon les rêves d'évasion de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Paris romantique",
        "Dubaï moderne",
        "New York vibrant",
        "Bali paradisiaque",
        "Abidjan chaleureuse"
      ]
    },
    {
      "id": "cl_004",
      "text": "Épreuve de Classement N°4 — Classe ces postes de dépenses selon les priorités financières de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Logement douillet",
        "Bonne nourriture",
        "Voyages & Loisirs",
        "Vêtements & Mode",
        "Épargne & Avenir"
      ]
    },
    {
      "id": "cl_005",
      "text": "Épreuve de Classement N°5 — Classe ces types de repas selon les envies gourmandes de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Plat africain traditionnel",
        "Pizza italienne au feu de bois",
        "Burger frites gourmet",
        "Sushis et cuisine asiatique",
        "Salade fraîche et légère"
      ]
    },
    {
      "id": "cl_006",
      "text": "Épreuve de Classement N°6 — Classe ces moments de la journée selon l'énergie de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Le réveil matinal",
        "La pause déjeuner",
        "Le coucher de soleil",
        "Le dîner en tête-à-tête",
        "La nuit étoilée"
      ]
    },
    {
      "id": "cl_007",
      "text": "Épreuve de Classement N°7 — Classe ces genres de films selon les préférences de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Comédie hilarante",
        "Action & Super-héros",
        "Romance & Drame",
        "Thriller & Suspense",
        "Horreur & Épouvante"
      ]
    },
    {
      "id": "cl_008",
      "text": "Épreuve de Classement N°8 — Classe ces petites attentions amoureuses selon ce qui touche le plus ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Un câlin spontané chaleureux",
        "Un message d'amour surprise",
        "Un cadeau inattendu",
        "Un bon plat cuisiné maison",
        "Un compliment sincère"
      ]
    },
    {
      "id": "cl_009",
      "text": "Épreuve de Classement N°9 — Classe ces réseaux sociaux selon le temps que ton partenaire y consacre :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Instagram",
        "TikTok",
        "WhatsApp",
        "YouTube",
        "X (Twitter)"
      ]
    },
    {
      "id": "cl_010",
      "text": "Épreuve de Classement N°10 — Classe ces musiques selon la playlist quotidienne de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Afrobeat / Afropop",
        "RnB / Soul",
        "Rap / Hip-hop",
        "Pop internationale",
        "Variété française"
      ]
    },
    {
      "id": "cl_011",
      "text": "Épreuve de Classement N°11 — Classe ces activités de loisir selon les préférences de ton partenaire (du plus aimé au moins aimé) :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Cinéma & Séries",
        "Restaurant en amoureux",
        "Plage & Farniente",
        "Jeux vidéo & Gaming",
        "Sport & Fitness"
      ]
    },
    {
      "id": "cl_012",
      "text": "Épreuve de Classement N°12 — Classe ces qualités humaines selon l'importance que ton partenaire leur accorde :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Fidélité absolue",
        "Sens de l'humour",
        "Générosité du cœur",
        "Intelligence & Esprit",
        "Attirance & Beauté"
      ]
    },
    {
      "id": "cl_013",
      "text": "Épreuve de Classement N°13 — Classe ces destinations de voyage selon les rêves d'évasion de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Paris romantique",
        "Dubaï moderne",
        "New York vibrant",
        "Bali paradisiaque",
        "Abidjan chaleureuse"
      ]
    },
    {
      "id": "cl_014",
      "text": "Épreuve de Classement N°14 — Classe ces postes de dépenses selon les priorités financières de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Logement douillet",
        "Bonne nourriture",
        "Voyages & Loisirs",
        "Vêtements & Mode",
        "Épargne & Avenir"
      ]
    },
    {
      "id": "cl_015",
      "text": "Épreuve de Classement N°15 — Classe ces types de repas selon les envies gourmandes de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Plat africain traditionnel",
        "Pizza italienne au feu de bois",
        "Burger frites gourmet",
        "Sushis et cuisine asiatique",
        "Salade fraîche et légère"
      ]
    },
    {
      "id": "cl_016",
      "text": "Épreuve de Classement N°16 — Classe ces moments de la journée selon l'énergie de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Le réveil matinal",
        "La pause déjeuner",
        "Le coucher de soleil",
        "Le dîner en tête-à-tête",
        "La nuit étoilée"
      ]
    },
    {
      "id": "cl_017",
      "text": "Épreuve de Classement N°17 — Classe ces genres de films selon les préférences de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Comédie hilarante",
        "Action & Super-héros",
        "Romance & Drame",
        "Thriller & Suspense",
        "Horreur & Épouvante"
      ]
    },
    {
      "id": "cl_018",
      "text": "Épreuve de Classement N°18 — Classe ces petites attentions amoureuses selon ce qui touche le plus ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Un câlin spontané chaleureux",
        "Un message d'amour surprise",
        "Un cadeau inattendu",
        "Un bon plat cuisiné maison",
        "Un compliment sincère"
      ]
    },
    {
      "id": "cl_019",
      "text": "Épreuve de Classement N°19 — Classe ces réseaux sociaux selon le temps que ton partenaire y consacre :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Instagram",
        "TikTok",
        "WhatsApp",
        "YouTube",
        "X (Twitter)"
      ]
    },
    {
      "id": "cl_020",
      "text": "Épreuve de Classement N°20 — Classe ces musiques selon la playlist quotidienne de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Afrobeat / Afropop",
        "RnB / Soul",
        "Rap / Hip-hop",
        "Pop internationale",
        "Variété française"
      ]
    },
    {
      "id": "cl_021",
      "text": "Épreuve de Classement N°21 — Classe ces activités de loisir selon les préférences de ton partenaire (du plus aimé au moins aimé) :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Cinéma & Séries",
        "Restaurant en amoureux",
        "Plage & Farniente",
        "Jeux vidéo & Gaming",
        "Sport & Fitness"
      ]
    },
    {
      "id": "cl_022",
      "text": "Épreuve de Classement N°22 — Classe ces qualités humaines selon l'importance que ton partenaire leur accorde :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Fidélité absolue",
        "Sens de l'humour",
        "Générosité du cœur",
        "Intelligence & Esprit",
        "Attirance & Beauté"
      ]
    },
    {
      "id": "cl_023",
      "text": "Épreuve de Classement N°23 — Classe ces destinations de voyage selon les rêves d'évasion de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Paris romantique",
        "Dubaï moderne",
        "New York vibrant",
        "Bali paradisiaque",
        "Abidjan chaleureuse"
      ]
    },
    {
      "id": "cl_024",
      "text": "Épreuve de Classement N°24 — Classe ces postes de dépenses selon les priorités financières de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Logement douillet",
        "Bonne nourriture",
        "Voyages & Loisirs",
        "Vêtements & Mode",
        "Épargne & Avenir"
      ]
    },
    {
      "id": "cl_025",
      "text": "Épreuve de Classement N°25 — Classe ces types de repas selon les envies gourmandes de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Plat africain traditionnel",
        "Pizza italienne au feu de bois",
        "Burger frites gourmet",
        "Sushis et cuisine asiatique",
        "Salade fraîche et légère"
      ]
    },
    {
      "id": "cl_026",
      "text": "Épreuve de Classement N°26 — Classe ces moments de la journée selon l'énergie de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Le réveil matinal",
        "La pause déjeuner",
        "Le coucher de soleil",
        "Le dîner en tête-à-tête",
        "La nuit étoilée"
      ]
    },
    {
      "id": "cl_027",
      "text": "Épreuve de Classement N°27 — Classe ces genres de films selon les préférences de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Comédie hilarante",
        "Action & Super-héros",
        "Romance & Drame",
        "Thriller & Suspense",
        "Horreur & Épouvante"
      ]
    },
    {
      "id": "cl_028",
      "text": "Épreuve de Classement N°28 — Classe ces petites attentions amoureuses selon ce qui touche le plus ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Un câlin spontané chaleureux",
        "Un message d'amour surprise",
        "Un cadeau inattendu",
        "Un bon plat cuisiné maison",
        "Un compliment sincère"
      ]
    },
    {
      "id": "cl_029",
      "text": "Épreuve de Classement N°29 — Classe ces réseaux sociaux selon le temps que ton partenaire y consacre :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Instagram",
        "TikTok",
        "WhatsApp",
        "YouTube",
        "X (Twitter)"
      ]
    },
    {
      "id": "cl_030",
      "text": "Épreuve de Classement N°30 — Classe ces musiques selon la playlist quotidienne de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Afrobeat / Afropop",
        "RnB / Soul",
        "Rap / Hip-hop",
        "Pop internationale",
        "Variété française"
      ]
    },
    {
      "id": "cl_031",
      "text": "Épreuve de Classement N°31 — Classe ces activités de loisir selon les préférences de ton partenaire (du plus aimé au moins aimé) :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Cinéma & Séries",
        "Restaurant en amoureux",
        "Plage & Farniente",
        "Jeux vidéo & Gaming",
        "Sport & Fitness"
      ]
    },
    {
      "id": "cl_032",
      "text": "Épreuve de Classement N°32 — Classe ces qualités humaines selon l'importance que ton partenaire leur accorde :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Fidélité absolue",
        "Sens de l'humour",
        "Générosité du cœur",
        "Intelligence & Esprit",
        "Attirance & Beauté"
      ]
    },
    {
      "id": "cl_033",
      "text": "Épreuve de Classement N°33 — Classe ces destinations de voyage selon les rêves d'évasion de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Paris romantique",
        "Dubaï moderne",
        "New York vibrant",
        "Bali paradisiaque",
        "Abidjan chaleureuse"
      ]
    },
    {
      "id": "cl_034",
      "text": "Épreuve de Classement N°34 — Classe ces postes de dépenses selon les priorités financières de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Logement douillet",
        "Bonne nourriture",
        "Voyages & Loisirs",
        "Vêtements & Mode",
        "Épargne & Avenir"
      ]
    },
    {
      "id": "cl_035",
      "text": "Épreuve de Classement N°35 — Classe ces types de repas selon les envies gourmandes de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Plat africain traditionnel",
        "Pizza italienne au feu de bois",
        "Burger frites gourmet",
        "Sushis et cuisine asiatique",
        "Salade fraîche et légère"
      ]
    },
    {
      "id": "cl_036",
      "text": "Épreuve de Classement N°36 — Classe ces moments de la journée selon l'énergie de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Le réveil matinal",
        "La pause déjeuner",
        "Le coucher de soleil",
        "Le dîner en tête-à-tête",
        "La nuit étoilée"
      ]
    },
    {
      "id": "cl_037",
      "text": "Épreuve de Classement N°37 — Classe ces genres de films selon les préférences de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Comédie hilarante",
        "Action & Super-héros",
        "Romance & Drame",
        "Thriller & Suspense",
        "Horreur & Épouvante"
      ]
    },
    {
      "id": "cl_038",
      "text": "Épreuve de Classement N°38 — Classe ces petites attentions amoureuses selon ce qui touche le plus ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Un câlin spontané chaleureux",
        "Un message d'amour surprise",
        "Un cadeau inattendu",
        "Un bon plat cuisiné maison",
        "Un compliment sincère"
      ]
    },
    {
      "id": "cl_039",
      "text": "Épreuve de Classement N°39 — Classe ces réseaux sociaux selon le temps que ton partenaire y consacre :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Instagram",
        "TikTok",
        "WhatsApp",
        "YouTube",
        "X (Twitter)"
      ]
    },
    {
      "id": "cl_040",
      "text": "Épreuve de Classement N°40 — Classe ces musiques selon la playlist quotidienne de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Afrobeat / Afropop",
        "RnB / Soul",
        "Rap / Hip-hop",
        "Pop internationale",
        "Variété française"
      ]
    },
    {
      "id": "cl_041",
      "text": "Épreuve de Classement N°41 — Classe ces activités de loisir selon les préférences de ton partenaire (du plus aimé au moins aimé) :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Cinéma & Séries",
        "Restaurant en amoureux",
        "Plage & Farniente",
        "Jeux vidéo & Gaming",
        "Sport & Fitness"
      ]
    },
    {
      "id": "cl_042",
      "text": "Épreuve de Classement N°42 — Classe ces qualités humaines selon l'importance que ton partenaire leur accorde :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Fidélité absolue",
        "Sens de l'humour",
        "Générosité du cœur",
        "Intelligence & Esprit",
        "Attirance & Beauté"
      ]
    },
    {
      "id": "cl_043",
      "text": "Épreuve de Classement N°43 — Classe ces destinations de voyage selon les rêves d'évasion de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Paris romantique",
        "Dubaï moderne",
        "New York vibrant",
        "Bali paradisiaque",
        "Abidjan chaleureuse"
      ]
    },
    {
      "id": "cl_044",
      "text": "Épreuve de Classement N°44 — Classe ces postes de dépenses selon les priorités financières de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Logement douillet",
        "Bonne nourriture",
        "Voyages & Loisirs",
        "Vêtements & Mode",
        "Épargne & Avenir"
      ]
    },
    {
      "id": "cl_045",
      "text": "Épreuve de Classement N°45 — Classe ces types de repas selon les envies gourmandes de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Plat africain traditionnel",
        "Pizza italienne au feu de bois",
        "Burger frites gourmet",
        "Sushis et cuisine asiatique",
        "Salade fraîche et légère"
      ]
    },
    {
      "id": "cl_046",
      "text": "Épreuve de Classement N°46 — Classe ces moments de la journée selon l'énergie de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Le réveil matinal",
        "La pause déjeuner",
        "Le coucher de soleil",
        "Le dîner en tête-à-tête",
        "La nuit étoilée"
      ]
    },
    {
      "id": "cl_047",
      "text": "Épreuve de Classement N°47 — Classe ces genres de films selon les préférences de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Comédie hilarante",
        "Action & Super-héros",
        "Romance & Drame",
        "Thriller & Suspense",
        "Horreur & Épouvante"
      ]
    },
    {
      "id": "cl_048",
      "text": "Épreuve de Classement N°48 — Classe ces petites attentions amoureuses selon ce qui touche le plus ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Un câlin spontané chaleureux",
        "Un message d'amour surprise",
        "Un cadeau inattendu",
        "Un bon plat cuisiné maison",
        "Un compliment sincère"
      ]
    },
    {
      "id": "cl_049",
      "text": "Épreuve de Classement N°49 — Classe ces réseaux sociaux selon le temps que ton partenaire y consacre :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Instagram",
        "TikTok",
        "WhatsApp",
        "YouTube",
        "X (Twitter)"
      ]
    },
    {
      "id": "cl_050",
      "text": "Épreuve de Classement N°50 — Classe ces musiques selon la playlist quotidienne de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Afrobeat / Afropop",
        "RnB / Soul",
        "Rap / Hip-hop",
        "Pop internationale",
        "Variété française"
      ]
    },
    {
      "id": "cl_051",
      "text": "Épreuve de Classement N°51 — Classe ces activités de loisir selon les préférences de ton partenaire (du plus aimé au moins aimé) :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Cinéma & Séries",
        "Restaurant en amoureux",
        "Plage & Farniente",
        "Jeux vidéo & Gaming",
        "Sport & Fitness"
      ]
    },
    {
      "id": "cl_052",
      "text": "Épreuve de Classement N°52 — Classe ces qualités humaines selon l'importance que ton partenaire leur accorde :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Fidélité absolue",
        "Sens de l'humour",
        "Générosité du cœur",
        "Intelligence & Esprit",
        "Attirance & Beauté"
      ]
    },
    {
      "id": "cl_053",
      "text": "Épreuve de Classement N°53 — Classe ces destinations de voyage selon les rêves d'évasion de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Paris romantique",
        "Dubaï moderne",
        "New York vibrant",
        "Bali paradisiaque",
        "Abidjan chaleureuse"
      ]
    },
    {
      "id": "cl_054",
      "text": "Épreuve de Classement N°54 — Classe ces postes de dépenses selon les priorités financières de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Logement douillet",
        "Bonne nourriture",
        "Voyages & Loisirs",
        "Vêtements & Mode",
        "Épargne & Avenir"
      ]
    },
    {
      "id": "cl_055",
      "text": "Épreuve de Classement N°55 — Classe ces types de repas selon les envies gourmandes de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Plat africain traditionnel",
        "Pizza italienne au feu de bois",
        "Burger frites gourmet",
        "Sushis et cuisine asiatique",
        "Salade fraîche et légère"
      ]
    },
    {
      "id": "cl_056",
      "text": "Épreuve de Classement N°56 — Classe ces moments de la journée selon l'énergie de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Le réveil matinal",
        "La pause déjeuner",
        "Le coucher de soleil",
        "Le dîner en tête-à-tête",
        "La nuit étoilée"
      ]
    },
    {
      "id": "cl_057",
      "text": "Épreuve de Classement N°57 — Classe ces genres de films selon les préférences de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Comédie hilarante",
        "Action & Super-héros",
        "Romance & Drame",
        "Thriller & Suspense",
        "Horreur & Épouvante"
      ]
    },
    {
      "id": "cl_058",
      "text": "Épreuve de Classement N°58 — Classe ces petites attentions amoureuses selon ce qui touche le plus ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 2,
      "items": [
        "Un câlin spontané chaleureux",
        "Un message d'amour surprise",
        "Un cadeau inattendu",
        "Un bon plat cuisiné maison",
        "Un compliment sincère"
      ]
    },
    {
      "id": "cl_059",
      "text": "Épreuve de Classement N°59 — Classe ces réseaux sociaux selon le temps que ton partenaire y consacre :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 3,
      "items": [
        "Instagram",
        "TikTok",
        "WhatsApp",
        "YouTube",
        "X (Twitter)"
      ]
    },
    {
      "id": "cl_060",
      "text": "Épreuve de Classement N°60 — Classe ces musiques selon la playlist quotidienne de ton partenaire :",
      "type": "CLASSEMENT",
      "timer": 45,
      "difficulty": 1,
      "items": [
        "Afrobeat / Afropop",
        "RnB / Soul",
        "Rap / Hip-hop",
        "Pop internationale",
        "Variété française"
      ]
    }
  ]
};

const LEVELS = [
  {
    "id": 1,
    "name": "Première Connexion",
    "theme": "Découverte",
    "emoji": "💫",
    "miniGames": [
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_moi_lui"
        ],
        "count": 5
      },
      {
        "type": "GOUTS",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_oui_non"
        ],
        "count": 5
      },
      {
        "type": "DEVINE_MON_CHOIX",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 2,
    "name": "On Se Découvre",
    "theme": "Découverte",
    "emoji": "🔍",
    "miniGames": [
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_moi_lui"
        ],
        "count": 5
      },
      {
        "type": "DEVINE_MON_CHOIX",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "GOUTS",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      },
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_oui_non"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 3,
    "name": "Nos Habitudes",
    "theme": "Découverte",
    "emoji": "🌙",
    "miniGames": [
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_moi_lui",
          "habitudes_oui_non"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "GOUTS",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      },
      {
        "type": "DEVINE_MON_CHOIX",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_moi_lui"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 4,
    "name": "Notre Histoire",
    "theme": "Découverte",
    "emoji": "🎁",
    "rewardLevel": true,
    "rewardThreshold": 190,
    "rewardMax": 200,
    "rewardGift": 1,
    "miniGames": [
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_moi_lui"
        ],
        "count": 5
      },
      {
        "type": "DEVINE_MON_CHOIX",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 5,
    "name": "Complices",
    "theme": "Complicité",
    "emoji": "🤝",
    "miniGames": [
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_oui_non"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 6,
    "name": "Bonne Mémoire",
    "theme": "Complicité",
    "emoji": "🧠",
    "miniGames": [
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_moi_lui"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 7,
    "name": "Je Te Connais",
    "theme": "Complicité",
    "emoji": "👁️",
    "miniGames": [
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "DEVINE_MON_CHOIX",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_oui_non"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 8,
    "name": "Même Longueur d'Onde",
    "theme": "Complicité",
    "emoji": "📡",
    "miniGames": [
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "DEVINE_MON_CHOIX",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      },
      {
        "type": "HABITUDES",
        "cats": [
          "habitudes_moi_lui"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 9,
    "name": "Dans Ta Tête",
    "theme": "Connaissance Profonde",
    "emoji": "🌀",
    "miniGames": [
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "DEVINE_MON_CHOIX",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 10,
    "name": "Ça Devient Sérieux",
    "theme": "Connaissance Profonde",
    "emoji": "⚡",
    "miniGames": [
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "DEVINE_MON_CHOIX",
        "cats": [
          "gouts_choix_multiple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 11,
    "name": "Connexion Profonde",
    "theme": "Connaissance Profonde",
    "emoji": "💜",
    "miniGames": [
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios",
          "choix_impossible",
          "synchronisation"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 12,
    "name": "Sommes-nous Vraiment Complices ?",
    "theme": "Connaissance Profonde",
    "emoji": "🎁",
    "rewardLevel": true,
    "rewardThreshold": 570,
    "rewardMax": 600,
    "rewardGift": 2,
    "miniGames": [
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios",
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 13,
    "name": "Synchronisation",
    "theme": "Connaissance Profonde",
    "emoji": "🎯",
    "miniGames": [
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 14,
    "name": "Grande Complicité",
    "theme": "Expert",
    "emoji": "🏅",
    "miniGames": [
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios",
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 15,
    "name": "Niveau Expert",
    "theme": "Expert",
    "emoji": "⭐",
    "miniGames": [
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios",
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 16,
    "name": "Presque Parfait",
    "theme": "Expert",
    "emoji": "💫",
    "miniGames": [
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios",
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 17,
    "name": "Dernière Ligne Droite",
    "theme": "Expert",
    "emoji": "🏃",
    "miniGames": [
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios",
          "synchronisation",
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 18,
    "name": "Contre la Montre",
    "theme": "Phase Finale",
    "emoji": "⏱️",
    "timerReduction": 0.8,
    "miniGames": [
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios",
          "choix_impossible",
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 19,
    "name": "Avant la Finale",
    "theme": "Phase Finale",
    "emoji": "🔮",
    "timerReduction": 0.75,
    "miniGames": [
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios",
          "synchronisation",
          "meme_pensee",
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      }
    ]
  },
  {
    "id": 20,
    "name": "L'Épreuve Ultime",
    "theme": "Phase Finale",
    "emoji": "🏆",
    "rewardLevel": true,
    "rewardThreshold": 950,
    "rewardMax": 1000,
    "rewardGift": 3,
    "isGrandFinal": true,
    "timerReduction": 0.7,
    "miniGames": [
      {
        "type": "EPREUVE_SURPRISE",
        "cats": [
          "scenarios",
          "synchronisation",
          "meme_pensee",
          "choix_impossible",
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "SYNCHRONISATION",
        "cats": [
          "synchronisation"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE_FLASH",
        "cats": [
          "memoire_flash"
        ],
        "count": 5
      },
      {
        "type": "CLASSEMENT",
        "cats": [
          "classement"
        ],
        "count": 5
      },
      {
        "type": "SCENARIOS",
        "cats": [
          "scenarios"
        ],
        "count": 5
      },
      {
        "type": "CONNAISSANCE",
        "cats": [
          "connaissance_ecrit"
        ],
        "count": 5
      },
      {
        "type": "MEME_PENSEE",
        "cats": [
          "meme_pensee"
        ],
        "count": 5
      },
      {
        "type": "QUI_FAIT_CA",
        "cats": [
          "qui_fait_ca"
        ],
        "count": 5
      },
      {
        "type": "CHOIX_IMPOSSIBLE",
        "cats": [
          "choix_impossible"
        ],
        "count": 5
      },
      {
        "type": "MEMOIRE",
        "cats": [
          "memoire_couple"
        ],
        "count": 5
      }
    ]
  }
];

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
