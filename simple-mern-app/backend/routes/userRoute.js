const express=require("express");
const mongoose = require("mongoose");
const User=require("../models/userModel");

const router=express.Router();

router.get('/',async (req,res)=>{
    try
    {
        const showAll=await User.find();
        res.send(showAll);
    } catch(e)
    {
        console.log("DATA NOT FETCHED");
        res.status(500).json(e.message);
    }
})

router.post('/',async (req,res)=>{
    try
    {
        const {name,email,age}=req.body;
        const userData=await User.create({name,email,age});
        res.status(201).json(userData);
    } catch(error)
    {
        console.log(error);
        res.status(400).json({error: error.message});
    }
})

router.get('/:id',async (req,res)=>{
    const {id}=req.params;
    try
    {
        const show=await User.findById({_id: id});
        res.send(show);
    } catch(e)
    {
        console.log("DATA NOT FETCHED");
        res.status(500).json(e.message);
    }
})

router.delete('/:id',async (req,res)=>{
    const {id}=req.params;
    try
    {
        const show=await User.findByIdAndDelete({_id: id});
        res.status(200).json(show);
    } catch(e)
    {
        res.status(500).json(e.message);
    }
})

router.patch('/:id',async (req,res)=>{
    const {id}=req.params;
    const {name,email,age}=req.body;
    try
    {
        const updateUser=await User.findByIdAndUpdate(id,req.body,{
            new: true
        });
        res.send(updateUser);
    } catch(e)
    {
        console.log(e.message);
        res.status(500).json(e.message);
    }
})
module.exports=router;