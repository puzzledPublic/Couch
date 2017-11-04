import * as broadcast from '../../api/broadcast';

const state = {

}

const getters = {
    
}

const actions = {
    async getBroadcastListAction({commit}, broadcastType) {
        const result = await broadcast.getBroadcastList(broadcastType);
        console.log(result.data);
    },
}

const mutations = {
    
}

export default {
    state,
    getters,
    actions,
    mutations
}