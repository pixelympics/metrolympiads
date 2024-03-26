<script setup>
import { ref } from 'vue';
import Header from '@/components/HeaderComponent.vue';
import FormField from '@/components/FormField.vue';
import TestIcon from '@/components/icons/IconTooling.vue';
import { supabase } from '@/lib/supabase';

const team = ref('');
const teamOnChange = (value) => {
    team.value = value;
};

const teamMembers = ref([]);
const teamMembersOnChange = (index, value) => {
    teamMembers.value[index].name = value;
};

let i = 1;

const addMember = () => {
    teamMembers.value.push({ id: i, name: '', modelValue: '' });
    i++;
    console.log(teamMembers.value);
};

const onSubmit = async () => {
    if (team.value === '') {
        alert('Please enter a team name');
        return;
    }

    // Collecte des noms des participants
    const participantNames = teamMembers.value.map((member) => member.name);

    console.log('Team Participants:', participantNames);

    try {
        const { data, error } = await supabase
            .from('teams')
            .update([
                {
                    name: team.value,
                    members: participantNames
                }
            ])
            .eq('leader', '88ac52af-ad16-4f3e-92a1-c3bda54e4190');

        if (error) {
            console.error('An error occurred:', error);
            alert(
                'An error occurred while updating the team. Please check the console for more details.'
            );
        } else {
            alert('Team created!');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        alert(
            'An unexpected error occurred while updating the team. Please check the console for more details.'
        );
    }
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
        <div
            class="ml-12 flex align-items items-center space-x-2"
            v-for="(member, index) in teamMembers"
            :key="member.id"
        >
            <FormField
                @update:value="(value) => teamMembersOnChange(index, value)"
                :id="member.id"
                :name="`member-${member.id}`"
                v-model="member.name"
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
        <div class="mb-4" v-if="teamMembers.length < 5">
            <button
                class="bg-indigo-500 text-white font-semibold p-2 rounded-md"
                @click="addMember"
            >
                Add a member
            </button>
        </div>
        <div v-if="teamMembers.length > 0" class="justify-center">
            <button class="bg-indigo-500 text-white font-semibold p-2 rounded-md" @click="onSubmit">
                Validate team ✓
            </button>
        </div>
    </div>
</template>
