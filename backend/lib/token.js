const jwt = require('jsonwebtoken');
const {secret, signOption} = require('../config/jwtConfig');

function createToken(payload, options){
    signOption.subject = options.subject;
    signOption.expiresIn = options.expiresIn;
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, signOption, (err, token) => {
            if(err){
                reject(err);
            }
            resolve(token);
        });
    });
}

function decodeToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                reject(err);
            }
            resolve(decoded);
        });
    });
}

module.exports.createToken = createToken;
module.exports.decodeToken = decodeToken;
