
import { Exercise } from '../studentLevel';
import { shuffleArray } from '../utils';

/**
 * 🌾 AGRICULTURE MODERNE - Exercises
 */

const agriPool: Omit<Exercise, 'id'>[] = [
    {
        type: 'multiple_choice',
        question: 'Qu\'est-ce que la rotation des cultures ?',
        correctAnswer: 'Changer les types de plantes cultivées chaque saison pour protéger le sol',
        options: shuffleArray(['Changer les types de plantes cultivées chaque saison pour protéger le sol', 'Arroser ses cultures en rotation chaque heure', 'Vendre ses récoltes dans des marchés différents', 'Utiliser plusieurs types d\'engrais en même temps']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Quel est le principal avantage de l\'irrigation goutte-à-goutte ?',
        correctAnswer: 'Elle économise l\'eau en l\'apportant directement aux racines',
        options: shuffleArray(['Elle économise l\'eau en l\'apportant directement aux racines', 'Elle arrose plus vite', 'Elle ne nécessite aucune installation', 'Elle utilise plus d\'eau pour mieux arroser']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Un sol fertile est caractérisé par :',
        correctAnswer: 'Une bonne teneur en matière organique et en éléments nutritifs',
        options: shuffleArray(['Une bonne teneur en matière organique et en éléments nutritifs', 'Une couleur uniquement rouge', 'L\'absence totale d\'eau', 'Sa dureté et sa compacité']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'L\'agriculture biologique évite principalement :',
        correctAnswer: 'Les pesticides et engrais chimiques de synthèse',
        options: shuffleArray(['Les pesticides et engrais chimiques de synthèse', 'L\'utilisation de l\'eau', 'Le travail manuel', 'La vente des produits']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Quelle technique permet de réduire l\'érosion des sols en pente ?',
        correctAnswer: 'Construire des terrasses ou planter des haies vives',
        options: shuffleArray(['Construire des terrasses ou planter des haies vives', 'Labourer dans le sens de la pente', 'Couper tous les arbres', 'Ne rien faire']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'La meilleure période pour semer dépend principalement de :',
        correctAnswer: 'La saison des pluies et le type de graine',
        options: shuffleArray(['La saison des pluies et le type de graine', 'La couleur du sol', 'Le jour de la semaine', 'La taille du champ uniquement']),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Un compost est :',
        correctAnswer: 'Un engrais naturel fabriqué à partir de déchets organiques décomposés',
        options: shuffleArray(['Un engrais naturel fabriqué à partir de déchets organiques décomposés', 'Un pesticide chimique puissant', 'Un type de semence améliorée', 'Une machine agricole']),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Pour vendre vos récoltes au meilleur prix, vous devriez :',
        correctAnswer: 'Connaître les prix du marché local et réduire les intermédiaires',
        options: shuffleArray(['Connaître les prix du marché local et réduire les intermédiaires', 'Vendre immédiatement après la récolte sans vérifier les prix', 'Toujours vendre au premier acheteur', 'Stocker sans limite jusqu\'à ce que les prix montent']),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'L\'agroforesterie consiste à :',
        correctAnswer: 'Combiner des arbres avec des cultures ou de l\'élevage sur une même parcelle',
        options: shuffleArray(['Combiner des arbres avec des cultures ou de l\'élevage sur une même parcelle', 'Couper les arbres pour faire plus de place aux cultures', 'N\'utiliser que des arbres fruitiers', 'Élever uniquement des animaux']),
        difficulty: 4,
    },
    {
        type: 'multiple_choice',
        question: 'L\'agriculture de précision utilise :',
        correctAnswer: 'Des technologies (drones, capteurs, GPS) pour optimiser les rendements',
        options: shuffleArray(['Des technologies (drones, capteurs, GPS) pour optimiser les rendements', 'Uniquement des outils traditionnels', 'Des animaux de trait uniquement', 'Des méthodes ancestrales sans données']),
        difficulty: 4,
    },
];

export const generateAgriExercise = (level: number): Exercise => {
    const bracket = level <= 2 ? [1, 2] : level <= 3 ? [2, 3] : [3, 4];
    const pool = agriPool.filter(e => bracket.includes(e.difficulty));
    const source = pool.length > 0 ? pool : agriPool;
    const template = source[Math.floor(Math.random() * source.length)];
    return {
        ...template,
        id: `agri_${Date.now()}_${Math.random()}`,
        options: shuffleArray(template.options ?? []),
    };
};
