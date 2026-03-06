/**
 * Shared utility functions for exercise generators.
 * Kept in a separate file to avoid circular dependency between
 * exerciseGenerator.ts and the adult/science sub-modules.
 */

/**
 * Shuffle an array using Fisher-Yates algorithm.
 * Used to randomize answer choices.
 */
export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
