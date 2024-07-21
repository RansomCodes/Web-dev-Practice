const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shop')
    .then(()=>{
        console.log("OPEN");
    })

const personSchema=new mongoose.Schema({
    first: String,
    last: String
});

personSchema.virtual('fullname').get(function(){
    return `${this.first} ${this.last}`;
})

personSchema.pre('save',async function(){
    this.first="YO";
    this.last="MAMA";
    console.log('about to save!!');
})


personSchema.pre('save',async function(){
    console.log('just saved!!');
})

const Person=mongoose.model('Person',personSchema);