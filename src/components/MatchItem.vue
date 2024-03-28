<script setup>
const props = defineProps(
    {
        match: {
            type: Object,
            required: true,
        }
    }
);

</script>

<template>
    <table class="table-auto">
        <tbody>
        <tr>
            <td>{{ props.match.sport }}</td>
            <td>{{ props.match.team1.name }}</td>
            <td>{{ props.match.team2.name }}</td>
            <td>{{ props.match.time }}</td>
        </tr>
        </tbody>
    </table>    
</template>