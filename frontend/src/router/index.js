import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import couchMain from '@/components/CouchMain'
import broadcastPage from '@/components/BroadcastPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'CouchMain',
      component: couchMain
    },
    {
      path: '/broadcast/:username',
      name: 'BroadcastPage',
      component: broadcastPage
    }
  ]
})
