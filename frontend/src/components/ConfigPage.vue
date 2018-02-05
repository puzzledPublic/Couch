<template>
    <section class="container wrap">
        <div class="tabs is-centered">
            <ul>
                <li @click="activate(1)" :class="{'is-active' : isActive == 1}"><router-link :to="'/config/broadcast'">방송</router-link></li>
                <li @click="activate(2)" :class="{'is-active' : isActive == 2}"><router-link :to="'/config/board'">게시판</router-link></li>
            </ul>
        </div>
        <router-view></router-view>
    </section>
</template>

<script>
export default {
    data(){
        return {
            isActive: 1
        }
    },
    mounted() {
        this.$eventBus.$on("logout", this.whenLogout);
    },
    beforeDestroy() {
        this.$eventBus.$off("logout", this.whenLogout);
    },
    methods: {
        activate(num) {
            this.isActive = num;
        },
        whenLogout() {
            this.$router.replace("/");
        }
    }
};
</script>

<style scoped>
.wrap {
  height: 90%;
}
</style>

