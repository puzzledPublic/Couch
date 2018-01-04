<template>
    <div class="container is-fluid is-marginless">
        <div class="field">
            <label class="label">제목</label>
            <div class="control">
                <input class="input" type="text" v-model="article.title">
            </div>
        </div>
        <div class="field">
            <label class="label">본문</label>
            <quill-editor v-model="article.content" ref="boardEditor" :options="editorOption">
            </quill-editor>
        </div>
        <div class="field is-horizontal" v-if="!isLogined">
            <div class="is-normal">
                <label class="label">이름</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                        <input class="input" type="text" v-model="article.username">
                    </p>
                </div>
            </div>
            <div class="is-normal">
                <label class="label">비밀번호</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                        <input class="input" type="password" v-model="article.password">
                    </p>
                </div>
            </div>
        </div>
        <div class="control">
            <button class="button is-link" @click="goToList(editorMode)">목록으로</button>
            <button class="button is-link is-pulled-right" @click="writeArticle(editorMode)">작성완료</button>
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import {quillEditor} from 'vue-quill-editor'
import {mapMutations, mapActions} from 'vuex'

export default {
    name: 'ArticleEditor',
    components: {
        'quill-editor': quillEditor
    },
    data() {
        return {
            article: {
                title: null,
                content: null,
                username: null,
                password: null,
            },
            editorOption: {
                modules: {
                    toolbar: {
                        container:[
                            [{'size':['small', false, 'large']}],
                            ['bold','italic'],
                            [{'list':'ordered'}, {'list':'bullet'}],
                            ['link','image']
                        ],
                        handlers: {
                            image: this.imageHandler
                        }
                    }
                }
            }
        }
    },
    created() {
        if(this.editorMode === 'modify') {
            this.setArticleToModify();
        }
    },
    computed: {
        boardEditor() {
            return this.$refs.boardEditor.quill;
        },
        isLogined() {
            return this.$store.state.auth.isLogined;
        },
        editorMode() {
            return this.$store.state.board.editorMode;
        }
    },
    methods: {
        ...mapMutations([
            'setArticlePageViewName',
            'setArticleDetailPageViewName',
            'setEditorMode'
        ]),
        ...mapActions([
            'uploadImageFileAction',
            'writeArticleAction',
            'modifyArticleAction'
        ]),
        imageHandler() {
            const input = document.createElement('input');
            input.setAttribute('type','file');
            input.click();

            input.onchange = () => {
                const file = input.files[0];
                if(/^image\//.test(file.type)) {
                    this.saveToServer(file);
                }else {
                    alert('you should upload image file');
                }
            };
        },
        async saveToServer(file) {
            const data = new FormData();
            data.append('image', file);
            const {result, imageURL} = await this.uploadImageFileAction(data);
            if(result) {
                this.insertImageURLToEditor(imageURL);
            }
        },
        insertImageURLToEditor(imageURL) {
            const range = this.boardEditor.getSelection();
            this.boardEditor.insertEmbed(range.index, 'image', imageURL);
        },
        async writeArticle(editorMode) {
            //TODO::need to validate article
            if(editorMode === 'create') {
                const result = await this.writeArticleAction(this.article);
                if(result) {
                    this.setArticlePageViewName('Article-List');
                }else {
                    alert('저장실패. 다시 확인해주세요.');
                }
            }
            else if(editorMode === 'modify') {
                const result = await this.modifyArticleAction(this.article);
                if(result) {
                    this.setArticleDetailPageViewName('Article-Detail');
                }else {
                    alert('저장실패. 다시 확인해주세요.');
                }
            }
        },
        goToList(editorMode) {
            if(editorMode === 'create') {
                this.setArticlePageViewName('Article-List');
            }
            else if(editorMode === 'modify') {
                this.$router.push('/board/' + this.$store.state.board.boardname);
            }
        },
        setArticleToModify() {
            this.article.title = this.$store.state.board.article.title;
            this.article.content = this.$store.state.board.article.content;
            this.article.username = this.$store.state.board.article.username;
        }
    },
    beforeDestroy() {
        this.setEditorMode('create');
    }
}
</script>

<style>
.ql-container.ql-snow {
    height: 285px;
}
</style>
