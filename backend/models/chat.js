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
}

module.exports = Chat;