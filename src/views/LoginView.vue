<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';
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

const onEmailChange = (value) => {
    email.value = value;
};

const onPasswordChange = (value) => {
    password.value = value;
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
                @update:value="onEmailChange"
                id="email-input"
                label="Email"
                name="email"
                type="email"
                required
                :model-value="email"
            />

            <form-field
                @update:value="onPasswordChange"
                id="password-input"
                label="Password"
                name="password"
                type="password"
                required
                :model-value="password"
            />
        </account-form>

        <a href="/signup" class="m-2 mt-3 italic hover:text-primary">
            You don't have an account yet? Create one now!
        </a>

        <a href="/rankings" class="bg-indigo-500 text-white text-xl font-semibold m-2 mt-4 p-2 rounded-md">
            Guest access
        </a>
    </div>
</template>
