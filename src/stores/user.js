import { supabase } from '@/lib/supabaseClient';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref(supabase.auth.user());

    return {
        user
    };
});
