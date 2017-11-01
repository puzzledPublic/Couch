const crypto = require('crypto');
const pwSecret = require('../config/dbConfig')['pwSecret'];

module.exports.createDigest = (item) => {
    return crypto.createHmac('sha256', pwSecret).update(item).digest('hex');
}

module.exports.createStreamKey = () => {
    const text = '01234567890abcdefghijklmnopqrstuvwxyz';
    let streamkey = '';
    for(let i = 0 ; i <= 6 ; i++){
        streamkey += text.charAt(Math.floor(Math.random() * text.length));
    }
    return streamkey;
}