<script setup>
import { Slide } from 'vue3-burger-menu';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { ref } from 'vue';

const { push: routerPush } = useRouter();
const { user } = storeToRefs(useUserStore());
const props = defineProps({ title: String });

const loggedIn = ref(!!user);

watch(user, async (newUser) => {
    if (props.title) {
        return;
    }

    updateConnectionStatus(newUser);
});

const headerTitle = ref('Guest');

const loading = ref(false);
//TODO only displays certain elements if user is logged in

const logout = async function () {
    loading.value = true;
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
    }

    routerPush('/');
};

const goToTeamDashboard = function () {
    routerPush('/team-dashboard');
};

const goToRanking = function () {
    routerPush('/ranking');
};

const goToMatchs = function () {
    routerPush('/matchs');
};

const goToLogin = function () {
    routerPush('/login');
};

const goToSignup = function () {
    routerPush('/signup');
};

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
};

const updateConnectionStatus = async function (newUser) {
    if (newUser) {
        headerTitle.value = 'Team ' + (await fetchTeamName(newUser.id));
        loggedIn.value = true;
    } else {
        headerTitle.value = 'Guest';
        loggedIn.value = false;
    }
};

onMounted(async () => {
    await updateConnectionStatus(user.value);
});
</script>

<template Header>
    <Slide>
        <button v-if="loggedIn" @click="goToTeamDashboard">Team settings</button>
        <button @click="goToRanking">Ranking</button>
        <button v-if="loggedIn" @click="goToMatchs">Matchs</button>

        <button v-if="!loggedIn" @click="goToLogin">Login</button>
        <button v-if="!loggedIn" @click="goToSignup">Sign Up</button>

        <button v-if="loggedIn" :loading="loading" @click="logout">
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
