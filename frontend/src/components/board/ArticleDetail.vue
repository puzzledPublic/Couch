<template>
        <div>
            <h3 class="title is-3 title-name">{{article.title}}</h3>
            <article class="message">
                <div class="message-header">
                    <span class="left-item">
                        <span><i class="fa fa-user" aria-hidden="true"></i> {{article.username}}</span>
                        <span><i class="fa fa-clock-o" aria-hidden="true"></i> {{getTime(article.createdAt)}}</span>
                    </span>
                    <span class="right-item">
                        <span><i class="fa fa-eye" aria-hidden="true"></i> {{article.hit}}</span>
                        <span><i class="fa fa-comments" aria-hidden="true"></i> {{article.comment_count}}</span>
                    </span>
                </div>
                <div class="message-body" v-html="article.content"></div>
                <div class="message-header is-paddingless" v-if="hasAuth()">
                    <span class="left-item"></span>
                    <span class="right-item">
                        <button class="button is-small is-link" @click="moveToPage('modify')">수정</button>
                        <button class="button is-small is-link" @click="moveToPage('delete')">삭제</button>
                    </span>
                </div>
            </article>
            <Article-Comment></Article-Comment>
        </div>
</template>

<script>
import ArticleComment from '@/components/board/ArticleComment'
import {mapActions, mapMutations} from 'vuex'
import {getCommentWriteTime} from '../../api/util/utils'

export default {
  name: 'ArticleDetail',
  data() {
      return {
          
      }
  },
  components: {
      'Article-Comment': ArticleComment
  },
  computed: {
      article() {
          return this.$store.state.board.article;
      },
      isOwner() {
          return this.$store.state.board.isOwner;
      }
  },
  methods: {
      ...mapMutations([
          'setArticleDetailPageViewName',
          'setEditorMode',
          'setGuestArticleMode'
      ]),
      getTime(timeStamp) {
          return getCommentWriteTime(timeStamp, new Date());
      },
      hasAuth() {
          if(this.isOwner || !this.article.is_user) {
              return true;
          }
          return false;
      },
      moveToPage(type) {
          if(this.isOwner && this.article.is_user) {
              if(type === 'modify') {
                  this.setEditorMode(type);
                  this.setArticleDetailPageViewName('Article-Editor');
              }
              if(type === 'delete') {
                  this.setArticleDetailPageViewName('Article-Delete');
              }
          }
          else if(!this.article.is_user) {
              this.setGuestArticleMode(type);
              this.setArticleDetailPageViewName('Article-Password');
          }
      }
  }
}
</script>

<style scoped>
.title-name {
    margin-bottom: 0;
}
.message-header {
    justify-content: space-between;
}
</style>
