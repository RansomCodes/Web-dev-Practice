const express=require('express');
const router= express.Router();

router.use((req,res,next)=>{
    if(req.query.isAdmin)
    {
        next();
    }
    else res.send("YOU NEED TO BE ADMIN TO ACCESS THIS DATA");
})

router.get('/topsecret',(req,res)=>{
    res.send("THIS IS TOP SECRET");
})

router.get('/deleteeverything',(req,res)=>{
    res.send("DELETING EVERYTHING");
})

module.exports=router;