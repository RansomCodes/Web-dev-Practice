const express=require("express");
const app=express();
const mongoose = require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors")

app.use(cors());
dotenv.config();
app.use(express.json());

const userRoute=require("./routes/userRoute");

mongoose.connect(process.env.URI)
    .then(()=>{
    console.log("Connected to DB");
    })
    .catch((e)=>{
        console.log("error");
    });

app.use(userRoute);

app.listen(process.env.PORT || 3000,()=>{
    console.log("LISTENING ON 3000");
})