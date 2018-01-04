
module.exports = (sequelize, DataType) => {
    let Article = sequelize.define('Article', {
        username: { type: DataType.STRING, allowNull: false},
        email: { type: DataType.STRING},
        title: { type: DataType.STRING, allowNull: false},
        content: { type: DataType.TEXT, allowNull: false},
        comment_count: { type: DataType.INTEGER, defaultValue: 0},
        hit: { type: DataType.INTEGER, defaultValue: 0},
        like: { type: DataType.INTEGER, defaultValue: 0},
        dislike: { type: DataType.INTEGER, defaultValue: 0},
        board_id: { type: DataType.INTEGER, allowNull: false},
        password: { type: DataType.STRING},
        is_user: { type: DataType.BOOLEAN, defaultValue: false}
    });

    return Article;
}