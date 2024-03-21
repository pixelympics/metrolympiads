<script setup></script>

<template>
    <div class="flex flex-col items-center gap-2">
        <h1 class="text-3xl m-5">METROLYMPIADES</h1>

        <h2 class="text-2xl m-2">Login</h2>

        <div class="border-2 border-black bg-secondary p-5">
            <form @submit.prevent="onSubmit" class="flex flex-col items-center gap-2">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email" required />

                <label for="password">Password</label>
                <input type="password" name="password" v-model="password" required />

                <button type="submit" class="bg-primary text-background p-2 rounded-md">
                    Login
                </button>
            </form>
        </div>
    </div>
</template>
