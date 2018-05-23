<template>
    <div class="board-link">
        <router-link :to="'/board/'+ name">{{name}}</router-link>
    </div>
</template>

<script>
export default {
    props: {
        name: { type: String},
    }    
}
</script>

<style scoped>
    .board-link {
        margin-bottom: 1rem;
        width: 33%;
        /* width: 100% * (1/3) - 10px - 1px; */
        text-align: center;
    }
</style>
