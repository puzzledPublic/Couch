import * as broadcast from '../../api/broadcast';

const state = {
    isBroadcastExist: null,
    requestListType: 0,
    broadcastList : [],
    streamURL: null,
    broadcastConfig: {
        show: null,
        roomname: null,
        typeNum: null,
        streamkey: null,
    },
    responseStatus: null
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
        commit('setResponseStatus', result.status);
    },
    async getBroadcastConfigAction({commit, dispatch}, username) {
        const result = await broadcast.getBroadcastConfig(username);
        commit('setResponseStatus', result.status);
        
        if(result.data.info) {
            commit('setBroadcastConfig', result.data.info);
        }
    },
    async enterBroadcastAction({commit}, username) {
        const result = await broadcast.enterRoom(username);
        if(result.status !== 400) { 
            commit('setBroadcastExist', true);
            commit('setStreamURL', result.data.streamurl);
        } else {
            commit('setBroadcastExist', false);
        }
    },
}

const mutations = {
    setBroadcastList(state, list) {
        state.broadcastList = list;
    },
    setStreamURL(state, streamURL) {
        state.streamURL = streamURL;
    },
    setBroadcastExist(state, existState) {
        state.isBroadcastExist = existState;
    },
    setResponseStatus(state, status) {
        state.responseStatus = status;
    },
    setBroadcastConfig(state, info) {
        state.broadcastConfig.show = info.show;
        state.broadcastConfig.roomname = info.roomname;
        state.broadcastConfig.typeNum = info.type == 0 ? 1 : info.type;
        state.broadcastConfig.streamkey = info.streamkey; 
    },
    setRequestListType(state, type) {
        state.requestListType = type;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}