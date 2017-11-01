const doAsync = require('../../lib/doAsync');
const models = require('../../models');
const broadcastLib = require('../../lib/broadcast');

module.exports.enter = doAsync( async (req, res, next) => {
    const username = req.params.username;

    const info = await models.Broadcast.findOne({where: {username: username}});

    if(!info || !info.show){
        return res.status(400).send({msg: 'no such stream exist'});
    }

    info.streamURL = broadcastLib.createStreamURL(info.streamkey);

    res.send({msg: 'enter', enter: info});

});

module.exports.info = doAsync( async (req, res, next) => {
    const username = req.params.username;
    if(!req.user || req.user.username != username){
        return res.status(403).send({msg:'not authorized'});
    }

    const info = await models.Broadcast.findOne({where: {username: username}});

    if(!info){
        return res.status(404).send({msg: 'no such info exist'});
    }

    //info.type = broadcastLib(info.type); 

    res.send({msg: 'info', info: info});
});

module.exports.list = doAsync( async (req, res, next) => {
    const searchType = req.params.type;
    const typeNum = broadcastLib.typeToInt(searchType);
    if(typeNum == null){
        return res.status(404).send({msg: 'no such list exist'});
    }
    
    const list = await models.Broadcast.findAll({
        attributes: ['username', 'roomname', 'type'], 
        where: {show: true, type: typeNum == 0? '*': typeNum }
    });

    res.send({msg: 'list', list: list});

});