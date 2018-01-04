<template>
    <div class="card">
        <div class="card-content">
            <p class="subtitle">
                삭제하시겠습니까? (삭제 후에는 복구할 수 없습니다.)
            </p>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item" @click="deleteArticle">확인</a>
            <a href="#" class="card-footer-item" @click="backToArticle">취소</a>
        </footer>
    </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'

export default {
    
    methods: {
        ...mapMutations([
            'setArticleDetailPageViewName'
        ]),
        ...mapActions([
            'deleteArticleAction'
        ]),
        async deleteArticle() {
            const result = await this.deleteArticleAction();
            if(result) {
                this.$router.replace('/board/' + this.$store.state.board.boardname);
            }else {
                alert('삭제 중 오류 발생');
            }
        },
        backToArticle() {
            this.setArticleDetailPageViewName('Article-Detail');
        }
    }
}
</script>

<style scoped>

</style>
