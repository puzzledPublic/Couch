<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                패스워드 입력
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
            </a>
        </header>
        <div class="card-content">
            <div class="content">
                <input v-model="password" class="input" type="password" placeholder="password..">
            </div>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item" @click="sendPassword">확인</a>
            <a href="#" class="card-footer-item" @click="backToArticle">취소</a>
        </footer>
    </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'

export default {
    name: 'ArticlePassword',
    data() {
        return {
            password: null
        }
    },
    computed: {
        articleMode() {
            return this.$store.state.board.guestArticle.mode;
        }
    },
    methods: {
        ...mapMutations([
            'setEditorMode',
            'setArticleDetailPageViewName'
        ]),
        ...mapActions([
            'validatePasswordGuestArticleAction'
        ]),
        async sendPassword() {
            const result = await this.validatePasswordGuestArticleAction(this.password);
            if(result) {
                if(this.articleMode === 'modify') {
                    this.setEditorMode(this.articleMode);
                    this.setArticleDetailPageViewName('Article-Editor');
                }else if(this.articleMode === 'delete') {
                    this.setArticleDetailPageViewName('Article-Delete');
                }
            }else {
                alert('비밀번호가 틀렸습니다.');
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
