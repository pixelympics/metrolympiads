<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient';
import AccountForm from '@/components/AccountForm.vue';
import FormField from '@/components/FormField.vue';

const { push: routerPush } = useRouter();

const email = ref('');
const password = ref('');

const onSubmit = async () => {
    if (!email.value || !password.value) {
        return;
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    if (error) {
        alert(error.message);
    } else {
        routerPush('/team-dashboard');
    }
};
</script>

<template>
    <div class="flex flex-col items-center gap-2">
        <h1 class="text-3xl m-5">METROLYMPIADES</h1>
        <account-form
            @submit="onSubmit"
            id="login - form"
            submit-button-text="Get me in"
            caption="Login"
        >
            <form-field
                id="email-input"
                label="Email"
                name="email"
                type="email"
                required
                v-model="email"
            />

            <form-field
                id="password-input"
                label="Password"
                name="password"
                type="password"
                required
                v-model="password"
            />
        </account-form>
    </div>
</template>
