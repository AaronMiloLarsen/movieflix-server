
module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('movie', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
            type:DataTypes.INTEGER,
            allownull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
       
        //possibly add link to video trailer via youtube or IMDB database as well as movie poster/art

        
    })
    return Movie
}