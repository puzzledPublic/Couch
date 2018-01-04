<template>
    <div>
        <article class="media" v-for="comment in comments" :key="comment.id">
            <figure class="media-left">
                <p class="image is-32x32">
                <img src="https://bulma.io/images/placeholders/32x32.png">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{comment.username}}</strong> <small class="is-size-7"> {{getTime(comment.createdAt)}}</small>
                        <br>
                        {{comment.content}}
                    </p>
                </div>
            </div>
        </article>
        <article class="media">
            <figure class="media-left">
                <p class="image is-32x32">
                    <img src="https://bulma.io/images/placeholders/32x32.png">
                </p>
            </figure>
            <div class="media-content">
                <div class="field">
                    <p class="control">
                        <textarea class="textarea" placeholder="Add a comment..." v-model="comment.content"></textarea>
                    </p>
                </div>
                <nav class="level">
                    <div class="level-left">
                        <div class="level-item" v-if="!isLogined">
                            <input class="input" type="text" placeholder="닉네임" v-model="comment.username">
                            <input class="input" type="password" placeholder="비밀번호" v-model="comment.password">
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <a class="button is-link" @click="writeComment">댓글달기</a>
                        </div>
                    </div>
                </nav>
            </div>
        </article>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getCommentWriteTime} from '../../api/util/utils'

export default {
    name: 'ArticleComment',
    data() {
        return {
            comment: {
                content: null,
                username: null,
                password: null,
            },
            currentTime: null
        }
    },
    created() {
        this.currentTime = new Date();
    },
    computed: {
        comments() {
            return this.$store.state.board.comments;
        },
        isLogined() {
            return this.$store.state.auth.isLogined;
        }
    },
    methods: {
        ...mapActions([
            'writeCommentAction',
        ]),
        writeComment() {
            if(this.validateComment(this.comment)) {
                this.writeCommentAction(this.comment);
                this.resetComment();
            }else {
                alert('입력해주세요.');
            }
        },
        validateComment(comment) {
            if(this.isLogined) {
                if(comment.content === null || comment.content.trim() === '') {
                    return false;
                }
                return true;
            }else {
                for(let i in comment) {
                    if(comment[i] === null || comment[i].trim() === '') {
                        return false;
                    }
                }
                return true;
            }
        },
        resetComment() {
            this.comment.content = null;
            this.comment.password = null;
        },
        getTime(timeStamp) {
            return getCommentWriteTime(timeStamp, this.currentTime);
        }
    }
}
</script>

<style scoped>

</style>
