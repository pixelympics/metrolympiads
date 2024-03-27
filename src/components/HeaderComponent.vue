<script setup>
import { Slide } from 'vue3-burger-menu';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import {ref} from 'vue';

const router = useRouter();
const { user } = storeToRefs(useUserStore());
const props = defineProps({title: String});

watch(user, async (newUser) => {
    if(props.title){
        return;
    }

    if(newUser) {
        headerTitle.value = 'Team ' + await fetchTeamName(newUser.id);
    } else{
        headerTitle.value = 'Guest';
    }
});



const headerTitle = ref('Guest');

const loading = ref(false);
//TODO only displays certain elements if user is logged in

const logout = async function logout() {
    loading.value = true;
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
    }

    router.push('/');
}

const fetchTeamName = async function fetchTeamName(teamId) {
    const { data, error } = await supabase
        .from('teams')
        .select('name')
        .eq('leader', teamId)
        .single();

    if (error) {
        console.error('Error fetching team name:', error);
    }

    return data.name;
}

</script>

<template Header>
    <Slide>
        <button v-on:click="router.push('/')">Home</button>
        <button :loading="loading" @click="logout">
            <span v-if="loading">...</span>
            <span v-else>Logout</span>
        </button>
    </Slide>

    <div class="flex justify-center">
        <h1 class="text-3xl m-5">{{ title ? title : headerTitle }}</h1>
    </div>
</template>

<!--<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>-->
