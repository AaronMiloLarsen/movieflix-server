const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: process.env.DATABASE_URL.includes('localhost') ?  {
        
    }: 
    {
        ssl: {
            require: true,
            rejectUnauthorized: false, 
          },
    }
});

database.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err => console.log(err));



User = database.import('./models/user');
Comments = database.import('./models/comment');
Movie = database.import('./models/movie');
Review = database.import('./models/review')

Movie.belongsTo(User);
User.hasMany(Movie, {as: 'movie'})

Review.belongsTo(User);
User.hasMany(Review, {as: 'review'})

Comments.belongsTo(User);
User.hasMany(Comments, {as: 'comments'});

Review.belongsTo(Movie);
Movie.hasMany(Review, {as: 'review'});

Comments.belongsTo(Review);
Review.hasMany(Comments, {as: 'comments'});

// Comments.belongsTo(Movie);
// Movie.hasMany(Comments, {as: 'comments' })


module.exports = database;