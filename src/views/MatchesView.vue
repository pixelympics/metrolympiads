<script setup>
import { storeToRefs } from 'pinia'
import HeaderComponent from '@/components/HeaderComponent.vue';
import { supabase } from '@/lib/supabase'
import { ref } from 'vue';
const { user } = storeToRefs(useUserStore())



const MatchList = ref([])

const getMatchList = async () => {
    const { data, error } = await supabase
    .from('matchs')
    .select('*, teams:firstteam(team1, leader), teams:secondteam(team2, leader)')
    .where('')
    .order('created_at', {ascending: false})
    .limit(100)
    if (error) {
    console.error('Error fetching messages:', error)
    }
  messageList.value = data.reverse()
}

MatchList = getMatchList()

</script>

<template>
    <header-component />

    <div class="flex flex-col items-center">
        <h1 class="text-3xl m-5">Welcome</h1>

        

        <div v-for="(id, firstteam, secondteam, sport, time, team1_score, team2_score) in MatchList" class="p-4" :key="id">

            <div v-if="firstteam.leader == user.id || secondteam.leader == user.id">
                {{ team1, team2, sport, time, team1_score, team2_score }}
            </div>

            
        </div>

    </div>
</template>
