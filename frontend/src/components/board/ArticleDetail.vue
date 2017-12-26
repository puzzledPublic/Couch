<template>
  <div class="article-wrap">
        <div class="board-name-wrap">
            <h3 class="title is-3 board-name">Free</h3>
            <div class="bottom-divider"></div>
        </div>
        <h3 class="title is-3 title-name">{{article.title}}</h3>
        <article class="message">
            <div class="message-header">
                <span class="left-item">
                    <span><i class="fa fa-user" aria-hidden="true"></i> {{article.username}}</span>
                    <span><i class="fa fa-clock-o" aria-hidden="true"></i> {{article.createdAt}}</span>
                </span>
                <span class="right-item">
                    <span><i class="fa fa-eye" aria-hidden="true"></i> {{article.hit}}</span>
                    <span><i class="fa fa-comments" aria-hidden="true"></i> {{article.comment_count}}</span>
                </span>
            </div>
            <div class="message-body" v-html="article.content"></div>
        </article>
        <Article-Comment></Article-Comment>
  </div>
</template>

<script>
import ArticleComment from '@/components/board/ArticleComment'
import {mapActions} from 'vuex'

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
