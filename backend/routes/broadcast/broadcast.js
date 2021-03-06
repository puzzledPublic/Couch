const doAsync = require('../../lib/doAsync');
const models = require('../../models');
const broadcastLib = require('../../lib/broadcast');
const {body, validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');
const Op = require('sequelize').Op;

module.exports.enter = doAsync( async (req, res, next) => {
    const username = req.params.username;

    const info = await models.Broadcast.findOne({where: {username: username, show: true}});

    if(!info || !info.show) {
        return res.status(400).send({msg: 'no such stream exist'});
    }

    const streamURL = broadcastLib.createStreamURL(info.streamkey);

    res.send({msg: 'enter', enter: info, streamurl: streamURL});

});

module.exports.getInfo = doAsync( async (req, res, next) => {
    const username = req.params.username;
    if(!req.user || req.user.username !== username) {
        return res.status(403).send({msg: 'not authorized'});
    }

    const info = await models.Broadcast.findOne({where: {username: username}});
    if(!info) {
        let applicationInfo = {isExist: false, state: -1 };
        //const application = await models.Application.findOne({where: {username: username, type: 'broadcast'}});
        const application = await models.Application.findAll({
            where: {username: username, type: 'broadcast'},
            order: [['createdAt', 'DESC']],
            limit: 1
        });
        if(application[0]) {
            applicationInfo.isExist = true;
            applicationInfo.state = application[0].state;
        }
        return res.status(404).send({msg: 'no such info exist', applicationInfo: applicationInfo});
    }
    
    //info.type = broadcastLib(info.type); 

    res.send({msg: 'info', info: info});
});

module.exports.putInfo = doAsync( async (req, res, next) => {
    const username = req.params.username;
    if(!req.user || req.user.username !== username) {
        return res.status(403).send({msg: 'not authorized'});
    }

    const validateResult = validationResult(req);
    if(!validateResult.isEmpty()) {
        return res.status(400).send({msg: 'bad request'});
    }

    const infoParam = matchedData(req);
    infoParam.type = broadcastLib.typeToInt(infoParam.type);
    infoParam.username = username;

    await models.Broadcast.updateInfo(infoParam);

    res.send({msg: 'successfully updated'});
    
});

module.exports.infoValidator = [
    body('show').isBoolean(),
    body('roomname').isLength({min: 4, max: 100}).escape(),
    body('type').isAlpha()
]

module.exports.list = doAsync( async (req, res, next) => {
    const searchType = req.params.type;
    const typeNum = broadcastLib.typeToInt(searchType);
    if(typeNum == null) {
        return res.status(404).send({msg: 'no such list exist'});
    }
    
    const list = await models.Broadcast.findAll({
        attributes: ['username', 'roomname', 'type'], 
        where: {show: true, type: typeNum == 0 ? {[Op.like]: '_'}: typeNum }
    });

    res.send({msg: 'list', list: list});

});

module.exports.apply = doAsync( async (req, res, next) => {

    const {email, username, content, type }  = req.body;

    if(!req.user || req.user.username !== username) {
        return res.status(400).send({msg: 'bad request. no such user exist'});
    } 
    
    const user = await models.Application.findOne({where: {email: email}});

    if(!user) {
        return res.status(400).send({msg: 'bad request. no such user exist'});
    }

    await models.Application.create({
        email: email,
        username: username, 
        content: content, 
        type: type
    });

    res.send({msg: 'success'});
});