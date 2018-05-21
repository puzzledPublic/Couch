const express = require('express');
const router = express.Router();
const admin = require('./admin');

//get
router.get('/', admin.main);

router.get('/application/list', admin.applicationList);

//post
router.post('/application/grant', admin.applicationGrant);

//put
router.put('/application/reject', admin.applicationReject);

module.exports = router;