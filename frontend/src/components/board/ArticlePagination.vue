<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous">임시</a>
        <a class="pagination-next" @click="writeArticle" v-if="accessAuth.write">글 쓰기</a>
        <ul class="pagination-list">
            <li v-for="n in paginationInfo.endPageNum" :key="n">
                <a class="pagination-link" :class="currentPage === n + paginationInfo.startPageNum - 1 ? 'is-current' : ''" @click="changePage(n + paginationInfo.startPageNum - 1)"aria-label="Page 1" aria-current="page">{{n + paginationInfo.startPageNum - 1}}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'

export default {
  name: 'ArticlePagination',
  data() {
      return {
          currentPage: 1,
      }
  },
  computed: {
    paginationInfo() {
         return this.$store.state.board.paginationInfo;
    },
    accessAuth() {
        return this.$store.state.board.accessAuth;
    }
  },
  methods: {
    ...mapMutations([
        'setArticlePageViewName'
    ]),
    ...mapActions([
        'getArticleListAction'
    ]),
    changePage(pageNum) {
        this.currentPage = pageNum;
        this.getArticleListAction({
            boardname: this.$store.state.board.boardname,
            pageNum: pageNum
        });
    },
    writeArticle() {
        this.setArticlePageViewName('Article-Editor');
    },
    
  }
}
</script>

