import Vue from 'vue'
import Router from 'vue-router'

import couchMain from '@/components/CouchMain'
import broadcastPage from '@/components/BroadcastPage'
import errorPage from '@/components/ErrorPage'
import broadcastConfig from '@/components/broadcast/BroadcastConfig'
import broadcastList from '@/components/main/BroadcastList'
import articleList from '@/components/board/ArticleList'

import store from '@/store'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'CouchMain',
      component: couchMain,
      children: [
        { 
          path: '', component: broadcastList
        },
        {
          path: 'board', component: articleList
        },
        {
          path: 'board/:boardname', component: articleList
        },
        {
          path: 'board/:boardname/p/:page', component: articleList
        }
      ]
    },
    {
      path: '/broadcast/:username',
      name: 'BroadcastPage',
      component: broadcastPage,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('enterBroadcastAction',{username: to.params.username});
        if(!store.state.broadcast.isBroadcastExist) {
          return next('/error');
        } else{
          return next();
        }
      }
    },
    {
      path: '/broadcast/:username/config',
      name: 'BroadcastConfig',
      component: broadcastConfig,
      beforeEnter: async (to, from, next) => {
        if(store.state.auth.isLogined) {
          const userInfo = window.localStorage.getItem('COUCH_USER');
          let username;
          if(userInfo) {
            username = JSON.parse(userInfo).username;
            if(username === to.params.username) {
              return next();
            }
          }
        }
        return next('/error');
      }
    },
    {
      path: '/error',
      name: 'ErrorPage',
      component: errorPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if(store.state.auth.isLogined) {
    await store.dispatch('loginCheckAction');
  }
  next();
})
export default router;