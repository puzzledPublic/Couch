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
                roomList[roomname].addUser(userInfo);
            }
            else{
                roomList[roomname].addUser(userInfo);
            }
            client.join(roomname);
        });
        
        client.on('sendMessage', ({msg}) => {
            const keys = Object.keys(client.rooms);
            io.to(keys[1]).emit('receiveMessage', {
                msg: msg,
                username: roomList[keys[1]].getUsername(keys[0])
            });
        })

        client.on('disconnect', () => {
            for(const item in roomList) {
                if(roomList[item].removeUser(client.id)){
                    if(roomList[item].getUserCount() === 0){
                        roomList[item] = undefined;
                    }
                    break;
                }
            }
        })
    });
}
