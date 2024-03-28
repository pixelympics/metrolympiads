<script setup>
const emit = defineEmits(['update:value']);

defineProps({
    id: String,
    label: String,
    name: String,
    list: Array,
    placeholder: {
        type: String,
        default: 'Select an option'
    },
    required: {
        type: Boolean,
        default: false
    },
    selected: String
});
</script>

<template>
    <div class="mb-4">
        <label :for="name" class="block text-sm font-medium text-text">
            {{ label }}
        </label>
        <select
            :id="id"
            :name="name"
            :value="selected"
            :required="required"
            @input="emit('update:value', $event.target.value)"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
            <option value="-1" :selected="selected === -1" disabled>{{ placeholder }}</option>
            <option
                v-for="(item, index) in list"
                :key="index"
                :value="index"
                :selected="selected === index"
            >
                {{ item }}
            </option>
        </select>
    </div>
</template>
