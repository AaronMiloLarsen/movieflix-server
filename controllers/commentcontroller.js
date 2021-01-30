const router = require('express').Router();
const validateAdmin = require('../middleware/validate-admin');
const validateSession = require('../middleware/validate-session');
const Comment = require('../db').import('../models/comment');



// ----------- //
// NEW COMMENT //
// ----------- //


router.post('/create', validateSession, (req, res) => {
    const newComment = {
        comment: req.body.comment.comment,
        author: req.body.comment.author,
        userId: req.user.id,
        reviewId: req.body.comment.reviewId
    }
    Comment.create(newComment)
        .then((comment) => res.status(200).json(comment))
        .catch((err) => res.status(500).json({ error: err }))
});


// ----------------- //
// GET YOUR COMMENTS //
// ----------------- //


router.get('/mycomments', validateSession, (req,res) => {
    Comment.findAll({
        where: { author: req.body.author }
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({error: err}))
});


// ------------ //
// EDIT COMMENT //
// ------------ //


router.put('/mycomments/:id', validateSession, (req, res) => {
    const updateComment = {
        comment: req.body.comment,
        author: req.body.author
    }
    const query = { where: { id: req.params.id }}
    Review.update(updateComment, query)
        .then((comment) => res.status(200).json(comment))
        .catch((err) => res.status(500).json({ error: err }))
});


// -------------- //
// REMOVE COMMENT //
// -------------- //

router.delete('/mycomments/:id', validateSession, async (req, res) => {

    try {
    const destroy = await Comment.destroy({ where: { id: req.params.id }})
       res.status(200).json(destroy)

    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// -------------//
// ALL COMMENTS // (BY REVIEW)
// ------------ //

router.get('/allcomments/:reviewId', validateSession, (req, res) => {
    Review.findAll({
        where: { reviewId: req.params.reviewId}
    })
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json ({ error: err }))
});


// ---------------------------//
// REMOVE ANY COMMENT (ADMIN) //
// -------------------------- //

router.delete('/allcomments/:id', validateSession, validateAdmin, async (req, res) => {

    try {
    const destroy = await Comment.destroy({ where: { id: req.params.id }})
       res.status(200).json(destroy)

    } catch (err) {
        res.status(500).json({ error: err })
    }
});


module.exports = router