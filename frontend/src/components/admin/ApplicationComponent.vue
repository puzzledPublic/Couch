<template>
    <tr>
        <td>{{applicationId}}</td>
        <td>{{username}}</td>
        <td>{{type}}</td>
        <td>{{state}}</td>
        <td><a class="button is-small is-info" @click="grantApplicationAction(applicationId)">grant</a></td>
        <td><a class="button is-small is-danger">reject</a></td>
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
    grantApplicationAction: {type: Function},
  }
}
</script>

<style scoped>

</style>
