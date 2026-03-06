/**
 * 📱 COURS : SÉCURITÉ MOBILE
 * 
 * Titre du Cours: Sécurité Mobile — Protégez Votre Téléphone et Votre Argent
 * 
 * Objectif du cours:
 * À la fin de ce cours, vous serez capable d'identifier les risques liés à l'utilisation
 * d'un smartphone et de mettre en place des mesures concrètes pour protéger vos données
 * personnelles et votre argent mobile. Vous saurez reconnaître les arnaques, créer des
 * mots de passe solides et réagir correctement en cas de problème.
 *
 * Structure:
 * - Leçon 1 : Votre Téléphone est une Coffre-Fort (Mots de passe & verrouillage)
 * - Leçon 2 : Les Arnaques Numériques (Phishing, fraude, escroqueries)
 * - Leçon 3 : Mobile Money en Sécurité (Transactions sécurisées)
 * - Test Final : 10 questions couvrant les 3 leçons
 */

import { Exercise } from '../studentLevel';
import { shuffleArray } from '../utils';

// ─────────────────────────────────────────────────────────────────────────────
// LESSON CONTENT (used by lessonContent.ts via getLessonContent)
// ─────────────────────────────────────────────────────────────────────────────

export const mobileLessons = {

    mobile_security_l1: {
        title: 'Votre Téléphone est un Coffre-Fort 🔐',
        emoji: '🔐',
        teacherExplanation:
            'Imaginez que votre téléphone est un coffre-fort contenant vos photos, ' +
            'contacts, messages et argent. Laisseriez-vous ce coffre ouvert dans la rue ? ' +
            'Certainement pas ! C\'est la même chose avec votre téléphone. ' +
            'Un bon verrouillage d\'écran — PIN, mot de passe ou empreinte — est votre première ligne de défense. ' +
            'Un mot de passe fort mélange lettres, chiffres et symboles, comme "M@mbo2024!". ' +
            'Évitez "1234", votre date de naissance, ou votre prénom. Ces codes sont devinés en secondes. ' +
            'Activez aussi le verrouillage automatique après 30 secondes d\'inactivité.',
        example:
            '✅ Bon mot de passe : T!g3r#2024 (long, mixte, unique)\n' +
            '❌ Mauvais : 0000, 1234, "monnom", date de naissance.\n' +
            '📱 Règle d\'or : Un mot de passe différent pour chaque application importante.',
        miniPractice:
            'Votre téléphone est-il verrouillé en ce moment ? Si vous utilisez "1234", c\'est urgent de le changer !',
        encouragement:
            'Excellent ! La sécurité commence par un bon mot de passe. Faites les exercices ! 🔐',
    },

    mobile_security_l2: {
        title: 'Reconnaître et Éviter les Arnaques 🎣',
        emoji: '🎣',
        teacherExplanation:
            'Les arnaqueurs sont très créatifs. Ils envoient de faux SMS, de faux e-mails ' +
            'et de faux appels pour vous voler vos informations. C\'est ce qu\'on appelle le "phishing" : ' +
            'ils font comme s\'ils étaient votre banque, Airtel ou MTN pour vous piéger. ' +
            'Signes d\'alerte : (1) Un message vous demande votre PIN ou mot de passe. ' +
            'JAMAIS une vraie banque ne demande cela. (2) Le message crée une urgence : ' +
            '"Vous avez gagné 500 000 FCFA ! Cliquez maintenant !" ' +
            '(3) Le numéro ou l\'adresse est bizarre ou inconnu. ' +
            'La règle simple : en cas de doute, ne répondez pas et appelez directement votre opérateur.',
        example:
            '🚨 FAUX SMS : "MTN: Votre compte sera bloqué. Envoyez votre PIN au 9999."\n' +
            '✅ Bonne réaction : Ignorez, supprimez, et appelez le service client MTN officiel.\n' +
            '📞 Vrai conseil : Les opérateurs ne demandent JAMAIS votre PIN par SMS.',
        miniPractice:
            'Avez-vous déjà reçu un message suspect ? Qu\'avez-vous fait ? À l\'avenir, vous saurez quoi faire.',
        encouragement:
            'Très bien ! Reconnaître une arnaque, c\'est déjà l\'éviter. En avant ! 🛡️',
    },

    mobile_security_l3: {
        title: 'Mobile Money en Sécurité 💸',
        emoji: '💸',
        teacherExplanation:
            'Le Mobile Money (comme MTN MoMo, Airtel Money, ou Moov Money) est pratique ' +
            'mais doit être utilisé avec précaution. Voici les règles essentielles : ' +
            '1. NE JAMAIS partager votre code secret Mobile Money — même avec un agent, un ami, ou votre famille. ' +
            '2. Vérifiez toujours le numéro du destinataire deux fois avant d\'envoyer de l\'argent. ' +
            '3. Utilisez uniquement des agents officiels affiliés à votre opérateur. ' +
            '4. Si vous perdez votre téléphone, bloquez immédiatement votre SIM en appelant votre opérateur. ' +
            '5. Méfiez-vous des "fausses confirmations" : un arnaqueur peut vous montrer une fausse capture d\'écran de paiement.',
        example:
            '✅ Avant d\'envoyer : Relisez le numéro. 0162345678 ≠ 0162354678 (chiffres inversés !)\n' +
            '🔒 Après une transaction : Vérifiez le SMS de confirmation de votre opérateur.\n' +
            '🚫 Arnaque courante : "J\'ai envoyé par erreur, renvoyez-moi." — Vérifiez votre solde D\'ABORD.',
        miniPractice:
            'La prochaine fois que vous faites un virement Mobile Money, lisez le numéro deux fois. Une habitude qui peut vous sauver !',
        encouragement:
            'Parfait ! Votre argent mobile mérite d\'être protégé. Faisons le dernier exercice ! 💪',
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// LESSON 1 EXERCISES — Mots de passe & verrouillage
// ─────────────────────────────────────────────────────────────────────────────

const lesson1Pool: Omit<Exercise, 'id'>[] = [
    {
        type: 'multiple_choice',
        question: 'Lequel de ces exemples est un mot de passe FORT ?',
        correctAnswer: 'K@2025!mboa',
        options: shuffleArray(['K@2025!mboa', '12345678', 'monnom', 'azerty']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Pourquoi faut-il éviter d\'utiliser sa date de naissance comme mot de passe ?',
        correctAnswer: 'Elle est facile à deviner par quelqu\'un qui vous connaît',
        options: shuffleArray([
            'Elle est facile à deviner par quelqu\'un qui vous connaît',
            'Elle est trop longue',
            'Elle contient des chiffres',
            'Il n\'y a aucun problème avec cela',
        ]),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Quelle est la meilleure pratique pour le verrouillage automatique du téléphone ?',
        correctAnswer: 'L\'activer après 30 secondes à 1 minute d\'inactivité',
        options: shuffleArray([
            'L\'activer après 30 secondes à 1 minute d\'inactivité',
            'Ne jamais activer le verrouillage automatique',
            'Le régler à 10 minutes',
            'Verrouiller manuellement seulement quand on y pense',
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Vous confiez votre téléphone à un ami pour passer un appel. Quelle est la bonne pratique ?',
        correctAnswer: 'Restez à proximité et reprenez le téléphone immédiatement après',
        options: shuffleArray([
            'Restez à proximité et reprenez le téléphone immédiatement après',
            'Donnez votre code PIN pour qu\'il puisse l\'utiliser librement',
            'Laissez-le seul avec le téléphone déverrouillé',
            'Ne jamais prêter votre téléphone même pour un appel urgent',
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Combien de mots de passe différents devriez-vous utiliser pour vos applications importantes (banque, e-mail, réseaux sociaux) ?',
        correctAnswer: 'Un mot de passe unique pour chaque application',
        options: shuffleArray([
            'Un mot de passe unique pour chaque application',
            'Le même mot de passe partout pour ne pas oublier',
            'Deux mots de passe maximum',
            'Aucun mot de passe si vous faites confiance à votre téléphone',
        ]),
        difficulty: 3,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// LESSON 2 EXERCISES — Arnaques & phishing
// ─────────────────────────────────────────────────────────────────────────────

const lesson2Pool: Omit<Exercise, 'id'>[] = [
    {
        type: 'multiple_choice',
        question: 'Vous recevez un SMS : "Votre compte MTN sera bloqué. Envoyez votre PIN au 9999." Que faites-vous ?',
        correctAnswer: 'Ignorez, supprimez le SMS et appelez directement le service client MTN',
        options: shuffleArray([
            'Ignorez, supprimez le SMS et appelez directement le service client MTN',
            'Envoyez votre PIN rapidement pour débloquer votre compte',
            'Transférez le SMS à vos amis pour les avertir',
            'Appelez le numéro 9999 pour vérifier',
        ]),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Qu\'est-ce que le "phishing" ?',
        correctAnswer: 'Une technique frauduleuse pour voler vos informations personnelles en se faisant passer pour une entité de confiance',
        options: shuffleArray([
            'Une technique frauduleuse pour voler vos informations personnelles en se faisant passer pour une entité de confiance',
            'Un type de virus informatique qui effface vos données',
            'Une mise à jour de sécurité pour votre téléphone',
            'Un réseau Wi-Fi gratuit et sécurisé',
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Lequel de ces messages est le plus suspect ?',
        correctAnswer: '"Félicitations ! Vous avez gagné 1 000 000 FCFA. Cliquez ici pour réclamer !"',
        options: shuffleArray([
            '"Félicitations ! Vous avez gagné 1 000 000 FCFA. Cliquez ici pour réclamer !"',
            '"Votre facture d\'eau du mois est disponible."',
            '"Le marché hebdomadaire est demain à 8h."',
            '"Votre rendez-vous médical est confirmé pour vendredi."',
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Un inconnu vous appelle en se présentant comme un agent de votre banque et demande votre code secret. Que faites-vous ?',
        correctAnswer: 'Raccrochez et rappelez directement votre banque via le numéro officiel',
        options: shuffleArray([
            'Raccrochez et rappelez directement votre banque via le numéro officiel',
            'Donnez le code car la banque a le droit de le demander',
            'Donnez un faux code pour tester si c\'est une arnaque',
            'Attendez pour voir si l\'appel était légitime',
        ]),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Parmi ces signes, lequel indique qu\'un message est probablement une arnaque ?',
        correctAnswer: 'Le message crée une urgence ("Agissez maintenant ou votre compte sera fermé !")',
        options: shuffleArray([
            'Le message crée une urgence ("Agissez maintenant ou votre compte sera fermé !")',
            'Le message est écrit en français correct',
            'Le message vient d\'un numéro que vous connaissez',
            'Le message contient une photo de produit',
        ]),
        difficulty: 3,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// LESSON 3 EXERCISES — Mobile Money en sécurité
// ─────────────────────────────────────────────────────────────────────────────

const lesson3Pool: Omit<Exercise, 'id'>[] = [
    {
        type: 'multiple_choice',
        question: 'Avant d\'envoyer de l\'argent via Mobile Money, quelle est la règle la plus importante ?',
        correctAnswer: 'Vérifier le numéro du destinataire deux fois',
        options: shuffleArray([
            'Vérifier le numéro du destinataire deux fois',
            'Envoyer rapidement pour ne pas perdre de temps',
            'Faire confiance à sa mémoire',
            'Envoyer d\'abord un petit montant pour voir si ça marche',
        ]),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Un ami vous dit : "J\'ai envoyé 5 000 FCFA sur votre numéro par erreur, pouvez-vous me les renvoyer ?" Que faites-vous ?',
        correctAnswer: 'Vérifiez d\'abord votre solde réel via l\'application. Si vous ne voyez aucune entrée, c\'est une arnaque.',
        options: shuffleArray([
            'Vérifiez d\'abord votre solde réel via l\'application. Si vous ne voyez aucune entrée, c\'est une arnaque.',
            'Renvoyez immédiatement 5 000 FCFA par politesse',
            'Attendez 24h et renvoyez si vous avez reçu',
            'Renvoyez la moitié pour être généreux',
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Votre téléphone est volé. Quelle est la PREMIÈRE chose à faire en urgence ?',
        correctAnswer: 'Appeler votre opérateur pour bloquer immédiatement votre SIM et compte Mobile Money',
        options: shuffleArray([
            'Appeler votre opérateur pour bloquer immédiatement votre SIM et compte Mobile Money',
            'Acheter un nouveau téléphone',
            'Attendre 48h pour voir si quelqu\'un le retrouve',
            'Poster sur Facebook pour retrouver le voleur',
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Votre code secret Mobile Money doit être partagé avec :',
        correctAnswer: 'Personne — jamais. Même pas un agent ou un membre de la famille.',
        options: shuffleArray([
            'Personne — jamais. Même pas un agent ou un membre de la famille.',
            'Uniquement votre conjoint(e)',
            'Les agents officiels de l\'opérateur en cas de problème',
            'Vos amis de confiance en cas d\'urgence',
        ]),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Comment reconnaître un agent Mobile Money officiel et de confiance ?',
        correctAnswer: 'Il porte un badge de l\'opérateur et travaille dans un point de vente agréé',
        options: shuffleArray([
            'Il porte un badge de l\'opérateur et travaille dans un point de vente agréé',
            'Il propose des bonus et des cashbacks non officiels',
            'Il accepte de faire les transactions sur le bord de la route',
            'Il vous demande votre code secret pour vérifier votre compte',
        ]),
        difficulty: 3,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// FINAL TEST — 10 questions couvrant les 3 leçons
// ─────────────────────────────────────────────────────────────────────────────

export const mobileSecurityFinalTest: Omit<Exercise, 'id'>[] = [
    // From L1 - Mots de passe
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q1 — Lequel est un MOT DE PASSE FORT ?',
        correctAnswer: 'X!9kP@mN2',
        options: shuffleArray(['X!9kP@mN2', '0000', 'monprénom', 'azerty123']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q2 — Combien de mots de passe différents faut-il utiliser pour banque et e-mail ?',
        correctAnswer: 'Deux mots de passe différents — un pour chaque',
        options: shuffleArray([
            'Deux mots de passe différents — un pour chaque',
            'Le même partout pour plus de simplicité',
            'Aucun, les empreintes suffisent',
            'Pas besoin de mot de passe sur le téléphone',
        ]),
        difficulty: 2,
    },
    // From L1 - Verrouillage
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q3 — Quand faut-il activer le verrouillage automatique du téléphone ?',
        correctAnswer: 'Toujours — activé après 30 secondes à 1 minute d\'inactivité',
        options: shuffleArray([
            'Toujours — activé après 30 secondes à 1 minute d\'inactivité',
            'Seulement la nuit',
            'Jamais, c\'est gênant',
            'Seulement quand vous sortez de chez vous',
        ]),
        difficulty: 1,
    },
    // From L2 - Phishing
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q4 — Un SMS vous demande votre PIN bancaire pour "vérifier votre compte". C\'est :',
        correctAnswer: 'Une arnaque — les banques ne demandent jamais votre PIN par SMS',
        options: shuffleArray([
            'Une arnaque — les banques ne demandent jamais votre PIN par SMS',
            'Une procédure normale de votre banque',
            'Un message de sécurité à suivre urgently',
            'Un test de la banque pour voir votre vigilance',
        ]),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q5 — Parmi ces actions, laquelle est la BONNE réaction face à un message suspect ?',
        correctAnswer: 'Ne pas cliquer, supprimer le message et contacter directement l\'opérateur',
        options: shuffleArray([
            'Ne pas cliquer, supprimer le message et contacter directement l\'opérateur',
            'Cliquer pour voir de quoi il s\'agit',
            'Partager le message avec des amis pour avoir leur avis',
            'Répondre pour demander des explications à l\'expéditeur',
        ]),
        difficulty: 2,
    },
    // From L2 - Signes d'arnaque
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q6 — Quel est le principal signe qu\'un message est une arnaque ?',
        correctAnswer: 'Il crée une urgence artificielle et demande une action immédiate',
        options: shuffleArray([
            'Il crée une urgence artificielle et demande une action immédiate',
            'Il est écrit en bonne orthographe',
            'Il vient d\'un numéro local',
            'Il propose des informations utiles',
        ]),
        difficulty: 2,
    },
    // From L3 - Mobile Money
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q7 — Avant d\'envoyer de l\'argent par Mobile Money, vous devez :',
        correctAnswer: 'Relire deux fois le numéro du destinataire',
        options: shuffleArray([
            'Relire deux fois le numéro du destinataire',
            'Faire confiance à votre mémoire',
            'Envoyer vite pour éviter les files d\'attente',
            'Confirmer avec votre opérateur avant chaque envoi',
        ]),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q8 — Quelqu\'un prétend avoir envoyé de l\'argent par erreur sur votre compte. Vous devez :',
        correctAnswer: 'Vérifier votre solde réel avant de renvoyer quoi que ce soit',
        options: shuffleArray([
            'Vérifier votre solde réel avant de renvoyer quoi que ce soit',
            'Renvoyer immédiatement par politesse',
            'Ignorer le message',
            'Bloquer leur numéro',
        ]),
        difficulty: 2,
    },
    // From L3 - SIM bloquée
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q9 — Votre téléphone Mobile Money est volé. La première action est :',
        correctAnswer: 'Appeler l\'opérateur pour bloquer la SIM et le compte Mobile Money',
        options: shuffleArray([
            'Appeler l\'opérateur pour bloquer la SIM et le compte Mobile Money',
            'Attendre de retrouver le téléphone avant tout',
            'Changer votre mot de passe depuis un autre appareil',
            'Poster sur les réseaux pour retrouver le voleur',
        ]),
        difficulty: 2,
    },
    // Synthèse générale
    {
        type: 'multiple_choice',
        question: 'TEST FINAL Q10 — Votre code PIN Mobile Money peut être partagé avec :',
        correctAnswer: 'Personne — c\'est confidentiel, même pour les agents officiels',
        options: shuffleArray([
            'Personne — c\'est confidentiel, même pour les agents officiels',
            'Les agents agréés de l\'opérateur',
            'Votre conjoint(e) ou famille proche',
            'Votre meilleur(e) ami(e) de confiance',
        ]),
        difficulty: 3,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// GENERATOR FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

const makeExercise = (template: Omit<Exercise, 'id'>, prefix: string): Exercise => ({
    ...template,
    id: `${prefix}_${Date.now()}_${Math.random()}`,
    options: shuffleArray(template.options ?? []),
});

export const generateMobileSecurity_L1 = (): Exercise =>
    makeExercise(lesson1Pool[Math.floor(Math.random() * lesson1Pool.length)], 'ms_l1');

export const generateMobileSecurity_L2 = (): Exercise =>
    makeExercise(lesson2Pool[Math.floor(Math.random() * lesson2Pool.length)], 'ms_l2');

export const generateMobileSecurity_L3 = (): Exercise =>
    makeExercise(lesson3Pool[Math.floor(Math.random() * lesson3Pool.length)], 'ms_l3');

export const generateMobileSecurityFinalTest = (): Exercise[] =>
    mobileSecurityFinalTest.map((t, i) => makeExercise(t, `ms_final_q${i + 1}`));

/** 
 * Combined generator: picks from all 3 lesson pools.
 * Used by the main adult exercise router.
 */
export const generateMobileSecurityCourse = (level: number): Exercise => {
    const allPools = [...lesson1Pool, ...lesson2Pool, ...lesson3Pool];
    const bracket = level <= 2 ? [1, 2] : level <= 3 ? [2, 3] : [3, 4];
    const filtered = allPools.filter(e => bracket.includes(e.difficulty));
    const pool = filtered.length > 0 ? filtered : allPools;
    return makeExercise(pool[Math.floor(Math.random() * pool.length)], 'ms_course');
};
