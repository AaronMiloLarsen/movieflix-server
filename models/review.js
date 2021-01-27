
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // movie: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        emotion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })
    return Review
}