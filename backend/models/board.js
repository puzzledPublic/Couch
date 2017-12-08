
module.exports = (sequelize, DataType) => {
    let Board = sequelize.define('Board', {
        name: { type: DataType.STRING, unique: true},
        owner: { type: DataType.STRING, allowNull: false},
        read_level: { type: DataType.TINYINT(4), defaultValue: 0},
        write_level: { type: DataType.TINYINT(4), defaultValue: 0},
        comment_level: { type: DataType.TINYINT(4), defaultValue: 0},
    });

    return Board;
}