import { Exercise, SkillLevel } from '../studentLevel';
import { shuffleArray } from './index';

/**
 * 🌱 MONDE VIVANT - PLANTES
 * Questions sur les plantes et la nature
 */

const plantQuestions = [
    // Niveau 1 : Reconnaissance
    {
        question: "De quoi une plante a-t-elle besoin pour pousser ?",
        options: ["Eau", "Téléphone", "Voiture", "Pierre"],
        correctAnswer: "Eau",
        difficulty: 1,
        emoji: "💧"
    },
    {
        question: "Quelle partie de la plante est sous terre ?",
        options: ["Racine", "Fleur", "Feuille", "Tige"],
        correctAnswer: "Racine",
        difficulty: 1,
        emoji: "🌿"
    },
    {
        question: "Les plantes ont besoin de soleil.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 1,
        emoji: "☀️"
    },
    {
        question: "Quel fruit pousse sur un arbre ?",
        options: ["Pomme", "Poisson", "Pierre", "Chaise"],
        correctAnswer: "Pomme",
        difficulty: 1,
        emoji: "🍎"
    },
    // Niveau 2 : Compréhension
    {
        question: "Les arbres donnent de l'oxygène.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🌳"
    },
    {
        question: "Une plante peut pousser sans eau.",
        options: ["Faux", "Vrai"],
        correctAnswer: "Faux",
        difficulty: 2,
        emoji: "🚫"
    },
    {
        question: "Les fleurs attirent les ___.",
        options: ["Abeilles", "Pierres", "Voitures", "Téléphones"],
        correctAnswer: "Abeilles",
        difficulty: 2,
        emoji: "🌸"
    },
    {
        question: "Quelle saison les feuilles tombent ?",
        options: ["Automne", "Été", "Printemps", "Hiver"],
        correctAnswer: "Automne",
        difficulty: 2,
        emoji: "🍂"
    },
    // Niveau 3 : Processus
    {
        question: "Comment les plantes fabriquent-elles leur nourriture ?",
        options: ["Avec le soleil", "En dormant", "En marchant", "En chantant"],
        correctAnswer: "Avec le soleil",
        difficulty: 3,
        emoji: "🌞"
    },
    {
        question: "Les graines deviennent des ___.",
        options: ["Plantes", "Animaux", "Pierres", "Nuages"],
        correctAnswer: "Plantes",
        difficulty: 3,
        emoji: "🌱"
    },
    {
        question: "La photosynthèse se fait dans les ___.",
        options: ["Feuilles", "Racines", "Tronc", "Fleurs"],
        correctAnswer: "Feuilles",
        difficulty: 4,
        emoji: "🍃"
    },
    {
        question: "Les plantes vertes contiennent de la ___.",
        options: ["Chlorophylle", "Viande", "Pierre", "Métal"],
        correctAnswer: "Chlorophylle",
        difficulty: 4,
        emoji: "💚"
    },
    // Niveau 4 : Écosystème
    {
        question: "Pourquoi les forêts sont importantes ?",
        options: ["Elles nettoient l'air", "Elles font du bruit", "Elles sont chaudes", "Elles sont rouges"],
        correctAnswer: "Elles nettoient l'air",
        difficulty: 4,
        emoji: "🌲"
    },
    {
        question: "Les cactus vivent dans le ___.",
        options: ["Désert", "Océan", "Pôle Nord", "Forêt"],
        correctAnswer: "Désert",
        difficulty: 3,
        emoji: "🌵"
    }
];

export const generatePlantExercise = (level: SkillLevel): Exercise => {
    const suitableQuestions = plantQuestions.filter(
        q => q.difficulty <= level + 1 && q.difficulty >= Math.max(1, level - 1)
    );
    
    const pool = suitableQuestions.length > 0 ? suitableQuestions : plantQuestions;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    
    // Shuffle options to randomize correct answer position
    const shuffledOptions = shuffleArray(selected.options);
    
    return {
        id: `science_plant_${Date.now()}_${Math.random()}`,
        type: 'multiple_choice',
        question: `${selected.emoji} ${selected.question}`,
        correctAnswer: selected.correctAnswer,
        options: shuffledOptions,
        difficulty: selected.difficulty
    };
};
