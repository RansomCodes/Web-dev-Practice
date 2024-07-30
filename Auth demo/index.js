const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session=require('express-session');
const User = require('./models/user');

app.use(express.urlencoded({extended:true}));
app.use(session({secret: 'notagoodsecret'}));

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/authDemo');

app.set('view engine','ejs');
app.set('views','views');

const reqLogin=(req,res,next)=>{
    if(req.session.user_id) next();
    else res.redirect('/login');
};

app.get('/',(req,res)=>{
    res.send("THIS IS THE HOME PAGE");
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/login',async (req,res)=>{
    const {username, password}= req.body;
    const foundUser=await User.findAndValidate(username,password)
    if(foundUser)
    {
        req.session.user_id=foundUser._id;
        res.redirect('/secret');
    }
    else res.redirect('/login');
})

app.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    const user=new User({username, password});
    await user.save();
    req.session.user_id=user._id;
    res.redirect('/');
})

app.post('/logout',(req,res)=>{
    // req.session.user_id=null;
    req.session.destroy();
    res.redirect('/login');
})

app.get('/secret',reqLogin,(req,res)=>{
    res.render('secret');
})

app.get('/topsecret',reqLogin,(req,res)=>{
    res.send('top-secret');
})

app.listen(3000);