<script setup>
import { Slide } from 'vue3-burger-menu';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
const router = useRouter();

const loading = ref(false);
//TODO only displays certain elements if user is logged in

async function logout() {
    loading.value = true;
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
    }

    router.push('/');
}
</script>

<template Header>
    <Slide>
        <span v-on:click="router.push('/')">Home</span>
        <button @click="router.push('/scoreboard')">scoreboard</button>
        <button :loading="loading" @click="logout">
            <span v-if="loading">...</span>
            <span v-else>Logout</span>
        </button>
    </Slide>
</template>

<!--<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>-->
