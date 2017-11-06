import * as broadcast from '../../api/broadcast';

const state = {
    broadcastList : [],
}

const getters = {
    
}

const actions = {
    async getBroadcastListAction({commit}, broadcastType) {
        const result = await broadcast.getBroadcastList(broadcastType);
        commit('setBroadcastList', result.data.list);
    },
    async setBroadcastConfigAction({commit, rootState}, config) {
        const result = await broadcast.setBroadcastConfig(config);
        if(result.status !== 200) {
            rootState.dispatch('loginCheckAction');
            //로그인모달띄우기
        }
    }
}

const mutations = {
    setBroadcastList(state, list){
        state.broadcastList = list;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}