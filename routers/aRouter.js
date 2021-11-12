const express = require('express');
const aController = require('../controllers/aController');
const {checkUser} = require('../middleWare/auth');


const aRouter = express.Router();

aRouter.post('/Question/:qId/Add-Answer', checkUser, aController.newA);
aRouter.get('/Question/:qId/Answer/Delete/:aId', checkUser, aController.delA);


module.exports = aRouter;