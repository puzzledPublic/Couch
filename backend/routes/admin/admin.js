const doAsync = require('../../lib/doAsync');
const models = require('../../models');
const {applicationState} = require('../../config/commonCode');
const {createStreamKey} = require('../../lib/hash');

module.exports.main = doAsync( async (req, res, next) => {
    res.send('welcome to admin page');
});

module.exports.applicationList = doAsync( async (req, res, next) => {
    const applicationList = await models.Application.findAll();
    applicationList.map((v) => {
        v.set('state', applicationState[v.get('state')]);
    })
    return res.send(applicationList);
});

module.exports.applicationGrant = doAsync( async (req, res, next) => {
    const { applicationId } = req.body;
    const applicationInfo = await models.Application.find({where: {id : applicationId}});

    if(applicationInfo && applicationInfo.get('state') === 0) {
        let transaction; 

        try {
            transaction = await models.sequelize.transaction();
    
            const applicationType = applicationInfo.get('type');
            if(applicationType === 'broadcast') {
                await models.Broadcast.create({
                    username: applicationInfo.get('username'),
                    show: false,
                    roomname: applicationInfo.get('username') + '의 방송',
                    streamkey: createStreamKey(), 
                });
            }
            else if(applicationType === 'board') {
                await models.Broadcast.create({
                    name: application.get('username'),
                    owner: application.get('username')
                });
            }
            await models.Application.update({
                state: 1
            }, {where: {id: applicationId}});

            await transaction.commit();
        }
        catch(e) {
            await transaction.rollback();
            return res.status(500).send({result: 'internal error'})
        }
        return res.send({result: 'success'});
    }
    else if(applicationInfo.get('state') !== 0) {
        return res.status(401).send({result: 'already stated'});
    }
    return res.status(404).send({result: 'application is not exist'});
});

module.exports.applicationReject = doAsync( async (req, res, next) => {
    const { applicationId } = req.body;
    const applicationInfo = await models.Application.find({where: {id : applicationId}});
    if(applicationInfo && applicationInfo.get('state') === 0) {
        await models.Application.update({state: 2 }, {where: {id: applicationId}});
        return res.send({result: 'success'});
    }
    else if(applicationInfo.get('state') !== 0) {
        return res.status(401).send({result: 'already stated'});   
    }
    return res.status(404).send({result: 'application is not exist'})
});