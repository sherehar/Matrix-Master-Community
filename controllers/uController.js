const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Question = require('../models/question');
const { handleErrors , handleUserErrors} = require('../config/errorsHandler');


const maxAge = 3 * 24 * 60 * 60;
const createToken = id => jwt.sign({ id }, 'mmc', { expiresIn: maxAge});


const userInfo = (req,res) =>{
    const userId = req.params.id;
    User.findById(userId)
        .then(info => {
            Question.find({user_id: {$in: [info._id]}}).populate('user_id').sort({createdAt:-1})
            .then(questions =>{
                res.render('userInfo', {pageTitle: 'My Profile', info, questions})
            })
        })
        .catch(err => res.send(err))
}
    const logInF = async (req, res) => {
    if(req.method === 'GET'){
        res.render('logIn', {pageTitle: 'Log In', errors:null})
    };

    if(req.method === 'POST'){
        try {
            const { email, password } = req.body;
            const user = await User.loginCheck(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
            res.redirect('/');
        }
        catch( err ) {
            const errors = handleUserErrors(err)
            res.render('logIn', {pageTitle: 'log In',errors})
            
        }
    };
}

const signUpF = async (req, res) => {
    const pageTitle = 'Sign Up';
    if(req.method === 'GET'){
        res.render('SignUp', {pageTitle: 'sign Up', errors: null});
    };
    if(req.method === 'POST'){
        const { userName, email, reEmail, password } = req.body;
        if(email !== reEmail) throw Error('Email is Not Matched');
        try{
            const user = await User.create({ userName, email, password })
            const token = createToken(user.id)
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
            res.redirect('/')
        }
        catch(err){
            const errors = handleUserErrors(err)
            res.render('signUp',{pageTitle: ' sign Up', errors})
        }
        
    };
}

const logOutF = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/')
}

module.exports = {
    logInF,
    signUpF,
    logOutF,
    userInfo
}

