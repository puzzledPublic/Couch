const express = require('express');
const router = express.Router();
const board = require('./board');

/* GET */
router.get('/:boardname', board.enter);

//router.get('/:boardname/page/:page', board.getPage);

router.get('/:boardname/:articleid', board.getArticle);

/* POST */
router.post('/:boardname', board.writeArticle);

//router.post('/:boardname/:articleid', board.writeComment);

module.exports = router;