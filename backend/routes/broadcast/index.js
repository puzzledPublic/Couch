const express = require('express');
const router = express.Router();
const broadcast = require('./broadcast');

/* GET */
router.get('/:username', broadcast.enter);

router.get('/:username/info', broadcast.info);

router.get('/list/:type', broadcast.list);

/* POST */

module.exports = router;