<script setup>
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { ref } from 'vue';
const { push: routerPush } = useRouter();
const { user } = storeToRefs(useUserStore());
const props = defineProps({ title: String });
const collapsed = ref(true);
const loggedIn = ref(!!user);
const goToTeamDashboard = function () {
    routerPush('/team-dashboard');
};

const goToRanking = function () {
    routerPush('/rankings');
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
const logout = async function () {
    loading.value = true;
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
    }

    routerPush('/');
};
const loggedInMenu = ref([
    {
        name: 'Team settings',
        icon: 'cogs',
        action: goToTeamDashboard,
    },
    {
        name: 'Logout',
        icon: 'sign-out-alt',
        action: logout,
    },])

const unloggedMenu = ref([
    {
        name: 'Login',
        icon: 'sign-in-alt',
        action: goToLogin,
    },
    {
        name: 'Sign Up',
        icon: 'user-plus',
        action: goToSignup,
    },])
const AlwaysMenu = ref([
    {
        name: 'Ranking',
        icon: 'chart-line',
        action: goToRanking
    },
    {
        name: 'Matchs',
        icon: 'futbol',
        action: goToMatchs,
    },]);


watch(user, async (newUser) => {
    if (props.title) {
        return;
    }

    updateConnectionStatus(newUser);
});

watch(loggedIn, (newLoggedIn) => {
    if (newLoggedIn) {
        menu.value = AlwaysMenu.value.concat(loggedInMenu.value);
    } else {
        menu.value = AlwaysMenu.value.concat(unloggedMenu.value);
    }
});

const headerTitle = ref('Guest');

const loading = ref(true);





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
        menu.value = AlwaysMenu.value.concat(loggedInMenu.value);
        headerTitle.value = 'Team ' + (await fetchTeamName(newUser.id));
        loggedIn.value = true;
    } else {
        menu.value = AlwaysMenu.value.concat(unloggedMenu.value);
        headerTitle.value = 'Guest';
        loggedIn.value = false;
    }
};
const menu = ref([
    {
        name: 'Home',
        icon: 'home',
        action: goToTeamDashboard
    },
    {
        name: 'Ranking',
        icon: 'chart-line',
        action: goToRanking
    },
    {
        name: 'Matchs',
        icon: 'futbol',
        action: goToMatchs,
    },
]);

onMounted(async () => {
    await updateConnectionStatus(user.value);
});
</script>

<template Header>
    <VueAwesomeSideBar 
    v-model:collapsed="collapsed"
    v-model:menu="menu"
    v-model:miniMenu="collapsed"
    closeOnClickOutSide
    dark
    @item-click="( (item) => {
        if (item.action) {
            item.action();
        } 
    })"
    
    />
    <div class="fixed">
        <img @click="collapsed=!collapsed" src="@/assets/burger.svg" alt="burger" class="w-20 h-20" />
    </div>
    <div class="flex justify-center">
        <h1 class="text-3xl m-5">{{ title ? title : headerTitle }}</h1>
    </div>
</template>
