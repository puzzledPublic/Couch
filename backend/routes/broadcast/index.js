const express = require('express');
const router = express.Router();
const broadcast = require('./broadcast');

/* GET */
router.get('/:username', broadcast.enter);

router.get('/:username/info', broadcast.getInfo);

router.get('/list/:type', broadcast.list);

/* POST */
router.post('/application', broadcast.apply);

/* PUT */
router.put('/:username/info', broadcast.infoValidator, broadcast.putInfo);


module.exports = router;