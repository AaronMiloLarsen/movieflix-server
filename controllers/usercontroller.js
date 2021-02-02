const router = require('express').Router();
const User= require('../db').import('../models/user');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const validateSession = require('../middleware/validate-session');
const validateAdmin = require('../middleware/validate-admin');
// const review = require('../models');
// const comment = require('../models');
// const movie = require('../models')


// ----------- //
// USER SIGNUP //
// ----------- //

router.post('/signup', (req, res) => {
    User.create({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 12),
        admin: req.body.user.admin
        
    })
    .then(user =>{
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: "30d"})
 
        res.json({
            user:user,
            message:"user was created successfully",
            sessionToken: token
        });
    })
    .catch(err => res.status(500).send(err))
});

// ---------- //
// USER LOGIN //
// -----------//

router.post('/login', (req, res) => {

    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
        .then(function loginSuccess(user) {
            if (user) {

                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                    if (matches) {
                        
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

                        res.status(200).json({
                            user: user,
                            message: "User successfully logged in!",
                            sessionToken: token
                        })

                    } else {
                        res.status(502).send({ error: 'Login Failed' });
                    }
                });
                
            } else {
                res.status(500).json({ error: 'User does not exist.' })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

// ------------------- //
// USER DELETE (ADMIN) //
// ------------------- //

router.delete('/:id', validateSession, validateAdmin, async (req, res) => {

    try {
        const destroy = await User.destroy({ where: {id: req.params.id }})
        res.status(200).json(destroy)

    } catch (err) { 
        res.status(500).json({error: err })
    }
});

// ------------------//
// ALL USERS (ADMIN) //
// ------------------//

router.get('/all', validateSession, validateAdmin, (req, res) => {
    User.findAll({ include: ['movie', 'review', 'comments']})
    // User.findAll()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json ({ error: err }))
});



module.exports = router;
