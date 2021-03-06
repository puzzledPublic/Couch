const express = require('express');
const router = express.Router();
const board = require('./board');
const upload = require('../../lib/middleware/upload');

/* GET */
router.get('/info', board.getInfo);

router.get('/list', board.getBoardList);

router.get('/:boardname', board.enter);

router.get('/:boardname/p/:pageNum', board.enter);

router.get('/a/:articleid', board.getArticle);

/* POST */
router.post('/:boardname', board.writeArticle);

router.post('/a/:articleid', board.validateArticlePassword);

router.post('/:articleid/comment', board.writeComment);

router.post('/upload/image', upload.single('image'), board.uploadImage)

/* PUT */
router.put('/a/:articleid', board.modifyArticle);

router.put('/info', board.putInfo);
/* DELETE */
router.delete('/a/:articleid', board.deleteArticle);

module.exports = router;