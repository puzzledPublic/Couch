<template>
    <div class="board-name-wrap">
        <h3 class="title is-3 board-name">{{banner}}</h3>
        <div class="bottom-divider"></div>
    </div>
</template>

<script>
export default {
    props: {
        banner: {type: String},
    }
}
</script>

<style scoped>

</style>
