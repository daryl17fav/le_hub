import { Exercise, SkillLevel } from '../studentLevel';
import { shuffleArray } from './index';

/**
 * ⚙️ SCIENCES SIMPLES - MATIÈRE & FORCES
 * Questions sur les états de la matière et forces simples
 */

const matterQuestions = [
    // Niveau 1 : États de base
    {
        question: "L'eau peut être liquide.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 1,
        emoji: "💧"
    },
    {
        question: "La glace est de l'eau ___.",
        options: ["Solide", "Liquide", "Gazeuse", "Dure"],
        correctAnswer: "Solide",
        difficulty: 1,
        emoji: "🧊"
    },
    {
        question: "La vapeur est de l'eau ___.",
        options: ["Gazeuse", "Solide", "Froide", "Chaude"],
        correctAnswer: "Gazeuse",
        difficulty: 2,
        emoji: "💨"
    },
    {
        question: "Le feu est chaud.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 1,
        emoji: "🔥"
    },
    // Niveau 2 : Propriétés
    {
        question: "Un ballon rempli d'air est ___.",
        options: ["Léger", "Lourd", "Dur", "Mou"],
        correctAnswer: "Léger",
        difficulty: 2,
        emoji: "🎈"
    },
    {
        question: "Une pierre coule dans l'eau.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🪨"
    },
    {
        question: "Le bois flotte sur l'eau.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🪵"
    },
    {
        question: "L'aimant attire le ___.",
        options: ["Fer", "Bois", "Plastique", "Papier"],
        correctAnswer: "Fer",
        difficulty: 3,
        emoji: "🧲"
    },
    // Niveau 3 : Transformations
    {
        question: "Quand l'eau gèle, elle devient ___.",
        options: ["Glace", "Vapeur", "Sable", "Fumée"],
        correctAnswer: "Glace",
        difficulty: 3,
        emoji: "❄️"
    },
    {
        question: "Le soleil peut faire fondre la glace.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "☀️"
    },
    {
        question: "L'eau chaude produit de la ___.",
        options: ["Vapeur", "Glace", "Pierre", "Fumée"],
        correctAnswer: "Vapeur",
        difficulty: 3,
        emoji: "♨️"
    },
    {
        question: "Le métal conduit l'électricité.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 4,
        emoji: "⚡"
    },
    // Niveau 4 : Forces
    {
        question: "La gravité fait tomber les objets.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 4,
        emoji: "🍎"
    },
    {
        question: "Un objet lourd tombe plus ___ qu'un plume.",
        options: ["Vite", "Lent", "Haut", "Bas"],
        correctAnswer: "Vite",
        difficulty: 3,
        emoji: "🪶"
    },
    {
        question: "Le miroir réfléchit la ___.",
        options: ["Lumière", "Eau", "Pierre", "Son"],
        correctAnswer: "Lumière",
        difficulty: 3,
        emoji: "🪞"
    },
    {
        question: "L'ombre se forme quand la lumière est bloquée.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🌑"
    }
];

export const generateMatterExercise = (level: SkillLevel): Exercise => {
    const suitableQuestions = matterQuestions.filter(
        q => q.difficulty <= level + 1 && q.difficulty >= Math.max(1, level - 1)
    );
    
    const pool = suitableQuestions.length > 0 ? suitableQuestions : matterQuestions;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    
    // Shuffle options to randomize correct answer position
    const shuffledOptions = shuffleArray(selected.options);
    
    return {
        id: `science_matter_${Date.now()}_${Math.random()}`,
        type: 'multiple_choice',
        question: `${selected.emoji} ${selected.question}`,
        correctAnswer: selected.correctAnswer,
        options: shuffledOptions,
        difficulty: selected.difficulty
    };
};
