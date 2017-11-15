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
        });
        
        client.on('sendMessage', ({msg}) => {
            const [socketId, roomname] = Object.keys(client.rooms);
            io.to(roomname).emit('receiveMessage', {
                msg: msg,
                username: roomList[roomname].getUsername(socketId)
            });
        });

        client.on('changeUsername', ({username}) => {
            const [socketId, roomname] = Object.keys(client.rooms);
            const userInfo = {socketId: socketId, username: username};
            if(roomList[roomname] === undefined) {
                return;
            }
            roomList[roomname].removeUser(socketId);
            roomList[roomname].addUser(userInfo);
        });

        client.on('disconnect', () => {
            for(const item in roomList) {
                if(roomList[item].removeUser(client.id)){
                    if(roomList[item].getUserCount() === 0){
                        delete roomList[item];
                    }
                    break;
                }
            }
        })
    });
}
