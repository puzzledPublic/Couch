const express = require('express');
const router = express.Router();
const admin = require('./admin');

router.get('/', admin.main);

module.exports = admin;