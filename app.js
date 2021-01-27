require('dotenv').config();

const express = require('express');
const app = express();


const sequelize = require('./db');
sequelize.sync({});

// ----------- //
// CONTROLLERS //
// ----------- //

const user = require('./controllers/usercontroller')
const review = require('./controllers/reviewcontroller')
const movie = require('./controllers/moviecontroller')
const comment = require('./controllers/commentcontroller')
// app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(require('./middleware/headers'));

// ------ //
// MODELS //
// ------ //

app.use('/user', user)
app.use('/review', review)
app.use('/movie', movie)
app.use('/comment', comment)

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`));


app.get('/', (req,res) => res.render('index'));
