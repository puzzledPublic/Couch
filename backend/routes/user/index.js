var express = require('express');
var router = express.Router();
var user = require('./users');

/* GET users listing. */
router.get('/', user.main);

router.get('/logout', user.logout);

router.get('/check', user.check);

/* POST users listing. */
router.post('/create', user.createValidator, user.create);

router.post('/login/local', user.loginLocalVaildator, user.loginLocal);


module.exports = router;
