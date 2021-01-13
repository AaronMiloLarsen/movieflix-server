const router = require('express').Router();
const validateSession = require('../middleware/validate-session');
const Movie = require('../db').import('../models/movie');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// -------------- //
// POST NEW MOVIE //
// -------------- //

router.post('/create', validateSession, (req, res) => {
    const newMovie = {
		title: req.body.movie.title,
		year: req.body.movie.year,
		duration: req.body.movie.duration,
		description: req.body.movie.description
    }
    Movie.create(newMovie)
        .then((movie) => res.status(200).json(movie))
        .catch((err) => res.status(500).json({ error: err }))
});


// -------------- //
// GET ALL MOVIES //
// -------------- //


router.get('/', validateSession, (req, res) => {
    Movie.findAll()
        .then(movie => res.status(200).json(movie))
        .catch(err => res.status(500).json ({ error: err }))
});


// --------------- //
// SEARCH BY TITLE // -- WILL NEED TO UPDATE TO PARAMS FOR SEARCH BAR
// --------------- //


router.get('/search', validateSession, (req, res) => {
    Movie.findAll({
        where: {
            title: {
            [Op.iLike]:`%${req.body.title}%`
		}}
    })
        .then(movie => res.status(200).json(movie))
        .catch(err => res.status(500).json ({ error: err }))
});


// ---------- //
// EDIT MOVIE //
// ---------- //


router.put('/:id', validateSession, (req, res) => {
    const updateMovie = {
		title: req.body.movie.title,
		year: req.body.movie.year,
		duration: req.body.movie.duration,
		description: req.body.movie.description
	}
	const query = {where: { id: req.params.id }}
    Movie.update(updateMovie, query)
        .then((movie) => res.status(200).json(movie))
        .catch((err) => res.status(500).json({ error: err }))
});


// ------------ //
// REMOVE MOVIE //
// ------------ //

router.delete('/:id', validateSession, async (req, res) => {

    try {
    const destroy = await Movie.destroy({
		where: { id: req.params.id }})
       res.status(200).json(destroy)

    } catch (err) {
        res.status(500).json( { error: err })
    }
});


module.exports = router












