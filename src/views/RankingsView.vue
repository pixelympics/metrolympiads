<template>
    <HeaderComponent />
    <div class="flex flex-col items-center mt-8">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            class="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider bg-primary"
                        >
                            Rank
                        </th>
                        <th
                            class="px-6 py-3 text-xs font-medium text-center text-white uppercase tracking-wider bg-primary"
                        >
                            Team Name
                        </th>
                        <th
                            class="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider bg-primary"
                        >
                            Points
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                        v-for="(item, index) in scores"
                        :key="index"
                        :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
                    >
                        <td class="px-6 py-4 text-center whitespace-nowrap border-r">
                            {{ index + 1 }}
                        </td>
                        <td class="px-6 py-4 text-center whitespace-nowrap border-r">
                            {{ item.name }}
                        </td>
                        <td class="px-6 py-4 text-center whitespace-nowrap">{{ item.score }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabase';
import HeaderComponent from '@/components/HeaderComponent.vue';

const scores = ref([]);

onMounted(async () => {
    const { data, error } = await supabase.rpc('score', { vic_pts: 3, def_pts: 0, eq_pts: 1 });
    if (error) {
        console.error('Error fetching messages:', error);
    }
    scores.value = data;
});
</script>
