const Question = require('../models/question');
const {handleErrors} = require('../config/errorsHandler');
const User = require('../models/user');
const Answer = require('../models/answer');


const homePage =(req,res) =>{
    Question.find().sort({createdAt:-1})
        .then(questions => {
            res.render('homepage',{ pageTitle: 'Matrix Master Community', questions})
        })
        .catch(err => console.log(err))
}
const newQ =(req,res) => {
    const pageTitle ='Add A Question';
    const paction = '/Add-Question';
    if(req.method === 'GET'){
        res.render('addQuestion', {pageTitle, paction , aQuestion:'', aDescription:'', errors: null})
    };
    if(req.method === 'POST'){
        const userId = res.locals.user.id;
        if (userId) {
            const question = new Question(req.body);
            question.user_id = userId;
            question.save()
                .then(() => {
                    res.redirect('/')
                })
                .catch(err => {
                    const errors = handleErrors(err)
                    res.render('addQuestion', {pageTitle, paction,
                        aQuestion: req.body.question,
                        aDescription: req.body.description,
                        errors})
                })
        }
    }
}


const showQ = (req,res) =>{
    Question.findById(req.params.qId).populate('user_id')
        .then( question => {
            Answer.find({question_id: {$in: [question._id]}}).populate('user_id', ['userName', '_id']).sort({createdAt:-1})
                .then(answers => {
                    res.render('showQuestion',{pageTitle: 'Show One Question', question, answers})
                })
                .catch(err => res.send(err))
        })
        .catch( err => {
            res.send(err)
        })
}
const updateQ =(req,res) =>{
    const pageTitle ='Edit Question';
    if(req.method === 'GET'){
        Question.findById(req.params.qId)
            .then( question => {
                const paction = `/Question/Edit/${question._id}`;
                res.render('editQuestion',{pageTitle,
                paction,
                aQuestion: question.question,
                aDescription: question.description,
                errors: null
                })
            })
            .catch( err => {
                res.send(err)
            })
    };
    if(req.method === 'POST'){
        const userId = res.locals.user.id;
        Question.findById(req.params.qId)
            .then(result =>{
                if (userId == result.user_id ) {
                    Question.findByIdAndUpdate (req.params.qId, req.body, {runValidators:true})
                    .then(question  => {
                        res.redirect(`/Question/${question._id}`)
                    })
                    .catch(err => {
                        Question.findById(req.params.qId)
                            .then( question => {
                                const paction =`/Question/Edit/${question._id}`;
                                const errors = handleErrors(err)
                                res.render('editQuestion', {pageTitle, paction,
                                aQuestion: req.body.question,
                                aDescription: req.body.description,
                                errors})
                                
                            })
                            .catch(err => res.send(err))
                    })
                }
            })
            .catch(err => res.send(err))
    };
}
const delQ =(req,res) =>{
    Question.findByIdAndDelete(req.params.qId)
        .then( result => res.redirect('/'))
        .catch( err => res.send('Can not delete this Question'))
}

module.exports = {
    homePage,
    newQ,
    showQ,
    updateQ,
    delQ,
}