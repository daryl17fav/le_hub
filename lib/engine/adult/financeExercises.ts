
import { Exercise } from '../studentLevel';
import { shuffleArray } from '../utils';

/**
 * 💰 FINANCES PERSONNELLES - Exercises
 */

const financePool: Omit<Exercise, 'id'>[] = [
    {
        type: 'multiple_choice',
        question: 'Un budget, c\'est :',
        correctAnswer: 'Un plan de gestion de vos revenus et dépenses',
        options: shuffleArray(['Un plan de gestion de vos revenus et dépenses', 'Un compte bancaire spécial', 'Une liste de souhaits', 'Un emprunt à la banque']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Si vous gagnez 80 000 FCFA et dépensez 95 000 FCFA, vous êtes :',
        correctAnswer: 'En déficit — vous dépensez plus que vous ne gagnez',
        options: shuffleArray(['En déficit — vous dépensez plus que vous ne gagnez', 'En bonne situation financière', 'En équilibre parfait', 'En train d\'économiser']),
        difficulty: 1,
    },
    {
        type: 'multiple_choice',
        question: 'Quelle est la règle d\'épargne 50-30-20 ?',
        correctAnswer: '50% besoins essentiels, 30% loisirs, 20% épargne',
        options: shuffleArray(['50% besoins essentiels, 30% loisirs, 20% épargne', '50% épargne, 30% nourriture, 20% loisirs', '50% loyer, 30% épargne, 20% nourriture', '20% besoins, 30% luxes, 50% épargne']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'Pourquoi est-il dangereux d\'emprunter pour acheter des articles de luxe non essentiels ?',
        correctAnswer: 'Vous payez des intérêts et augmentez vos dettes sans créer de valeur',
        options: shuffleArray(['Vous payez des intérêts et augmentez vos dettes sans créer de valeur', 'C\'est toujours une bonne idée d\'emprunter', 'Les banques aiment prêter sans intérêts', 'Cela améliore votre crédit automatiquement']),
        difficulty: 2,
    },
    {
        type: 'multiple_choice',
        question: 'L\'objectif d\'un fonds d\'urgence est de :',
        correctAnswer: 'Couvrir 3 à 6 mois de dépenses en cas de perte d\'emploi ou d\'urgence',
        options: shuffleArray(['Couvrir 3 à 6 mois de dépenses en cas de perte d\'emploi ou d\'urgence', 'Financer vos vacances annuelles', 'Payer votre loyer chaque mois', 'Acheter un nouveau téléphone']),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Si vous investissez 10 000 FCFA à 10% d\'intérêt par an, combien aurez-vous après 1 an ?',
        correctAnswer: '11 000 FCFA',
        options: shuffleArray(['11 000 FCFA', '10 100 FCFA', '20 000 FCFA', '9 000 FCFA']),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'La différence entre un actif et un passif est :',
        correctAnswer: 'Un actif vous rapporte de l\'argent, un passif vous en coûte',
        options: shuffleArray(['Un actif vous rapporte de l\'argent, un passif vous en coûte', 'Un actif est toujours en cash, un passif est une dette', 'Il n\'y a aucune différence', 'Un passif est toujours meilleur qu\'un actif']),
        difficulty: 3,
    },
    {
        type: 'multiple_choice',
        question: 'Vous avez reçu un bonus de 50 000 FCFA. Quelle est la décision la plus intelligente ?',
        correctAnswer: 'Mettre une partie en épargne et investir une autre partie',
        options: shuffleArray(['Mettre une partie en épargne et investir une autre partie', 'Tout dépenser immédiatement pour vous faire plaisir', 'Prêter tout à des amis', 'Acheter uniquement des vêtements']),
        difficulty: 4,
    },
    {
        type: 'multiple_choice',
        question: 'Quel est le principal bénéfice d\'un compte d\'épargne par rapport à garder l\'argent chez soi ?',
        correctAnswer: 'L\'argent est sécurisé et génère des intérêts',
        options: shuffleArray(['L\'argent est sécurisé et génère des intérêts', 'Vous pouvez l\'accéder plus facilement à tout moment', 'Il n\'y a aucune différence', 'Garder l\'argent chez soi est plus sûr']),
        difficulty: 4,
    },
    {
        type: 'multiple_choice',
        question: 'Votre revenu mensuel est de 120 000 FCFA. Selon la règle 50-30-20, combien devriez-vous épargner ?',
        correctAnswer: '24 000 FCFA',
        options: shuffleArray(['24 000 FCFA', '60 000 FCFA', '36 000 FCFA', '12 000 FCFA']),
        difficulty: 4,
    },
];

export const generateFinanceExercise = (level: number): Exercise => {
    const bracket = level <= 2 ? [1, 2] : level <= 3 ? [2, 3] : [3, 4];
    const pool = financePool.filter(e => bracket.includes(e.difficulty));
    const source = pool.length > 0 ? pool : financePool;
    const template = source[Math.floor(Math.random() * source.length)];
    return {
        ...template,
        id: `finance_${Date.now()}_${Math.random()}`,
        options: shuffleArray(template.options ?? []),
    };
};
