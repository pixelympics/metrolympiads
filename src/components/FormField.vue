<script setup>
const emit = defineEmits(['update:value']);

defineProps({
    id: String,
    label: String,
    name: String,
    type: String,
    required: {
        type: Boolean,
        default: false
    },
    modelValue: [String, Number]
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
            :value="value"
            :required="required"
            @input="emit('update:value', $event.target.value)"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
</template>
