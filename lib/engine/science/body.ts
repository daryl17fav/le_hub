import { Exercise, SkillLevel } from '../studentLevel';
import { shuffleArray } from './index';

/**
 * 🧠 MONDE VIVANT - CORPS HUMAIN
 * Questions sur le corps humain et la santé
 */

const bodyQuestions = [
    // Niveau 1 : Reconnaissance
    {
        question: "Combien avons-nous de bras ?",
        options: ["2", "4", "6", "8"],
        correctAnswer: "2",
        difficulty: 1,
        emoji: "💪",
        image: "/images/lessons/mains.jpg"
    },
    {
        question: "Avec quoi voyons-nous ?",
        options: ["Yeux", "Oreilles", "Nez", "Bouche"],
        correctAnswer: "Yeux",
        difficulty: 1,
        emoji: "👀",
        image: "/images/lessons/yeux.jpg"
    },
    {
        question: "Le cœur bat dans la poitrine.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 1,
        emoji: "❤️",
        image: "/images/lessons/coeur.jpg"
    },
    {
        question: "Combien avons-nous de jambes ?",
        options: ["2", "3", "5", "7"],
        correctAnswer: "2",
        difficulty: 1,
        emoji: "🦵"
    },
    // Niveau 2 : Fonctions
    {
        question: "À quoi sert le cœur ?",
        options: ["Pomper le sang", "Voir", "Entendre", "Sentir"],
        correctAnswer: "Pomper le sang",
        difficulty: 2,
        emoji: "💓"
    },
    {
        question: "Nous respirons avec les ___.",
        options: ["Poumons", "Mains", "Pieds", "Cheveux"],
        correctAnswer: "Poumons",
        difficulty: 2,
        emoji: "🫁"
    },
    {
        question: "Les dents servent à mâcher.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 1,
        emoji: "🦷",
        image: "/images/lessons/bouche.jpg"
    },
    {
        question: "Le cerveau contrôle le corps.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "🧠"
    },
    // Niveau 3 : Système
    {
        question: "Les os forment le ___.",
        options: ["Squelette", "Cœur", "Peau", "Muscle"],
        correctAnswer: "Squelette",
        difficulty: 3,
        emoji: "🦴",
        image: "/images/lessons/Squelette.jpg"
    },
    {
        question: "Combien de sens avons-nous ?",
        options: ["5", "3", "10", "7"],
        correctAnswer: "5",
        difficulty: 3,
        emoji: "🤚"
    },
    {
        question: "L'estomac digère la nourriture.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 3,
        emoji: "🍽️"
    },
    {
        question: "Les muscles nous permettent de ___.",
        options: ["Bouger", "Dormir", "Manger", "Parler"],
        correctAnswer: "Bouger",
        difficulty: 2,
        emoji: "💪"
    },
    // Niveau 4 : Santé
    {
        question: "Pourquoi faut-il se laver les mains ?",
        options: ["Pour tuer les microbes", "Pour jouer", "Pour dormir", "Pour courir"],
        correctAnswer: "Pour tuer les microbes",
        difficulty: 3,
        emoji: "🧼"
    },
    {
        question: "Le sport rend le corps ___.",
        options: ["Fort", "Faible", "Malade", "Triste"],
        correctAnswer: "Fort",
        difficulty: 2,
        emoji: "⚽",
        image: "/images/lessons/sport.jpg"
    },
    {
        question: "Il faut boire de l'eau chaque jour.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 1,
        emoji: "💧",
        image: "/images/lessons/eau.jpg"
    },
    {
        question: "Le sommeil est important pour le corps.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        difficulty: 2,
        emoji: "😴",
        image: "/images/lessons/sommeil.jpg"
    }
];

export const generateBodyExercise = (level: SkillLevel): Exercise => {
    const suitableQuestions = bodyQuestions.filter(
        q => q.difficulty <= level + 1 && q.difficulty >= Math.max(1, level - 1)
    );
    
    const pool = suitableQuestions.length > 0 ? suitableQuestions : bodyQuestions;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    
    // Shuffle options to randomize correct answer position
    const shuffledOptions = shuffleArray(selected.options);
    
    return {
        id: `science_body_${Date.now()}_${Math.random()}`,
        type: 'multiple_choice',
        question: `${selected.emoji} ${selected.question}`,
        correctAnswer: selected.correctAnswer,
        options: shuffledOptions,
        difficulty: selected.difficulty,
        image: selected.image
    };
};
