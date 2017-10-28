module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
        username: { type : DataTypes.STRING, unique: true },
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        facebookId: DataTypes.STRING,
        facebookToken: DataTypes.STRING,
        googleId: DataTypes.STRING,
        googleToken: DataTypes.STRING,
        hasroom: DataTypes.BOOLEAN,
        roomname: DataTypes.STRING
    });

    return User;
}