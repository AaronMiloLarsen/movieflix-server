const Sequelize = require('sequelize');

const database = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

database.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err => console.log(err));



User = database.import('./models/user');
Comments = database.import('./models/comment');
Movie = database.import('./models/movie');
Review = database.import('./models/review')

Comments.belongsTo(User);
User.hasMany(Comments);

Review.belongsTo(User);
User.hasMany(Review)

Review.belongsTo(Movie);
Movie.hasMany(Review);

Comments.belongsTo(Review);
Review.hasMany(Comments);




module.exports = database;