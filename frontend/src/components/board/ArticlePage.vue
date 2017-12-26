<template>
<div class="article-wrap">
    <div class="board-name-wrap">
        <h3 class="title is-3 board-name">Free</h3>
        <div class="bottom-divider"></div>
    </div>
    <component :is="currentMainViewName"></component>
    <component :is="currentSubViewName"></component>
</div>
</template>

<script>
import ArticleList from '@/components/board/ArticleList'
import ArticleEditor from '@/components/board/ArticleEditor'

import {mapMutations} from 'vuex'

export default {
    computed: {
        currentMainViewName() {
            return this.$store.state.board.currentViewName.main;
        },
        currentSubViewName() {
            return this.$store.state.board.currentViewName.sub;
        }
    },
    components: {
        'Article-List': ArticleList,
        'Article-Editor': ArticleEditor,
    },
    created() {
        const boardname = this.$route.params.boardname;
        this.setBoardname(boardname);
        this.setCurrentViewName({
            mainViewName: 'Article-List',
            subViewName: ''});
    },
    methods: {
        ...mapMutations([
            'setBoardname',
            'setCurrentViewName'
        ])
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
