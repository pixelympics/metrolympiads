<script setup>
import { Slide } from "vue3-burger-menu";
import { useRouter } from "vue-router"; 
const router = useRouter(); 

</script>

<template Header>
<Slide>
    <span v-on:click="router.push('/')">Home</span>
</Slide>
</template>

    
<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>