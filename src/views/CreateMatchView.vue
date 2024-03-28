<script setup>
import AccountForm from '@/components/AccountForm.vue';
import FormField from '@/components/FormField.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FormSelect from '@/components/FormSelect.vue';
import { ref, watch } from 'vue';

const teamName = ref('Hello World');
const opponentName = ref('opponent');

const date = ref('');

const teams = ref(['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5']);
const selectedTeamIndex = ref('-1');

const sports = ref(['Soccer', 'Basketball', 'Volleyball', 'Tennis', 'Baseball']);
const selectedSportIndex = ref('-1');

const yourScore = ref('0');
const opponentScore = ref('0');

watch(selectedTeamIndex, (newValue) => {
    opponentName.value = 'opponent';
    if (newValue !== '-1') {
        opponentName.value = teams.value[newValue];
    }
});

const onSubmit = () => {
    console.log('submit');
};
</script>

<template>
    <HeaderComponent />
    <div class="flex flex-col items-center">
        <h1 class="text-3xl m-5">Matchs</h1>
        <AccountForm caption="" submit-button-text="Create match" @submit="onSubmit">
            <FormField
                id="your-team"
                label="Your Team"
                name="your-team"
                type="text"
                :model-value="teamName"
                read-only
            />
            <FormSelect
                id="team-select"
                label="Team"
                name="team"
                required
                :list="teams"
                :selected="selectedTeamIndex"
                placeholder="Select a team"
                @update:value="(value) => (selectedTeamIndex = value)"
            />
            <FormSelect
                id="sport-select"
                label="Sport"
                name="sport"
                required
                :list="sports"
                :selected="selectedSportIndex"
                placeholder="Select a sport"
                @update:value="(value) => (selectedSportIndex = value)"
            />
            <FormField
                id="time-field"
                label="Time"
                name="time"
                type="time"
                required
                :model-value="date"
                @update:value="(value) => (date = value)"
            />

            <div class="flex gap-5">
                <FormField
                    id="your-score"
                    :label="teamName"
                    name="your-score"
                    type="number"
                    required
                    :model-value="yourScore"
                    @update:value="(value) => (yourScore = value)"
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
