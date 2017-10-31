const crypto = require('crypto');
const pwSecret = require('../config/dbConfig')['pwSecret'];

module.exports.createDigest = (item) => {
    return crypto.createHmac('sha256', pwSecret).update(item).digest('hex');
}