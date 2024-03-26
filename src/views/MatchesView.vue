<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
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

{{ console.log(user.value.id) }}

</script>

<template>
    <header-component />
    <div class="flex flex-col items-center">
        <h1 class="text-3xl m-5">Welcome</h1>

        
        <div v-for="(match) in MatchList" class="p-4" :key="match">

            
            <!--
                SLT VIC
                match c'est l'element entier, si tu veux l'utiliser faut faire match.id ou match.score_team1 par exemple
                jsp encore comment tu vas créer ton component donc je laisse ca ici
            -->
            
        </div>

    </div>
</template>
