<script setup>
defineProps({
    match: Object
});
</script>
<template>
    <div class="flex flex-col rounded-lg border-2 border-black m-3 p-2 min-w-[300px] w-fit">
        <div class="flex justify-center gap-2 w-full items-center">
            <span class="w-full text-center">{{ match.time ? match.time : '??:??:??' }}</span>
            <span>-</span>
            <span class="w-full text-center">{{ match.sport ? match.sport : 'sport?' }}</span>
        </div>
        <div class="flex justify-evenly gap-2 w-full items-center">
            <span class="w-full text-center">{{ match.team1.name }}</span>
            <span>VS</span>
            <span class="w-full text-center">{{ match.team2.name }}</span>
        </div>
    </div>
</template>
