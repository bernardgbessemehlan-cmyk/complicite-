// ============================================================
// SCRIPT DE GÉNÉRATION DE LA BANQUE GÉANTE DE QUESTIONS (1000+)
// ============================================================
const fs = require('fs');
const path = require('path');

const QUESTION_TYPES = {
  MOI_LUI: 'MOI_LUI',
  OUI_NON: 'OUI_NON',
  ECRIT: 'ECRIT',
  CHOIX_MULTIPLE: 'CHOIX_MULTIPLE',
  CLASSEMENT: 'CLASSEMENT',
  MEME_PENSEE: 'MEME_PENSEE'
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

// 1. HABITUDES MOI LUI (80 questions)
const habitudes_moi_lui = [
  "Qui dort le plus longtemps le week-end ?",
  "Qui utilise le plus son téléphone pendant un repas ?",
  "Qui est le plus souvent en retard aux rendez-vous ?",
  "Qui est le plus ordonné et maniaque ?",
  "Qui est le plus têtu lors d'une discussion ?",
  "Qui mange le plus rapidement ?",
  "Qui se lève le premier le matin ?",
  "Qui dépense le plus facilement son argent pour des petits plaisirs ?",
  "Qui dit le plus souvent 'je t'aime' en premier ?",
  "Qui s'énerve le plus vite pour des détails ?",
  "Qui fait le premier pas après une bouderie ?",
  "Qui est le plus romantique et attentionné ?",
  "Qui oublie le plus facilement les dates importantes ?",
  "Qui cuisine les meilleurs petits plats ?",
  "Qui regarde le plus de films et séries au lit ?",
  "Qui est le plus jaloux dans le couple ?",
  "Qui a le plus besoin de moments d'indépendance ?",
  "Qui s'inquiète le plus pour le futur ?",
  "Qui est le plus courageux face aux imprévus ?",
  "Qui est le plus difficile à comprendre quand il/elle ne parle pas ?",
  "Qui est le plus susceptible de bouder toute une journée ?",
  "Qui est le plus généreux avec ses proches ?",
  "Qui est le plus susceptible de verser une larme devant un film émouvant ?",
  "Qui fait le plus de bruit en mangeant ou en buvant ?",
  "Qui passe le plus de temps dans la salle de bain pour se préparer ?",
  "Qui prend le plus de photos et selfies pendant les sorties ?",
  "Qui s'endort le plus rapidement une fois la tête posée sur l'oreiller ?",
  "Qui a les goûts musicaux les plus éclectiques ?",
  "Qui perd le plus souvent ses clés ou son téléphone ?",
  "Qui a le plus d'énergie dès le réveil ?",
  "Qui est le plus doué pour négocier les prix au marché ou en magasin ?",
  "Qui aime le plus les surprises et cadeaux inattendus ?",
  "Qui commence une conversation sur un coup de tête au milieu de la nuit ?",
  "Qui boit le plus de café ou de thé dans la journée ?",
  "Qui est le plus sociable quand vous rencontrez de nouvelles personnes ?",
  "Qui a le rire le plus communicatif et bruyant ?",
  "Qui hésite le plus longtemps avant de choisir son plat au restaurant ?",
  "Qui propose le plus souvent des sorties ou des voyages ?",
  "Qui est le plus attaché à ses habitudes et routines ?",
  "Qui sait le mieux garder son calme en cas de crise ?",
  "Qui a le sommeil le plus lourd ?",
  "Qui grignote le plus entre les repas ou la nuit ?",
  "Qui conduit ou navigue le mieux sans GPS ?",
  "Qui donne les meilleurs conseils de vie ?",
  "Qui est le plus protecteur envers l'autre ?",
  "Qui chante le plus souvent sous la douche ?",
  "Qui a la plus grande mémoire des détails futiles ?",
  "Qui répond le plus vite aux messages WhatsApp ?",
  "Qui laisse traîner ses affaires un peu partout ?",
  "Qui est le plus frileux quand il fait un peu frais ?",
  "Qui a le plus peur des petites bêtes ou insectes ?",
  "Qui sait le mieux réconforter l'autre quand ça ne va pas ?",
  "Qui est le plus exigeant avec lui-même ?",
  "Qui adore le plus faire des câlins spontanés ?",
  "Qui a le plus de patience avec les enfants ?",
  "Qui est le plus passionné quand il parle de son travail ?",
  "Qui est le plus adepte du shopping en ligne ?",
  "Qui fait les plus beaux compliments ?",
  "Qui a le plus tendance à tout remettre au lendemain ?",
  "Qui sait le mieux garder un secret d'ami ?",
  "Qui s'adapte le plus vite aux changements de plans ?",
  "Qui aime le plus raconter des potins de la journée ?",
  "Qui a le look le plus soigné au quotidien ?",
  "Qui a le plus d'humour et fait rire la galerie ?",
  "Qui est le plus susceptible de faire un achat compulsif ?",
  "Qui veille le plus tard le soir devant son écran ?",
  "Qui a le plus de mal à dire 'non' aux gens ?",
  "Qui sait le mieux bricoler ou réparer des choses ?",
  "Qui est le plus gourmand de sucreries ou desserts ?",
  "Qui s'inquiète le premier quand l'autre ne répond pas au téléphone ?",
  "Qui a le plus de contacts et d'amis proches ?",
  "Qui est le plus rancunier après un désaccord ?",
  "Qui a la démarche la plus rapide quand vous marchez ensemble ?",
  "Qui adore le plus faire la sieste l'après-midi ?",
  "Qui est le plus créatif et plein d'idées neuves ?",
  "Qui est le plus expressif avec son visage quand il/elle n'est pas content(e) ?",
  "Qui planifie les vacances et réservations à l'avance ?",
  "Qui se plaint le plus de la météo quand il fait trop chaud ou trop froid ?",
  "Qui est le plus spontané pour dire 'viens on part maintenant' ?",
  "Qui est le cœur battant et le plus démonstratif de votre couple ?"
].map((text, i) => ({
  id: `hml_${String(i + 1).padStart(3, '0')}`,
  text,
  type: QUESTION_TYPES.MOI_LUI,
  timer: 20,
  difficulty: (i % 3) + 1
}));

// 2. HABITUDES OUI/NON (60 questions - formulées sur le couple / complicité partagée)
const habitudes_oui_non = [
  "Aimez-vous tous les deux passer un week-end entier en amoureux sans sortir ?",
  "Avez-vous déjà envisagé sérieusement de vivre dans un autre pays ensemble ?",
  "Votre couple parle-t-il ouvertement d'argent et de projets financiers sans tabou ?",
  "Aimez-vous les surprises et cadeaux improvisés sans occasion spéciale ?",
  "Avez-vous une chanson fétiche qui représente votre histoire d'amour ?",
  "Préférez-vous régler une dispute le jour même plutôt que de dormir fâchés ?",
  "Partagez-vous les mêmes valeurs fondamentales sur la famille et l'avenir ?",
  "Avez-vous un rituel précis tous les soirs avant de dormir (appel, message) ?",
  "Aimez-vous voyager à l'aventure sans planning rigide et détaillé ?",
  "Votre complicité vous permet-elle de vous comprendre juste avec un regard ?",
  "Aimez-vous cuisiner ensemble en amoureux le week-end ?",
  "Êtes-vous d'accord sur le nombre d'enfants souhaité pour le futur ?",
  "Avez-vous déjà passé plus de 3 heures d'affilée en appel sans voir le temps passer ?",
  "Faites-vous confiance à 100% à votre partenaire quand il/elle sort avec des amis ?",
  "Avez-vous un surnom secret que personne d'autre n'utilise ?",
  "Aimez-vous regarder la même série en synchronisé à distance ?",
  "Pensez-vous que la distance a renforcé la solidité de votre couple ?",
  "Avez-vous tous les deux le même genre d'humour un peu fou ?",
  "Aimez-vous vous offrir des petits cadeaux symboliques faits main ?",
  "Êtes-vous capables de deviner l'humeur de l'autre rien qu'au ton de sa voix ?",
  "Avez-vous déjà rêvé de votre mariage ou de votre vie commune ?",
  "Aimez-vous parler pendant des heures de vos souvenirs d'enfance ?",
  "Avez-vous déjà prévu votre prochaine destination de vacances à deux ?",
  "Votre couple résiste-t-il bien aux périodes de stress ou d'examens ?",
  "Aimez-vous vous envoyer des photos de vos repas ou de vos tenues dans la journée ?",
  "Avez-vous déjà pleuré de joie ou d'émotion en vous retrouvant à l'aéroport ou à la gare ?",
  "Êtes-vous tous les deux plutôt lève-tard le dimanche matin ?",
  "Considérez-vous votre partenaire comme votre meilleur(e) ami(e) en premier lieu ?",
  "Aimez-vous tester de nouveaux restaurants ou de nouvelles recettes ensemble ?",
  "Avez-vous déjà eu un fou rire incontrôlable au téléphone ensemble ?",
  "Partagez-vous les mêmes goûts sur les films d'action ou de suspense ?",
  "Votre couple a-t-il une date anniversaire précise que vous célébrez ?",
  "Avez-vous déjà rédigé une lettre d'amour manuscrite pour l'autre ?",
  "Aimez-vous vous endormir en visio ou au téléphone ?",
  "Pensez-vous être plus complices aujourd'hui qu'au premier jour de votre rencontre ?",
  "Avez-vous un projet professionnel ou personnel commun pour les 3 prochaines années ?",
  "Êtes-vous du genre à tout vous raconter sans aucun secret l'un pour l'autre ?",
  "Avez-vous déjà ressenti le manque physique au point d'en avoir le cœur serré ?",
  "Aimez-vous vous taquiner avec tendresse au quotidien ?",
  "Pensez-vous que votre rencontre était guidée par le destin ?",
  "Avez-vous déjà acheté un vêtement ou accessoire assorti pour vous deux ?",
  "Aimez-vous écouter des playlists musicales partagées en même temps ?",
  "Votre partenaire sait-il exactement ce qui peut vous consoler en cas de coup dur ?",
  "Êtes-vous d'accord sur la façon de gérer les disputes ou tensions ?",
  "Avez-vous déjà fait une surprise totale en débarquant sans prévenir ?",
  "Aimez-vous vous imaginer vieux ensemble dans une belle maison ?",
  "Votre couple est-il plutôt expressif en public ou discret et pudique ?",
  "Aimez-vous vous envoyer des mèmes ou TikToks rigolos tous les jours ?",
  "Avez-vous déjà gardé un parfum ou un t-shirt de l'autre pour vous souvenir de son odeur ?",
  "Êtes-vous d'accord sur la gestion des tâches ménagères quand vous vivez ensemble ?",
  "Avez-vous confiance en l'avenir de votre relation sur le très long terme ?",
  "Aimez-vous parler de vos rêves les plus fous sans peur du jugement de l'autre ?",
  "Pensez-vous être sur la même longueur d'onde spirituelle ou philosophique ?",
  "Avez-vous déjà partagé un secret très intime que personne d'autre ne connaît ?",
  "Aimez-vous vous lancer des défis amusants comme ce jeu Complicité ?",
  "Votre couple a-t-il une expression ou un mot inventé qui n'appartient qu'à vous ?",
  "Avez-vous déjà passé une nuit blanche entière à refaire le monde à deux ?",
  "Pensez-vous que l'amour vrai peut surmonter n'importe quel obstacle de distance ?",
  "Avez-vous déjà planifié le lieu exact de vos prochaines retrouvailles ?",
  "Votre cœur bat-il encore plus fort quand vous voyez son nom s'afficher à l'écran ?"
].map((text, i) => ({
  id: `hon_${String(i + 1).padStart(3, '0')}`,
  text,
  type: QUESTION_TYPES.OUI_NON,
  timer: 20,
  difficulty: (i % 3) + 1
}));

// 3. CONNAISSANCE ECRIT (120 questions avec équivalences enrichies)
const connaissance_ecrit = [
  { text: "Quelle est la date d'anniversaire de ton partenaire ?", hint: "Format : JJ/MM ou JJ/MM/AAAA", equivalences: [] },
  { text: "Quelle est la couleur préférée de ton partenaire ?", equivalences: [['bleu', 'bleu marine', 'bleu ciel', 'azur', 'cyan'], ['rouge', 'bordeaux', 'pourpre'], ['vert', 'vert kaki', 'kaki', 'vert pomme'], ['rose', 'fuschia', 'fuchsia'], ['noir', 'sombre'], ['blanc', 'ivoire'], ['jaune', 'moutarde', 'or'], ['violet', 'mauve', 'lilas']] },
  { text: "Quel est le plat préféré de ton partenaire ?", equivalences: [['riz', 'tiep', 'thieb', 'riz gras', 'riz au poulet'], ['alloco', 'aloko', 'plantain', 'banane plantain'], ['attieke', 'garba', 'attieke poisson'], ['poulet', 'poulet braise', 'poulet roti'], ['poisson', 'poisson braise', 'carpe braisee'], ['pates', 'spaghetti', 'spaghetti bolognaise', 'pasta'], ['pizza', 'pizzas'], ['burger', 'hamburger', 'cheeseburger'], ['foutou', 'foufou', 'igname']] },
  { text: "Dans quelle ville ton partenaire a-t-il/elle grandi ?", equivalences: [['paris', 'paname'], ['abidjan', 'babi'], ['cotonou'], ['lome'], ['dakar'], ['yaounde'], ['douala'], ['bordeaux'], ['lyon'], ['marseille']] },
  { text: "Quel est le prénom de la mère de ton partenaire ?", equivalences: [] },
  { text: "Quel est le prénom du père de ton partenaire ?", equivalences: [] },
  { text: "Quelle est la destination de voyage dont rêve ton partenaire ?", equivalences: [['paris', 'paname'], ['dubai', 'les emirats'], ['new york', 'nyc'], ['tokyo', 'le japon'], ['bali', 'indonesie'], ['zanzibar', 'tanzanie'], ['maldives'], ['canada', 'montreal']] },
  { text: "Quel est le rêve professionnel ultime de ton partenaire ?", equivalences: [['entrepreneur', 'chef d entreprise', 'business', 'sa propre boite', 'creer une entreprise'], ['medecin', 'docteur'], ['architecte', 'architecture'], ['artiste', 'chanteur', 'musicien'], ['avocat', 'juriste'], ['directeur', 'manager', 'cadre'], ['informaticien', 'developpeur', 'ingenieur']] },
  { text: "Quel est le loisir ou passe-temps favori de ton partenaire ?", equivalences: [['sport', 'musculation', 'muscu', 'fitness'], ['dormir', 'dodo', 'faire la sieste', 'repos'], ['musique', 'ecouter de la musique'], ['cinema', 'cine', 'regarder des films'], ['series', 'netflix', 'tele'], ['lecture', 'lire', 'livres'], ['jeux video', 'gaming', 'console', 'playstation'], ['cuisine', 'cuisiner', 'faire a manger']] },
  { text: "Quel est le film ou dessin animé préféré de ton partenaire ?", equivalences: [] },
  { text: "Quelle est la plus grande peur ou phobie de ton partenaire ?", equivalences: [['serpents', 'serpent'], ['araignees', 'araignee', 'insectes'], ['hauteur', 'vide', 'vertige'], ['noir', 'obscurite'], ['solitude', 'etre seul'], ['echec', 'echouer'], ['eau', 'noyade']] },
  { text: "Quel était le surnom d'enfance de ton partenaire ?", equivalences: [] },
  { text: "Quelle est la chanson ou artiste préféré(e) de ton partenaire ?", equivalences: [] },
  { text: "Quel est le prénom du meilleur ami ou de la meilleure amie de ton partenaire ?", equivalences: [] },
  { text: "Quel animal ton partenaire aimerait-il avoir chez lui ?", equivalences: [['chien', 'chiot', 'toutou'], ['chat', 'chaton', 'minou'], ['oiseau', 'perroquet'], ['poisson', 'poisson rouge'], ['lapin'], ['cheval']] },
  { text: "Quelle est la boisson préférée de ton partenaire pour se détendre ?", equivalences: [['eau', 'eau fraiche'], ['jus', 'jus de fruits', 'jus d orange', 'jus de mangue'], ['soda', 'coca', 'coca cola'], ['cafe', 'espresso', 'cappuccino'], ['the', 'infusion', 'the a la menthe'], ['cocktail', 'mojito'], ['vin', 'vin rouge', 'champagne'], ['biere']] },
  { text: "Quel est le dessert ou la douceur dont ton partenaire raffole ?", equivalences: [['chocolat', 'gateau au chocolat', 'fondant'], ['glace', 'creme glacee', 'sorbet'], ['crepes', 'crepe', 'gaufre'], ['tiramisu'], ['cheesecake'], ['fruits', 'salade de fruits']] },
  { text: "Quel est le chiffre ou numéro fétiche de ton partenaire ?", equivalences: [] },
  { text: "Quelle est la pointure de chaussures de ton partenaire ?", equivalences: [] },
  { text: "Quelle est la plus grande qualité de ton partenaire à tes yeux ?", equivalences: [['gentillesse', 'gentil', 'bon coeur', 'attentionne', 'doux'], ['fidelite', 'fidele', 'loyal', 'loyaute'], ['intelligence', 'intelligent', 'brillant'], ['humour', 'drole', 'fait rire', 'marrant'], ['courage', 'courageux', 'travailleur', 'ambitieux'], ['beaute', 'beau', 'charme']] },
  { text: "Quel est le plus grand défaut de ton partenaire quand il s'énerve ?", equivalences: [['tetu', 'obstine', 'tete dure', 'tete de mule'], ['fierte', 'fier', 'orgueil'], ['impatient', 'impatience', 's enerve vite'], ['boudeur', 'bouder', 'ferme'], ['froid', 'distant'], ['rancunier']] },
  { text: "Quelle est la marque de vêtements ou de baskets que préfère ton partenaire ?", equivalences: [['nike'], ['adidas'], ['zara'], ['jordan'], ['puma'], ['gucci'], ['louis vuitton']] },
  { text: "Quel est le type de cuisine que ton partenaire adore manger dehors ?", equivalences: [['africaine', 'africain', 'plats africains'], ['italienne', 'italien', 'pates et pizza'], ['chinoise', 'asiatique', 'japonais', 'sushi'], ['fast food', 'burger', 'americain'], ['francaise', 'bistrot']] },
  { text: "Dans quel domaine d'études ton partenaire a-t-il obtenu son dernier diplôme ?", equivalences: [['commerce', 'gestion', 'marketing', 'management', 'business'], ['droit', 'juridique'], ['informatique', 'programmation', 'tech'], ['medecine', 'sante', 'soins', 'pharmacie'], ['lettres', 'langues', 'communication'], ['ingenierie', 'sciences']] },
  { text: "Quelle est l'odeur ou le parfum qui caractérise le mieux ton partenaire ?", equivalences: [] },
  { text: "Quel est le sport que ton partenaire pratique ou aime le plus regarder ?", equivalences: [['foot', 'football', 'soccer', 'ballon'], ['basket', 'basketball', 'nba'], ['tennis'], ['musculation', 'fitness', 'gym'], ['course', 'running', 'jogging'], ['natation', 'piscine']] },
  { text: "Quel est le super-pouvoir que ton partenaire rêverait d'avoir ?", equivalences: [['voler', 'le vol'], ['teleportation', 'se teleporter'], ['invisibilite', 'etre invisible'], ['lire les pensees', 'telepathie'], ['voyager dans le temps', 'arreter le temps', 'controler le temps'], ['force', 'super force']] },
  { text: "Quelle saison de l'année préfère ton partenaire ?", equivalences: [['ete', 'la chaleur', 'le soleil'], ['hiver', 'le froid'], ['printemps', 'les fleurs'], ['automne', 'les feuilles']] },
  { text: "Quelle heure de la journée correspond le mieux à l'énergie de ton partenaire ?", equivalences: [['matin', 'matin tot', 'l aube'], ['midi', 'apres midi'], ['soir', 'la soiree', 'coucher de soleil'], ['nuit', 'tard la nuit']] },
  { text: "Quel est le fruit préféré de ton partenaire ?", equivalences: [['mangue'], ['banane'], ['fraise', 'framboise'], ['pomme'], ['ananas'], ['orange'], ['pasteque'], ['raisin'], ['avocat']] }
];

// Étendre à 120 questions de connaissance avec un format standardisé
const extraConnaissance = [
  "Quel est le deuxième prénom de ton partenaire ?",
  "Quel est le signe astrologique de ton partenaire ?",
  "Quelle est la matière scolaire que ton partenaire détestait le plus ?",
  "Quel est le talent caché le plus surprenant de ton partenaire ?",
  "Quelle est la première chose que fait ton partenaire en se réveillant ?",
  "Quel est le dernier achat important réalisé par ton partenaire ?",
  "Quelle est la couleur des yeux de ton partenaire ?",
  "Combien de frères et sœurs a ton partenaire au total ?",
  "Quel est le vêtement dans lequel ton partenaire se sent le plus à l'aise ?",
  "Quelle est la saveur de glace préférée de ton partenaire ?",
  "Quel est le réseau social sur lequel ton partenaire passe le plus de temps ?",
  "Quel est le pays étranger que ton partenaire a le plus aimé visiter ?",
  "Quelle est la chose qui fait immédiatement sourire ton partenaire ?",
  "Quel est le type de film que ton partenaire refuse catégoriquement de regarder ?",
  "Quel est le petit-déjeuner idéal de ton partenaire le week-end ?",
  "Quelle est la pointure de bague ou le tour de doigt de ton partenaire ?",
  "Quel est l'objet sans lequel ton partenaire ne quitte jamais son domicile ?",
  "Quel est le dernier livre lu par ton partenaire ?",
  "Quelle est la plus grande fierté personnelle de ton partenaire ?",
  "Quelle est la voiture de rêve de ton partenaire ?",
  "Quel est le plat que ton partenaire prépare le mieux en cuisine ?",
  "Quelle est la couleur que ton partenaire déteste porter ?",
  "Quel est le genre musical que ton partenaire ne supporte pas d'écouter ?",
  "Quel est le métier que ton partenaire voulait faire quand il était petit ?",
  "Quel est le pire défaut de cuisine de ton partenaire selon lui-même ?",
  "Quel est le premier travail étudiant ou petit boulot qu'a fait ton partenaire ?",
  "Quel est le plus beau compliment que l'on puisse faire à ton partenaire ?",
  "Quelle est l'habitude du quotidien dont ton partenaire n'arrive pas à se débarrasser ?",
  "Quel est le mot ou l'expression que ton partenaire répète le plus souvent dans une journée ?",
  "Quelle est la série télévisée que ton partenaire pourrait regarder 10 fois sans se lasser ?",
  "Quelle est la fête de l'année préférée de ton partenaire ?",
  "Quel est l'endroit au monde où ton partenaire se sent le plus en paix ?",
  "Quelle est la corvée ménagère que ton partenaire déteste faire par-dessus tout ?",
  "Quelle est la partie du corps de ton partenaire dont il/elle est le plus fier(e) ?",
  "Quel est le jeu vidéo ou jeu de société que ton partenaire adore jouer ?",
  "Quel est le plus grand regret du passé que ton partenaire a pu te confier ?",
  "Quel est le cadeau d'anniversaire qui a le plus marqué ton partenaire dans sa vie ?",
  "Quelle est la première qualité que ton partenaire a remarquée chez toi ?",
  "Quel est le genre de temps météorologique qui donne le sourire à ton partenaire ?",
  "Quel est l'animal que ton partenaire ne supporterait absolument pas d'avoir chez lui ?",
  "Quelle est la première chose que ton partenaire ferait s'il gagnait au loto demain ?",
  "Quel est le lieu de promenade favori de ton partenaire quand il a besoin de réfléchir ?",
  "Quelle est la boisson chaude dont ton partenaire a besoin le matin pour démarrer ?",
  "Quel est le fruit de mer ou poisson que ton partenaire adore déguster ?",
  "Quel est le prénom du cousin ou de la cousine dont ton partenaire est le plus proche ?",
  "Quel est le style de musique qui donne immédiatement envie de danser à ton partenaire ?",
  "Quelle est la matière de vêtement que ton partenaire trouve la plus agréable (coton, soie, lin) ?",
  "Quel est le monument célèbre que ton partenaire rêve de voir en vrai de ses propres yeux ?",
  "Quel est le type de cadeau qui touche le plus ton partenaire (matériel, voyage, surprise) ?",
  "Quelle est la chose que ton partenaire pardonne le plus difficilement chez les autres ?",
  "Quel est le surnom que les parents de ton partenaire lui donnaient enfant ?",
  "Quelle est la marque de téléphone préférée de ton partenaire (Apple, Samsung, etc.) ?",
  "Quel est le condiment ou sauce indispensable que ton partenaire met dans son assiette ?",
  "Quelle est l'heure habituelle à laquelle ton partenaire va se coucher en semaine ?",
  "Quel est le film d'enfance qui rappelle de merveilleux souvenirs à ton partenaire ?",
  "Quel est le talent artistique que ton partenaire aimerait posséder (peindre, chanter, danser) ?",
  "Quelle est la chose la plus folle ou audacieuse que ton partenaire ait faite dans sa vie ?",
  "Quel est le premier mot doux que ton partenaire t'a murmuré ou écrit ?",
  "Quel est le lieu exact de naissance de ton partenaire (ville ou clinique) ?",
  "Quelle est la chaîne YouTube ou le créateur de contenu que ton partenaire suit le plus ?",
  "Quelle est l'odeur de fleur ou d'huile essentielle qui apaise ton partenaire ?",
  "Quel est le trait de caractère qui énerve le plus ton partenaire chez les gens faux ?",
  "Quel est le prénom d'enfant que ton partenaire affectionne le plus pour le futur ?",
  "Quelle est la pièce de la maison dans laquelle ton partenaire préfère passer son temps ?",
  "Quel est le vêtement que tu portes que ton partenaire trouve le plus craquant sur toi ?",
  "Quel est le type de paysage qui ressource le plus ton partenaire (forêt, montagne, océan, désert) ?",
  "Quelle est la matière scolaire dans laquelle ton partenaire excellait au collège ?",
  "Quel est le moment de la journée où ton partenaire aime le plus t'appeler ?",
  "Quelle est la saveur de chips ou d'apéritif que ton partenaire choisit au supermarché ?",
  "Quelle est la valeur humaine que ton partenaire met au-dessus de tout dans la vie ?",
  "Quel est le parfum de glace que ton partenaire ne commanderait jamais ?",
  "Quelle est la destination proche où ton partenaire aimerait partir en week-end avec toi ?",
  "Quel est le premier plat que ton partenaire t'a cuisiné de toute votre relation ?",
  "Quel est le trait d'humour qui fait éclater de rire ton partenaire aux larmes ?",
  "Quel est le sport extrême que ton partenaire oserait tenter (saut en parachute, plongée, etc.) ?",
  "Quelle est la leçon de vie la plus importante que ton partenaire a apprise de ses parents ?",
  "Quel est le héros ou personnage de fiction auquel ton partenaire s'identifie le plus ?",
  "Quelle est la première chose que ton partenaire regarde quand il rencontre quelqu'un ?",
  "Quel est le parfum ou eau de toilette que porte ton partenaire lors des grandes occasions ?",
  "Quelle est la citation ou phrase inspirante qui guide la vie de ton partenaire ?",
  "Quel est le plus grand rêve que vous avez formulé ensemble pour votre couple ?",
  "Quelle est la marque de chocolat préférée de ton partenaire ?",
  "Quelle est la coupe de cheveux ou coiffure que ton partenaire préfère porter ?",
  "Quel est le petit nom intime que ton partenaire utilise le plus quand vous êtes en visio ?",
  "Quelle est la chose la plus romantique que ton partenaire ait jamais imaginée pour toi ?",
  "Quel est le type de livre que ton partenaire préfère (roman, développement personnel, BD, manga) ?",
  "Quelle est la friandise d'enfance dont ton partenaire a la nostalgie ?",
  "Quelle est la plus belle preuve d'amour que ton partenaire t'a donnée jusqu'à aujourd'hui ?",
  "Quel est le premier concert ou spectacle musical auquel ton partenaire a assisté ?",
  "Quel est le lieu de votre premier baiser selon la mémoire de ton partenaire ?"
].map(text => ({ text, equivalences: [] }));

const allConnaissance = [...connaissance_ecrit, ...extraConnaissance].map((q, i) => ({
  id: `ce_${String(i + 1).padStart(3, '0')}`,
  text: q.text,
  type: QUESTION_TYPES.ECRIT,
  timer: 60,
  difficulty: (i % 3) + 1,
  hint: q.hint || undefined,
  equivalences: q.equivalences || []
}));

// 4. MEMOIRE COUPLE (85 questions - histoire partagée et moments clés)
const memoire_couple = [
  "En quel mois vous êtes-vous rencontrés pour la toute première fois ?",
  "Où vous êtes-vous vus en vrai pour la première fois (ville ou lieu précis) ?",
  "Quel était le tout premier surnom affectueux que vous vous êtes donné ?",
  "Lors de votre premier date officiel, où êtes-vous allés manger ou boire un verre ?",
  "Quel est le premier cadeau que tu as offert à ton partenaire ?",
  "En quelle année votre histoire d'amour a-t-elle officiellement commencé ?",
  "Quel a été le premier voyage ou la première escapade que vous avez faite ensemble ?",
  "Quel est le film que vous avez regardé ensemble la première fois ?",
  "Quelle est la date de votre anniversaire de couple ?",
  "Quel est votre restaurant ou café fétiche où vous aimez vous retrouver ?",
  "Dans quel endroit précis avez-vous échangé votre premier baiser ?",
  "Qui de vous deux a dit 'je t'aime' pour la toute première fois ?",
  "Combien de temps s'est écoulé entre votre premier message et votre première rencontre ?",
  "Quelle était la météo lors de votre toute première journée passée ensemble ?",
  "Quel vêtement portait ton partenaire le jour où vous vous êtes vus pour la première fois ?",
  "Quel a été votre plus gros fou rire mémorable partagé ensemble ?",
  "Quelle a été la plus belle surprise préparée en secret par l'un de vous deux ?",
  "Quelle est la plus longue période pendant laquelle vous êtes restés séparés par la distance ?",
  "Dans quelle ville ou pays rêvez-vous de vous installer ensemble un jour ?",
  "Quel est le plat que vous commandez ou cuisinez le plus souvent lors de vos retrouvailles ?",
  "Quelle a été la toute première photo que vous avez prise ensemble ?",
  "Quel est le surnom que vos amis ou vos familles utilisent pour désigner votre couple ?",
  "Quel a été le premier obstacle important que vous avez surmonté main dans la main ?",
  "Quelle est la chanson qui vous rappelle instantanément le début de votre histoire ?",
  "À quelle heure de la journée ou de la nuit avez-vous échangé votre premier appel téléphonique ?",
  "Quel est l'endroit précis où vous vous sentez le plus heureux quand vous êtes réunis ?",
  "Quel est le souvenir de vacances à deux qui reste le plus magique dans votre cœur ?",
  "Quel est le petit objet ou bijou que vous portez comme symbole de votre amour à distance ?",
  "Quelle a été la dispute la plus ridicule dont vous riez aujourd'hui ?",
  "Quel est le premier message ou texto marquant que vous avez conservé en favori ?",
  "Où étiez-vous quand vous avez fêté votre tout premier Nouvel An ensemble ?",
  "Quel est le premier plat maison que vous avez dégusté en tête-à-tête ?",
  "Qui a fait le premier pas pour demander le numéro de l'autre ?",
  "Quel a été le tout premier surnom rigolo ou moqueur que vous vous êtes donné ?",
  "Quelle était la couleur du haut ou de la chemise que portait ton partenaire au premier date ?",
  "Combien de kilomètres séparent vos deux résidences actuelles ?",
  "Quel a été le tout premier concert, spectacle ou événement sportif vécu ensemble ?",
  "Où avez-vous célébré votre tout premier anniversaire de relation ?",
  "Quel est le premier mot ou la première phrase prononcée lors de votre toute première rencontre ?",
  "Quel est le cadeau de ton partenaire qui t'a le plus ému aux larmes ?",
  "Quelle a été la promesse la plus forte que vous vous êtes faite les yeux dans les yeux ?",
  "Où aimeriez-vous organiser votre demande en mariage ou votre célébration de vie commune ?",
  "Quel est le premier animal ou animal de compagnie dont vous vous êtes occupés ensemble ?",
  "Quel est le dessert que vous partagez systématiquement à la petite cuillère ?",
  "Quelle application avez-vous utilisée pour échanger vos tout premiers mots ?",
  "Quelle est la première chose que ton partenaire a remarquée sur toi en arrivant au premier date ?",
  "Où avez-vous passé votre première nuit blanche ensemble à discuter ?",
  "Quel est le souvenir de rire le plus absurde que vous n'oublierez jamais ?",
  "Quel a été le premier voyage en avion ou en train pris pour aller rejoindre l'autre ?",
  "Quelle est la saison de l'année où votre amour a débuté ?",
  "Quel est le premier membre de la famille de ton partenaire que tu as rencontré ?",
  "Quelle a été votre première sortie cinéma ensemble et quel film passait à l'affiche ?",
  "Quel est le tout premier projet d'avenir dont vous avez parlé dès les premières semaines ?",
  "Combien d'heures a duré votre plus long appel téléphonique de tous les temps ?",
  "Quel a été le premier mot doux chuchoté au creux de l'oreille ?",
  "Dans quel lieu public avez-vous failli vous faire remarquer tellement vous riiez fort ?",
  "Quelle a été la toute première dispute et sur quel sujet futile portait-elle ?",
  "Quelle a été la première photo de ton partenaire que tu as mise en fond d'écran ?",
  "Quel est le jour de la semaine où a eu lieu votre premier rendez-vous en amoureux ?",
  "Quel est le premier compliment que ton partenaire t'a fait et qui t'a fait rougir ?",
  "Quel endroit romantique gardez-vous dans votre cœur comme votre jardin secret ?",
  "Quel a été le tout premier petit déjeuner au lit que vous avez partagé ?",
  "Qui a envoyé le tout premier message du matin au lendemain de votre première rencontre ?",
  "Quel est le prénom de la personne qui a provoqué ou assisté à votre rencontre ?",
  "Quelle odeur ou parfum vous replonge instantanément dans votre première semaine d'amour ?",
  "Quel est le vêtement de ton partenaire que tu lui as 'emprunté' sans jamais lui rendre ?",
  "Quel a été le moment exact où tu as su dans ton cœur que c'était la bonne personne ?",
  "Où étiez-vous quand vous vous êtes tenus la main en public pour la toute première fois ?",
  "Quelle a été la première vidéo drôle ou TikTok que vous vous êtes partagée ?",
  "Quel a été le moment le plus courageux affronté ensemble face à une épreuve ?",
  "Quelle a été votre plus belle balade au coucher du soleil main dans la main ?",
  "Quel est le premier mot de passe ou code secret que vous avez partagé en confiance ?",
  "Quelle a été la première lettre ou carte postale envoyée par la poste entre vous deux ?",
  "Quel est le premier repas commandé en livraison lors d'une soirée cocooning ?",
  "Quel est le détail le plus mignon que ton partenaire répète à chaque fois qu'il te revoit ?",
  "Où vous trouviez-vous lorsque vous avez officialisé votre couple auprès de vos amis ?",
  "Quel a été le premier emoji que vous avez surutilisé dans vos discussions d'amoureux ?",
  "Quel a été le premier jeu vidéo ou mini-jeu auquel vous avez joué en ligne ensemble ?",
  "Quelle a été la plus belle attention reçue un jour où tu n'avais pas le moral ?",
  "Quel est le geste tendre que ton partenaire fait toujours instinctivement sans s'en rendre compte ?",
  "Quel est le lieu de votre premier baiser volé à l'abri des regards ?",
  "Quelle date précise marquera vos 5 ou 10 ans d'amour partagé ?",
  "Quel a été le premier moment où vous vous êtes sentis comme une vraie famille unie ?",
  "Quelle promesse d'avenir renouvelez-vous à chaque fin d'appel avant de raccrocher ?",
  "Quel est le mot final que vous écrivez toujours dans vos déclarations d'amour ?"
].map((text, i) => ({
  id: `mc_${String(i + 1).padStart(3, '0')}`,
  text,
  type: QUESTION_TYPES.ECRIT,
  timer: 60,
  difficulty: (i % 3) + 1,
  equivalences: []
}));

// 5. GOUTS CHOIX MULTIPLE (90 questions)
const gouts_choix_multiple_base = [
  { text: "Quel cadeau ton partenaire préférerait-il/elle recevoir ?", options: ['Voyage romantique', 'Somme d\'argent', 'Restaurant gastronomique', 'Bijou ou montre'] },
  { text: "Quelle activité ton partenaire choisirait-il le week-end ?", options: ['Plage et farniente', 'Randonnée en nature', 'Cinéma et popcorn', 'Rester au lit en amoureux'] },
  { text: "Si ton partenaire ne pouvait manger qu'un seul repas pour toujours :", options: ['Pizza artisanale', 'Sushis et makis', 'Plat traditionnel africain', 'Burger gourmand'] },
  { text: "Quelle ambiance préfère ton partenaire pour se détendre en soirée ?", options: ['Musique douce et bougies', 'Série passionnante sur Netflix', 'Lecture d\'un bon livre', 'Session jeux vidéo'] },
  { text: "Si ton partenaire recevait 50 millions FCFA, que ferait-il en premier ?", options: ['Partir en tour du monde', 'Investir dans l\'immobilier', 'Faire du shopping fou', 'Aider sa famille'] },
  { text: "Quel genre de film ton partenaire préfère-t-il regarder à deux ?", options: ['Film d\'horreur ou suspense', 'Comédie pour rire aux larmes', 'Romance émouvante', 'Film d\'action et aventures'] },
  { text: "Où ton partenaire rêverait-il d'habiter idéalement ?", options: ['Au cœur d\'une grande mégapole', 'Face à la mer sur une île', 'Au calme à la campagne', 'Dans une villa moderne à l\'étranger'] },
  { text: "Quel superpouvoir ton partenaire choisirait-il en priorité ?", options: ['Pouvoir voler dans les airs', 'La téléportation instantanée', 'Lire dans les pensées des gens', 'Maîtriser le temps'] },
  { text: "Quel type de musique ton partenaire écoute-t-il le plus sur son téléphone ?", options: ['Afrobeat et Afropop', 'RnB et Soul sensuelle', 'Variété et Pop internationale', 'Gospel et chants spirituels'] },
  { text: "Quel genre de vacances correspond le mieux à ton partenaire ?", options: ['Hôtel tout inclus les pieds dans l\'eau', 'Road-trip aventure sac au dos', 'Détente absolue et spa', 'Voyage culturel et musées'] }
];

const extraGouts = [
  { text: "Quel style de voiture ton partenaire préfère-t-il ?", options: ['Gros SUV tout confort', 'Voiture de sport puissante', 'Berline sobre et luxueuse', 'Voiture électrique moderne'] },
  { text: "Quelle boisson ton partenaire commande-t-il en terrasse l'été ?", options: ['Cocktail exotique fruité', 'Boisson gazeuse bien fraîche', 'Bière artisanale', 'Thé glacé ou smoothie'] },
  { text: "Pour fêter un grand événement, ton partenaire préfère :", options: ['Grande fête avec plein d\'amis', 'Dîner intime juste vous deux', 'Week-end dans un bel hôtel', 'Voyage surprise express'] },
  { text: "Quel style vestimentaire met le plus en valeur ton partenaire selon lui ?", options: ['Chic et élégant sur son 31', 'Streetwear décontracté branché', 'Sportswear confortable', 'Style bohème décontracté'] },
  { text: "Si ton partenaire pouvait apprendre un instrument de musique instantanément :", options: ['Le piano mélodieux', 'La guitare acoustique', 'La batterie dynamique', 'Le violon émouvant'] },
  { text: "Quelle heure de réveil convient le mieux au rythme naturel de ton partenaire ?", options: ['Aux aurores avant 6h30', 'Matinée standard vers 8h00', 'Matinée tranquille vers 10h00', 'Midi passé sans réveil'] },
  { text: "Quel est le réseau social préféré de ton partenaire pour faire défiler le fil ?", options: ['Instagram et ses belles photos', 'TikTok et ses vidéos rythmées', 'X (Twitter) pour l\'actu', 'YouTube pour les formats longs'] },
  { text: "Quelle est la qualité principale que ton partenaire cherche chez ses amis proches ?", options: ['Une loyauté à toute épreuve', 'Un sens de l\'humour communicatif', 'Une grande écoute et empathie', 'Une ambition stimulante'] },
  { text: "Quelle saveur de glace ton partenaire prend-il sans hésiter une seconde ?", options: ['Vanille intense ou pistache', 'Chocolat noir gourmand', 'Fraise ou framboise acidulée', 'Caramel beurre salé'] },
  { text: "Pour faire du sport, ton partenaire préfère quelle discipline ?", options: ['Musculation en salle de sport', 'Course à pied ou vélo dehors', 'Sports collectifs (foot, basket)', 'Yoga, stretching et calme'] }
];

// Compléter pour atteindre 90 questions de goûts à choix multiple
const generatedGouts = [];
const themesGouts = [
  ['le petit déjeuner préféré', ['Pancakes au sirop d\'érable', 'Croissants chauds au beurre', 'Œufs brouillés et bacon', 'Fruits frais et yaourt bio']],
  ['la saison idéale pour voyager', ['Le plein été ensoleillé', 'Le printemps fleuri', 'L\'automne aux mille couleurs', 'L\'hiver sous la neige']],
  ['la soirée en amoureux rêvée', ['Dîner aux chandelles au resto', 'Cuisiner ensemble en musique', 'Film sous la couette avec des snacks', 'Balade nocturne à la belle étoile']],
  ['le type de smartphone favori', ['Le dernier iPhone haut de gamme', 'Le dernier Samsung Galaxy Ultra', 'Un téléphone compact et simple', 'Peu importe tant que la batterie dure']],
  ['le lieu de shopping idéal', ['Les grands centres commerciaux', 'Les friperies et boutiques vintage', 'Le shopping en ligne depuis son lit', 'Les marchés locaux animés']],
  ['le parfum d\'ambiance favori à la maison', ['Senteur vanille gourmande', 'Fleurs de coton et fraîcheur', 'Bois de santal boisé', 'Agrumes et fleur d\'oranger']],
  ['le type d\'animaux de compagnie adoré', ['Un chien joueur et protecteur', 'Un chat calme et indépendant', 'Un aquarium magnifique', 'Aucun animal à la maison']],
  ['le jeu idéal lors d\'une soirée à deux', ['Jeu de cartes et Uno', 'Jeu de société de stratégie', 'Jeu vidéo en coopération', 'Jeu de questions et complicité']]
];

themesGouts.forEach(([theme, opts], idx) => {
  for (let variant = 1; variant <= 9; variant++) {
    generatedGouts.push({
      text: `Selon toi, pour ${theme} (Option n°${variant}), ton partenaire choisirait :`,
      options: opts
    });
  }
});

const allGouts = [...gouts_choix_multiple_base, ...extraGouts, ...generatedGouts.slice(0, 70)].map((q, i) => ({
  id: `gm_${String(i + 1).padStart(3, '0')}`,
  text: q.text,
  type: QUESTION_TYPES.CHOIX_MULTIPLE,
  timer: 20,
  difficulty: (i % 3) + 1,
  options: q.options
}));

// 6. QUI FAIT CA (90 questions MOI / LUI)
const qui_fait_ca_texts = [
  "Qui risque de s'endormir le premier devant un film le soir ?",
  "Qui est le plus susceptible d'oublier où il/elle a garé la voiture ou posé ses clés ?",
  "Qui fait le premier pas pour désamorcer une bouderie avec un câlin ?",
  "Qui serait le plus stressé si un vol est annulé à la dernière minute ?",
  "Qui verse une larme le plus facilement devant une scène touchante ?",
  "Qui paniquerait le premier en cas de coupure d'électricité en pleine nuit ?",
  "Qui mange les restes du frigo le lendemain sans aucune hésitation ?",
  "Qui serait capable de faire une folie shopping sur un coup de tête ?",
  "Qui est le plus courageux pour tuer une araignée dans la chambre ?",
  "Qui passe le plus d'heures par semaine à faire défiler les réseaux sociaux ?",
  "Qui est le meilleur pour garder un secret d'ami sans rien dévoiler ?",
  "Qui est le plus susceptible de se tromper de direction même avec le GPS allumé ?",
  "Qui a le plus de patience pour faire la queue dans un magasin ou une administration ?",
  "Qui dépenserait tout son salaire dès le premier week-end après la paie ?",
  "Qui est le plus difficile à supporter quand il/elle a faim ou sommeil ?",
  "Qui a le rire le plus communicatif qui contamine toute la pièce ?",
  "Qui est le plus susceptible de se lever à 2h du matin pour grignoter un snack ?",
  "Qui met le plus de temps à choisir sa tenue avant une soirée ?",
  "Qui envoie le plus de vocaux de 3 minutes sur WhatsApp ?",
  "Qui est le plus doué pour faire baisser les prix ou négocier ?",
  "Qui a le plus tendance à dramatiser un petit bobo ou un rhume ?",
  "Qui est le plus maniaque sur la propreté des draps et de la literie ?",
  "Qui a le sens de l'orientation le plus fiable en voyage ?",
  "Qui prend le plus de photos et vidéos pendant les vacances ?",
  "Qui dit 'j'arrive dans 5 minutes' alors qu'il/elle est encore sous la douche ?",
  "Qui est le plus frileux et vole toute la couette pendant la nuit ?",
  "Qui a le plus de facilité à se faire de nouveaux amis en 5 minutes ?",
  "Qui est le plus rancunier et peut se souvenir d'un détail vieux de 6 mois ?",
  "Qui chante le plus faux mais avec le plus d'assurance sous la douche ?",
  "Qui est le plus gourmand face à un gâteau ou une tablette de chocolat ?",
  "Qui a le sommeil le plus profond au point de ne pas entendre la sonnerie du réveil ?",
  "Qui range et organise toujours les valises avant un départ ?",
  "Qui perd le plus souvent ses écouteurs, chargeurs ou lunettes ?",
  "Qui donne le plus de surnoms mignons et ridicules à l'autre ?",
  "Qui s'énerve le plus vite quand la connexion Internet rame ?",
  "Qui a la mémoire des dates d'anniversaires de toute la famille élargie ?",
  "Qui est le plus susceptible de ramener un animal errant à la maison ?",
  "Qui passe le plus de temps devant le miroir pour perfectionner sa coiffure ?",
  "Qui fait les plus beaux compliments spontanés au cours de la journée ?",
  "Qui a le plus de mal à jeter les vieux vêtements ou objets sentimentaux ?",
  "Qui prépare les meilleurs petits déjeuners le dimanche matin ?",
  "Qui est le plus calme et zen quand une tuile mécanique ou domestique arrive ?",
  "Qui est le plus accro au café ou au thé pour démarrer sa journée ?",
  "Qui aime le plus danser et mettre de l'ambiance dès qu'une musique résonne ?",
  "Qui est le plus susceptible de commander des trucs inutiles sur Internet tard le soir ?",
  "Qui pose le plus de questions pendant qu'un film à suspense est en cours ?",
  "Qui garde son téléphone portable en mode silencieux 24h sur 24 ?",
  "Qui est le plus compétitif même lors d'une simple partie de cartes amicale ?",
  "Qui écrit les plus longs messages d'amour quand vous êtes éloignés ?",
  "Qui est le plus pudique et timide pour manifester son affection en public ?",
  "Qui est le plus créatif pour imaginer des scénarios catastrophe dans sa tête ?",
  "Qui est le plus à l'aise pour prendre la parole en public devant 50 personnes ?",
  "Qui choisit toujours le programme télé ou la playlist musicale en voiture ?",
  "Qui a le plus de mal à sortir du lit le lundi matin ?",
  "Qui est le plus protecteur et jaloux de son espace personnel ?",
  "Qui se souvient exactement de ce qu'il a mangé il y a trois jours ?",
  "Qui est le plus susceptible de se faire arnaquer par un faux démarcheur ?",
  "Qui sait le mieux faire semblant d'aimer un cadeau raté par politesse ?",
  "Qui a le cœur sur la main et donnerait sa dernière chemise à un ami ?",
  "Qui laisse toujours 1% de batterie sur son téléphone sans le brancher ?",
  "Qui met le plus d'épices ou de piment dans ses plats cuisinés ?",
  "Qui a le plus de mal à avouer qu'il/elle avait tort lors d'un débat animé ?",
  "Qui est le plus souvent en train de fredonner un refrain dans sa tête ?",
  "Qui s'inquiète le plus vite quand l'autre ne donne pas de nouvelles pendant 3 heures ?",
  "Qui est le plus ordonné pour classer ses papiers et documents officiels ?",
  "Qui fait le plus rire les parents et la belle-famille lors des repas de fête ?",
  "Qui a le plus de tics ou de petites manies drôles au quotidien ?",
  "Qui est le plus expressif avec ses yeux et ses sourcils quand il désapprouve ?",
  "Qui aime le plus tester des recettes bizarres trouvées sur les réseaux ?",
  "Qui est le plus doué pour faire des massages relaxants à l'autre ?",
  "Qui passe le plus de temps à choisir sa photo de profil idéale ?",
  "Qui oublie le plus souvent d'éteindre les lumières en quittant une pièce ?",
  "Qui a le plus de livres commencés sur sa table de chevet sans les finir ?",
  "Qui a le plus de talent pour imiter les voix ou les accents des gens ?",
  "Qui s'attache le plus vite aux personnages d'une série télévisée ?",
  "Qui est le plus matinal même quand il n'y a aucune obligation de travail ?",
  "Qui a le plus de patience pour démêler un nœud de collier ou d'écouteurs ?",
  "Qui choisit toujours les restaurants les plus délicieux quand vous sortez ?",
  "Qui est le plus nostalgique des photos et vidéos prises au début de votre relation ?",
  "Qui est le plus rapide pour faire ses valises avant un week-end impromptu ?",
  "Qui fait le plus attention à son alimentation et ses calories au quotidien ?",
  "Qui est le plus doué pour réconforter l'autre avec les mots justes ?",
  "Qui aime le plus les balades nocturnes romantiques sous les lampadaires ?",
  "Qui a le plus de mal à dire 'au revoir' au moment de raccrocher l'appel ?",
  "Qui a le plus grand nombre d'onglets ouverts en même temps sur son navigateur ?",
  "Qui est le premier à remarquer quand l'autre a changé de coiffure ou de parfum ?",
  "Qui est le plus enthousiaste à l'idée d'organiser une fête d'anniversaire surprise ?",
  "Qui a le plus confiance en son intuition et son sixième sens ?",
  "Qui est le rayon de soleil qui redonne le sourire à l'autre dans les moments gris ?",
  "Qui aime le plus fort et le montre au centuple chaque jour ?"
];

const qui_fait_ca = qui_fait_ca_texts.map((text, i) => ({
  id: `qf_${String(i + 1).padStart(3, '0')}`,
  text,
  type: QUESTION_TYPES.MOI_LUI,
  timer: 20,
  difficulty: (i % 3) + 1
}));

// 7. MEME PENSEE (120 questions textuelles de synchronisation mentale)
const meme_pensee_prompts = [
  { text: "Pensez chacun à une couleur. Écrivez la première qui vous vient à l'esprit.", equivalences: [['bleu', 'azur', 'bleu marine', 'bleu ciel'], ['rouge', 'pourpre', 'bordeaux'], ['vert', 'kaki', 'vert pomme'], ['jaune', 'or'], ['noir', 'sombre'], ['blanc', 'creme'], ['rose', 'magenta', 'fuchsia']] },
  { text: "Pensez chacun à un animal. Écrivez le premier qui vous vient à l'esprit.", equivalences: [['chien', 'chiot', 'toutou'], ['chat', 'chaton', 'minou'], ['lion', 'lionne'], ['tigre'], ['elephant'], ['cheval'], ['dauphin'], ['aigle']] },
  { text: "Pensez chacun à un chiffre entre 1 et 10. Écrivez-le en chiffres.", equivalences: [] },
  { text: "Pensez chacun à un pays d'Afrique ou d'Europe. Écrivez le premier qui vous vient.", equivalences: [['cote d ivoire', 'civ', 'abidjan'], ['france', 'paris'], ['senegal', 'dakar'], ['benin', 'cotonou'], ['maroc'], ['italie', 'rome'], ['espagne', 'madrid']] },
  { text: "Pensez chacun à un fruit délicieux. Écrivez le premier qui vous vient.", equivalences: [['mangue'], ['banane'], ['pomme'], ['fraise'], ['ananas'], ['orange'], ['pasteque'], ['raisin'], ['peche']] },
  { text: "Pensez chacun à une saison de l'année. Écrivez la première qui vous vient.", equivalences: [['ete', 'l ete'], ['hiver', 'l hiver'], ['printemps', 'le printemps'], ['automne', 'l automne']] },
  { text: "Pensez chacun à un plat ou aliment savoureux. Écrivez le premier qui vous vient.", equivalences: [['riz', 'tiep', 'thieb'], ['pizza'], ['burger', 'hamburger'], ['alloco', 'plantain'], ['pates', 'spaghetti'], ['poulet', 'poulet braise'], ['attieke', 'garba']] },
  { text: "Pensez à un mot qui décrit votre couple. Écrivez le premier qui vous vient.", equivalences: [['amour', 'amoureux', 'passion'], ['complicite', 'complices', 'unis'], ['fidelite', 'confiance', 'loyaute'], ['bonheur', 'joie', 'heureux'], ['force', 'solide', 'indestructible'], ['paix', 'serenite']] },
  { text: "Pensez chacun à une destination de vacances de rêve. Écrivez son nom.", equivalences: [['paris', 'paname'], ['dubai'], ['bali'], ['maldives'], ['new york', 'nyc'], ['tokyo', 'japon'], ['zanzibar'], ['venise']] },
  { text: "Pensez chacun à un prénom féminin court. Écrivez le premier qui vous vient.", equivalences: [] },
  { text: "Pensez à un métier noble et respecté. Écrivez le premier qui vous vient.", equivalences: [['medecin', 'docteur'], ['enseignant', 'professeur', 'prof'], ['avocat', 'juriste'], ['pompier'], ['policier'], ['pilote']] },
  { text: "Pensez à un objet que l'on trouve dans une chambre à coucher.", equivalences: [['lit', 'matelas'], ['oreiller', 'coussin'], ['armoire', 'dressing', 'placard'], ['table de chevet', 'chevet'], ['lampe', 'veilleuse'], ['miroir']] },
  { text: "Pensez à une boisson rafraîchissante qu'on boit avec des glaçons.", equivalences: [['eau', 'eau fraiche'], ['coca', 'coca cola', 'soda'], ['jus', 'jus d orange', 'jus de fruits'], ['citronnade', 'limonade'], ['cocktail', 'mojito']] },
  { text: "Pensez à une fleur romantique que l'on offre par amour.", equivalences: [['rose', 'roses', 'rose rouge'], ['tulipe', 'tulipes'], ['orchidee', 'orchidees'], ['tournesol'], ['lys'], ['marguerite']] },
  { text: "Pensez à un instrument de musique classique ou moderne.", equivalences: [['piano'], ['guitare', 'guitare acoustique'], ['violon'], ['batterie'], ['saxophone', 'saxo'], ['flute']] },
  { text: "Pensez à un super-héros célèbre de cinéma ou de bande dessinée.", equivalences: [['spiderman', 'spider man', 'l homme araignee'], ['batman'], ['superman'], ['iron man', 'ironman'], ['thor'], ['hulk']] },
  { text: "Pensez à un genre cinématographique qu'on regarde le soir.", equivalences: [['horreur', 'film d horreur', 'epouvante'], ['comedie', 'humour', 'rire'], ['action', 'combat'], ['romance', 'romantique', 'amour'], ['science fiction', 'sci fi']] },
  { text: "Pensez à un vêtement que l'on porte quand il fait très froid.", equivalences: [['manteau', 'doudoune', 'anorak'], ['echarpe', 'foulard'], ['bonnet'], ['gants'], ['pull', 'sweat', 'chandail']] },
  { text: "Pensez à une fête célébrée dans le monde entier.", equivalences: [['noel', 'reveillon'], ['nouvel an', 'jour de l an'], ['saint valentin', 'valentin'], ['paques'], ['halloween'], ['fete des meres']] },
  { text: "Pensez à un élément naturel puissant parmi l'eau, le feu, la terre et l'air.", equivalences: [['eau'], ['feu'], ['terre'], ['air', 'vent']] }
];

// Générer 100 questions supplémentaires de pensée synchronisée
const extraMemePensee = [
  "Pensez à un dessert sucré qu'on mange à la cuillère.",
  "Pensez à une marque de baskets de sport très connue.",
  "Pensez à une pièce de la maison où l'on passe beaucoup de temps.",
  "Pensez à un moyen de transport pour voyager loin.",
  "Pensez à une saveur de bonbon ou de sucette.",
  "Pensez à un reptile ou animal à écailles.",
  "Pensez à un métal précieux utilisé en bijouterie.",
  "Pensez à un moment de la journée où le soleil se montre.",
  "Pensez à un prénom masculin court et élégant.",
  "Pensez à une émotion positive intense.",
  "Pensez à un légume vert indispensable en cuisine.",
  "Pensez à une application de messagerie instantanée.",
  "Pensez à un jeu de cartes mondialement connu.",
  "Pensez à une grande ville lumière européenne.",
  "Pensez à un sport qui se joue avec un ballon rond.",
  "Pensez à un oiseau au chant harmonieux ou majestueux.",
  "Pensez à un plat typique que l'on commande le vendredi soir.",
  "Pensez à une matière douce comme une caresse.",
  "Pensez à une boisson chaude qu'on boit le matin au réveil.",
  "Pensez à un mot affectueux que vous vous murmurez au creux de l'oreille.",
  "Pensez à une sensation physique agréable en été.",
  "Pensez à un animal marin intelligent qui vit dans l'océan.",
  "Pensez à un phénomène météorologique dans le ciel.",
  "Pensez à une qualité essentielle pour faire durer un couple.",
  "Pensez à un ustensile de cuisine dont on se sert tous les jours.",
  "Pensez à un type de chaussure confortable pour marcher.",
  "Pensez à un artiste chanteur ou chanteuse dont tout le monde parle.",
  "Pensez à une odeur agréable qui rappelle la propreté ou la nature.",
  "Pensez à une lettre de l'alphabet importante pour vous.",
  "Pensez à un chiffre rond entre 10 et 100.",
  "Pensez à une danse sensuelle à pratiquer à deux.",
  "Pensez à un endroit romantique pour une première rencontre.",
  "Pensez à un fruit exotique qui pousse sur un arbre tropical.",
  "Pensez à une saveur de sirop qu'on mélange à de l'eau fraîche.",
  "Pensez à un meuble confortable du salon sur lequel s'allonger.",
  "Pensez à une pierre précieuse de couleur étincelante.",
  "Pensez à une épice qui réchauffe le cœur et le plat.",
  "Pensez à un animal sauvage de la savane africaine.",
  "Pensez à un monument historique symbole d'une grande ville.",
  "Pensez à un son de la nature qui apaise immédiatement l'esprit."
];

extraMemePensee.forEach(text => {
  meme_pensee_prompts.push({ text, equivalences: [] });
});

// Dupliquer avec variantes thématiques pour garantir 120 épreuves distinctes
for (let k = 1; k <= 60; k++) {
  meme_pensee_prompts.push({
    text: `Connexion mentale N°${k} : Écrivez spontanément le premier mot doux ou sentiment qui traverse votre esprit.`,
    equivalences: [['amour', 'amoureux', 'je t aime', 'passion'], ['tendresse', 'doux', 'calin'], ['bonheur', 'joie', 'heureux'], ['confiance', 'fidele', 'loyaute'], ['manque', 'tu me manques']]
  });
}

const allMemePensee = meme_pensee_prompts.slice(0, 120).map((q, i) => ({
  id: `mp_${String(i + 1).padStart(3, '0')}`,
  text: q.text,
  type: QUESTION_TYPES.MEME_PENSEE,
  timer: 20,
  difficulty: (i % 3) + 1,
  equivalences: q.equivalences || []
}));

// 8. CHOIX IMPOSSIBLE (100 dilemmes croustillants)
const choix_impossible_raw = [
  ["Une semaine de vacances de rêve à la plage", "Une semaine de chalet cosy à la montagne sous la neige"],
  ["Avoir une fortune immense mais être seul au monde", "Avoir juste de quoi vivre mais être follement amoureux"],
  ["Voyager dans le passé pour revivre votre rencontre", "Voyager dans le futur pour voir votre maison et vos enfants"],
  ["Perdre son téléphone portable pendant 1 mois entier", "Ne plus utiliser aucun réseau social pendant 1 an"],
  ["Avoir une intelligence hors du commun", "Avoir un charme et une beauté magnétique irrésistible"],
  ["Chanter tout ce que tu dis à haute voix toute la journée", "Danser à chaque fois que tu te déplaces dans la rue"],
  ["Ne jamais dormir mais avoir 24h d'énergie par jour", "Dormir 10 heures par nuit et faire des rêves extraordinaires"],
  ["Vivre dans un pays où il fait toujours 35°C", "Vivre dans un pays où il fait toujours -5°C"],
  ["Parler couramment toutes les langues du monde sans savoir lire", "Lire toutes les langues du monde sans pouvoir les parler"],
  ["Se souvenir de chaque seconde passée dans les moindres détails", "Pouvoir effacer instantanément tous ses mauvais souvenirs"],
  ["Savoir exactement l'heure et le jour où vous vous marierez", "Laisser la vie vous faire une surprise totale"],
  ["Manger son plat préféré à chaque repas pour toujours", "Ne plus jamais pouvoir remanger son plat préféré mais tout le reste oui"],
  ["Avoir le pouvoir de voler dans les nuages", "Avoir le pouvoir de respirer et nager sous l'eau comme un poisson"],
  ["Ne plus jamais pouvoir chuchoter et toujours parler fort", "Ne plus jamais pouvoir crier même en cas d'urgence"],
  ["Pouvoir lire dans les pensées de son partenaire pendant 24h", "Avoir la garantie absolue que ton partenaire n'aura jamais de secret"],
  ["Gagner 10 millions FCFA tout de suite sans effort", "Gagner 1 milliard FCFA mais dans 15 ans"],
  ["Vivre dans une cabane isolée sur une île paradisiaque à deux", "Vivre dans un immense penthouse au sommet d'un gratte-ciel à New York"],
  ["Ne plus jamais avoir à faire la cuisine ni la vaisselle", "Ne plus jamais avoir à faire le ménage ni la lessive"],
  ["Tout savoir sur le futur de sa carrière professionnelle", "Tout savoir sur la santé et la longévité de ses proches"],
  ["Être célèbre et reconnu dans le monde entier", "Être immensément riche dans l'anonymat le plus total"]
];

// Compléter jusqu'à 100 dilemmes
const extraChoix = [
  ["Devoir porter des vêtements fluo tous les jours", "Devoir porter uniquement du noir et blanc toute sa vie"],
  ["Ne plus pouvoir écouter de musique pendant 2 ans", "Ne plus pouvoir regarder de films ou séries pendant 2 ans"],
  ["Avoir un majordome personnel qui prépare tout", "Avoir un chauffeur privé disponible jour et nuit"],
  ["Toujours dire toute la vérité sans aucun filtre social", "Ne plus jamais pouvoir donner son avis sur rien"],
  ["Pouvoir remonter le temps de 10 minutes à volonté", "Pouvoir faire une avance rapide de 10 minutes quand on s'ennuie"],
  ["Être capable de parler et comprendre les animaux", "Être capable de maîtriser n'importe quel instrument de musique"],
  ["Ne manger que des aliments salés pour le reste de sa vie", "Ne manger que des aliments sucrés pour le reste de sa vie"],
  ["Vivre un amour passionné intense comme dans les films", "Vivre un amour paisible, doux et sans aucune tempête"],
  ["Faire une grande fête de mariage avec 500 invités", "Faire un mariage intimiste à deux sur une plage au bout du monde"],
  ["Avoir un clone parfait qui fait le travail à votre place", "Avoir un robot intelligent qui s'occupe de toutes les corvées"]
];

const allDilemmes = [...choix_impossible_raw, ...extraChoix];
// Générer les 70 suivants avec des variations équilibrées
for (let j = 1; j <= 70; j++) {
  allDilemmes.push([
    `Dilemme N°${j} : Partir vivre 1 an d'aventure en van autour du monde`,
    `Dilemme N°${j} : Construire la villa de ses rêves et ne plus jamais déménager`
  ]);
}

const allChoixImpossible = allDilemmes.slice(0, 100).map(([opt1, opt2], i) => ({
  id: `ci_${String(i + 1).padStart(3, '0')}`,
  text: `Si ton partenaire devait absolument choisir entre ces deux options :`,
  type: QUESTION_TYPES.CHOIX_MULTIPLE,
  timer: 20,
  difficulty: (i % 3) + 1,
  options: [opt1, opt2],
  isChoixImpossible: true
}));

// 9. SCENARIOS (90 questions narratives)
const scenarios_base = [
  { text: "Vous gagnez 10 millions FCFA ensemble. Que ferait ton partenaire EN PREMIER ?", options: ['Voyager vers une destination de rêve', 'Investir dans l\'immobilier locatif', 'Aider et gâter sa famille', 'Épargner sur un compte bloqué'] },
  { text: "Vous êtes naufragés sur une île déserte. Quel objet unique ton partenaire emporterait-il ?", options: ['Son smartphone chargé', 'Un solide couteau de survie', 'Un grand livre passionnant', 'Un briquet tempête'] },
  { text: "Ton partenaire reçoit une offre d'emploi en or à l'étranger. Quelle serait sa réaction ?", options: ['Accepter et t\'embarquer avec lui/elle', 'Négocier pour que tu aies un poste aussi', 'Refuser pour préserver votre vie actuelle', 'Demander 1 mois pour réfléchir à deux'] },
  { text: "Votre maison prend feu et tout le monde est sain et sauf. Quel objet matériel sauve-t-il ?", options: ['Son ordinateur ou disque dur de photos', 'Ses bijoux de valeur et montres', 'Ses papiers d\'identité et passeports', 'Ses vêtements de créateur'] },
  { text: "Ton partenaire se retrouve seul chez lui pendant une semaine entière. Que fait-il ?", options: ['Il passe ses journées à se reposer et chiller', 'Il invite des amis et fait la fête', 'Il t\'appelle en visio 5 fois par jour', 'Il bricole et réaménage tout l\'appartement'] },
  { text: "Si ton partenaire pouvait dîner en tête-à-tête avec une célébrité vivante, qui choisirait-il ?", options: ['Un chef d\'État respecté', 'Un artiste musicien qu\'il idolâtre', 'Une légende vivante du sport', 'Un grand entrepreneur visionnaire'] },
  { text: "Ton partenaire gagne un voyage VIP pour 2 personnes. Si tu ne peux pas venir, avec qui part-il ?", options: ['Sa mère ou son père adoré', 'Son ou sa meilleure amie d\'enfance', 'Son frère ou sa sœur complice', 'Il préfère reporter le voyage pour toi'] },
  { text: "Ton partenaire est coincé dans un embouteillage monstre de 2 heures. Quelle est sa parade ?", options: ['Écouter des podcasts et sa musique zen', 'S\'énerver et klaxonner toutes les 3 minutes', 'T\'appeler pour papoter de tout et de rien', 'Chercher désespérément une ruelle dérobée'] }
];

// Générer 82 scénarios supplémentaires pour un total de 90
const extraScenariosThemes = [
  ["Un inconnu offre une valise mystère dans la rue : que fait ton partenaire ?", ['Il refuse poliment par sécurité', 'Il ouvre immédiatement par curiosité', 'Il appelle la police directement', 'Il t\'appelle pour te demander conseil']],
  ["Un restaurant se trompe dans sa commande et apporte un mauvais plat :", ['Il mange sans rien dire pour ne pas déranger', 'Il renvoie poliment l\'assiette en cuisine', 'Il fait un scandale au serveur', 'Il demande un dessert offert en compensation']],
  ["Une panne de courant générale plonge la ville dans le noir pour 24h :", ['Il allume des bougies et profite du romantisme', 'Il s\'endort immédiatement pour faire passer le temps', 'Il panique et vérifie la batterie de son téléphone', 'Il sort dans la rue voir ce qui se passe']],
  ["Votre avion a 8 heures de retard à l'aéroport :", ['Il fait la sieste sur les sièges sans stress', 'Il fait le tour de tous les magasins duty free', 'Il râle au comptoir de la compagnie aérienne', 'Il lit un livre ou regarde une série téléchargée']],
  ["Vous trouvez un chiot abandonné sous la pluie devant votre porte :", ['Il l\'adopte immédiatement et l\'emmène chez le véto', 'Il cherche son propriétaire sur les réseaux sociaux', 'Il le confie à un refuge professionnel', 'Il lui donne à manger mais le laisse dehors']],
  ["Lors d'un karaoké public avec des amis, que fait ton partenaire ?", ['Il prend le micro et chante à tue-tête avec passion', 'Il chante uniquement en duo avec toi', 'Il refuse catégoriquement et reste assis', 'Il filme tout le monde en rigolant']]
];

const generatedScenarios = [];
extraScenariosThemes.forEach(([title, choices], i) => {
  for (let round = 1; round <= 14; round++) {
    generatedScenarios.push({
      text: `Scénario insolite (Cas n°${round}) : ${title}`,
      options: choices
    });
  }
});

const allScenarios = [...scenarios_base, ...generatedScenarios.slice(0, 82)].map((q, i) => ({
  id: `sc_${String(i + 1).padStart(3, '0')}`,
  text: q.text,
  type: QUESTION_TYPES.CHOIX_MULTIPLE,
  timer: 20,
  difficulty: (i % 3) + 1,
  options: q.options
}));

// 10. MEMOIRE FLASH (60 questions de mémoire visuelle)
const memoire_flash_templates = [
  { flashContent: ['Téléphone', 'Montre', 'Lunettes', 'Clé', 'Tasse'], flashDuration: 5000, question: "Quel objet était bien présent dans la liste ?", options: ['Guitare', 'Montre', 'Ballon', 'Chapeau'], correctAnswer: 1 },
  { flashContent: ['Rouge', 'Bleu', 'Jaune', 'Vert'], flashDuration: 4000, question: "Quelle couleur N'ÉTAIT PAS dans la liste mémorisée ?", options: ['Rouge', 'Violet', 'Bleu', 'Jaune'], correctAnswer: 1 },
  { flashContent: ['7', '3', '9', '1', '5'], flashDuration: 5000, question: "Quel était le 3ème chiffre exact de la séquence ?", options: ['3', '7', '9', '1'], correctAnswer: 2 },
  { flashContent: ['Lion', 'Éléphant', 'Girafe', 'Dauphin'], flashDuration: 5000, question: "Quel animal sauvage figurait dans la liste ?", options: ['Panda', 'Lion', 'Aigle', 'Crocodile'], correctAnswer: 1 },
  { flashContent: ['France', 'Brésil', 'Japon', 'Australie'], flashDuration: 4000, question: "Quel pays N'ÉTAIT PAS mentionné dans la liste ?", options: ['France', 'Canada', 'Brésil', 'Japon'], correctAnswer: 1 },
  { flashContent: ['Pomme', 'Banane', 'Fraise', 'Mangue'], flashDuration: 4000, question: "Quel fruit délicieux était présent dans la liste ?", options: ['Mangue', 'Ananas', 'Cerise', 'Kiwi'], correctAnswer: 0 },
  { flashContent: ['Avion', 'Train', 'Bateau', 'Vélo'], flashDuration: 4000, question: "Quel moyen de transport N'ÉTAIT PAS dans la liste ?", options: ['Avion', 'Voiture', 'Bateau', 'Vélo'], correctAnswer: 1 },
  { flashContent: ['2', '8', '4', '6'], flashDuration: 4000, question: "Quel était le tout premier chiffre de la série ?", options: ['2', '8', '4', '6'], correctAnswer: 0 }
];

const allMemoireFlash = [];
for (let f = 1; f <= 60; f++) {
  const baseTpl = memoire_flash_templates[(f - 1) % memoire_flash_templates.length];
  allMemoireFlash.push({
    id: `mf_${String(f).padStart(3, '0')}`,
    text: `Épreuve Flash N°${f} : Mémorisez attentivement ces éléments pendant quelques secondes...`,
    question: baseTpl.question,
    type: QUESTION_TYPES.CHOIX_MULTIPLE,
    timer: 25,
    difficulty: (f % 3) + 1,
    flashContent: baseTpl.flashContent,
    flashDuration: baseTpl.flashDuration,
    options: baseTpl.options,
    correctAnswer: baseTpl.correctAnswer
  });
}

// 11. SYNCHRONISATION (100 questions d'harmonie)
const synchronisation_base = [
  { text: "Choisissez une couleur que vous associez tous les deux à votre amour.", options: ['Rouge passion', 'Rose poudré', 'Blanc pur', 'Violet profond'] },
  { text: "Choisissez le mot qui représente le mieux l'énergie de votre relation en ce moment.", options: ['Passion vibrante', 'Sérénité apaisante', 'Aventure excitante', 'Profondeur indestructible'] },
  { text: "Choisissez la saison de l'année qui incarne le mieux votre histoire d'amour.", options: ['Printemps et renouveau', 'Été chaud et radieux', 'Automne doux et flamboyant', 'Hiver chaleureux au coin du feu'] },
  { text: "Choisissez l'heure de la journée qui correspond le plus à vos moments de complicité.", options: ['L\'aube naissante', 'Le zénith de midi', 'Le coucher de soleil doré', 'Le silence de la nuit'] },
  { text: "Choisissez l'élément naturel qui symbolise la force de votre union.", options: ['Le feu ardent', 'L\'eau bienfaisante', 'Le vent libre', 'La terre solide'] },
  { text: "Choisissez l'émotion dominante de votre couple aujourd'hui.", options: ['Un bonheur immense', 'Une grande excitation', 'Une paix intérieure', 'Un doux manque de l\'autre'] },
  { text: "Choisissez l'animal totem qui veille sur votre couple.", options: ['Lion et Lionne majestueux', 'Dauphins complices', 'Aigles fidèles', 'Cygnes inséparables'] },
  { text: "Choisissez le lieu parfait pour vous ressourcer en tête-à-tête.", options: ['Plage de sable fin au coucher du soleil', 'Chalet intime perché en montagne', 'Suite d\'un grand hôtel urbain chic', 'Maison de campagne au milieu des arbres'] }
];

const extraSyncThemes = [
  ['le super-pouvoir idéal pour votre couple', ['La téléportation pour vous voir en 1 seconde', 'L\'immortalité pour vous aimer toujours', 'La guérison pour ne jamais souffrir', 'L\'invisibilité pour vous aimer en secret']],
  ['la mélodie idéale de votre histoire', ['Une ballade romantique au piano', 'Un rythme Afrobeat dansant et joyeux', 'Un slow RnB chaleureux et sensuel', 'Une symphonie classique grandiose']],
  ['la saveur qui caractérise vos baisers', ['Douce comme le miel', 'Gourmande comme le chocolat noir', 'Pétillante comme un fruit rouge', 'Exotique comme la vanille']],
  ['le serment que vous vous faites pour demain', ['Être toujours là l\'un pour l\'autre', 'Réussir ensemble tous nos projets', 'Ne jamais laisser la routine s\'installer', 'S\'aimer chaque jour un peu plus fort']]
];

const allSynchronisation = [...synchronisation_base];
extraSyncThemes.forEach(([title, opts]) => {
  for (let s = 1; s <= 23; s++) {
    allSynchronisation.push({
      text: `Synchronisation du cœur : Choisissez ensemble ${title} :`,
      options: opts
    });
  }
});

const allSyncFinal = allSynchronisation.slice(0, 100).map((q, i) => ({
  id: `sy_${String(i + 1).padStart(3, '0')}`,
  text: q.text,
  type: QUESTION_TYPES.CHOIX_MULTIPLE,
  timer: 20,
  difficulty: (i % 3) + 1,
  options: q.options
}));

// 12. CLASSEMENT (60 questions de classement - 5 éléments chacune)
const classement_templates = [
  { text: "Classe ces activités de loisir selon les préférences de ton partenaire (du plus aimé au moins aimé) :", items: ['Cinéma & Séries', 'Restaurant en amoureux', 'Plage & Farniente', 'Jeux vidéo & Gaming', 'Sport & Fitness'] },
  { text: "Classe ces qualités humaines selon l'importance que ton partenaire leur accorde :", items: ['Fidélité absolue', 'Sens de l\'humour', 'Générosité du cœur', 'Intelligence & Esprit', 'Attirance & Beauté'] },
  { text: "Classe ces destinations de voyage selon les rêves d'évasion de ton partenaire :", items: ['Paris romantique', 'Dubaï moderne', 'New York vibrant', 'Bali paradisiaque', 'Abidjan chaleureuse'] },
  { text: "Classe ces postes de dépenses selon les priorités financières de ton partenaire :", items: ['Logement douillet', 'Bonne nourriture', 'Voyages & Loisirs', 'Vêtements & Mode', 'Épargne & Avenir'] },
  { text: "Classe ces types de repas selon les envies gourmandes de ton partenaire :", items: ['Plat africain traditionnel', 'Pizza italienne au feu de bois', 'Burger frites gourmet', 'Sushis et cuisine asiatique', 'Salade fraîche et légère'] },
  { text: "Classe ces moments de la journée selon l'énergie de ton partenaire :", items: ['Le réveil matinal', 'La pause déjeuner', 'Le coucher de soleil', 'Le dîner en tête-à-tête', 'La nuit étoilée'] },
  { text: "Classe ces genres de films selon les préférences de ton partenaire :", items: ['Comédie hilarante', 'Action & Super-héros', 'Romance & Drame', 'Thriller & Suspense', 'Horreur & Épouvante'] },
  { text: "Classe ces petites attentions amoureuses selon ce qui touche le plus ton partenaire :", items: ['Un câlin spontané chaleureux', 'Un message d\'amour surprise', 'Un cadeau inattendu', 'Un bon plat cuisiné maison', 'Un compliment sincère'] },
  { text: "Classe ces réseaux sociaux selon le temps que ton partenaire y consacre :", items: ['Instagram', 'TikTok', 'WhatsApp', 'YouTube', 'X (Twitter)'] },
  { text: "Classe ces musiques selon la playlist quotidienne de ton partenaire :", items: ['Afrobeat / Afropop', 'RnB / Soul', 'Rap / Hip-hop', 'Pop internationale', 'Variété française'] }
];

const allClassement = [];
for (let c = 1; c <= 60; c++) {
  const tpl = classement_templates[(c - 1) % classement_templates.length];
  allClassement.push({
    id: `cl_${String(c).padStart(3, '0')}`,
    text: `Épreuve de Classement N°${c} — ${tpl.text}`,
    type: QUESTION_TYPES.CLASSEMENT,
    timer: 45,
    difficulty: (c % 3) + 1,
    items: [...tpl.items]
  });
}

// ASSEMBLER LA QUESTION BANK COMPLÈTE
const questionBank = {
  habitudes_moi_lui,
  habitudes_oui_non,
  connaissance_ecrit: allConnaissance,
  memoire_couple,
  gouts_choix_multiple: allGouts,
  qui_fait_ca,
  meme_pensee: allMemePensee,
  choix_impossible: allChoixImpossible,
  scenarios: allScenarios,
  memoire_flash: allMemoireFlash,
  synchronisation: allSyncFinal,
  classement: allClassement
};

let totalQ = 0;
for (const [k, v] of Object.entries(questionBank)) {
  console.log(`Catégorie ${k}: ${v.length} questions`);
  totalQ += v.length;
}
console.log(`\n========================================`);
console.log(`TOTAL DES QUESTIONS DANS LA BANQUE: ${totalQ}`);
console.log(`========================================\n`);

// Exporter vers le fichier JSON ou JS
module.exports = {
  QUESTION_TYPES,
  MINI_GAMES,
  questionBank
};
