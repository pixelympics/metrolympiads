<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import MatchItem from '@/components/MatchItem.vue';
import { supabase } from '@/lib/supabase'
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const { user } = storeToRefs(useUserStore())



const MatchList = ref([])

async function getMatchList () {
    const { data, error } = await supabase
    .from('matchs')
    .select('*, team1(name), team2(name)')

    if (error) {
        console.error('Error fetching messages:', error)
    }
    MatchList.value = data
}

onMounted(() => {
    getMatchList()
})


</script>

<template>
    <header-component />
    <div class="flex flex-col items-center">
        <h1 class="text-3xl m-5">Welcome</h1>

        <table  class="table-auto">
            <thead>
                    <tr>
                        <th></th>
                        <th class="px-4 py-2">Team 1</th>
                        <th class="px-4 py-2">Team 2</th>
                        <th class="px-4 py-2">Score</th>
                    </tr>
                </thead>
            <tbody>
                <div v-for="(match) in MatchList" class="p-4" :key="match">

                    <MatchItem match="match"/>
                
                </div>
            </tbody>
        </table>
    </div>
</template>
