
const state = {
    guestname: null,
    chatMsgList: [],
    userList: [],
    banList: [],

}

const getters = {

}

const actions = {

}

const mutations = {
    addMsg(state, {msg, username}) {
        state.chatMsgList.push({
            username: username,
            msg: msg
        });
    },
    setUserList(state, userList) {
        state.userList = userList;
    },
    addBan(state, user) {
        state.banList.push(user);
    },  
    removeBan(state, user) {
        
    },
    setGuestName(state, guestname) {
        state.guestname = guestname;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}


