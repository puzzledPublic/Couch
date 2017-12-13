const doAsync = require('../../lib/doAsync');
const models = require('../../models');
const {body, validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');
const Op = require('sequelize').Op;
const {getPagenationInfo} = require('../../lib/board');
const {Level} =  require('../../config/levelConfig');

module.exports.enter = doAsync( async (req, res, next) => {
    const boardname = req.params.boardname;
    const boardInfo = await models.Board.findOne({where: {name: boardname}});
    
    if(!boardInfo) {
        return res.status(404).send({msg: 'no such board exist'});
    }

    const level = Level.GUEST;
    if(req.user) {
        level = Level.USER;
        if(req.user.username === boardInfo.owner) {
            level = Level.OWNER;
        }
    }

    if(level < boardInfo.read_level) {
        return res.status(403).send({msg: 'not authroized'});
    }
    const limit = 10;
    const pageNum = req.params.pageNum && req.params.pageNum > 0 ? req.params.pageNum : 1;
    const articleCount = await models.Article.count({where: {board_id: boardInfo.id}}); 
    const pagenationInfo = getPagenationInfo(articleCount, pageNum, limit);
    const foundArticles = await models.Article.findAll({
        attributes:['id','username', 'title', 'comment_count', 'hit', 'createdAt'], 
        where: {board_id: boardInfo.id}, offset: 0, limit: limit}
    );

    return res.send({
        msg: 'success', 
        boardInfo:{
            pagenationInfo: pagenationInfo,
            articles: foundArticles
        }
    });

});

module.exports.writeArticle = doAsync( async (req, res, next) => {
    const boardname = req.params.boardname;

    const boardInfo = await models.Board.findOne({where: {name: boardname}});
    if(!boardInfo) {
        return res.status(404).send({msg: 'no such board exist'});
    }

    const level = Level.GUEST;
    if(req.user) {
        level = Level.USER;
        if(req.user.username === boardInfo.owner) {
            level = Level.OWNER;
        }
    }

    if(level < boardInfo.write_level) {
        return res.status(403).send({msg: 'not authorized'});
    }
    //TODO: input validation
    /*
    const validateResult = validationResult(req);
    if(!validateResult.isEmpty()) {
        return res.status(400).send({msg: 'bad request'});
    }

    const params = matchedData(req);
    */
    let article = {};
    if(level > Level.GUEST) {
        const userInfo = await models.User.findOne({attributes:['username','email'], where: {username: req.user.username}});
        article.username = userInfo.username;
        article.email = userInfo.email;
    }else {
        article.username = req.body.username;
        article.password = req.body.password;   //TODO:: need hashing..
    }
    article.title = req.body.title;
    article.content = req.body.content;
    article.board_id = boardInfo.id;

    await models.Article.create(article);

    return res.send({msg:'article is created'});
});

module.exports.writeArticleValidator = [

];

module.exports.getArticle = doAsync( async (req, res, next) => {
    const boardname = req.params.boardname;
    const articleId = req.params.articleid; //TODO::check that articleId is INTEGER

    const boardInfo = await models.Board.findOne({where: {name: boardname}});
    if(!boardInfo) {
        return res.status(404).send({msg: 'no such board exist'});
    }

    const level = Level.GUEST;
    if(req.user) {
        level = Level.USER;
        if(req.user.username === boardInfo.owner) {
            level = Level.OWNER;
        }
    }

    if(level < boardInfo.read_level) {
        return res.status(403).send({msg: 'not authorized'});
    }

    const articleInfo = await models.Article.findOne({
        attributes:['username', 'title', 'content', 'comment_count', 'hit', 'like', 'dislike'],
        where:{ id: articleId}
    });

    if(!articleInfo) {
        return res.status(404).send({msg: 'no such article exist'});
    }
    
    return res.send({
        articleInfo: articleInfo,
    });
});
