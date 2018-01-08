<template>
    <section class="container wrap">
        <div class="tabs is-centered">
            <ul>
                <li class="is-active"><router-link :to="'/config/broadcast'">방송</router-link></li>
                <li><router-link :to="'/config/board'">게시판</router-link></li>
            </ul>
        </div>
        <router-view></router-view>
    </section>
</template>

<script>
export default {
    
};
</script>

<style scoped>
.wrap {
  height: 90%;
}
</style>

