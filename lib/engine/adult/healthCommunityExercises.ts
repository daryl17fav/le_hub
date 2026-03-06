
import { Exercise } from '../studentLevel';
import { shuffleArray } from '../utils';

/**
 * 🏥 SANTÉ & COMMUNAUTÉ - Exercises
 *
 * Coverage: Local health services, preventive care, community resources,
 * and understanding basic medical information.
 */

const healthCommunityPool: Omit<Exercise, 'id'>[] = [

    // ── HEAR / SEE ──────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Pour quelle raison est-il important de connaître le centre de santé le plus proche de chez vous ?',
        correctAnswer: 'Pour agir rapidement en cas d\'urgence médicale',
        options: shuffleArray(['Pour agir rapidement en cas d\'urgence médicale', 'Pour s\'y promener', 'Pour éviter de payer des impôts', 'Pour y rencontrer des amis']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'La prévention médicale signifie :',
        correctAnswer: 'Prendre des mesures pour éviter de tomber malade',
        options: shuffleArray(['Prendre des mesures pour éviter de tomber malade', 'Attendre d\'être malade pour aller chez le médecin', 'Prendre des médicaments sans ordonnance', 'Ignorer les signaux de son corps']),
        difficulty: 1,
    },

    // ── SELECT ──────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Vous vous sentez fiévreux depuis 3 jours. Quelle est la meilleure action ?',
        correctAnswer: 'Consulter un professionnel de santé',
        options: shuffleArray([
            'Consulter un professionnel de santé',
            'Ignorer et attendre que ça passe seul',
            'Prendre n\'importe quel médicament de la pharmacie sans ordonnance',
            'Boire beaucoup de café'
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Comment lire correctement une ordonnance médicale ?',
        correctAnswer: 'Demander au médecin ou au pharmacien d\'expliquer chaque médicament',
        options: shuffleArray([
            'Demander au médecin ou au pharmacien d\'expliquer chaque médicament',
            'Deviner vous-même la signification',
            'Ne pas la lire et prendre les médicaments au hasard',
            'Demander à un voisin non médecin'
        ]),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Quel est le rôle d\'un agent de santé communautaire ?',
        correctAnswer: 'Informer et orienter la population vers les services de santé locaux',
        options: shuffleArray([
            'Informer et orienter la population vers les services de santé locaux',
            'Vendre des médicaments de rue',
            'Remplacer complètement le médecin',
            'Gérer les finances de la communauté'
        ]),
        difficulty: 2,
    },

    // ── ACTION ──────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Face à une urgence médicale (quelqu\'un s\'évanouit), votre PREMIÈRE action est :',
        correctAnswer: 'Appeler les secours et ne pas déplacer la personne',
        options: shuffleArray([
            'Appeler les secours et ne pas déplacer la personne',
            'Donner de l\'eau immédiatement',
            'La secouer fortement pour la réveiller',
            'Attendre que ça passe'
        ]),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Pourquoi est-il important de terminer un traitement antibiotique, même si on se sent mieux avant la fin ?',
        correctAnswer: 'Pour éliminer complètement la bactérie et éviter une résistance',
        options: shuffleArray([
            'Pour éliminer complètement la bactérie et éviter une résistance',
            'Pour dépenser tout l\'argent dépensé en médicaments',
            'Ce n\'est pas nécessaire, arrêtez dès que vous vous sentez mieux',
            'Pour avoir plus de médicaments en réserve'
        ]),
        difficulty: 3,
    },

    // ── BUILD ───────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Quelles informations devez-vous toujours avoir en tête pour utiliser les services de santé locaux ?',
        correctAnswer: 'L\'adresse du centre de santé, son numéro et vos informations médicales de base',
        options: shuffleArray([
            'L\'adresse du centre de santé, son numéro et vos informations médicales de base',
            'Uniquement votre nom',
            'Le nom de votre médicament préféré',
            'L\'heure d\'ouverture d\'un seul docteur'
        ]),
        difficulty: 3,
    },

    // ── SHOWDOWN ─────────────────────────────────
    {
        type: 'multiple_choice',
        question: 'Quelle habitude quotidienne contribue le plus à la bonne santé communautaire ?',
        correctAnswer: 'Se laver régulièrement les mains avec du savon',
        options: shuffleArray([
            'Se laver régulièrement les mains avec du savon',
            'Boire des sodas chaque jour',
            'Éviter de manger des légumes',
            'Ne pas dormir suffisamment pour être plus productif'
        ]),
        difficulty: 4,
    },
    {
        type: 'multiple_choice',
        question: 'Un programme de vaccination protège :',
        correctAnswer: 'L\'individu ET la communauté entière grâce à l\'immunité collective',
        options: shuffleArray([
            'L\'individu ET la communauté entière grâce à l\'immunité collective',
            'Uniquement la personne vaccinée',
            'Personne, les vaccins sont inutiles',
            'Seulement les enfants'
        ]),
        difficulty: 4,
    },
];

export const generateHealthCommunityExercise = (level: number): Exercise => {
    const bracket = level <= 2 ? [1, 2] : level <= 3 ? [2, 3] : [3, 4];
    const pool = healthCommunityPool.filter(e => bracket.includes(e.difficulty));
    const source = pool.length > 0 ? pool : healthCommunityPool;
    const template = source[Math.floor(Math.random() * source.length)];
    return {
        ...template,
        id: `health_community_${Date.now()}_${Math.random()}`,
        options: shuffleArray(template.options ?? []),
    };
};
