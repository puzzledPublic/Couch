module.exports = (sequelize, DataType) => {
    let Application = sequelize.define('Application', {
        username: { type: DataType.STRING, allowNull: false},
        content: { type: DataType.TEXT, allowNull: false},
        type: { type: DataType.STRING, allowNull: false},
        state: { type: DataType.INTEGER, defaultValue: 0},  //0 비승인, 1 승인, 2 거부
    });

    return Application;
}