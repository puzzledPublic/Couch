<template>
    <div class="article-wrap">
        <div class="board-name-wrap">
            <h3 class="title is-3 board-name">Free</h3>
            <div class="bottom-divider"></div>
        </div>

        <component :is="currentArticleDetailPageViewName" ></component>

    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import ArticleDetail from '@/components/board/ArticleDetail'
import ArticlePassword from '@/components/board/ArticlePassword'
import ArticleEditor from '@/components/board/ArticleEditor'
import ArticleDelete from '@/components/board/ArticleDelete'

export default {
  computed: {
      currentArticleDetailPageViewName() {
          return this.$store.state.board.currentViewName.articleDetailPage;
      }
  },
  components: {
      'Article-Detail': ArticleDetail,
      'Article-Password': ArticlePassword,
      'Article-Editor': ArticleEditor,
      'Article-Delete': ArticleDelete
  },
  created() {
      this.setArticleDetailPageViewName('Article-Detail');
  },
  methods: {
      ...mapMutations([
          'setArticleDetailPageViewName'
      ])
  }
}
</script>

<style scoped>

</style>
