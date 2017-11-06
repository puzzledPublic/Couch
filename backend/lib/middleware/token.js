const doAsync = require('../doAsync');
const {createToken, decodeToken} = require('../token');

module.exports = doAsync( async (req, res, next) => {
    const token = req.cookies['access_token'];
    if(!token){
        return next();
    }

    const decoded = await decodeToken(token);
    const {user} = decoded;
    
    if(Date.now() - decoded.iat * 1000 > 30 * 1000) {  //30초 이상 지난 경우 
        const refreshToken = await createToken({user}, {subject : 'user', expiresIn: '60s'});
        res.cookie('access_token', refreshToken, {maxAge: 30 * 1000, httpOnly: true});
    }

    req.user = user;

    return next();
});