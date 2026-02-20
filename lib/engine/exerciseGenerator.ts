
import { Exercise, SkillLevel } from './studentLevel';
import { generateScienceExercise } from './science';

/**
 * Shuffle an array using Fisher-Yates algorithm
 * Used to randomize answer choices
 */
export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/**
 * Normalize a question for better duplicate detection
 * Removes emojis, extra spaces, and converts to lowercase
 */
const normalizeQuestion = (question: string): string => {
    return question
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Remove emojis
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim()
        .toLowerCase();
};

/**
 * Helper function to check if an exercise question already exists in the list
 * Uses normalized comparison to catch similar questions
 */
const isExerciseDuplicate = (exercise: Exercise, existingExercises: Exercise[]): boolean => {
    const normalizedQuestion = normalizeQuestion(exercise.question);
    
    return existingExercises.some(existing => {
        const existingNormalized = normalizeQuestion(existing.question);
        // Check both ID and normalized question
        return existing.id === exercise.id || existingNormalized === normalizedQuestion;
    });
};

/**
 * Generates an addition exercise based on the difficulty level.
 * @param level - The difficulty level (1+)
 * @returns An Exercise object
 */
export const generateAdditionExercise = (level: SkillLevel): Exercise => {
  const max = Math.min(level * 5, 20); // Cap at 20 for kids
  
  const a = Math.floor(Math.random() * max) + 1;
  const b = Math.floor(Math.random() * max) + 1;

  return {
    id: `math_add_${Date.now()}_${Math.random()}`,
    type: 'input',
    question: `${a} + ${b} = ?`,
    correctAnswer: a + b,
    difficulty: level
  };
};

/**
 * Generates a subtraction exercise (always positive results for kids)
 */
export const generateSubtractionExercise = (level: SkillLevel): Exercise => {
  const max = Math.min(level * 5, 20);
  
  const a = Math.floor(Math.random() * max) + 1;
  const b = Math.floor(Math.random() * a) + 1; // b always <= a for positive result

  return {
    id: `math_sub_${Date.now()}_${Math.random()}`,
    type: 'input',
    question: `${a} - ${b} = ?`,
    correctAnswer: a - b,
    difficulty: level
  };
};

/**
 * Generates a multiplication exercise (simple tables)
 */
export const generateMultiplicationExercise = (level: SkillLevel): Exercise => {
  const maxTable = Math.min(level + 2, 10); // Start with 2-3, max at 10
  
  const a = Math.floor(Math.random() * maxTable) + 1;
  const b = Math.floor(Math.random() * maxTable) + 1;

  return {
    id: `math_mul_${Date.now()}_${Math.random()}`,
    type: 'input',
    question: `${a} × ${b} = ?`,
    correctAnswer: a * b,
    difficulty: level
  };
};

/**
 * Generates a division exercise (always whole number results)
 */
export const generateDivisionExercise = (level: SkillLevel): Exercise => {
  // Keep numbers small (< 10) for kids
  const maxDivisor = Math.min(level + 1, 9); // Max 9
  
  const divisor = Math.floor(Math.random() * maxDivisor) + 1; // 1-9
  const quotient = Math.floor(Math.random() * 9) + 1; // 1-9
  const dividend = divisor * quotient; // Ensures whole number result and < 100

  return {
    id: `math_div_${Date.now()}_${Math.random()}`,
    type: 'input',
    question: `${dividend} ÷ ${divisor} = ?`,
    correctAnswer: quotient,
    difficulty: level
  };
};

/**
 * Generates an easy mixed math exercise for junior test mode
 * Rules:
 * - All numbers < 20
 * - Division: quotient < 20, divisor < 10
 * - No level dependency - always easy
 */
export const generateJuniorEasyExercise = (): Exercise => {
  const operations = ['add', 'sub', 'mul', 'div'];
  const randomOp = operations[Math.floor(Math.random() * operations.length)];

  const max = 19; // strictly < 20
  const min = 9; // strictly < 10

  switch (randomOp) {
    case 'add': {
      const a = Math.floor(Math.random() * max) + 1;
      const b = Math.floor(Math.random() * min) + 1;

      return {
        id: `junior_add_${Date.now()}_${Math.random()}`,
        type: 'input',
        question: `${a} + ${b} = ?`,
        correctAnswer: a + b,
        difficulty: 1
      };
    }

    case 'sub': {
      let a = Math.floor(Math.random() * max) + 1;
      let b = Math.floor(Math.random() * min) + 1;
      
      // Ensure a >= b to avoid negative results
      if (a < b) {
        [a, b] = [b, a]; // Swap if needed
      }

      return {
        id: `junior_sub_${Date.now()}_${Math.random()}`,
        type: 'input',
        question: `${a} - ${b} = ?`,
        correctAnswer: a - b,
        difficulty: 1
      };
    }

    case 'mul': {
      const a = Math.floor(Math.random() * min) + 1; // small tables
      const b = Math.floor(Math.random() * min) + 1;

      return {
        id: `junior_mul_${Date.now()}_${Math.random()}`,
        type: 'input',
        question: `${a} × ${b} = ?`,
        correctAnswer: a * b,
        difficulty: 1
      };
    }

    case 'div': {
        const divisor = Math.floor(Math.random() * min) + 1; // 1 → 9

        // quotient max pour que divisor × quotient < 20
        const maxQuotient = Math.floor(max / divisor);

        const quotient = Math.floor(Math.random() * maxQuotient) + 1;

        const dividend = divisor * quotient;

        return {
            id: `junior_div_${Date.now()}_${Math.random()}`,
            type: 'input',
            question: `${dividend} ÷ ${divisor} = ?`,
            correctAnswer: quotient,
            difficulty: 1
        };
    }


    default:
      return generateAdditionExercise(1);
  }
};

