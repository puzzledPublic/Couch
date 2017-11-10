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
    async setBroadcastConfigAction({commit, dispatch}, config) {
        const result = await broadcast.setBroadcastConfig(config);
        if(result.status !== 200) {
            await dispatch('loginCheckAction');
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