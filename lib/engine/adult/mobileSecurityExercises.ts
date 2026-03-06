
import { Exercise } from '../studentLevel';
import { shuffleArray } from '../utils';

/**
 * 📱 MOBILE SECURITY - Exercises
 *
 * Coverage (5-stage flow):
 * 1. Hear/See   - Concept recognition (what is a strong password?)
 * 2. Select     - Scenario-based multiple choice
 * 3. Action     - Identify risks in a situation
 * 4. Build      - Order steps to secure a phone
 * 5. Showdown   - Mixed challenge questions
 */

const mobileSecurityPool: Omit<Exercise, 'id'>[] = [

    // ── HEAR / SEE ──────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Qu\'est-ce qu\'un mot de passe fort ?',
        correctAnswer: 'Un mélange de lettres, chiffres et symboles',
        options: shuffleArray(['Un mélange de lettres, chiffres et symboles', 'Votre date de naissance', 'Le mot "password"', 'Votre prénom']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Laquelle de ces options est la meilleure pratique pour votre téléphone ?',
        correctAnswer: 'Activer le verrouillage automatique de l\'écran',
        options: shuffleArray(['Activer le verrouillage automatique de l\'écran', 'Ne jamais mettre de mot de passe', 'Partager votre PIN avec votre meilleur ami', 'Utiliser 0000 comme PIN']),
        difficulty: 1,
    },

    // ── SELECT ──────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Vous recevez un SMS vous demandant votre code PIN bancaire pour "vérifier votre compte". Que faites-vous ?',
        correctAnswer: 'Ignorez et signalez le message à votre banque',
        options: shuffleArray(['Ignorez et signalez le message à votre banque', 'Répondez avec votre code', 'Appelez le numéro dans le SMS', 'Envoyez votre code par WhatsApp']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Un ami vous demande de lui prêter votre téléphone déverrouillé pour "juste 1 minute". Quelle est la meilleure réaction ?',
        correctAnswer: 'Prêtez-le mais restez à côté et regardez ce qu\'il fait',
        options: shuffleArray(['Prêtez-le mais restez à côté et regardez ce qu\'il fait', 'Donnez-lui votre code PIN pour qu\'il l\'ouvre lui-même', 'Laissez-le seul avec votre téléphone', 'Refusez catégoriquement sans explication']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Parmi ces mots de passe, lequel est le plus sécurisé ?',
        correctAnswer: 'T!g3r#2024',
        options: shuffleArray(['T!g3r#2024', '12345678', 'mamanbebou', 'jean1990']),
        difficulty: 2,
    },

    // ── ACTION ──────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Votre téléphone a été volé. Quelle est la PREMIÈRE chose à faire ?',
        correctAnswer: 'Appeler votre opérateur pour bloquer la carte SIM',
        options: shuffleArray(['Appeler votre opérateur pour bloquer la carte SIM', 'Acheter un nouveau téléphone', 'Attendre que le voleur vous le rende', 'Poster sur les réseaux sociaux']),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Que signifie "phishing" dans le domaine de la cybersécurité ?',
        correctAnswer: 'Une arnaque pour voler vos informations personnelles',
        options: shuffleArray(['Une arnaque pour voler vos informations personnelles', 'Un type de virus informatique', 'Un réseau Wi-Fi public', 'Une mise à jour de sécurité']),
        difficulty: 3,
    },

    // ── BUILD ───────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Pour sécuriser un compte en ligne, vous devez d\'abord :',
        correctAnswer: 'Créer un mot de passe unique et fort',
        options: shuffleArray(['Créer un mot de passe unique et fort', 'Utiliser le même mot de passe partout pour ne pas oublier', 'Écrire votre mot de passe sur un bout de papier', 'Ne pas créer de compte du tout']),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'La double authentification (2FA) signifie :',
        correctAnswer: 'Confirmer votre identité avec un code envoyé sur votre téléphone en plus de votre mot de passe',
        options: shuffleArray([
            'Confirmer votre identité avec un code envoyé sur votre téléphone en plus de votre mot de passe',
            'Avoir deux mots de passe identiques',
            'Se connecter depuis deux appareils en même temps',
            'Partager votre compte avec un ami'
        ]),
        difficulty: 4,
    },

    // ── SHOWDOWN ─────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Utilisez-vous le Wi-Fi public d\'un café pour faire un virement bancaire. C\'est :',
        correctAnswer: 'Dangereux — évitez les transactions sensibles sur le Wi-Fi public',
        options: shuffleArray([
            'Dangereux — évitez les transactions sensibles sur le Wi-Fi public',
            'Totalement sûr si vous utilisez une application officielle',
            'Recommandé pour aller plus vite',
            'Sans risque si vous vous déconnectez après'
        ]),
        difficulty: 4,
    },
];

export const generateMobileSecurityExercise = (level: number): Exercise => {
    // Filter by difficulty bracket
    const bracket = level <= 2 ? [1, 2] : level <= 3 ? [2, 3] : [3, 4];
    const pool = mobileSecurityPool.filter(e => bracket.includes(e.difficulty));
    const source = pool.length > 0 ? pool : mobileSecurityPool;
    const template = source[Math.floor(Math.random() * source.length)];
    return {
        ...template,
        id: `mobile_security_${Date.now()}_${Math.random()}`,
        options: shuffleArray(template.options ?? []),
    };
};
