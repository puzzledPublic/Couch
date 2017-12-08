
module.exports = (sequelize, DataType) => {
    let Comment = sequelize.define('Comment', {
        username: { type: DataType.STRING, allowNull: false},
        email: { type: DataType.STRING},
        content: { type: DataType.TEXT, allowNull: false},
        article_id: { type: DataType.INTEGER, allowNull: false},
        password: { type: DataType.STRING},
    });

    return Comment;
}