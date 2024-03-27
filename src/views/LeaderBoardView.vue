<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { supabase } from '@/lib/supabase'
import { onMounted, ref } from 'vue';



const MatchList = ref([]);
const leaderboard = ref([]);

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


    let scores;
    console.log(listeMatch.value)
    console.log([])

    for(let i = 0; i < typeof(listeMatch.value.length); i++){
        if(!scores[listeMatch.value[i].team1.name]){
            console.log(scores)
            scores[listeMatch.value[i].team1.name] = 0;
        }
        if(!scores[listeMatch.value[i].team2.name]){
            console.log(scores)
            scores[listeMatch.value[i].team2.name] = 0;
        }

        if(listeMatch.value[i].team1_score > listeMatch.value[i].team2_score){
            scores[listeMatch.value[i].team1.name] += 3;
        }
        if(listeMatch.value[i].team1_score < listeMatch.value[i].team2_score){
            scores[listeMatch.value[i].team2.name] += 3;
        }
        if(listeMatch.value[i].team1_score == listeMatch.value[i].team2_score){
            scores[listeMatch.value[i].team1.name] += 1;
            scores[listeMatch.value[i].team2.name] += 1;
        }

    }
    leaderboard.value = scores;
}

onMounted(async () => {
    await getMatchList()
    getLeaderBoard(MatchList)
    console.log(leaderboard)
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
                        <th class="px-4 py-2">Team name</th>
                        <th class="px-4 py-2">Points</th>
                    </tr>
                </thead>

                {{ leaderboard }}

            <tbody>
                <!-- <div v-for="(teams) in leaderboard.keys()" class="p-4" :key="teams">

                    {{ teams }}
                    {{ leaderboard[teams] }}
                
                </div> -->
            </tbody>
        </table>
    </div>
</template>
