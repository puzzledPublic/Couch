<template>
    <section class="container wrap">
        <div class="tabs is-centered">
            <ul>
                <li class="is-active"><a>방송</a></li>
                <li><a>게시판</a></li>
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

