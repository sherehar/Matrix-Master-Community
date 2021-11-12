const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sherehar:11220099@cluster0.di5o6.mongodb.net/MatrixMasterCommunity')
    .then(()=> console.log('The DB is connected...'))
    .catch(err => console.log(err))


