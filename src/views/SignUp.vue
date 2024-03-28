<script setup>
console.log('test');
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase.js';
import AccountForm from '@/components/AccountForm.vue';
import FormField from '@/components/FormField.vue';

const email = ref('');
const password = ref('');
const confpassword = ref('');

const { push: routerPush } = useRouter();

const onEmailChange = (value) => {
    email.value = value;
};

const onPasswordChange = (value) => {
    password.value = value;
};

const onConfirmPasswordChange = (value) => {
    confpassword.value = value;
};

const onSubmit = async () => {
    if (email.value === '' || password.value === '' || confpassword.value === '') {
        alert('Please fill in all fields');
        return;
    }
    if (password.value !== confpassword.value) {
        alert('Passwords do not match');
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
    });
    if (error) {
        alert(error.message);
    } else {
        routerPush('/team-dashboard');
    }
    return data;
};
</script>

<template>
    <div class="m-5 flex flex-col items-center gap-2">
        <h1 class="text-2xl justify-center font-bold mb-4">Create an account</h1>
        <AccountForm
            @submit="onSubmit"
            id="signup-form"
            submit-button-text="Sign up"
            caption="Sign up"
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

            <form-field
                @update:value="onConfirmPasswordChange"
                id="confpassword-input"
                label="Confirm password"
                name="confpassword"
                type="password"
                required
                :model-value="confpassword"
            />
        </AccountForm>

        <a href="/login" class="m-2 mt-3 italic hover:text-primary">
            You already have an account? Login here
        </a>
    </div>
</template>
