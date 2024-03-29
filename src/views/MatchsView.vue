<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MatchCard from '@/components/MatchCard.vue';

const router = useRouter();

const MatchList = ref([]);

async function getMatchList() {
    const { data, error } = await supabase.from('matchs').select('*, team1(name), team2(name)');

    if (error) {
        console.error('Error fetching messages:', error);
    }

    console.log(data[0].team1.name);
    MatchList.value = data;
}

onMounted(async () => {
    getMatchList();
});
</script>

<template>
    <header-component />

    <div class="flex flex-col items-center">
        <h1 class="text-3xl m-5">Matchs</h1>

        <div v-for="match in MatchList" :key="match">
            <MatchCard :match="match" />
        </div>

        <button
            @click="router.push('/create-match')"
            class="m-2 mt-4 bg-indigo-500 text-white font-semibold p-2 rounded-md"
        >
            Create a match
        </button>
    </div>
</template>
