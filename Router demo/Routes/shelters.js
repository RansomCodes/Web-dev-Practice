const express=require('express');
const router= express.Router();

router.get('/',(req,res)=>{
    res.send("ALL SHELTERS");
});

router.get('/:id',(req,res)=>{
    res.send("1 shelter");
});

router.get('/:id/edit',(req,res)=>{
    res.send("EDIT SHELTERS");
});

router.post('/new',(req,res)=>{
    res.send("NEW SHELTERS");
});

module.exports=router;