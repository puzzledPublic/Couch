const Hash = require('../lib/hash');
const JWToken = require('../lib/token');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique : true },
        level: { type: DataTypes.TINYINT(4), defaultValue: 1 },
        facebookId: DataTypes.STRING,
        facebookToken: DataTypes.STRING,
        googleId: DataTypes.STRING,
        googleToken: DataTypes.STRING,
    });

    User.createUser = async (user) => {

        user.password = Hash.createDigest(user.password);

        return await User.create({
            username: user.username,
            password: user.password,
            email: user.email
        }); 
    }

    User.prototype.comparePassword = function(password) {
        if(this.password === Hash.createDigest(password)){
            return true;
        }
        return false;
    }

    User.prototype.createToken = function() {
        const {id, username} = this;
        return JWToken.createToken({
            user: {
                id,
                username
            }
        }, {subject: 'user', expiresIn: '5m'});
    }

    return User;
}