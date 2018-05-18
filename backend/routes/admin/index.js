const express = require('express');
const router = express.Router();
const admin = require('./admin');

router.get('/', admin.main);

router.get('/applicationlist', admin.applicationList);

router.get('/applicationgrant/:id', admin.applicationGrant);

router.get('/applicationreject/:id', admin.applicationReject);

module.exports = router;