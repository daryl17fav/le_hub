import { Exercise, SkillLevel } from '../studentLevel';
import { shuffleArray } from '../utils';
import { generateAnimalExercise } from './animals';
import { generatePlantExercise } from './plants';
import { generateWeatherExercise } from './weather';
import { generateBodyExercise } from './body';
import { generateMatterExercise } from './matter';
import { generateEarthExercise } from './earth';

/**
 * 🧪 EXPLORATEUR SCIENTIFIQUE - MODULE PRINCIPAL
 * 
 * Structure des thèmes :
 * 
 * 🌍 MONDE VIVANT
 *   - Animaux
 *   - Plantes
 *   - Corps humain
 * 
 * 🌦️ NATURE & LA TERRE
 *   - Météo
 *   - Planète Terre
 * 
 * ⚙️ SCIENCES SIMPLES
 *   - Matière & Forces
 */

export type ScienceTheme = 
    | 'animals'      // 🐾 Animaux
    | 'plants'       // 🌱 Plantes
    | 'body'         // 🧠 Corps humain
    | 'weather'      // 🌦️ Météo
    | 'earth'        // 🌍 Planète Terre
    | 'matter'       // ⚙️ Matière & Forces
    | 'mixed';       // 🔀 Mélange de tout

// Export shuffleArray for use in submodules
export { shuffleArray };

/**
 * Generate a science exercise based on theme and level
 * @param level - Difficulty level (1-4)
 * @param theme - Specific theme or 'mixed' for random
 */
export const generateScienceExercise = (
    level: SkillLevel,
    theme: ScienceTheme = 'mixed'
): Exercise => {
    // If mixed, randomly select a theme
    if (theme === 'mixed') {
        const themes: ScienceTheme[] = ['animals', 'plants', 'body', 'weather', 'earth', 'matter'];
        theme = themes[Math.floor(Math.random() * themes.length)];
    }

    // Generate exercise based on selected theme
    switch (theme) {
        case 'animals':
            return generateAnimalExercise(level);
        
        case 'plants':
            return generatePlantExercise(level);
        
        case 'body':
            return generateBodyExercise(level);
        
        case 'weather':
            return generateWeatherExercise(level);
        
        case 'earth':
            return generateEarthExercise(level);
        
        case 'matter':
            return generateMatterExercise(level);
        
        default:
            return generateAnimalExercise(level);
    }
};

/**
 * Get the emoji icon for a theme
 */
export const getThemeEmoji = (theme: ScienceTheme): string => {
    const emojiMap: Record<ScienceTheme, string> = {
        animals: '🐾',
        plants: '🌱',
        body: '🧠',
        weather: '🌦️',
        earth: '🌍',
        matter: '⚙️',
        mixed: '🔬'
    };
    return emojiMap[theme];
};

/**
 * Get the French name for a theme
 */
export const getThemeName = (theme: ScienceTheme): string => {
    const nameMap: Record<ScienceTheme, string> = {
        animals: 'Animaux',
        plants: 'Plantes',
        body: 'Corps Humain',
        weather: 'Météo',
        earth: 'Planète Terre',
        matter: 'Matière & Forces',
        mixed: 'Exploration Mixte'
    };
    return nameMap[theme];
};
