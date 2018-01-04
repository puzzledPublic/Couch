import * as board from '../../api/board';

const state = {
    paginationInfo: null,
    accessAuth: { 
        write: false, 
        comment: false
    },
    article: null,
    isOwner: null,
    articles: null,
    comments: null,
    boardname: null,
    responseStatus: null,
    currentViewName: {
        articlePage: 'Article-List',
        articleDetailPage: 'Article-Detail'
    },
    editorMode: 'create',
    guestArticle: {
        mode: null,
        passwordForValidate: null
    }
    
}

const getters = {

}

const actions = {
    async getArticleListAction({commit}, {boardname, pageNum}) {
        let result;
        if(pageNum) {
            result = await board.getArticlesPerPage({boardname: boardname, pageNum: pageNum});
        } else {
            result = await board.getArticles({boardname: boardname});
        }
        commit('setResponseStatus', result.status);
        if(result.data.boardInfo) {
            commit('setPaginationInfo', result.data.boardInfo.paginationInfo);
            commit('setArticles', result.data.boardInfo.articles);
            commit('setAccessAuth', result.data.boardInfo.accessAuth);
        }
    },
    async getArticleAction({commit}, articleId) {
        const result = await board.getArticle(articleId);
        if(result.status === 200) {
            commit('setArticle', result.data.articleInfo);
            commit('setComments', result.data.commentInfo);
            commit('setIsOwner', result.data.owner);
            return true;
        }
        return false;
    },
    async uploadImageFileAction({commit}, imageFile) {
        const result = await board.uploadImageFile(imageFile);
        if(result.status === 200) {
            return {
                result: true, 
                imageURL: result.data.imageURL
            };
        }
        return {result: false}; 
    },
    async writeArticleAction({state}, article) {
        if(article.title === '' || article.title === null || article.content === '' || article.content === null) {
            return false;
        }
        const result = await board.writeArticle({
            article: article,
            boardname: state.boardname
        });
        if(result.status === 200) {
            return true;
        }
        return false;
    },
    async modifyArticleAction({state, commit}, article) {
        const result = await board.modifyArticle({
            article: article,
            articleId: state.article.id,
            passwordForValidate: state.guestArticle.passwordForValidate
        });
        if(result.status === 200) {
            commit('setModifyArticle', {title: article.title, content: article.content});
            return true;
        }
        return false;
    },
    async deleteArticleAction({state, commit}) {
        const result = await board.deleteArticle({
            articleId: state.article.id,
            passwordForValidate: state.guestArticle.passwordForValidate
        });
        if(result.status === 200) {
            return true;
        }
        return false;
    },
    async writeCommentAction({state, commit}, comment) {
        if(!state.article) {
            return;
        }
        const articleId = state.article.id;
        const result = await board.writeComment({
            articleId: articleId,
            comment: comment
        });
        if(result.status === 200) {
            commit('setComments', result.data.commentInfo);
        }
    },
    async validatePasswordGuestArticleAction({state, commit}, password) {
        if(!state.article){
            return false;
        }
        const articleId = state.article.id;
        const result = await board.validatePasswordGuestArticle({
            articleId: articleId,
            password: password
        });
        if(result.status === 200) {
            commit('setGuestArticlePasswordForValidate', password);
            return true;
        }
        return false;
    }
}

const mutations = {
    setPaginationInfo(state, paginationInfo) {
        state.paginationInfo = paginationInfo;
    },
    setArticle(state, article) {
        state.article = article;
    },
    setArticles(state, articles) {
        state.articles = articles;
    },
    setBoardname(state, boardname) {
        state.boardname = boardname;
    },
    setResponseStatus(state, status) {
        state.responseStatus = status;
    },
    setArticlePageViewName(state, articlePageViewName) {
        state.currentViewName.articlePage = articlePageViewName;
    },
    setArticleDetailPageViewName(state, articleDetailPageViewName) {
        state.currentViewName.articleDetailPage = articleDetailPageViewName;
    },
    setAccessAuth(state, accessAuth) {
        state.accessAuth.write = accessAuth.write;
        state.accessAuth.comment = accessAuth.comment;
    },
    setComments(state, comments) {
        state.comments = comments;
    },
    setIsOwner(state, owner) {
        state.isOwner = owner;
    },
    setEditorMode(state, mode) {
        state.editorMode = mode;
    },
    setModifyArticle(state, {title, content}) {
        state.article.title = title;
        state.article.content = content;
    },
    setGuestArticleMode(state, mode) {
        state.guestArticle.mode = mode;
    },
    setGuestArticlePasswordForValidate(state, password) {
        state.guestArticle.passwordForValidate = password;
    }
}

export default {
    state,
    getters,
    actions, 
    mutations
}