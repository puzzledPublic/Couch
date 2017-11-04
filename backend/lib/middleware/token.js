const doAsync = require('../doAsync');
const {createToken, decodeToken} = require('../token');

module.exports = doAsync( async (req, res, next) => {
    const token = req.cookies['access_token'];
    if(!token){
        return next();
    }

    const decoded = await decodeToken(token);
    const {user} = decoded;
    
    if(Date.now() / 1000 - decoded.iat > 15 * 1000) {   
        const refreshToken = await createToken({user}, {subject : 'user', expiresIn: '30s'});
        res.cookie('access_token', refreshToken, {maxAge: 30 * 1000, httpOnly: true});
    }

    req.user = user;

    return next();
});