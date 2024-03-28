<script setup>
const emit = defineEmits(['update:value']);

const props = defineProps({
    member: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="mb-4">
        <label :for="name" class="block text-sm font-medium text-text">
            {{ label }}
        </label>
        <input
            :type="type"
            :id="id"
            :name="name"
            :value="modelValue"
            :required="required"
            @input="emit('update:value', $event.target.value)"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
</template>
