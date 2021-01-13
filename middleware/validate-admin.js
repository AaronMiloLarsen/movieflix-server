const User= require('../db').import('../models/user');

module.exports = (req ,res ,next) => {

    if (req.user.admin === true) {
        next();
    } else {
        res.status(401).send('Not allowed')
    }
};