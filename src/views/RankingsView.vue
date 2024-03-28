<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import HeaderComponent from '@/components/HeaderComponent.vue'
const scores = ref([])



onMounted(async () => {
    const { data, error } = await supabase
    .rpc('score', { vic_pts: 3,def_pts: 0, eq_pts: 1})

    if (error) {
        console.error('Error fetching messages:', error)
    }
    scores.value = data
})


</script>


<template>
    <HeaderComponent />
    <div class="flex flex-col items-center">
    <table  class="table-auto">
            <thead>
                    <tr>
                        <th>Rank</th>
                        <th class="px-4 py-2">Team name</th>
                        <th class="px-4 py-2">Points</th>
                    </tr>
                </thead>


            <tbody>
                <tr v-for="(item, index) in scores" :key="index">
                    <td class="border px-4 py-2">{{ index +1 }}</td>
                    <td class="border px-4 py-2">{{ item.name }}</td>
                    <td class="border px-4 py-2">{{ item.score }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

