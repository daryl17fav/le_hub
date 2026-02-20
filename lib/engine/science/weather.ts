import { Exercise, SkillLevel } from '../studentLevel';
import { shuffleArray } from './index';

/**
 * 🌦️ NATURE & LA TERRE - MÉTÉO
 * Questions sur la météo et les phénomènes naturels
 */

const weatherQuestions = [
    // Niveau 1 : Reconnaissance
    {
        question: "Que met-on quand il pleut ?",
        options: ["Parapluie", "Lunettes de soleil", "Short", "Gants"],
        correctAnswer: "Parapluie",
        difficulty: 1,
        emoji: "☔"
    },
    {
        question: "Quand fait-il chaud ?",
        options: ["En été", "En hiver", "La nuit", "Au pôle Nord"],
        correctAnswer: "En été",
        difficulty: 1,
        emoji: "☀️"
    },
    {
        question: "Qu'est-ce qui tombe du ciel en hiver ?",
        options: ["Neige", "Fleurs", "Poissons", "Étoiles"],
        correctAnswer: "Neige",
        difficulty: 1,
        emoji: "❄️"
    },
    {
        question: "Le soleil brille le jour.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 1,
        emoji: "🌞"
    },
    // Niveau 2 : Compréhension
    {
        question: "Les nuages sont faits d'___.",
        options: ["Eau", "Pierre", "Métal", "Bois"],
        correctAnswer: "Eau",
        difficulty: 2,
        emoji: "☁️"
    },
    {
        question: "L'arc-en-ciel apparaît après la pluie.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🌈"
    },
    {
        question: "Le vent peut déplacer des objets.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "💨"
    },
    {
        question: "En hiver, il fait ___.",
        options: ["Froid", "Chaud", "Tiède", "Très chaud"],
        correctAnswer: "Froid",
        difficulty: 1,
        emoji: "🥶"
    },
    // Niveau 3 : Phénomènes
    {
        question: "L'orage produit du tonnerre et des ___.",
        options: ["Éclairs", "Fleurs", "Oiseaux", "Jouets"],
        correctAnswer: "Éclairs",
        difficulty: 3,
        emoji: "⛈️"
    },
    {
        question: "Combien de saisons y a-t-il ?",
        options: ["4", "2", "10", "6"],
        correctAnswer: "4",
        difficulty: 3,
        emoji: "🍁"
    },
    {
        question: "Le brouillard cache la vue.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 3,
        emoji: "🌫️"
    },
    {
        question: "Les tornades tournent très vite.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 4,
        emoji: "🌪️"
    },
    // Niveau 4 : Climat
    {
        question: "Qu'est-ce qui mesure la température ?",
        options: ["Thermomètre", "Montre", "Balance", "Règle"],
        correctAnswer: "Thermomètre",
        difficulty: 4,
        emoji: "🌡️"
    },
    {
        question: "Le désert est un endroit très ___.",
        options: ["Sec", "Humide", "Froid", "Mouillé"],
        correctAnswer: "Sec",
        difficulty: 3,
        emoji: "🏜️"
    },
    {
        question: "La glace fond quand il fait chaud.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🧊"
    }
];

export const generateWeatherExercise = (level: SkillLevel): Exercise => {
    const suitableQuestions = weatherQuestions.filter(
        q => q.difficulty <= level + 1 && q.difficulty >= Math.max(1, level - 1)
    );
    
    const pool = suitableQuestions.length > 0 ? suitableQuestions : weatherQuestions;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    
    // Shuffle options to randomize correct answer position
    const shuffledOptions = shuffleArray(selected.options);
    
    return {
        id: `science_weather_${Date.now()}_${Math.random()}`,
        type: 'multiple_choice',
        question: `${selected.emoji} ${selected.question}`,
        correctAnswer: selected.correctAnswer,
        options: shuffledOptions,
        difficulty: selected.difficulty
    };
};
