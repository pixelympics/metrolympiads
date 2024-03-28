<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { supabase } from '@/lib/supabase'
import { onMounted, ref } from 'vue';



const MatchList = ref([]);
const leaderboard = ref([]);
let keys = ref([]);

async function getMatchList () {
    const { data, error } = await supabase
    .from('matchs')
    .select('*, team1(name), team2(name)')

    if (error) {
        console.error('Error fetching messages:', error)
    }
    MatchList.value = data
}

function getLeaderBoard(listeMatch){

    console.log("a")
    console.log(listeMatch)

    let scores = [];
    console.log("b")
    console.log(listeMatch.length)

    for(let i = 0; i < listeMatch.length; i++){

        if(!scores[listeMatch[i].team1.name]){
            scores[listeMatch[i].team1.name] = 0;
        }
        if(!scores[listeMatch[i].team2.name]){
            scores[listeMatch[i].team2.name] = 0;
        }

        if(listeMatch[i].team1_score > listeMatch[i].team2_score){
            scores[listeMatch[i].team1.name] += 3;
        }
        if(listeMatch[i].team1_score < listeMatch[i].team2_score){
            scores[listeMatch[i].team2.name] += 3;
        }
        if(listeMatch[i].team1_score == listeMatch[i].team2_score){
            scores[listeMatch[i].team1.name] += 1;
            scores[listeMatch[i].team2.name] += 1;
        }

    }


    leaderboard.value = scores
}

onMounted(async () => {
    await getMatchList()
    getLeaderBoard(MatchList.value)
    keys.value = Object.keys(leaderboard.value)
})




</script>

<template>
    <header-component />
    <div class="flex flex-col items-center">
        <h1 class="text-3xl m-5">Welcome</h1>

        <table  class="table-auto">
            <thead>
                    <tr>
                        <th class="px-4 py-2">Team name</th>
                        <th class="px-4 py-2">Points</th>
                    </tr>
                </thead>

            <tbody>
                <tr v-for="key in keys.sort()" class="p-4" :key="key">

                    <td class="px-4 py-2">{{ key }}</td>
                    <td class="px-4 py-2">{{ leaderboard[key] }}</td>
                
                </tr>
                
            </tbody>
        </table>
    </div>
</template>
