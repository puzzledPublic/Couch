import * as auth from '../../api/auth';

const state = {
    error: {
        status: false,
        msg: null
    },
    userInfo: {
        id: null,
        username: null
    },
    isLogined: false,
    loginModal: '',
}

const getters = {
    username: (state) => { return state.userInfo.username; },
}

const actions = {
    async localLoginAction({commit}, userInfo) {
        const result = await auth.localLogin(userInfo);
        if(result.status === 200) {
            commit('setUserInfo', result.data.user);
            commit('setLoginFlag', true);
            window.localStorage.setItem('COUCH_USER', JSON.stringify(result.data.user));
        }else{
            commit('setError', '잘못된 정보입니다.');
        }
    },
    async createUserAction({commit}, userInfo) {
        const result = await auth.createUser(userInfo);
        if(result.status === 200) {
            commit('setUserInfo', result.data.user);
        }else if(result.status === 409){
            commit('setError', '중복되는 아이디입니다.');
        }else{
            commit('setError', '잘못된 정보입니다.')
        }
    },
    async logoutAction({commit}) {
        const result = await auth.logout();
        commit('setUserInfo', {id: null, username: null});
        commit('setLoginFlag', false);
        window.localStorage.removeItem('COUCH_USER');
    },
    async loginCheckAction({commit}) {
        const result = await auth.loginCheck();
        if(result.status !== 200){
            window.localStorage.removeItem('COUCH_USER');
            commit('setLoginFlag', false);
        }
    }
}

const mutations = {
    setUserInfo(state, userInfo) {
        state.userInfo.id = userInfo.id;
        state.userInfo.username = userInfo.username;
    },
    setError(state, message) {
        state.error.status = true;
        state.error.msg = message;
    },
    resetError(state) {
        state.error.status = false;
    },
    setLoginFlag(state, flag) {
        state.isLogined = flag;
    },
    setLoginModal(state, flag) {
        state.loginModal = flag;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
