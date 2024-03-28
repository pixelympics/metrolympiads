<script setup>
const props = defineProps({
    match: {
        type: Object,
        required: true
    }
});

console.log(props.match);
</script>

<template>
    <table class="table-auto">
        <tbody>
            <tr>
                <td>{{ match.sport }}</td>
                <td>{{ match.team1.name }}</td>
                <td>{{ match.team2.name }}</td>
                <td>{{ match.time }}</td>
            </tr>
        </tbody>
    </table>
</template>
