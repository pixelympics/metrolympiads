<script setup>
defineProps({
    id: String,
    submitButtonText: String,
    caption: String
});

const emit = defineEmits(['submit']);
</script>

<template>
    <div class="m-1 h-full bg-white max-w-[300px]">
        <div class="flex justify-center items-center h-full">
            <div class="p-8 rounded-lg shadow-lg">
                <h1 class="text-2xl justify-center font-bold mb-4">{{ caption }}</h1>
                <form @submit.prevent="emit('submit')" id="{{ id }}">
                    <slot></slot>
                    <div class="mb-4">
                        <button
                            type="submit"
                            class="w-full bg-primary hover:bg-secondary transition duration-300 text-white font-semibold p-2 rounded-md"
                        >
                            {{ submitButtonText }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
