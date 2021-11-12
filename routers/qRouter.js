const express = require('express');
const qController = require('../controllers/qController');
const {checkUser} = require('../middleWare/auth');


const qRouter = express.Router();


qRouter.get('/', checkUser, qController.homePage);
qRouter.all('/Add-Question/', checkUser, qController.newQ);
qRouter.get('/Question/:qId', checkUser, qController.showQ);
qRouter.all('/Question/Edit/:qId', checkUser, qController.updateQ);
qRouter.get('/Question/Delete/:qId', checkUser, qController.delQ);


module.exports = qRouter;