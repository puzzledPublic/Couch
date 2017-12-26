const doAsync = require('../../lib/doAsync');
const models = require('../../models');
const {body, validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');
const Op = require('sequelize').Op;
const {getPaginationInfo} = require('../../lib/board');
const {Level} =  require('../../config/levelConfig');
const {stringToPositive} = require('../../lib/utils');

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
    const accessAuth = {
        write: level >= boardInfo.write_level ? true : false,
        comment: level >= boardInfo.comment_level ? true : false
    }

    const pageNum = req.params.pageNum && req.params.pageNum > 0 ? req.params.pageNum : 1;
    const limit = 10;
    const offset = limit * (pageNum - 1);
    const articleCount = await models.Article.count({where: {board_id: boardInfo.id}}); 
    const paginationInfo = getPaginationInfo(articleCount, pageNum, limit);
    const foundArticles = await models.Article.findAll({
        attributes: ['id','username', 'title', 'comment_count', 'hit', 'createdAt'], 
        where: {board_id: boardInfo.id},
        order: [['createdAt', 'DESC']],
        offset: offset, 
        limit: limit},
        
    );

    return res.send({
        msg: 'success', 
        boardInfo:{
            accessAuth: accessAuth,
            paginationInfo: paginationInfo,
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
    const articleId = stringToPositive(req.params.articleid); 
    if(articleId < 0) {
        res.status(400).send({msg: 'check params'});
    }
    const articleInfo = await models.Article.findOne({
        attributes:['id','username', 'title', 'content', 'comment_count', 'hit', 'like', 'dislike', 'board_id', 'createdAt'],
        where:{ id: articleId}
    });
    if(!articleInfo) {
        return res.status(404).send({msg: 'no such article exist'});
    }
    const board_id = articleInfo.board_id;
    delete articleInfo.board_id;
    
    const boardInfo = await models.Board.findOne({where: {id: board_id}});
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
    
    const commentInfo = await models.Comment.findAll({
        attributes: ['id', 'username', 'content', 'createdAt'],
        where: {article_id: articleId}
    });

    return res.send({
        articleInfo: articleInfo,
        commentInfo: commentInfo
    });
});

module.exports.uploadImage = (req, res, next) => {
    const image = req.file;
    
    if(!image.mimetype.includes('image')) {
       return res.status(400).send({msg: 'only accept image file'});
    }
    const imageURL = `http://whowant.ml:3000/images/${image.filename}`;
    return res.send({msg: 'image is successfully uploaded', imageURL: imageURL});
}

module.exports.writeComment = doAsync( async (req, res, next) => {
    const articleId = stringToPositive(req.params.articleid); 
    if(articleId < 0) {
        res.status(400).send({msg: 'check params'});
    }
    //TODO::need to validate body..

    const articleInfo = await models.Article.findOne({
        attributes:['id', 'board_id', 'comment_count'],
        where:{ id: articleId}
    });

    if(!articleInfo) {
        return res.status(404).send({msg: 'no such article exist'});
    }

    const board_id = articleInfo.board_id;
    const boardInfo = await models.Board.findOne({where: {id: board_id}});
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

    if(level < boardInfo.comment_level) {
        return res.status(403).send({msg: 'not authorized'});
    }

    let comment = {};
    if(level > Level.GUEST) {
        const userInfo = await models.User.findOne({attributes:['username','email'], where: {username: req.user.username}});
        comment.username = userInfo.username;
        comment.email = userInfo.email;
    }else {
        comment.username = req.body.username;
        comment.password = req.body.password;   //TODO:: need to hash the password..
    }
    comment.content = req.body.content;
    comment.article_id = articleId;
    
    let transaction;

    try{
        transaction = await models.sequelize.transaction();
        await models.Comment.create(comment);
        await articleInfo.increment('comment_count');
        await transaction.commit();
    }
    catch(err) {
        await transaction.rollback();
    }

    const commentInfo = await models.Comment.findAll({
        attributes: ['id', 'username', 'content', 'createdAt'],
        where: {article_id: articleId}
    });

    res.send({msg: 'success', commentInfo: commentInfo});
});