/**
 * Generates a random math exercise with mixed operations
 */
export const generateMixedMathExercise = (level: SkillLevel): Exercise => {
  const operations = [
    generateAdditionExercise,
    generateSubtractionExercise,
    generateMultiplicationExercise,
    generateDivisionExercise
  ];
  
  // For level 1, only addition and subtraction
  const availableOps = level === 1 
    ? [generateAdditionExercise, generateSubtractionExercise]
    : operations;
  
  const randomOp = availableOps[Math.floor(Math.random() * availableOps.length)];
  return randomOp(level);
};

// --- Reading Adventure Generators ---

/**
 * Level 1: Recognition (Letters & Case)
 */
const generateLevel1Exercise = (): Exercise => {
  const type = Math.random() > 0.5 ? 'find_letter' : 'match_case';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const target = letters[Math.floor(Math.random() * letters.length)];

  if (type === 'find_letter') {
    // Find the letter "A"
    const options = [target];
    while (options.length < 3) {
      const random = letters[Math.floor(Math.random() * letters.length)];
      if (!options.includes(random)) options.push(random);
    }
    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    return {
      id: `read_l1_${Date.now()}_${Math.random()}`,
      type: 'multiple_choice',
      question: `Quelle est la lettre "${target}" ?`,
      correctAnswer: target,
      options: options,
      difficulty: 1
    };
  } else {
    // Match Uppercase -> Lowercase
    const lowerTarget = target.toLowerCase();
    const options = [target];
    while (options.length < 3) {
        const random = letters[Math.floor(Math.random() * letters.length)];
        if (!options.includes(random)) options.push(random);
    }
    options.sort(() => Math.random() - 0.5);

    return {
        id: `read_l1_case_${Date.now()}_${Math.random()}`,
        type: 'multiple_choice',
        question: `Choisis la majuscule de "${lowerTarget}"`,
        correctAnswer: target,
        options: options,
        difficulty: 1
    };
  }
};

/**
 * Level 2: Words (First letter, Scrambled, Image Match)
 */
const generateLevel2Exercise = (): Exercise => {
    const types = ['first_letter', 'scrambled', 'image_match'];
    const type = types[Math.floor(Math.random() * types.length)];

    const wordsData = [
        { word: 'CHAT', emoji: '🐱' },
        { word: 'CHIEN', emoji: '🐶' },
        { word: 'LION', emoji: '🦁' },
        { word: 'TIGRE', emoji: '🐯' },
        { word: 'POULE', emoji: '🐔' },
        { word: 'VACHE', emoji: '🐮' },
        { word: 'POMME', emoji: '🍎' },
        { word: 'BANANE', emoji: '🍌' },
        { word: 'BALLON', emoji: '⚽' },
        { word: 'VÉLO', emoji: '🚲' }
    ];
    
    const item = wordsData[Math.floor(Math.random() * wordsData.length)];

    if (type === 'first_letter') {
        const firstLetter = item.word[0];
        const options = [firstLetter];
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        while (options.length < 3) {
            const random = alphabet[Math.floor(Math.random() * alphabet.length)];
            if (!options.includes(random)) options.push(random);
        }
        options.sort(() => Math.random() - 0.5);

        return {
            id: `read_l2_first_${Date.now()}`,
            type: 'multiple_choice',
            question: `${item.word} : Quelle est la première lettre ?`,
            correctAnswer: firstLetter,
            options: options,
            difficulty: 2
        };
    } else if (type === 'scrambled') {
        // Simple shuffle
        const scrambled = item.word.split('').sort(() => Math.random() - 0.5).join(' ');
        
        return {
            id: `read_l2_scrambled_${Date.now()}`,
            type: 'input',
            question: `Remets les lettres dans l'ordre : ${scrambled}`,
            correctAnswer: item.word,
            difficulty: 2
        };
    } else {
        // Image match
        const options = [item.word];
        while (options.length < 3) {
            const random = wordsData[Math.floor(Math.random() * wordsData.length)].word;
            if (!options.includes(random)) options.push(random);
        }
        options.sort(() => Math.random() - 0.5);

        return {
            id: `read_l2_image_${Date.now()}`,
            type: 'multiple_choice',
            question: item.emoji, // Show emoji as question
            correctAnswer: item.word,
            options: options,
            difficulty: 2
        };
    }
};

