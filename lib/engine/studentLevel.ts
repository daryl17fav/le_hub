
export type SkillLevel = number;

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  skillLevels: Record<string, SkillLevel>;
  accuracyHistory: Record<string, number>;
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
