import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import couchMain from '@/components/CouchMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CouchMain',
      component: couchMain
    }
  ]
})
