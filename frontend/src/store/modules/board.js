import * as board from '../../api/board';

const state = {
    pagenationInfo: null,
    articles: null,
    boardname: null,
    responseStatus: null,
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
            commit('setPagenationInfo', result.data.pagenationInfo);
            commit('setArticles', result.data.articles);
        }
    }
}

const mutations = {
    setPagenationInfo(state, pagenationInfo) {
        state.pagenationInfo = pagenationInfo;
    },
    setArticles(state, articles) {
        state.articles = articles;
    },
    setBoardname(state, boardname) {
        state.boardname = boardname;
    },
    setResponseStatus(state, status) {
        state.responseStatus = status;
    }
}

export default {
    state,
    getters,
    actions, 
    mutations
}