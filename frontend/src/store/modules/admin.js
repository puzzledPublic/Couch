import * as admin from '../../api/admin';

const state = {
    applicationList : [],
    

}

const getters = {

}

const actions = {
    async getApplicationListAction({commit}) {
        const result = await admin.getApplicationList();
        if(result.status === 200) {
            commit('setApplicationList', result.data);
        }
    },
    async grantApplicationAction({commit}, applicationId) {
        const result = await admin.grantApplication(applicationId);
        if(result.status === 200) {
            //commit('setApplicationState', {applicationId, applicationState:'승인'});
        }
    },
    async rejectApplicationAction({commit}, applicationId) {

    }
}

const mutations = {
    setApplicationList(state, list) {
        state.applicationList = list;
    },
    // setApplicationState(state, {applicationId, applicationState}) {
    //     const application = state.applicationList.find((v) => { v.id === applicationId});
    //     application.state = applicationState;
    // }
}

export default {
    state,
    getters,
    actions,
    mutations
}