
import { Exercise } from '../studentLevel';
import { shuffleArray } from '../utils';

/**
 * 💻 BASES DU NUMÉRIQUE - Exercises
 */

const digitalLiteracyPool: Omit<Exercise, 'id'>[] = [
    {
        type: 'multiple_choice',
        question: 'Qu\'est-ce qu\'un navigateur web ?',
        correctAnswer: 'Un logiciel pour accéder à internet (ex: Chrome, Firefox)',
        options: shuffleArray(['Un logiciel pour accéder à internet (ex: Chrome, Firefox)', 'Un type de connexion internet', 'Un appareil physique', 'Un réseau social']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Que signifie "HTTPS" dans une adresse web ?',
        correctAnswer: 'La connexion est sécurisée et chiffrée',
        options: shuffleArray(['La connexion est sécurisée et chiffrée', 'Le site est gratuit', 'Le site est très populaire', 'La page est en cours de chargement']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Comment reconnaître une information fiable sur internet ?',
        correctAnswer: 'Elle est publiée sur un site officiel ou vérifiée par plusieurs sources sérieuses',
        options: shuffleArray([
            'Elle est publiée sur un site officiel ou vérifiée par plusieurs sources sérieuses',
            'Elle a beaucoup de "likes" sur les réseaux sociaux',
            'Un ami l\'a partagée sur WhatsApp',
            'Elle est écrite en gras'
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Que faire si vous recevez un email d\'un inconnu avec une pièce jointe ?',
        correctAnswer: 'Ne pas l\'ouvrir et supprimer l\'email',
        options: shuffleArray(['Ne pas l\'ouvrir et supprimer l\'email', 'L\'ouvrir immédiatement pour voir ce que c\'est', 'Le transmettre à tous vos contacts', 'Cliquer sur le lien pour gagner un prix']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Mobile Money est utile principalement pour :',
        correctAnswer: 'Envoyer et recevoir de l\'argent via son téléphone',
        options: shuffleArray(['Envoyer et recevoir de l\'argent via son téléphone', 'Recharger uniquement la batterie du téléphone', 'Stocker des photos', 'Jouer à des jeux en ligne']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Pourquoi est-il important de faire des sauvegardes de vos données importantes ?',
        correctAnswer: 'En cas de perte ou de panne du téléphone, vos données sont récupérables',
        options: shuffleArray([
            'En cas de perte ou de panne du téléphone, vos données sont récupérables',
            'Pour libérer de la mémoire immédiatement',
            'Pour partager vos données avec des inconnus',
            'Pour ralentir votre téléphone'
        ]),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Qu\'est-ce que le "cloud" ?',
        correctAnswer: 'Un espace de stockage en ligne accessible depuis n\'importe quel appareil',
        options: shuffleArray(['Un espace de stockage en ligne accessible depuis n\'importe quel appareil', 'Un type de réseau Wi-Fi', 'Un logiciel de traitement de texte', 'Le ciel numérique']),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Pour une vidéoconférence professionnelle (réunion en ligne), vous devez :',
        correctAnswer: 'Avoir un fond neutre, une bonne lumière et votre microphone fonctionnel',
        options: shuffleArray([
            'Avoir un fond neutre, une bonne lumière et votre microphone fonctionnel',
            'Vous connecter depuis un lieu bruyant',
            'Garder la caméra éteinte en permanence',
            'Utiliser uniquement votre téléphone avec une connexion lente'
        ]),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'La désinformation (fausses informations) en ligne peut causer :',
        correctAnswer: 'De la panique, des décisions incorrectes et des conflits communautaires',
        options: shuffleArray([
            'De la panique, des décisions incorrectes et des conflits communautaires',
            'Plus d\'amis sur les réseaux sociaux',
            'Une meilleure compréhension du monde',
            'Aucun problème — ce n\'est que des mots'
        ]),
        difficulty: 4,
    },
    {
        type: 'multiple_choice',
        question: 'Utiliser le même mot de passe pour votre email, votre banque et vos réseaux sociaux est :',
        correctAnswer: 'Très dangereux — si un compte est piraté, tous le sont',
        options: shuffleArray([
            'Très dangereux — si un compte est piraté, tous le sont',
            'Pratique et recommandé pour ne pas oublier',
            'La meilleure pratique de sécurité',
            'Acceptable si le mot de passe est long'
        ]),
        difficulty: 4,
    },
];

export const generateDigitalLiteracyExercise = (level: number): Exercise => {
    const bracket = level <= 2 ? [1, 2] : level <= 3 ? [2, 3] : [3, 4];
    const pool = digitalLiteracyPool.filter(e => bracket.includes(e.difficulty));
    const source = pool.length > 0 ? pool : digitalLiteracyPool;
    const template = source[Math.floor(Math.random() * source.length)];
    return {
        ...template,
        id: `digital_literacy_${Date.now()}_${Math.random()}`,
        options: shuffleArray(template.options ?? []),
    };
};
