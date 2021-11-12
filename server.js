const express = require('express');
const qRouter = require('./routers/qRouter');
const aRouter = require('./routers/aRouter');
const uRouter = require('./routers/uRouter');
const cookieParser = require('cookie-parser');
require('./config/mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(qRouter,aRouter,uRouter);
app.use(express.static('public'));



app.listen(2000 , () => console.log('The server is running in port 2000...'));
