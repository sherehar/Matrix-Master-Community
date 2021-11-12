const handleErrors = (err) => {
    
    const errors = {};
    Object.values(err.errors).forEach( error => {
        errors[error.properties.path] = error.properties.message;
    })
    return errors
}
const handleUserErrors = (err) => {
    
    let errors = {username : '' , email : '' , password : ''}
    if(err.message === 'incorrect Email'){
    errors.email = 'That email is not registered'
    }
    if(err.message === 'incorrect password'){
    errors.password = 'That password is not correct'
    }
    if(err.code === 11000){
    errors.email = 'That email is already registered'
    return errors;
    }
    if(err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach( error => {
        errors[error.properties.path] = error.properties.message;
    })
    }
    return errors
}
module.exports = {handleErrors,handleUserErrors};
