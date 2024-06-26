import { supabase } from '@/lib/supabase';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('AuthVerification', () => {
    let user = supabase.auth.user();
    async function isAuthenticated() {
        if (user != null) {
            return true;
        } else {
            user = await supabase.auth.user();
            return user != null;
        }
    }
    async function getUser() {
        await isAuthenticated();
        return user;
    }
    return { isAuthenticated };
});
