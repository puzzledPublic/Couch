var express = require('express');
var router = express.Router();
var user = require('./users');

/* GET users listing. */
router.get('/', user.main);

module.exports = router;
