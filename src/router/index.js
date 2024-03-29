import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import SignUp from '@/views/SignUp.vue';
import { supabase } from '@/lib/supabase';
import TeamView from '@/views/TeamView.vue';
//import Scoreboard from '@/views/ScoreboardView.vue';
import CreateMatchView from '@/views/CreateMatchView.vue';
import Rankings from '@/views/RankingsView.vue';
import MatchsView from '@/views/MatchsView.vue';

const isLoggedIn = async () => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            beforeEnter: async (to, from, next) => {
                if (await isLoggedIn()) {
                    next({ name: 'team-dashboard' });
                    return;
                }
                next({ name: 'login' });
            }
        },
        {
            path: '/rankings',
            name: 'ranginks',
            component: Rankings
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            beforeEnter: async (to, from, next) => {
                if (await isLoggedIn()) {
                    next({ name: 'team-dashboard' });
                    return;
                }
                next();
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUp
        },
        {
            path: '/team-dashboard',
            name: 'team-dashboard',
            component: TeamView,
            meta: { requiresAuth: true }
        },
        {
            path: '/matchs',
            name: 'matchs',
            component: MatchsView,
            meta: { requiresAuth: true }
        },
        {
            path: '/create-match',
            name: 'create-match',
            component: CreateMatchView,
            meta: { requiresAuth: true }
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: { name: 'home' }
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    const logged = await isLoggedIn();

    // Redirect to login if not authenticated
    if (requiresAuth && !logged) {
        next({ name: 'login' });
        return;
    }

    next();
});

export default router;
