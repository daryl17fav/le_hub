
import { Exercise } from '../studentLevel';
import { shuffleArray } from '../utils';

/**
 * 🏪 COMMERCE DIGITAL - Exercises
 *
 * Coverage (5-stage flow):
 * Understanding online selling, customer trust, product promotion,
 * safe transactions, and digital presence.
 */

const digitalCommercePool: Omit<Exercise, 'id'>[] = [

    // ── HEAR / SEE ──────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Quel est l\'avantage principal de vendre en ligne par rapport à une boutique physique ?',
        correctAnswer: 'Atteindre des clients même en dehors de votre quartier ou ville',
        options: shuffleArray(['Atteindre des clients même en dehors de votre quartier ou ville', 'Payer moins d\'impôts', 'Ne jamais avoir de problèmes de clients', 'Vendre uniquement à vos amis']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Parmi ces plateformes, laquelle est la plus adaptée pour vendre des produits localement en Afrique de l\'Ouest ?',
        correctAnswer: 'WhatsApp Business',
        options: shuffleArray(['WhatsApp Business', 'TikTok uniquement', 'Un site web complexe', 'Par courrier postal']),
        difficulty: 1,
    },

    // ── SELECT ──────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Un client sur WhatsApp vous demande votre prix et vous répond "trop cher". Quelle est la meilleure réponse ?',
        correctAnswer: 'Expliquez la qualité du produit et proposez un échange de valeur',
        options: shuffleArray([
            'Expliquez la qualité du produit et proposez un échange de valeur',
            'Insultez le client et clôturez la discussion',
            'Baissez immédiatement votre prix de moitié',
            'Ignorez le message'
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Pour convaincre un client en ligne, la première chose dont vous avez besoin est :',
        correctAnswer: 'Une photo de qualité de votre produit',
        options: shuffleArray(['Une photo de qualité de votre produit', 'Un logo coûteux', 'Un site web officiel', 'Des millions de followers']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Quelle information doit TOUJOURS figurer dans une annonce de vente en ligne ?',
        correctAnswer: 'Le prix, la description et un contact pour commander',
        options: shuffleArray([
            'Le prix, la description et un contact pour commander',
            'Uniquement une photo',
            'Le nom de votre concurrent',
            'Une vidéo de 10 minutes'
        ]),
        difficulty: 2,
    },

    // ── ACTION ──────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Un client veut payer, mais vous ne vous connaissez pas. Comment gérez-vous la transaction en sécurité ?',
        correctAnswer: 'Demandez un acompte par Mobile Money avant l\'envoi',
        options: shuffleArray([
            'Demandez un acompte par Mobile Money avant l\'envoi',
            'Envoyez le produit d\'abord, l\'argent suivra',
            'Demandez à un ami de payer à sa place',
            'Acceptez n\'importe quelle promesse de paiement'
        ]),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Pour développer votre clientèle en ligne, la stratégie la plus efficace et gratuite est :',
        correctAnswer: 'Demander à vos clients satisfaits de vous recommander',
        options: shuffleArray([
            'Demander à vos clients satisfaits de vous recommander',
            'Payer des publicités chères tous les jours',
            'Envoyer des messages non sollicités à des inconnus',
            'Copier les posts de vos concurrents'
        ]),
        difficulty: 3,
    },

    // ── BUILD ───────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Vous créez un catalogue de produits WhatsApp. Quel élément est le plus important pour chaque produit ?',
        correctAnswer: 'Nom, prix, photo et description courte',
        options: shuffleArray([
            'Nom, prix, photo et description courte',
            'Uniquement le prix',
            'La marque du produit et son lieu de fabrication',
            'Votre numéro de compte bancaire'
        ]),
        difficulty: 3,
    },

    // ── SHOWDOWN ─────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Un inconnu vous contacte disant être un "grand acheteur" et veut payer 3x votre prix normal, mais veut d\'abord vos coordonnées bancaires. C\'est :',
        correctAnswer: 'Une arnaque — ne donnez jamais vos coordonnées bancaires à un inconnu',
        options: shuffleArray([
            'Une arnaque — ne donnez jamais vos coordonnées bancaires à un inconnu',
            'Une excellente opportunité d\'affaires',
            'Un gros client fiable',
            'Normal pour les grosses commandes'
        ]),
        difficulty: 4,
    },
    {
        type: 'multiple_choice',
        question: 'Votre objectif mensuel de vente est 100 000 FCFA. Vous vendez un article à 5 000 FCFA. Combien d\'articles devez-vous vendre ?',
        correctAnswer: '20 articles',
        options: shuffleArray(['20 articles', '10 articles', '50 articles', '100 articles']),
        difficulty: 4,
    },
];

export const generateDigitalCommerceExercise = (level: number): Exercise => {
    const bracket = level <= 2 ? [1, 2] : level <= 3 ? [2, 3] : [3, 4];
    const pool = digitalCommercePool.filter(e => bracket.includes(e.difficulty));
    const source = pool.length > 0 ? pool : digitalCommercePool;
    const template = source[Math.floor(Math.random() * source.length)];
    return {
        ...template,
        id: `digital_commerce_${Date.now()}_${Math.random()}`,
        options: shuffleArray(template.options ?? []),
    };
};
