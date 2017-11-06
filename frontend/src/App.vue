<template>
  <div id="app">
    <navbar></navbar>
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/common/navbar';

export default {
  name: 'app',
  components: {
    'navbar': navbar,
  },
  created() {
    this.$store.dispatch('loginCheckAction');
  }
}
</script>

<style>
body{
  background-color: #ddd;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: auto;
}
</style>
