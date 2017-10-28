var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'default page' });
});

router.use('/user', require('./user'));

module.exports = router;
