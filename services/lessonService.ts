// services/lessonService.ts
import { supabase } from '@/lib/supabase'

export const LessonService = {
    // CALL THIS AT THE END OF A LESSON
    async finishLesson(profileId: string, villageId: string, lessonId: string, score: number) {
        try {
            // 1. Record the lesson completion (to prevent duplicates)
            const { data: alreadyDone } = await supabase
                .from('lesson_progress')
                .select('*')
                .eq('profile_id', profileId)
                .eq('lesson_id', lessonId)
                .single();

            if (!alreadyDone) {
                // 2. Increment Profile Stats
                const { error } = await supabase.rpc('complete_lesson_stats', {
                    p_id: profileId,
                    v_id: villageId,
                    stars_to_add: score
                });

                // 3. Log the completion
                await supabase.from('lesson_progress').insert([{ profile_id: profileId, lesson_id: lessonId, score }]);

                if (error) throw error;
                return { success: true };
            }
            return { success: true, message: "Already earned stars for this" };
        } catch (error) {
            console.error("Grading failed:", error);
            return { success: false };
        }
    },

    // Atomic transaction for lesson completion
    async completeLessonTransaction(profileId: string, villageId: string, lessonId: string, score: number) {
        return await supabase.rpc('complete_lesson_transaction', {
            p_id: profileId,
            v_id: villageId,
            l_id: lessonId,
            stars_earned: score
        });
    }
}
