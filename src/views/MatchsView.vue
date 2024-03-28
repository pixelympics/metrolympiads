<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import MatchItem from '@/components/MatchItem.vue';
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const { user } = storeToRefs(useUserStore());

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
        <h1 class="text-3xl m-5">Welcome</h1>

        <table class="table-auto">
            <thead>
                <tr>
                    <th></th>
                    <th class="px-4 py-2">Team 1</th>
                    <th class="px-4 py-2">Team 2</th>
                    <th class="px-4 py-2">Score</th>
                </tr>
            </thead>
            <tbody>
                <div v-for="match in MatchList" class="p-4" :key="match">
                    <MatchItem :match="match" />
                </div>
            </tbody>
        </table>

        <button
            @click="router.push('/create-match')"
            class="m-2 bg-indigo-500 text-white font-semibold p-2 rounded-md"
        >
            Create a match
        </button>
    </div>
</template>
