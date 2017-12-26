<template>
    <div class="container is-fluid is-marginless" id="board-list-wrap">
        <div class="content">
            <article class="post" v-for="(article, index) in articles" :key="index">
                <router-link :to="`/a/${article.id}`">
                    <h5>
                        {{article.title}}
                        <span class="has-text-grey-light" v-if="article.comment_count > 0"><i class="fa fa-comments"></i> {{article.comment_count}}</span>
                    </h5>
                </router-link>
                <div class="media">
                    <div class="media-left">
                        <p class="image is-32x32">
                            <img src="http://bulma.io/images/placeholders/128x128.png">
                        </p>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <a href="#">{{article.username}}</a> posted {{article.createdAt}}  &nbsp; 
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        <Article-Pagination></Article-Pagination>
    </div>
</template>

<script>
import ArticlePagination from '@/components/board/ArticlePagination'
import {mapMutations, mapActions} from 'vuex'

export default {
  name: 'ArticleList',
  components: {
      'Article-Pagination': ArticlePagination,
  },
  computed: {
      articles() {
          return this.$store.state.board.articles;
      },
      boardname() {
          return this.$store.state.board.boardname;
      }
  },
  created() {
      this.getArticleListAction({boardname: this.boardname});
  },
  methods: {
      ...mapMutations([
          'setCurrentViewName'
      ]),
      ...mapActions([
          'getArticleListAction'
      ])
  }
}
</script>

<style scoped>
.post {
    margin: 0.2rem;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #E6EAEE;
}
article > .media {
    margin-top: -0.6rem;
}
</style>
