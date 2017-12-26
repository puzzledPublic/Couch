import * as board from '../../api/board';

const state = {
    paginationInfo: null,
    accessAuth: { 
        write: false, 
        comment: false
    },
    article: null,
    articles: null,
    comments: null,
    boardname: null,
    responseStatus: null,
    currentViewName: {
        main: 'Article-List',
        sub: ''
    },
    
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
            title: article.title,
            content: article.content,
            username: article.username,
            password: article.password,
            boardname: state.boardname
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
    setCurrentViewName(state, {mainViewName, subViewName}) {
        state.currentViewName.main = mainViewName;
        state.currentViewName.sub = subViewName;
    },
    setAccessAuth(state, accessAuth) {
        state.accessAuth.write = accessAuth.write;
        state.accessAuth.comment = accessAuth.comment;
    },
    setComments(state, comments) {
        state.comments = comments;
    }
}

export default {
    state,
    getters,
    actions, 
    mutations
}