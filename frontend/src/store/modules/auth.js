import * as auth from '../../api/auth';

const state = {

}

const getters = {

}

const actions = {
    async localLoginAction({commit}, userInfo) {
        const result = await auth.localLogin(userInfo);
    },
    async createUserAction({commit}, userInfo) {
        const result = await auth.createUser(userInfo);
        console.log(result);
    }
}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}
