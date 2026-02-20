import { Exercise, SkillLevel } from '../studentLevel';
import { shuffleArray } from './index';

/**
 * 🌍 NATURE & LA TERRE - PLANÈTE TERRE
 * Questions sur la Terre et l'espace
 */

const earthQuestions = [
    // Niveau 1 : Reconnaissance
    {
        question: "Où vivons-nous ?",
        options: ["Terre", "Lune", "Soleil", "Mars"],
        correctAnswer: "Terre",
        difficulty: 1,
        emoji: "🌍"
    },
    {
        question: "Le soleil est une ___.",
        options: ["Étoile", "Planète", "Lune", "Comète"],
        correctAnswer: "Étoile",
        difficulty: 2,
        emoji: "⭐"
    },
    {
        question: "La Terre est ronde.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 1,
        emoji: "🌐"
    },
    {
        question: "La nuit, on voit la ___.",
        options: ["Lune", "Soleil", "Voiture"],
        correctAnswer: "Lune",
        difficulty: 1,
        emoji: "🌙"
    },
    // Niveau 2 : Géographie
    {
        question: "Qu'est-ce qu'un océan ?",
        options: ["Grande étendue d'eau", "Montagne", "Désert", "Forêt"],
        correctAnswer: "Grande étendue d'eau",
        difficulty: 2,
        emoji: "🌊"
    },
    {
        question: "Les montagnes sont très ___.",
        options: ["Hautes", "Plates", "Liquides", "Molles"],
        correctAnswer: "Hautes",
        difficulty: 1,
        emoji: "⛰️"
    },
    {
        question: "Un volcan peut cracher du ___.",
        options: ["Feu", "Lait", "Sable", "Lave"],
        correctAnswer: "Feu",
        difficulty: 2,
        emoji: "🌋"
    },
    {
        question: "Les rivières coulent vers la mer.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🏞️"
    },
    // Niveau 3 : Phénomènes
    {
        question: "Un tremblement de terre fait bouger le ___.",
        options: ["Sol", "Ciel", "Soleil", "Mer"],
        correctAnswer: "Sol",
        difficulty: 3,
        emoji: "🏚️"
    },
    {
        question: "L'eau de mer est ___.",
        options: ["Salée", "Sucrée", "Piquante", "Amère"],
        correctAnswer: "Salée",
        difficulty: 2,
        emoji: "🧂"
    },
    {
        question: "Les îles sont entourées d'eau.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 3,
        emoji: "🏝️"
    },
    {
        question: "Le pôle Nord est très ___.",
        options: ["Froid", "Chaud", "Sec", "Doux"],
        correctAnswer: "Froid",
        difficulty: 2,
        emoji: "🧊"
    },
    // Niveau 4 : Espace
    {
        question: "La Terre tourne autour du ___.",
        options: ["Soleil", "Lune", "Mars", "Jupiter"],
        correctAnswer: "Soleil",
        difficulty: 4,
        emoji: "☀️"
    },
    {
        question: "Combien de continents y a-t-il ?",
        options: ["7", "3", "12", "5"],
        correctAnswer: "7",
        difficulty: 4,
        emoji: "🗺️"
    },
    {
        question: "Les astronautes vont dans l'___.",
        options: ["Espace", "Océan", "Forêt", "Montagne"],
        correctAnswer: "Espace",
        difficulty: 3,
        emoji: "🚀"
    },
    {
        question: "Il y a de l'air sur la Lune.",
        options: ["Faux", "Vrai"],
        correctAnswer: "Faux",
        difficulty: 4,
        emoji: "🌕"
    }
];

export const generateEarthExercise = (level: SkillLevel): Exercise => {
    const suitableQuestions = earthQuestions.filter(
        q => q.difficulty <= level + 1 && q.difficulty >= Math.max(1, level - 1)
    );
    
    const pool = suitableQuestions.length > 0 ? suitableQuestions : earthQuestions;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    
    // Shuffle options to randomize correct answer position
    const shuffledOptions = shuffleArray(selected.options);
    
    return {
        id: `science_earth_${Date.now()}_${Math.random()}`,
        type: 'multiple_choice',
        question: `${selected.emoji} ${selected.question}`,
        correctAnswer: selected.correctAnswer,
        options: shuffledOptions,
        difficulty: selected.difficulty
    };
};
