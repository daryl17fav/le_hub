/**
 * Lesson Content Database
 * 
 * Contains structured lesson explanations for each skill.
 * These explanations appear before exercises begin (Stage 1 intro).
 * 
 * Structure for each lesson:
 * - title: The lesson title shown to the student
 * - emoji: A visual icon for the topic
 * - teacherExplanation: Simple, friendly explanation (like a teacher talking to kids)
 * - example: One or two easy examples
 * - miniPractice: A thought prompt before exercises
 * - encouragement: Closing line to motivate starting exercises
 */

export interface LessonContent {
    title: string;
    emoji: string;
    teacherExplanation: string;
    example: string;
    miniPractice: string;
    encouragement: string;
}

export const lessonContentMap: Record<string, LessonContent> = {

    // ──────────────────────────────────────────────
    // JUNIOR MATH
    // ──────────────────────────────────────────────
    math_chiffres_101: {
        title: "S'amuser avec les Chiffres 🔢",
        emoji: "🔢",
        teacherExplanation:
            "Bonjour les amis ! Aujourd'hui, on va jouer avec les chiffres de 1 à 10. " +
            "Les chiffres, c'est comme des amis qui nous aident à compter ! " +
            "Quand on compte des pommes, des jouets, ou des animaux, on utilise les chiffres. " +
            "1, 2, 3… chaque chiffre a un nom et une valeur spéciale. " +
            "Plus le chiffre est grand, plus il représente beaucoup de choses !",
        example:
            "🍎 🍎 🍎 → Il y a 3 pommes !\n🐶 🐶 → Il y a 2 chiens.",
        miniPractice:
            "Regarde autour de toi. Peux-tu compter combien de doigts tu as sur une main ?",
        encouragement:
            "Super ! Tu es prêt(e) à commencer les exercices. Allez, on compte ! 🚀",
    },

    math_junior_test: {
        title: "Mathématiques Juniors 🧮",
        emoji: "🧮",
        teacherExplanation:
            "Salut les champions ! Aujourd'hui on va faire des calculs amusants. " +
            "On peut ajouter pour avoir plus, et soustraire pour en avoir moins. " +
            "Par exemple, si tu as 3 bonbons et que tu en reçois 2 de plus, " +
            "tu fais 3 + 2 = 5 bonbons au total ! 🍬 " +
            "Et si tu manges 1 bonbon, il t'en reste 5 - 1 = 4. C'est magique !",
        example:
            "🍬 🍬 🍬 + 🍬 🍬 = 5 bonbons\n🍭 🍭 🍭 🍭 - 🍭 = 3 sucettes",
        miniPractice:
            "Si tu as 4 crayons et que tu en prêtes 1 à ton ami, combien t'en reste-t-il ?",
        encouragement:
            "Excellent ! Tu es un(e) super calculateur(trice) ! Faisons les exercices ensemble ! 💪",
    },

    math_addition: {
        title: "L'Addition : Ajouter c'est Grandir ! ➕",
        emoji: "➕",
        teacherExplanation:
            "Bonjour les petits mathématiciens ! L'addition, c'est quand on met des choses ensemble pour en avoir plus. " +
            "On utilise le signe + qui veut dire « et aussi ». " +
            "Si tu as 2 ballons 🎈🎈 et qu'on te donne 3 autres ballons 🎈🎈🎈, " +
            "tu fais 2 + 3 = 5 ballons en tout ! " +
            "Plus tu pratiques, plus tu deviens rapide comme un super héros des maths !",
        example:
            "2 + 3 = 5 🎈\n1 + 4 = 5 ⭐",
        miniPractice:
            "Lève 3 doigts d'une main et 2 de l'autre. Combien de doigts levés en tout ?",
        encouragement:
            "Bravo ! Tu es prêt(e) à additionner comme un(e) champion(ne) ! C'est parti ! 🌟",
    },

    // ──────────────────────────────────────────────
    // JUNIOR READING
    // ──────────────────────────────────────────────
    reading_adventure: {
        title: "Aventures de Lecture 📚",
        emoji: "📚",
        teacherExplanation:
            "Bonjour les lecteurs ! Lire, c'est une aventure extraordinaire. " +
            "Chaque lettre est comme un ami, et quand on les met ensemble, elles forment des mots. " +
            "Par exemple, les lettres C-H-A-T forment le mot CHAT 🐱 ! " +
            "Aujourd'hui, on va explorer les lettres, les mots et les petites histoires. " +
            "La lecture ouvre des portes vers des mondes merveilleux !",
        example:
            "A → 'A' comme 'Ananas' 🍍\nCHIEN → C'est l'animal qui aboie 🐶",
        miniPractice:
            "Peux-tu trouver une lettre dans ton prénom et nous dire un mot qui commence par cette lettre ?",
        encouragement:
            "Tu vas devenir un(e) grand(e) lecteur(trice) ! Commençons les exercices ! 📖✨",
    },

    // ──────────────────────────────────────────────
    // JUNIOR SCIENCE
    // ──────────────────────────────────────────────
    science_explorers: {
        title: "Explorateurs Scientifiques 🔬",
        emoji: "🔬",
        teacherExplanation:
            "Bonjour jeunes scientifiques ! La science, c'est observer le monde autour de nous. " +
            "Pourquoi le ciel est-il bleu ? Pourquoi les oiseaux volent ? " +
            "On trouve les réponses avec la curiosité et l'observation ! " +
            "Les scientifiques posent des questions et cherchent des réponses. " +
            "Toi aussi, tu peux être un explorateur de la nature ! 🌍",
        example:
            "🌞 Le soleil est une étoile très grande et très chaude.\n🌧️ La pluie vient des nuages quand ils sont très pleins d'eau.",
        miniPractice:
            "Pense à quelque chose dans la nature qui te rend curieux(se). Pourquoi cela se passe-t-il ?",
        encouragement:
            "Super scientifique ! Les exercices vont t'aider à découvrir encore plus ! 🚀🔭",
    },

    // ──────────────────────────────────────────────
    // ADULT COURSES
    // ──────────────────────────────────────────────
    digital_literacy_101: {
        title: "Bases du Numérique 💻",
        emoji: "💻",
        teacherExplanation:
            "Bienvenue ! Dans ce module, vous allez apprendre à utiliser les outils numériques essentiels du quotidien. " +
            "Un smartphone est un outil puissant : il peut vous aider à communiquer, à vous informer et même à gérer de l'argent. " +
            "Nous allons explorer comment utiliser un téléphone, naviguer sur internet et envoyer des messages en toute sécurité.",
        example:
            "📧 Envoyer un message WhatsApp à votre famille.\n🌐 Chercher une information sur Google.",
        miniPractice:
            "Avez-vous déjà utilisé votre téléphone pour chercher quelque chose sur internet ? C'est le début du numérique !",
        encouragement:
            "Excellent ! Commençons les exercices pour renforcer vos compétences numériques. Vous pouvez le faire ! 💪",
    },

    finance_101: {
        title: "Finances Personnelles 💰",
        emoji: "💰",
        teacherExplanation:
            "Bonjour ! Gérer son argent, c'est une compétence essentielle pour atteindre ses objectifs. " +
            "Un budget vous aide à savoir combien vous gagnez, combien vous dépensez, et combien vous pouvez économiser. " +
            "La règle de base : ne dépensez jamais plus que ce que vous gagnez. " +
            "Épargner même un petit peu chaque mois peut faire une grande différence sur le long terme !",
        example:
            "Si vous gagnez 50 000 FCFA par mois et que vous dépensez 40 000, vous économisez 10 000 FCFA 🎯",
        miniPractice:
            "Connaissez-vous vos dépenses mensuelles principales ? Listez-en trois dans votre tête.",
        encouragement:
            "Parfait ! Avec ces exercices, vous deviendrez un expert de la gestion financière ! 🏆",
    },

    agri_101: {
        title: "Agriculture Moderne 🌾",
        emoji: "🌾",
        teacherExplanation:
            "Bienvenue dans le module Agriculture ! L'agriculture moderne combine les savoirs traditionnels avec de nouvelles techniques. " +
            "Un bon agriculteur connaît son sol, ses semences et le bon moment pour planter. " +
            "Avec les bonnes pratiques, vous pouvez augmenter votre récolte tout en préservant la terre pour l'avenir.",
        example:
            "🌱 La rotation des cultures protège le sol et améliore les rendements.\n💧 L'irrigation goutte-à-goutte économise l'eau.",
        miniPractice:
            "Quelle culture cultivez-vous ou aimeriez-vous cultiver ? Pensez à ce dont elle a besoin pour pousser.",
        encouragement:
            "Excellent ! Ces exercices vont renforcer vos connaissances agricoles. Let's grow ! 🌿",
    },

    // Mobile Security — per-lesson explanations
    mobile_security_l1: {
        title: 'Votre Téléphone est un Coffre-Fort 🔐',
        emoji: '🔐',
        teacherExplanation:
            'Imaginez que votre téléphone est un coffre-fort contenant vos photos, contacts et argent. ' +
            'Un bon verrouillage d\'écran — PIN, mot de passe ou empreinte — est votre première ligne de défense. ' +
            'Un mot de passe fort mélange lettres, chiffres et symboles, comme "M@mbo2024!". ' +
            'Évitez "1234", votre date de naissance ou votre prénom : ces codes sont devinés en secondes. ' +
            'Activez aussi le verrouillage automatique après 30 secondes d\'inactivité.',
        example:
            '✅ Bon : T!g3r#2024 (long, mixte, unique)\n❌ Mauvais : 0000, 1234, monnom, date de naissance.',
        miniPractice:
            'Votre téléphone est-il verrouillé en ce moment ? Si vous utilisez "1234", c\'est urgent de le changer !',
        encouragement:
            'Excellent ! La sécurité commence par un bon mot de passe. Faites les exercices ! 🔐',
    },

    mobile_security_l2: {
        title: 'Reconnaître et Éviter les Arnaques 🎣',
        emoji: '🎣',
        teacherExplanation:
            'Les arnaqueurs envoient de faux SMS et appels en se faisant passer pour votre banque ou opérateur. ' +
            'C\'est le "phishing". Trois signes d\'alerte : (1) On vous demande votre PIN ou mot de passe — JAMAIS une vraie banque ne fait ça. ' +
            '(2) Le message crée une urgence : "Cliquez maintenant !" ' +
            '(3) Le numéro est inconnu ou bizarre. ' +
            'Règle simple : en cas de doute, ne répondez pas. Appelez directement votre opérateur.',
        example:
            '🚨 FAUX SMS : "MTN: Votre compte sera bloqué. Envoyez votre PIN au 9999."\n' +
            '✅ Bonne réaction : Ignorez, supprimez, et appelez le service MTN officiel.',
        miniPractice:
            'Avez-vous déjà reçu un message suspect ? À l\'avenir, vous saurez exactement quoi faire.',
        encouragement:
            'Très bien ! Reconnaître une arnaque, c\'est déjà l\'éviter. En avant ! 🛡️',
    },

    mobile_security_l3: {
        title: 'Mobile Money en Sécurité 💸',
        emoji: '💸',
        teacherExplanation:
            'Le Mobile Money est pratique mais doit être utilisé avec précaution. Les règles essentielles : ' +
            '1. Ne JAMAIS partager votre code secret — même avec un agent ou un ami. ' +
            '2. Vérifiez toujours le numéro du destinataire deux fois avant d\'envoyer. ' +
            '3. Utilisez uniquement des agents officiels affiliés à votre opérateur. ' +
            '4. Si vous perdez votre téléphone, bloquez immédiatement votre SIM.',
        example:
            '✅ Relisez le numéro : 0162345678 ≠ 0162354678 (chiffres inversés !)\n' +
            '🚫 Arnaque courante : "J\'ai envoyé par erreur, renvoyez-moi." — Vérifiez votre solde D\'ABORD.',
        miniPractice:
            'La prochaine fois que vous faites un virement, lisez le numéro deux fois. Une habitude qui peut vous sauver !',
        encouragement:
            'Parfait ! Votre argent mobile mérite d\'être protégé. Faisons le dernier exercice ! 💪',
    },

    // Course-level entry (overview / fallback)
    mobile_security: {
        title: 'Sécurité Mobile 📱',
        emoji: '📱',
        teacherExplanation:
            'Votre téléphone contient des informations très importantes : vos photos, vos contacts, et peut-être même votre argent mobile. ' +
            'Il est essentiel de le protéger ! ' +
            'Ne partagez jamais votre code PIN ou mot de passe. Méfiez-vous des messages qui demandent vos informations personnelles. ' +
            'Un téléphone sécurisé, c\'est un téléphone avec un mot de passe solide et des applications fiables.',
        example:
            '✅ Bon mot de passe : A7x!mK29\n❌ Mauvais : 1234 ou votre date de naissance.',
        miniPractice:
            'Avez-vous un code PIN sur votre téléphone ? Si non, c\'est le premier exercice à faire après ce cours !',
        encouragement:
            'Bravo ! Protégez vos données comme vous protégez votre portefeuille. Commençons ! 🔐',
    },

    digital_commerce: {
        title: "Commerce Digital 🏪",
        emoji: "🏪",
        teacherExplanation:
            "Le commerce en ligne vous permet de vendre vos produits à des milliers de personnes, même sans boutique physique. " +
            "Des plateformes comme WhatsApp Business, Facebook Marketplace ou Jumia vous aident à atteindre vos clients facilement. " +
            "Pour réussir en ligne, il faut : de bonnes photos de produits, un prix clair et un service rapide pour vos clients.",
        example:
            "📸 Photo de qualité de votre produit → Plus de ventes !\n💬 Réponse rapide aux clients → Plus de confiance.",
        miniPractice:
            "Si vous vendez quelque chose, quelle serait votre première belle photo de produit à publier ?",
        encouragement:
            "Parfait ! Le commerce digital est l'avenir. Ces exercices vous y préparent ! 🚀",
    },

    health_community: {
        title: "Santé & Communauté 🏥",
        emoji: "🏥",
        teacherExplanation:
            "La santé est notre bien le plus précieux. Dans ce module, vous découvrirez comment accéder aux services de santé locaux, " +
            "comprendre les informations médicales de base et savoir quand consulter un médecin. " +
            "Vous apprendrez aussi comment les communautés s'organisent pour s'entraider et améliorer le bien-être de tous.",
        example:
            "🏥 Connaître l'adresse du centre de santé le plus proche.\n💊 Comprendre comment lire une ordonnance médicale.",
        miniPractice:
            "Savez-vous où se trouve le centre de santé le plus proche de chez vous ?",
        encouragement:
            "Excellent ! Une communauté informée est une communauté en bonne santé. Commençons ! 💚",
    },

    // Fallback for unknown skills
    default: {
        title: "Nouvelle Leçon 🎯",
        emoji: "🎯",
        teacherExplanation:
            "Bienvenue dans cette leçon ! Nous allons apprendre ensemble quelque chose de nouveau et d'intéressant. " +
            "Lis chaque question avec attention, prends ton temps et fais de ton mieux. " +
            "Il n'y a pas de pression — chaque erreur est une occasion d'apprendre !",
        example:
            "Lire bien la question avant de répondre.\nPrendre le temps de réfléchir.",
        miniPractice:
            "Es-tu prêt(e) à commencer ? Concentre-toi et fais de ton mieux !",
        encouragement:
            "Super ! Tu peux le faire. Commençons maintenant ! 🌟",
    },
};

/**
 * Get lesson content for a given skill.
 * Falls back to the 'default' lesson if the skill is not found.
 */
export const getLessonContent = (skill: string): LessonContent => {
    return lessonContentMap[skill] || lessonContentMap['default'];
};
