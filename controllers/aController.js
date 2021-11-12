const Answer = require('../models/answer');
const Question = require('../models/question');
const {handleErrors} = require('../config/errorsHandler');
const User = require('../models/user');


const newA =(req,res) => {
    if(req.method === 'POST'){
        const userId = res.locals.user.id;
        if (userId) {
            const answer = new Answer(req.body);
            answer.user_id = res.locals.user.id;
            answer.question_id = req.params.qId;
            answer.save()
                .then(() => {
                    res.redirect(`/Question/${req.params.qId}`)
                })
                .catch(err => {
                    res.redirect(`/Question/${req.params.qId}`)
                })
        }
    }
}


const delA =(req,res) => {
    Answer.findByIdAndDelete(req.params.aId)
    .then( result => res.redirect(`/Question/${req.params.qId}`))
    .catch( err => res.send('Can not delete this Answer'))
}

module.exports = {
    newA,
    delA
}
