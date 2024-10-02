const User= require('../models/User')
const { handleErrors }=require('../errorMiddleware')
const { createToken }=require('../authMiddleware')

const maxAge=3*24*60*60;

module.exports.renderSignInForm=(req,res)=>{
    res.render('signup')
}
``
module.exports.register=async (req,res)=>{
    console.log(req.body);
    const {username,email,password}=req.body;
    try{
        const user=await User.create({username,email,password});
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge*1000})
        res.redirect('/')
    }
    catch(err){
        const errors=handleErrors(err)
        res.status(400).json({errors});
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render('login')
}

module.exports.login=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.login(email,password)
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge*1000})
        res.redirect('/')
    }
    catch(e)
    {
        const errors=handleErrors(e)
        res.status(400).json({errors})
    }
}

module.exports.logout=async (req,res)=>{
    res.cookie('jwt','',{maxAge: 1});
    res.redirect('/')
}

module.exports.renderHome=async (req,res)=>{
    res.render('home')
}