<template>
  <div id="app" >
      <navbar></navbar>

      <section class="container divider"></section>

      <router-view/>

      <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <p>
                    2017 Couch
                </p>
            </div>
        </div>
      </footer>

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
  background-color: #f3f2f0;
  height: 100%;
}
.divider {
  margin: 25px 0;
}
@media screen and (max-width: 960px){
  .divider {
    margin: 12px;
  }
}
</style>
