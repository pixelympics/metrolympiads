<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import Header from '@/components/HeaderComponent.vue';
import FormField from '@/components/FormField.vue';
import TestIcon from '@/components/icons/IconCommunity.vue';

const team = ref('');
const teamMembers = ref([]);
let i = 0;

const addMember = () => {
    teamMembers.value.push({ id: i, name: '', value: '' });
    i++;
    console.log(teamMembers.value);
};

const deleteMember = (id) => {
    teamMembers.value = teamMembers.value.filter((member) => member.id !== id);
};
</script>

<template>
    <Header />
    <div class="flex flex-col items-center gap-2">
        <h1 class="text-3xl m-5">Create your team !</h1>
        <FormField
            id="teamname"
            label="Team name :"
            name="teamname"
            type="text"
            required
            v-model="team"
        />
        <h1 class="text-3xl m-5">Team members</h1>
        <FormField id="firstmember" name="firstmember" type="text" required />
        <div
            class="flex align-items items-center space-x-2"
            v-for="member in teamMembers"
            :key="member.id"
        >
            <FormField
                :id="member.id"
                :name="`member-${member.id}`"
                type="text"
                required
                v-model="member.name"
            />
            <button
                class="bg-gray-500 text-white font-semibold p-2 rounded-md"
                @click="deleteMember(member.id)"
            >
                <TestIcon />
            </button>
        </div>
        <div class="mb-4" v-if="teamMembers.length < 4">
            <button
                class="bg-indigo-500 text-white font-semibold p-2 rounded-md"
                @click="addMember"
            >
                Add a member
            </button>
        </div>
    </div>
</template>
