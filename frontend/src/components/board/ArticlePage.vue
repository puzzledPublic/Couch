<template>
<div class="article-wrap">
    <Banner-Component :banner="bannerName"/>
    <component :is="currentArticlePageViewName"></component>
</div>
</template>

<script>
import ArticleList from '@/components/board/ArticleList';
import ArticleEditor from '@/components/board/ArticleEditor';
import BannerComponent from '@/components/board/BannerComponent';
import {mapMutations, mapActions} from 'vuex';

export default {
    computed: {
        currentArticlePageViewName() {
            return this.$store.state.board.currentViewName.articlePage;
        },
        bannerName() {
            return this.$route.params.boardname;
        }
    },
    components: {
        'Article-List': ArticleList,
        'Article-Editor': ArticleEditor,
        BannerComponent,
    },
    created() {
        const boardname = this.$route.params.boardname;
        this.setBoardname(boardname);
        this.setArticlePageViewName('Article-List');
    },
    methods: {
        ...mapMutations([
            'setBoardname',
            'setArticlePageViewName',
        ]),
        ...mapActions([
            'getArticleListAction'
        ])
    },
    beforeRouteUpdate(to, from, next) {
        const boardname = to.params.boardname;
        this.setBoardname(boardname);
        this.getArticleListAction({boardname});
        next();
    }
    
}
</script>

<style>
.article-wrap {
    height: 100%;
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

</style>
