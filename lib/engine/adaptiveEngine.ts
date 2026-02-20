
import { SkillLevel } from './studentLevel';

/**
 * Calculates the next level based on performance accuracy.
 * @param accuracy - The percentage of correct answers (0.0 to 1.0)
 * @param currentLevel - The current difficulty level
 * @returns The new difficulty level
 */
export const getNextLevel = (accuracy: number, currentLevel: SkillLevel): SkillLevel => {
  if (accuracy > 0.8) {
    return currentLevel + 1;
  }
  if (accuracy < 0.5) {
    return Math.max(1, currentLevel - 1);
  }
  return currentLevel;
};
