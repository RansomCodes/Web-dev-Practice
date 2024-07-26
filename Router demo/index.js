const express=require('express');
const app=express();
const shelterRoutes=require('./Routes/shelters');
const dogsRoutes= require('./Routes/dogs');
const adminRoutes=require('./Routes/admin');

// app.use((req,res,next)=>{
//     if(req.query.isAdmin)
//     {
//         next();
//     }
//     else res.send("YOU NEED TO BE ADMIN TO ACCESS THIS DATA");
// })

app.use('/shelters',shelterRoutes);
app.use('/dogs',dogsRoutes);
app.use('/admin',adminRoutes);

app.listen(3000,()=>{
    console.log("3000");
});