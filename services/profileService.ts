// services/profileService.ts
import { supabase } from '@/lib/supabase'

export const ProfileService = {
    // 1. Fetch all family profiles linked to a phone number
    async getFamilyProfiles(phone: string, signal?: AbortSignal) {
        // Bail immediately if the caller's effect has already been cleaned up
        if (signal?.aborted) return []

        const query = supabase
            .from('profiles')
            .select('*, villages(name)')
            .eq('account_id', phone)

        // Only attach the signal when one is provided
        const { data, error } = signal ? await query.abortSignal(signal) : await query

        if (error) throw error
        return (data || []) as unknown[]
    },

    // 2. Register a new profile (Shared Phone model)
    async registerProfile(phoneNumber: string, name: string, role: 'junior' | 'adult', villageId: string, avatarUrl?: string) {
        // Step 1: Ensure Account exists (Upsert)
        const { error: accError } = await supabase.from('accounts').upsert({ phone_number: phoneNumber })
        if (accError) {
            console.error('[ProfileService] Account sync failed:', {
                message: accError.message,
                code: accError.code,
                details: accError.details,
                hint: accError.hint,
            });
            throw accError;
        }

        // Validate villageId looks like a UUID before hitting the DB
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!villageId || !uuidRegex.test(villageId)) {
            const msg = `[ProfileService] Invalid village_id: "${villageId}" — must be a UUID. Check that the village select passes id not name.`;
            console.error(msg);
            throw new Error(msg);
        }

        // Step 2: Create the Profile
        const { data, error: profError } = await supabase
            .from('profiles')
            .insert([{
                account_id: phoneNumber,
                full_name: name,
                role: role,
                village_id: villageId
            }])
            .select()

        if (profError) {
            console.error('[ProfileService] Profile insertion failed:', {
                message: profError.message,
                code: profError.code,
                details: profError.details,
                hint: profError.hint,
            });
            throw profError;
        }
        
        if (!data || data.length === 0) {
            throw new Error("Le profil a été créé mais n'a pas pu être récupéré. Veuillez rafraîchir la page.");
        }

        return data[0]
    },

    // 3. Increment Points (Profile + Village)
    async addPoints(profileId: string, villageId: string, points: number) {
        // We update the individual profile
        const { error: pError } = await supabase.rpc('increment_profile_points', { row_id: profileId, val: points })
        // We update the village total
        const { error: vError } = await supabase.rpc('increment_village_points', { row_id: villageId, val: points })

        if (pError || vError) throw new Error("Leaderboard Sync Failed")
    },

    // 4. Get comprehensive profile stats
    async getProfileStats(profileId: string) {
        // Fetch profile stats directly from columns
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('points, streak, badges_count, lessons_finished')
            .eq('id', profileId)
            .single();

        if (error) throw error;

        return {
            points: profile.points || 0,
            streak: profile.streak || 0,
            badges_count: profile.badges_count || 0,
            lessons_finished: profile.lessons_finished || 0
        }
    }
}
