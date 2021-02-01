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


// ---------------//
// GET MY REVIEWS // (FOR PROFILE)
// ---------------//


router.get('/myreviews/:userId', validateSession, (req, res) => {
    Review.findAll({
        include: 'comments',
        where: {userId: req.params.userId}
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json ({ error: err }))
});


// ----------- //
// EDIT REVIEW // (BY ID)
// ----------- //


router.put('/:id', validateSession, (req, res) => {
    const updateReview = {
        title: req.body.review.title,
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


router.delete('/:id', validateSession, async (req, res) => {

    try {
    const destroy = await Review.destroy({
         where: { id: req.params.id }})
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
        include: 'comments',
        where: { movieId: req.params.movieId}
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json ({ error: err }))
});


module.exports = router

// where: { movieId: req.body.review.movieId}