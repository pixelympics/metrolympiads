<script setup>
console.log('test');
import Header from '@/components/HeaderComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';

const email = ref('');
const password = ref('');
const confpassword = ref('');

const { push: routerPush } = useRouter();

const onSubmit = async () => {
    if (
        password.value !== confpassword.value ||
        !email.value ||
        !password.value ||
        !confpassword.value
    ) {
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
        routerPush({ name: '' });
    }
    return data;
};
</script>

<template>
    <Header />
    <div class="h-full bg-background">
        <div class="flex justify-center items-center h-full">
            <div class="p-8 rounded-lg shadow-lg">
                <h1 class="text-2xl justify-center font-bold mb-4">Create an account</h1>
                <form @submit.prevent="onSubmit">
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-text">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-medium text-text"
                            >Password</label
                        >
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="confpassword" class="block text-sm font-medium text-text"
                            >Confirm password</label
                        >
                        <input
                            type="password"
                            id="confpassword"
                            name="confpassword"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div class="mb-4">
                        <button
                            type="submit"
                            class="w-full bg-indigo-500 text-white font-semibold p-2 rounded-md"
                        >
                            Let's goooooooooo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
