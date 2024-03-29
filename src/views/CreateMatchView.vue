<script setup>
import AccountForm from '@/components/AccountForm.vue';
import FormField from '@/components/FormField.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FormSelect from '@/components/FormSelect.vue';
import { onMounted, ref, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const { user } = storeToRefs(useUserStore());
const router = useRouter();

const userTeamId = ref('');
const userTeamName = ref('');
const opponentName = ref('opponent');

const time = ref('');

const teams = ref([]);
const teamNames = ref([]);
const selectedTeamIndex = ref('');

const sport = ref('');

const userTeamScore = ref('0');
const opponentScore = ref('0');

const fetchTeams = async (userId) => {
    await fetchUserTeam(userId);
    await fetchOtherTeams(userId);
};

const fetchUserTeam = async (userId) => {
    if (!userId) {
        return;
    }

    const { data, error } = await supabase
        .from('teams')
        .select('id, name')
        .eq('leader', userId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    console.log(data);

    userTeamName.value = data.name;
    userTeamId.value = data.id;
};

const fetchOtherTeams = async (userId) => {
    if (!userId) {
        return;
    }

    const { data, error } = await supabase.from('teams').select('id, name').neq('leader', userId);

    if (error) {
        console.error(error);
        return;
    }

    teams.value = data;
    teamNames.value = data.map((team) => team.name);
};

watch(selectedTeamIndex, (newValue) => {
    opponentName.value = 'opponent';
    if (newValue !== '') {
        opponentName.value = teamNames.value[newValue];
    }
});

const onSubmit = async () => {
    if (!user.value) {
        return;
    }

    console.table(teams.value);

    const { error } = await supabase.from('matchs').insert([
        {
            team1: userTeamId.value,
            team2: teams.value[selectedTeamIndex.value].id,
            sport: sport.value,
            time: time.value,
            team1_score: userTeamScore.value,
            team2_score: opponentScore.value
        }
    ]);

    if (error) {
        console.error(error);
        return;
    }

    router.push('/matchs');
};

onMounted(async () => {
    if (!user.value) {
        return;
    }
    fetchTeams(user.value.id);
});

watch(user, (newValue) => {
    if (!newValue) {
        return;
    }
    fetchTeams(newValue.id);
});
</script>

<template>
    <HeaderComponent />
    <div class="flex flex-col items-center">
        <h1 class="text-3xl m-5">Matchs</h1>
        <AccountForm submit-button-text="Create match" @submit="onSubmit">
            <FormField
                id="user-team"
                label="Your team"
                name="user-team"
                type="text"
                :model-value="userTeamName"
                read-only
            />
            <FormSelect
                id="team"
                label="Team"
                name="team"
                required
                :list="teamNames"
                :selected="selectedTeamIndex"
                placeholder="Select a team"
                @update:value="(value) => (selectedTeamIndex = value)"
            />
            <FormField
                id="sport"
                label="Sport"
                name="sport"
                required
                :model-value="sport"
                @update:value="(value) => (sport = value)"
            />
            <FormField
                id="time"
                label="Time"
                name="time"
                type="time"
                required
                :model-value="time"
                @update:value="(value) => (time = value)"
            />

            <div class="flex gap-5">
                <FormField
                    id="user-score"
                    :label="userTeamName"
                    name="user-score"
                    type="number"
                    required
                    :model-value="userTeamScore"
                    @update:value="(value) => (userTeamScore = value)"
                />
                <FormField
                    id="opponent-score"
                    :label="opponentName"
                    name="opponent-score"
                    type="number"
                    required
                    :model-value="opponentScore"
                    @update:value="(value) => (opponentScore = value)"
                />
            </div>
        </AccountForm>
    </div>
</template>
