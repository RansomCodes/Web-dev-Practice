module.exports.handleErrors=(err)=>{
    console.log(err.message,err.code)
    let errors={email: '',password: '', username: ''};

    //duplicate error code
    if(err.code===11000){
        errors.email='That email is already registered'
        return errors
    }

    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.name]=properties.message
        });
    }

    return errors;
}