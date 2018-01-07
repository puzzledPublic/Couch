import Vue from 'vue'
import Router from 'vue-router'

import couchMain from '@/components/CouchMain'
//import broadcastPage from '@/components/BroadcastPage'
const broadcastPage = () => import('@/components/BroadcastPage');
import errorPage from '@/components/ErrorPage'
import configPage from '@/components/ConfigPage'
import broadcastConfig from '@/components/broadcast/BroadcastConfig'
import broadcastList from '@/components/main/BroadcastList'
import boardList from '@/components/board/BoardList'
import articlePage from '@/components/board/ArticlePage'
import articleDetailPage from '@/components/board/ArticleDetailPage'

import store from '@/store'
import {stringToPositive} from '../api/util/utils'

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
          path: 'board', component: boardList
        },
        {
          path: 'board/:boardname', component: articlePage
        },
        {
          path: 'a/:articleId', component: articleDetailPage,
          beforeEnter: async (to, from, next) => {
            const articleId = stringToPositive(to.params.articleId);
            if(articleId > 0) {
              const result = await store.dispatch('getArticleAction',articleId);
              if(!result) {
                  next(false);
              }
              next();
            }else {
                next(false);
            }
          }
        }
      ]
    },
    {
      path: '/config',
      name: 'ConfigPage',
      component: configPage,
      beforeEnter: async (to, from, next) => {
        if(store.state.auth.isLogined) {
            return next();
        }
        return next('/');
      },
      children: [/*
        {
          path: 'board', component: boardConfig
        },*/
        {
          path: 'broadcast', component: broadcastConfig
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
          return next('/');
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
        return next('/');
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