const keyGenerator = require('../lib/hash');

module.exports = (sequelize, DataType) => {
    let Broadcast = sequelize.define('Broadcast', {
        username: { type: DataType.STRING, unique: true },
        show: { type: DataType.BOOLEAN, defaultValue: false },
        roomname: DataType.STRING,
        streamkey: DataType.STRING, 
        type: { type: DataType.INTEGER, defaultValue: 0} 
    });

    Broadcast.createBroadcast = async (username) => {

        const streamkey = keyGenerator.createStreamKey();

        await Broadcast.create({
            username: username,
            streamkey: streamkey
        });
    }

    return Broadcast;
}