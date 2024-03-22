<script setup>
import { useUserStore } from '@/stores/user';
import { supabase } from '@/lib/supabaseClient';

supabase.auth.onAuthStateChange((_, session) => {
    useUserStore().fetchUserProfile(session?.user?.id);
});
</script>

<template>
    <RouterView />
</template>
