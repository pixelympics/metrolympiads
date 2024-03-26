<script setup>
import { ref } from 'vue';
import Header from '@/components/HeaderComponent.vue';
import FormField from '@/components/FormField.vue';
import TestIcon from '@/components/icons/IconTooling.vue';

const team = ref('');
const teamOnChange = (value) => {
    team.value = value;
};

const firstmember = ref('');
const firstMemberOnChange = (value) => {
    firstmember.value = value;
};

const teamMembers = ref([]);
const teamMembersOnChange = (value) => {
    teamMembers.value = value;
};

let i = 1;

const addMember = () => {
    teamMembers.value.push({ id: i, name: '', modelValue: '' });
    i++;
    console.log(teamMembers.value);
};

const onSubmit = () => {
    if (team.value === '') {
        alert('Please enter a team name');
        return;
    }
    if (firstmember.value === '') {
        alert('Please enter a first member');
        return;
    }
    console.log(teamMembers.value);
};

const deleteMember = (id) => {
    teamMembers.value = teamMembers.value.filter((member) => member.id !== id);
};
</script>

<template>
    <Header />
    <div class="flex flex-col items-center justify-center gap-2">
        <h1 class="text-3xl m-5">Manage your team!</h1>
        <FormField
            @update:value="teamOnChange"
            id="teamname"
            label="Team name :"
            name="teamname"
            type="text"
            required
            v-model="team"
        />
        <h1 class="text-3xl m-5">Team members</h1>
        <FormField
            @update:value="firstMemberOnChange"
            id="firstmember"
            name="firstmember"
            type="text"
            required
        />
        <div
            class="ml-12 flex align-items items-center space-x-2"
            v-for="member in teamMembers"
            :key="member.id"
        >
            <FormField
                :id="member.id"
                :name="`member-${member.id}`"
                :value="member.modelValue"
                type="text"
                required
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
        <div class="justify-center">
            <button class="bg-indigo-500 text-white font-semibold p-2 rounded-md" @click="onSubmit">
                Validate team ✓
            </button>
        </div>
    </div>
</template>
