const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({
    userName: {
        type: String,
        required: [true, 'Please insert a name!']
    },
    email: {
        type: String,
        required: [ true, 'Please insert an email address!' ],
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Please insert a valid email!']
    },
    password: {
        type: String,
        required: [ true, "Please insert a password!" ],
        minlength: [ 5, "Password should has at least 5 characters!"]
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


userSchema.statics.loginCheck = async function(email, password){
    if(!email) throw new Error('Email is Empty');
    if(!password) throw new Error('Password is Empty');
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth) return user;
        throw new Error('incorrect password')
    }
        throw new Error('incorrect Email')
}



const User = mongoose.model('user', userSchema);

module.exports = User;