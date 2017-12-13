<template>
<div class="article-wrap">
    <div class="board-name-wrap">
        <h3 class="title is-3 board-name">Free</h3>
        <div class="bottom-divider"></div>
    </div>
    <div class="container is-fluid is-marginless" id="board-list-wrap">
        <div class="content">
            <article class="post" >
                <h5>
                    Bulma: How do you center a button in a box?
                    <span class="has-text-grey-light"><i class="fa fa-comments"></i> 1</span>
                </h5>
                <div class="media">
                    <div class="media-left">
                        <p class="image is-32x32">
                            <img src="http://bulma.io/images/placeholders/128x128.png">
                        </p>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <a href="#">@jsmith</a> posted 34 minutes ago  &nbsp; 
                                <span class="tag">Question</span>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
            <li>
                <router-link :to="'free/p/1'" class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</router-link>
            </li>
            <li>
                <a class="pagination-link" aria-label="Goto page 2">2</a>
            </li>
            <li>
                <a class="pagination-link" aria-label="Goto page 3">3</a>
            </li>
            <li>
                <a class="pagination-link" aria-label="Goto page 4">4</a>
            </li>
            <li>
                <a class="pagination-link" aria-label="Goto page 5">5</a>
            </li>
            <li>
                <a class="pagination-link" aria-label="Goto page 6">6</a>
            </li>
            <li>
                <a class="pagination-link" aria-label="Goto page 7">7</a>
            </li>
            <li>
                <a class="pagination-link" aria-label="Goto page 8">8</a>
            </li>
            <li>
                <a class="pagination-link" aria-label="Goto page 9">9</a>
            </li>
            <li>
                <a class="pagination-link" aria-label="Goto page 10">10</a>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'

export default {
  data() {
    return {
    }
  },
  created() {
    const boardname = this.$route.params.boardname;
    this.setBoardname(boardname);
    this.getArticleListRequest(boardname);
  },
  watch: {
      '$route' (to, from) {
          if(to.params.page > 0) {
              this.setBoardname(to.params.boardname);
              this.getArticleListRequest(to.params.boardname, to.params.page);
          }
      }
  },
  methods: {
    ...mapMutations([
        'setBoardname'
    ]),
    ...mapActions([
        'getArticleListAction'
    ]),
    async getArticleListRequest(boardname, pageNum) {
        await this.getArticleListAction({
            boardname: boardname,
            pageNum, pageNum
        });
    }
  }
}
</script>

<style>
.article-wrap {
    height: 100%;
}
.post {
    margin: 0.2rem;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #E6EAEE;
}
.board-name-wrap {
    margin-bottom: 1rem;
}
.bottom-divider {
    margin-top: -1.1rem;
    border-bottom: 1px solid #E6EAEE;
}/*
#board-list-wrap {
    height: 85%;
    overflow-y: auto;
}*/
article > .media {
    margin-top: -0.6rem;
}

</style>
