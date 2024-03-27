<script setup>
import { useUserStore } from '@/stores/user';
import { supabase } from '@/lib/supabase';

supabase.auth.onAuthStateChange(async (_, session) => {
    await useUserStore().fetchUserProfile(session?.user?.id);
});
</script>

<template>
    <RouterView />
</template>
