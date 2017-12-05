<template>
  <div id="app" class="container is-fluid">
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
    //this.$store.dispatch('loginCheckAction');
  }
}
</script>

<style>

html, body{
  background-color: #ddd;
  height: 100%;
}

</style>
