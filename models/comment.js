
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Comment
}