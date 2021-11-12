const jwt = require('jsonwebtoken');
const User = require('../models/user');



const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'mmc', (err, decoded) => {
            if(err){
                res.locals.user = null;
                next();
            }
            if(decoded){
                User.findById(decoded.id)
                    .then( user => {
                        const {userName, email, id} = user;
                        res.locals.user = {userName, email, id};
                        next()
                    })
                    .catch(err => {
                        res.locals.user = null;
                        next();
                    })
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {checkUser}


