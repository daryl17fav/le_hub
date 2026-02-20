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

        // If the signal fired while waiting, treat it as a clean no-op
        if (signal?.aborted) return []
        if (error) throw error
        return data // Returns Array: [ {name: "Musa", role: "junior", ...}, {name: "Papa", ...} ]
    },

    // 2. Register a new profile (Shared Phone model)
    async registerProfile(phoneNumber: string, name: string, role: 'junior' | 'adult', villageId: string) {
        // Step 1: Ensure Account exists (Upsert)
        await supabase.from('accounts').upsert({ phone_number: phoneNumber })

        // Step 2: Create the Profile
        const { data, error } = await supabase
            .from('profiles')
            .insert([{
                account_id: phoneNumber,
                full_name: name,
                role: role,
                village_id: villageId
            }])
            .select()

        if (error) throw error
        return data[0]
    },

    // 3. Increment Points (Profile + Village)
    async addPoints(profileId: string, villageId: string, points: number) {
        // We update the individual profile
        const { error: pError } = await supabase.rpc('increment_profile_points', { row_id: profileId, val: points })
        // We update the village total
        const { error: vError } = await supabase.rpc('increment_village_points', { row_id: villageId, val: points })

        if (pError || vError) throw new Error("Leaderboard Sync Failed")
    }
}