/**
 * Level 3: Simple Comprehension (Sentence Completion, True/False)
 */
const generateLevel3Exercise = (): Exercise => {
    const type = Math.random() > 0.5 ? 'completion' : 'true_false';

    if (type === 'completion') {
        const sentences = [
            { text: 'Le ___ miaule.', answer: 'CHAT', options: ['CHAT', 'CHIEN', 'OISEAU'] },
            { text: 'Le ___ aboie.', answer: 'CHIEN', options: ['CHAT', 'CHIEN', 'POISSON'] },
            { text: 'Le ciel est ___.', answer: 'BLEU', options: ['BLEU', 'VERT', 'ROUGE'] },
            { text: 'La banane est ___.', answer: 'JAUNE', options: ['JAUNE', 'ROSE', 'NOIRE'] },
            { text: 'L\'oiseau ___ dans le ciel.', answer: 'VOLE', options: ['VOLE', 'NAGE', 'MARCHE'] },
            { text: 'La vache mange de l\'___.', answer: 'HERBE', options: ['HERBE', 'EAU', 'PIERRE'] },
            { text: 'Le poisson vit dans l\'___.', answer: 'EAU', options: ['EAU', 'AIR', 'TERRE'] },
            { text: 'En hiver, il y a de la ___.', answer: 'NEIGE', options: ['NEIGE', 'PLUIE', 'SABLE'] },
            { text: 'Le feu est très ___.', answer: 'CHAUD', options: ['CHAUD', 'FROID', 'DOUX'] },
            { text: 'La tortue marche ___.', answer: 'LENTEMENT', options: ['LENTEMENT', 'VITE', 'FORT'] },
            { text: 'Le soleil brille le ___.', answer: 'JOUR', options: ['JOUR', 'NUIT', 'SOIR'] },
            { text: 'Je dors dans un ___.', answer: 'LIT', options: ['LIT', 'BAIN', 'SAC'] },
            { text: 'La voiture roule sur la ___.', answer: 'ROUTE', options: ['ROUTE', 'MER', 'LUNE'] }
        ];
        const item = sentences[Math.floor(Math.random() * sentences.length)];
        
        return {
            id: `read_l3_comp_${Date.now()}`,
            type: 'multiple_choice',
            question: item.text,
            correctAnswer: item.answer,
            options: item.options.sort(() => Math.random() - 0.5),
            difficulty: 3
        };
    } else {
        const statements = [
            { text: 'Un poisson peut voler.', answer: 'Faux' },
            { text: 'Le feu est chaud.', answer: 'Vrai' },
            { text: 'La glace est froide.', answer: 'Vrai' },
            { text: 'Une voiture a des roues.', answer: 'Vrai' },
            { text: 'Les chats ont des ailes.', answer: 'Faux' },
            { text: 'La neige est verte.', answer: 'Faux' },
            { text: 'Le soleil est froid.', answer: 'Faux' },
            { text: 'Les oiseaux ont des plumes.', answer: 'Vrai' },
            { text: 'On mange de la soupe avec une fourchette.', answer: 'Faux' },
            { text: 'La nuit, il fait sombre.', answer: 'Vrai' },
            { text: 'Un chien peut parler.', answer: 'Faux' },
            { text: 'L\'eau mouille.', answer: 'Vrai' }
        ];
        const item = statements[Math.floor(Math.random() * statements.length)];

        return {
            id: `read_l3_tf_${Date.now()}`,
            type: 'multiple_choice',
            question: item.text,
            correctAnswer: item.answer,
            options: ['Vrai', 'Faux'],
            difficulty: 3
        };
    }
};

/**
 * Level 4: Mini Comprehension
 */
