const express = require('express');
const router = express.Router();
const board = require('./board');
const upload = require('../../lib/middleware/upload');

/* GET */
router.get('/:boardname', board.enter);

router.get('/:boardname/p/:pageNum', board.enter);

router.get('/a/:articleid', board.getArticle);

/* POST */
router.post('/:boardname', board.writeArticle);

router.post('/:articleid/comment', board.writeComment);

router.post('/upload/image', upload.single('image'), board.uploadImage)

module.exports = router;