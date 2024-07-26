const express=require('express');
const router= express.Router();

router.get('/',(req,res)=>{
    res.send("ALL DOGS");
});

router.get('/:id',(req,res)=>{
    res.send("VIEWING A DOG");
});

router.get('/:id/edit',(req,res)=>{
    res.send("EDITING A DOG");
});

router.post('/new',(req,res)=>{
    res.send("CREATING A NEW DOG");
});

module.exports=router;