class Chat {
    constructor(user){
        this.userList = new Map();
    }
    addUser({socketId, username}) {
        this.userList.set(socketId, username);
    }
    removeUser(socketId) {
        return this.userList.delete(socketId);
    }
    getUsername(socketId) {
        return this.userList.get(socketId);
    }
    getUserCount() {
        return this.userList.size;
    }
    hasUsernameAlready(username) {
        for(const i of this.userList) {
            if(i[1] === username) {
                return true;
            }
        }
        return false;
    }
}

module.exports = Chat;