const generateLevel4Exercise = (): Exercise => {
    const stories = [
        { 
            text: 'Le chat est noir. Il aime jouer.', 
            question: 'De quelle couleur est le chat ?', 
            answer: 'NOIR',
            options: ['NOIR', 'BLANC', 'ROUGE']
        },
        { 
            text: 'Maman mange une pomme rouge.', 
            question: 'Que mange Maman ?', 
            answer: 'POMME',
            options: ['POMME', 'BANANE', 'POIRE']
        },
        { 
            text: 'Le garçon joue au ballon.', 
            question: 'Avec quoi joue le garçon ?', 
            answer: 'BALLON',
            options: ['BALLON', 'CUBE', 'POUPÉE']
        },
        {
            text: 'Sophie va à l\'école en bus.',
            question: 'Comment Sophie va-t-elle à l\'école ?',
            answer: 'BUS',
            options: ['BUS', 'VÉLO', 'PIED']
        },
        {
            text: 'Le chien court après la balle.',
            question: 'Que fait le chien ?',
            answer: 'COURT',
            options: ['COURT', 'DORT', 'MANGE']
        },
        {
            text: 'Il pleut dehors. Je prends mon parapluie.',
            question: 'Quel temps fait-il ?',
            answer: 'PLUIE',
            options: ['PLUIE', 'SOLEIL', 'NEIGE']
        },
        {
            text: 'Léo aime la glace au chocolat.',
            question: 'Quel parfum Léo aime-t-il ?',
            answer: 'CHOCOLAT',
            options: ['CHOCOLAT', 'VANILLE', 'FRAISE']
        },
        {
            text: 'La petite fille dessine une fleur.',
            question: 'Que dessine la petite fille ?',
            answer: 'FLEUR',
            options: ['FLEUR', 'MAISON', 'SOLEIL']
        },
        {
            text: 'Papa prépare le dîner dans la cuisine.',
            question: 'Où est Papa ?',
            answer: 'CUISINE',
            options: ['CUISINE', 'SALON', 'JARDIN']
        },
        {
            text: 'Les oiseaux chantent le matin.',
            question: 'Quand les oiseaux chantent-ils ?',
            answer: 'MATIN',
            options: ['MATIN', 'SOIR', 'NUIT']
        }
    ];
    const story = stories[Math.floor(Math.random() * stories.length)];

    return {
        id: `read_l4_story_${Date.now()}`,
        type: 'multiple_choice',
        question: `${story.text}\n\n${story.question}`,
        correctAnswer: story.answer,
        options: story.options.sort(() => Math.random() - 0.5),
        difficulty: 4
    };
};

/**
 * Generates a reading exercise based on level
 */
export const generateReadingExercise = (level: SkillLevel): Exercise => {
    // Cap level at 4 for now
    const effectiveLevel = Math.min(Math.max(level, 1), 4);

    switch (effectiveLevel) {
        case 1: return generateLevel1Exercise();
        case 2: return generateLevel2Exercise();
        case 3: return generateLevel3Exercise();
        case 4: return generateLevel4Exercise();
        default: return generateLevel1Exercise();
    }
};

/**
 * Generate a unique exercise that doesn't duplicate existing ones
 * Tries up to 50 times to avoid infinite loops
 */
const generateUniqueExercise = (
    skill: string, 
    level: SkillLevel, 
    existingExercises: Exercise[],
    maxAttempts: number = 50
): Exercise => {
    let attempts = 0;
    let exercise: Exercise;
    
    do {
        switch (skill) {
            case 'math_addition':
                exercise = generateMixedMathExercise(level);
                break;
            
            case 'math_junior_test':
                exercise = generateJuniorEasyExercise();
                break;

            case 'reading_adventure':
                exercise = generateReadingExercise(level);
                break;
            
            case 'science_explorers':
                exercise = generateScienceExercise(level, 'mixed');
                break;
            
            default:
                exercise = generateMixedMathExercise(level);
                break;
        }
        
        attempts++;
        
        // If we've tried too many times, return the exercise anyway to avoid infinite loop
        if (attempts >= maxAttempts) {
            console.warn('Max attempts reached for unique exercise generation');
            break;
        }
    } while (isExerciseDuplicate(exercise, existingExercises));
    
    return exercise;
};

/**
 * Factory function to generate exercises based on skill type.
 */
export const generateExercise = (skill: string, level: SkillLevel): Exercise => {
    switch (skill) {
        case 'math_addition':
            return generateMixedMathExercise(level);
        
        case 'math_junior_test':
            return generateJuniorEasyExercise();

        case 'reading_adventure':
            return generateReadingExercise(level);
        
        case 'science_explorers':
            return generateScienceExercise(level, 'mixed');
        
        default:
             // Fallback to mixed math
            return generateMixedMathExercise(level);
    }
};

/**
 * Generate a session of unique exercises (no duplicates)
 * @param skill - The skill type
 * @param level - The difficulty level
 * @param count - Number of exercises to generate
 * @returns Array of unique exercises
 */
export const generateExerciseSession = (
    skill: string, 
    level: SkillLevel, 
    count: number = 10
): Exercise[] => {
    const exercises: Exercise[] = [];
    
    for (let i = 0; i < count; i++) {
        const exercise = generateUniqueExercise(skill, level, exercises);
        exercises.push(exercise);
    }
    
    return exercises;
};
