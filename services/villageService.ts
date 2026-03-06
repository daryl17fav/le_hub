// services/villageService.ts
import { supabase } from '@/lib/supabase'

export interface Village {
    id: string;
    name: string;
    total_points: number;
    student_count: number;
    map_x: number;
    map_y: number;
}

export const VillageService = {
    // 1. Fetch all villages ordered by points descending
    async getVillages() {
        const { data, error } = await supabase
            .from('villages')
            .select('*')
            .order('total_points', { ascending: false });

        if (error) throw error;
        return data as Village[];
    },

    // 2. Get the leading village
    async getLeadingVillage() {
        const { data, error } = await supabase
            .from('villages')
            .select('name, total_points')
            .order('total_points', { ascending: false })
            .limit(1)
            .single();

        if (error) return null;
        return data as { name: string; total_points: number };
    }
}
