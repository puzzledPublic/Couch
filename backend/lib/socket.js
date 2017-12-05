const socketIo = require('socket.io');
const Chat = require('../models/chat');
let roomList = {};
module.exports = (server) => {

    const io = socketIo(server);

    io.on('connection', (client) => {
        console.log('socket connected ' + client.id);

        client.on('joinChatRoom', ({roomname, username}) => {
            const userInfo = {socketId: client.id, username: username};
            if(roomList[roomname] === undefined) {
                roomList[roomname] = new Chat();
            }
            roomList[roomname].addUser(userInfo);    
            client.join(roomname);

            io.to(roomname).emit('getUserList', {userList: getUserList(roomList[roomname].userList)});
        });
        
        client.on('sendMessage', ({msg}) => {
            const [socketId, roomname] = Object.keys(client.rooms);
            io.to(roomname).emit('receiveMessage', {
                msg: msg,
                username: roomList[roomname].getUsername(socketId)
            });
        });

        client.on('changeUsername', ({username, userType}) => {
            if(userType === 'guest') {
                username = '(guest) ' + username;
            }
            const [socketId, roomname] = Object.keys(client.rooms);
            const userInfo = {socketId: socketId, username: username};
            if(roomList[roomname] === undefined) {
                return;
            }
            if(roomList[roomname].hasUsernameAlready(username)) {
                client.emit('denyRequest', {msg: '닉네임이 이미 존재합니다.'});
                return;
            }
            roomList[roomname].removeUser(socketId);
            roomList[roomname].addUser(userInfo);
            client.emit('openChat', {openChatFlag : true});
            io.to(roomname).emit('getUserList', {userList: getUserList(roomList[roomname].userList)});
        });
        
        client.on('logout', () => {
            const [socketId, roomname] = Object.keys(client.rooms);
            const userInfo = {socketId: socketId, username: 'guest'};
            if(roomList[roomname] === undefined) {
                return;
            }
            roomList[roomname].removeUser(socketId);
            roomList[roomname].addUser(userInfo);
            client.emit('openChat', {openChatFlag : false});
            io.to(roomname).emit('getUserList', {userList: getUserList(roomList[roomname].userList)});
        });
        client.on('disconnect', () => {
            for(const roomname in roomList) {
                if(roomList[roomname].removeUser(client.id)){
                    if(roomList[roomname].getUserCount() === 0){
                        delete roomList[roomname];
                        break;
                    }
                    io.to(roomname).emit('getUserList', {userList: getUserList(roomList[roomname].userList)});
                    break;
                }
            }
        })
    });
}
function getUserList(userMap) {
    let userList = [];
    userMap.forEach((item) => {
        userList.push(item);
    });
    return userList;
}
