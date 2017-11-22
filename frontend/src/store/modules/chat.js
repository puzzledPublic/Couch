
const state = {
    allowGuest: true,
    chatMsgList: [],
    userList: [],
    banList: [],
    guestCount: 0
}

const getters = {

}

const actions = {

}

const mutations = {
    addMsg(state, {msg, username}) {
        if(state.banList.includes(username)) {
            return;
        }
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
        state.guestCount = 0;
        userList.forEach((username) => {
            if(username === 'guest') {
                state.guestCount++;
            }
        });
        state.userList = userList;
    },
    addBan(state, username) {
        if(state.banList.includes(username)) {
            return;
        }
        state.banList.push(username);
    },  
    removeBan(state, username) {
        if(state.banList.includes(username)) {
            const index = state.banList.indexOf(username);
            state.banList = Array.prototype.concat.call(state.banList.slice(0, index), state.banList.slice(index + 1));
        }
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


