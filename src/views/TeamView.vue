<script setup>
import { ref, watch } from 'vue';
import Header from '@/components/HeaderComponent.vue';
import FormField from '@/components/FormField.vue';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import router from '@/router';
const { user } = storeToRefs(useUserStore());

watch(user, async () => {
    const datas = await getDatasFromLeader(user.value?.id);
    if (datas[0].members !== null && teamMembers.value.length < 5) {
        teamMembers.value = [];
        datas[0].members.forEach((member) => {
            teamMembers.value.push({ id: i, name: member, modelValue: '' });
            i++;
        });
    }
    team.value = datas[0].name;
});

async function getDatasFromLeader(id) {
    const { data } = await supabase.from('teams').select('*').eq('leader', id);
    return data;
}

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
};

const onSubmit = async (id) => {
    if (team.value === '') {
        alert('Please enter a team name');
        return;
    }

    // Collecte des noms des participants
    const participantNames = teamMembers.value.map((member) => member.name);

    try {
        const { data, error } = await supabase
            .from('teams')
            .update([
                {
                    name: team.value,
                    members: participantNames
                }
            ])
            .eq('leader', id);

        if (error) {
            console.error('An error occurred:', error);
            alert(
                'An error occurred while updating the team. Please check the console for more details.'
            );
        } else {
            alert('Team created!');
            router.push('/login');
            return data;
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
        <div class="flex items-center">
            <h1 class="text-3xl m-5">Team members</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mt-1"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
            </svg>
        </div>

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
                class="bg-gray-500 hover:bg-gray-700 transition duration-300 text-white font-semibold p-2 mb-2 rounded-md"
                @click="deleteMember(member.id)"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2.515 10.674a1.875 1.875 0 0 0 0 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374ZM12.53 9.22a.75.75 0 1 0-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L15.31 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
                        clip-rule="evenodd"
                    />
                </svg>
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
            <button
                class="bg-indigo-500 text-white font-semibold p-2 rounded-md"
                @click="onSubmit(user.id)"
            >
                Validate team ✓
            </button>
        </div>
    </div>
</template>
