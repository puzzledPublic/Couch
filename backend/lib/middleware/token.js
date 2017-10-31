const doAsync = require('../doAsync');
const {createToken, decodeToken} = require('../token');

module.exports = doAsync( async (req, res, next) => {
    const token = req.cookies['access_token'];

    if(!token){
        return next();
    }

    const decoded = await decodeToken(token);
    const {user} = decoded;
    
    if(Date.now() / 1000 - decoded.iat > 60 * 60 * 24 * 3) {
        const refreshToken = await createToken({user}, {subject : 'user'});
        res.cookie('access_token', refreshToken, {maxAge: 6 * 60 * 60 * 100, httpOnly: true});
    }

    req.user = user;

    return next();
});