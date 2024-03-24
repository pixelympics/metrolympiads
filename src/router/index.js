import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import SignUp from '@/views/SignUp.vue';
import { supabase } from '@/lib/supabase';
import TestView from '@/views/TestView.vue';
import TeamView from '@/views/TeamView.vue';

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
            component: TestView,
            meta: { requiresAuth: true }
        },
        {
            path: '/create-team',
            name: 'create-team',
            component: TeamView
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
