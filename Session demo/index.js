const express=require('express');
const app=express();


const session=require('express-session');
const flash=require('connect-flash');

const sessionOptins={resave: false,secret: 'thisisnotagoodsecret', saveUninitialized: false};
app.use(session(sessionOptins));
app.use(flash);

app.get('/page',(req,res)=>{
    if(req.session.count) req.session.count+=1;
    else req.session.count=1;
    res.send(`You have viewed this page ${req.session.count} times`)
})

app.get('/register',(req,res)=>{
    const {username='anonymous'}=req.query;
    req.session.username=username;
    res.redirect('/greet');
})

app.get('/greet',(req,res)=>{
    const {username}=req.session;
    res.send(`WELCOME BACK, ${username}`);
})

app.listen(3000,()=>{
    console.log("3000");
})