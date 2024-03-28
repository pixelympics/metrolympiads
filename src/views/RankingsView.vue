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
    <table class="table-auto">
        <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in scores" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.score }}</td>
            </tr>
        </tbody>
    </table>
</template>

