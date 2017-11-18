
const state = {
    allowGuest: true,
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
            msg: msg,
            time: getCurrentTime(),
        });
    },
    resetMsg(state) {
        state.chatMsgList = [];
    },
    setUserList(state, userList) {
        state.userList = userList;
    },
    addBan(state, user) {
        state.banList.push(user);
    },  
    removeBan(state, user) {
        
    },
    setAllowGuest(state, flag) {
        state.allowGuest = flag;
    }

}

function getCurrentTime() {
    const time = new Date();
    return time.getHours() + ':' + time.getMinutes();
}

export default {
    state,
    getters,
    actions,
    mutations
}


