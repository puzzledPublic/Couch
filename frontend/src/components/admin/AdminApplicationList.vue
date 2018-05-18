<template>
  <div class="container is-fluid is-marginless">
    <table class="table">
      <thead>
        <tr>
          <th>신청번호</th>
          <th>회원이름</th>
          <th>유형</th>
          <th>상태</th>
          <th>승인</th>
          <th>거부</th>
        </tr>  
      </thead>
      <tbody>
        <Application-Component v-for="(application, index) in applicationList" :key="index" 
          :applicationId="application.id" :username="application.username" :content="application.content"
          :state="application.state" :type="application.type" :grantApplicationAction="grantApplicationAction">
        </Application-Component>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApplicationComponent from '@/components/admin/ApplicationComponent'
import { mapActions } from 'vuex';
export default {
  components: {
    ApplicationComponent : ApplicationComponent,
  },
  created() {
    this.$store.dispatch('getApplicationListAction');
  },
  computed: {
    applicationList() {
      return this.$store.state.admin.applicationList;
    }
  },
  methods: {
    ...mapActions([
      'grantApplicationAction',
    ])
  }
}
</script>

<style scoped>

</style>
