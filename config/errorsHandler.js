const handleErrors = (err) => {
    
    const errors = {};
    Object.values(err.errors).forEach( error => {
        errors[error.properties.path] = error.properties.message;
    })
    return errors
}

module.exports = {handleErrors};