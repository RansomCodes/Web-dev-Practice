const express=require('express');
const morgan=require('morgan');
const app=express();
const AppError=require('./appError');

app.use(morgan('tiny'))

app.use((req,res,next)=>{
    req.requestTime=Date.now();
    console.log(req.method.toUpperCase(),req.path);
    next();
})

app.use('/dogs',(req,res,next)=>{
    console.log("I LOVE DOGS");
    next();
})

const verifyPass= (req,res,next)=>{
    const { password }= req.query;
    if(password === 'chickennugget')
    {
        next();
    }
    // res.send("SORRY YOU NEED A PASSWORD")
    // res.status(401);
    throw new AppError("Password required",401);
}
// app.use((req,res,next)=>{
//     console.log("HIJACKED BY MY APP");
//     return next();
//     console.log("HIJACKED BY MY APP PART 2222 ");
// })

// app.use((req,res,next)=>{
//     console.log("HIJACKED BY MY APP PART 2");
//     next();
// })


app.get('/',(req,res)=>{
    res.send("HOME PAGE "+req.requestTime);
})

app.get('/dogs',(req,res)=>{
    res.send("WOOF WOOF");
})

app.get('/secret',verifyPass,(req,res)=>{
    res.send("I HAVE SEEN ENOUGH DEMOTIVATING THINGS IN LIFE!!!");
});

app.get('/error',(req,res)=>{
    chicken.fly();
});

app.get('/admin',(req,res)=>{
    throw new AppError("You are not an admin",403);
})

app.use((req,res)=>{
    res.status(404).send("NOT FOUND");
})

// app.use((err,req,res,next)=>{
//     console.log("*************");
//     console.log("****ERROR****");
//     console.log("*************");
//     // res.status(500).send("WE GKOT AN ERROR");
//     next(err);
// })

app.use((err,req,res,next)=>{
    const {status =500}=err;
    const {message = "SOMETHING WENT WRONG"}=err;
    res.status(status).send(message);
})
app.listen(3000);