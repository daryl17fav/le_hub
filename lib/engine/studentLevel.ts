
export type SkillLevel = number;

export interface StudentProfile {
  id: string;
  name: string;
  village_id: string;
  skillLevels: Record<string, SkillLevel>;
  accuracyHistory: Record<string, number>;
  role?: string;
}

export interface Exercise {
  id: string;
  type: 'input' | 'choice' | 'drag' | 'reorder' | 'true_false' | 'multiple_choice';
  question: string;
  image?: string; // For image-based questions
  correctAnswer: string | number | boolean;
  options?: string[]; // For choice/reorder
  difficulty: number;
}
