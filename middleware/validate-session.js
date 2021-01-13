const jwt = require('jsonwebtoken');
const User= require('../db').import('../models/user');
 
 
module.exports = async (req, res, next) => {
    const token= req.headers.authorization; 

    try{
        const decoded= await jwt.verify(token, process.env.JWT_SECRET)
        const user= await User.findOne({where: {id: decoded.id}});
        if(!user) throw new Error('no user found'); 
        req.user= user; 
        next();
 
    } catch (err){
        res.status(500).json({error:err});
    }
};
