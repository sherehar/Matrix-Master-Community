const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question : {
        type:String,
        required:[true,'Please insert a question!'],
        minlength:[25, 'The question should has at least 25 characters!']
    },
    description : {
        type:String,
        required:[true,'Please insert a description!'],
        minlength:[100, 'The description should has at least 100 characters!']
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref : User,
    }
}, {timestamps:true})

    
const Question = mongoose.model('question', questionSchema)

module.exports = Question;