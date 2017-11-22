import * as broadcast from '../../api/broadcast';

const state = {
    broadcastList : [],
    streamURL: null
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
    },
    async getStreamURLAction({commit}, username) {
        const result = await broadcast.enterRoom(username);
        //TODO::방이 없는 경우 처리 필요
        commit('setStreamURL', result.data.streamurl);
    },
}

const mutations = {
    setBroadcastList(state, list) {
        state.broadcastList = list;
    },
    setStreamURL(state, streamURL) {
        state.streamURL = streamURL;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}