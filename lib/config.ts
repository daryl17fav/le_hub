/**
 * Backend Configuration for The Hub
 * 
 * Choose either Firebase or Supabase based on your needs.
 * Uncomment the relevant section below and add your credentials.
 */

// ============================================
// FIREBASE CONFIGURATION
// ============================================
// [REMOVED] Firebase has been removed from this project.
// Please use Supabase configuration below.


// ============================================
// SUPABASE CONFIGURATION
// ============================================
// Alternative option for backend
//
// Setup Instructions:
// 1. Create a Supabase project at https://supabase.com
// 2. Get your URL and anon key from Project Settings > API
// 3. Uncomment the code below and paste your credentials

// Single source of truth — import the singleton, do NOT call createClient again here
export { supabase } from '@/lib/supabase';

// ============================================
// FAMILY ACCOUNT STRUCTURE
// ============================================
// One phone number can have multiple profiles (family members)

export interface FamilyAccount {
    phoneNumber: string;
    verified: boolean;
    createdAt: Date;
}

export interface UserProfile {
    id: string;
    account_id: string;
    full_name: string;
    path: 'junior' | 'adult';
    village_id?: string;
    points: number;
    avatar_url: string;
    created_at: Date;
    // UI Helpers (mapped from DB or derived)
    village?: string;
    name?: string;
    type?: 'junior' | 'adult';
}

// Avatar color options
export const AVATAR_COLORS = [
    { bg: 'bg-purple-500', border: 'border-purple-600', name: 'Purple' },
    { bg: 'bg-orange-500', border: 'border-orange-600', name: 'Orange' },
    { bg: 'bg-blue-500', border: 'border-blue-600', name: 'Blue' },
    { bg: 'bg-green-500', border: 'border-green-600', name: 'Green' },
    { bg: 'bg-pink-500', border: 'border-pink-600', name: 'Pink' },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Logic moved to services/profileService.ts

// Placeholder export
export const config = {
    backend: 'none', // Change to 'firebase' or 'supabase'
};
