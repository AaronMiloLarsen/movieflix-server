const router = require('express').Router();
const validateSession = require('../middleware/validate-session');
const Review = require('../db').import('../models/review')

// ---------- //
// NEW REVIEW //
// ---------- //


router.post('/create/', validateSession, (req, res) => {
    const newReview = {
        title: req.body.review.title,
        emotion: req.body.review.emotion,
        review: req.body.review.review,
        author: req.body.review.author,
        userId: req.user.id,
        movieId: req.body.review.movieId
    }
    Review.create(newReview)
        .then((review) => res.status(200).json(review))
        .catch((err) => res.status(500).json({ error: err }))
});


// ---------------- //
// GET YOUR REVIEWS // (BY USERID)
// ---------------- //


router.get('/myreviews', validateSession, (req, res) => {
    Review.findAll({
        where: { userId: req.user.id }
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json ({ error: err }))
});


// ----------- //
// EDIT REVIEW //
// ----------- //


router.put('/myreviews/:id', validateSession, (req, res) => {
    const updateReview = {
        title: req.body.review.title,
        // movie: req.body.review.movie, //may end up making this req.movie.id to attach to movie db
        emotion: req.body.review.emotion,
        review: req.body.review.review,
        author: req.body.review.author,
    }
    const query = { where: { id: req.params.id }}
    Review.update(updateReview, query)
        .then((review) => res.status(200).json(review))
        .catch((err) => res.status(500).json({ error: err }))
});


// ------------- //
// DELETE REVIEW //
// ------------- //


router.delete('/myreviews/:id', validateSession, async (req, res) => {

    try {
    const destroy = await Review.destroy({ where: { id: req.params.id }})
       res.status(200).json(destroy)

    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// ------------//
// ALL REVIEWS // (by Movie)
// ------------//

router.get('/allreviews/:movieId', validateSession, (req, res) => {
    Review.findAll({
        where: { movieId: req.params.movieId}
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json ({ error: err }))
});


module.exports = router

// where: { movieId: req.body.review.movieId}