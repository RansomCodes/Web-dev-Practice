const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();

app.use(cookieParser('thisismysecret'));

app.get('/greet',(req,res)=>{
    console.log(req.cookies);
    const {name='Ada'}=req.cookies;
    res.send(`HEY THERE ${name}`);
})

app.get('/setname',(req,res)=>{
    res.cookie('name','Henry Ada');
    res.cookie('animal','SHER!!!');
    res.send("OKAY SENT YOU A COOKIE");
})

app.get('/getsignedcookie',(req,res)=>{
    res.cookie('fruit','grape',{signed: true});
    res.send("SIGNING A COOKIE");
})

app.get('/verifyfruit',(req,res)=>{
    console.log(req.cookies);
    res.send(req.signedCookies);
})

app.listen(3000);