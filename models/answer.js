const mongoose = require('mongoose');
const User = require('./user');
const Question = require('./question');


const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer : {
        type:String,
        required:[true,'Please insert an answer!'],
        minlength:[25, 'The answer should has at least 25 characters!']
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref : User
    },
    question_id : {
        type: Schema.Types.ObjectId,
        ref : Question
    }
}, {timestamps:true})



const Answer = mongoose.model('answer', answerSchema)

module.exports = Answer;