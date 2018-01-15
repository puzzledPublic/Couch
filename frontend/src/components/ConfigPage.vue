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
    methods: {
        activate(num) {
            this.isActive = num;
        }
    }
};
</script>

<style scoped>
.wrap {
  height: 90%;
}
</style>

