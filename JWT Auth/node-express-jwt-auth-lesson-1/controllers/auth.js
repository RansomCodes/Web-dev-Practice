const User =require('../models/User');
const jwt=require('jsonwebtoken');

//handle error

const handle_errors=(err)=>{
    console.log(err.message,err.code);
    let error={email:'', password: ''};

    //duplicate error code
    if(err.code===11000)
    {
        error.email="That email is already registered";
        return error;
    }

    //validation errors
    if(err.message.includes('User validation failed'))
    {
        Object.values(err.errors).forEach(({properties})=>{
            error[properties.path]=properties.message;
        });
    }

    //incorrect email
    if(err.message === 'Incorrect Email')
    {
        error.email='That email is not registered';
    }

    if(err.message === 'Email or password is incorrect')
    {
        error.password='That password is Incorrect';
    }

    return error;
}

const maxAge=3*24*60*60; //time is seconds
const createToken=(id)=>{
    return jwt.sign({ id },'Manmeet pratap Singh',{
        expiresIn: maxAge,
    });
}

module.exports.signup_get=(req,res)=>{
    res.render('signup');
}

module.exports.signup_post=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=new User({email,password});
        await user.save();
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge: 1000*maxAge});
        res.status(201).json({user: user._id});
    }
    catch(e){
        const err=handle_errors(e);
        res.status(400).json(err);
    }
}

module.exports.login_get=(req,res)=>{
    res.render('login');
}

module.exports.login_post= async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.login(email,password);
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge: 1000*maxAge});
        res.status(200).json({user : user._id});
    }
    catch(e)
    {
        const err=handle_errors(e);
        res.status(400).json(err);
    }
}