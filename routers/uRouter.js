const express = require('express');
const uController = require('../controllers/uController');
const {checkUser} = require('../middleWare/auth');

const uRouter = express.Router();

uRouter.all('/login',checkUser, uController.logInF);
uRouter.all('/signup',checkUser, uController.signUpF);
uRouter.get('/logout',checkUser, uController.logOutF);
uRouter.get('/Profile/:id',checkUser, uController.userInfo);

module.exports = uRouter;