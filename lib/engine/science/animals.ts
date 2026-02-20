import { Exercise, SkillLevel } from '../studentLevel';
import { shuffleArray } from './index';

/**
 * 🐾 MONDE VIVANT - ANIMAUX
 * Questions sur les animaux pour les juniors
 */

const animalQuestions = [
    // Niveau 1 : Reconnaissance simple
    {
        question: "Quel animal vit dans la mer ?",
        options: ["Dauphin", "Chat", "Lion", "Chien"],
        correctAnswer: "Dauphin",
        difficulty: 1,
        emoji: "🌊"
    },
    {
        question: "Quel animal vole dans le ciel ?",
        options: ["Oiseau", "Chien", "Poisson", "Serpent"],
        correctAnswer: "Oiseau",
        difficulty: 1,
        emoji: "🦅"
    },
    {
        question: "Quel animal miaule ?",
        options: ["Chat", "Vache", "Chien", "Mouton"],
        correctAnswer: "Chat",
        difficulty: 1,
        emoji: "🐱"
    },
    {
        question: "Quel animal donne du lait ?",
        options: ["Vache", "Lion", "Oiseau", "Serpent"],
        correctAnswer: "Vache",
        difficulty: 1,
        emoji: "🥛"
    },
    // Niveau 2 : Compréhension
    {
        question: "Les poissons respirent sous l'eau.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🐠"
    },
    {
        question: "Tous les animaux peuvent voler.",
        options: ["Faux", "Vrai"],
        correctAnswer: "Faux",
        difficulty: 2,
        emoji: "🦋"
    },
    {
        question: "Le lion est le roi de la jungle.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🦁"
    },
    {
        question: "Les serpents ont des pattes.",
        options: ["Faux", "Vrai"],
        correctAnswer: "Faux",
        difficulty: 2,
        emoji: "🐍"
    },
    // Niveau 3 : Classification
    {
        question: "Lequel est un mammifère ?",
        options: ["Éléphant", "Poisson", "Oiseau", "Insecte"],
        correctAnswer: "Éléphant",
        difficulty: 3,
        emoji: "🐘"
    },
    {
        question: "Qui pond des œufs ?",
        options: ["Poule", "Vache", "Chien", "Chat"],
        correctAnswer: "Poule",
        difficulty: 3,
        emoji: "🥚"
    },
    {
        question: "Quel animal est un reptile ?",
        options: ["Crocodile", "Chat", "Oiseau", "Souris"],
        correctAnswer: "Crocodile",
        difficulty: 3,
        emoji: "🐊"
    },
    {
        question: "Les abeilles font du ___.",
        options: ["Miel", "Lait", "Beurre", "Pain"],
        correctAnswer: "Miel",
        difficulty: 2,
        emoji: "🐝"
    },
    // Niveau 4 : Habitat et comportement
    {
        question: "Où vit le pingouin ?",
        options: ["Antarctique", "Désert", "Forêt", "Savane"],
        correctAnswer: "Antarctique",
        difficulty: 4,
        emoji: "🐧"
    },
    {
        question: "Quel animal hiberne en hiver ?",
        options: ["Ours", "Girafe", "Zèbre", "Lion"],
        correctAnswer: "Ours",
        difficulty: 4,
        emoji: "🐻"
    },
    {
        question: "Le dauphin est un ___.",
        options: ["Mammifère", "Poisson", "Oiseau", "Reptile"],
        correctAnswer: "Mammifère",
        difficulty: 4,
        emoji: "🐬"
    }
];

export const generateAnimalExercise = (level: SkillLevel): Exercise => {
    // Filter questions by level (with some flexibility)
    const suitableQuestions = animalQuestions.filter(
        q => q.difficulty <= level + 1 && q.difficulty >= Math.max(1, level - 1)
    );
    
    const pool = suitableQuestions.length > 0 ? suitableQuestions : animalQuestions;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    
    // Shuffle options to randomize correct answer position
    const shuffledOptions = shuffleArray(selected.options);
    
    return {
        id: `science_animal_${Date.now()}_${Math.random()}`,
        type: 'multiple_choice',
        question: `${selected.emoji} ${selected.question}`,
        correctAnswer: selected.correctAnswer,
        options: shuffledOptions,
        difficulty: selected.difficulty
    };
};
