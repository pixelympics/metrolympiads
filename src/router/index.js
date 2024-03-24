import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import SignUp from '@/views/SignUp.vue';
import store from '@/stores';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: 'login' }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUp
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: { name: 'home' }
        },
        {
            path: '/',
            beforeEnter: (to, from, next) => {
                if (store.getters['stores/AuthVerification/isAuthenticated']) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            }

        }
    ]
});

export default router;
