<template>
    <tr>
        <td>{{applicationId}}</td>
        <td>{{username}}</td>
        <td>{{type}}</td>
        <td>{{state}}</td>
        <td>{{time}}</td>
        <td><a class="button is-small is-info" @click="grantApplicationAction(applicationId)">grant</a></td>
        <td><a class="button is-small is-danger" @click="rejectApplicationAction(applicationId)">reject</a></td>
    </tr>
</template>

<script>
export default {
  props: {
    applicationId: {type: Number},
    username: {type: String},
    content: {type: String},
    type: {type: String},
    state: {type: String},
    createdAt: {type: String},
    grantApplicationAction: {type: Function},
    rejectApplicationAction: {type: Function}
  },
  computed: {
    time() {
      const time = new Date(this.createdAt);
      return time.toLocaleString();
    }
  }
}
</script>

<style scoped>

</style>
