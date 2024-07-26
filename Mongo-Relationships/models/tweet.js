const mongoose=require('mongoose');
const {Schema}=mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDBDemo')
    .then(()=>{
        console.log("DB CONNECTED");
    }).catch((err)=>{
        console.log(err);
    })

const userSchema=new Schema({
    username: String,
    age: Number
})

const tweetSchema=new Schema({
    text: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } 
})

const User=mongoose.model('User',userSchema); 
const Tweet=mongoose.model('Tweet',tweetSchema);

// const makeTweets=async()=>{
//     const user=await User.findOne({username: 'Chicken lover'});
//     const tweet1=new Tweet({text: 'GWAK!! GWAK!! GWAK!!',likes:100});
//     tweet1.user = user;
//     tweet1.save();
// }

// makeTweets();

const findTweets=async()=>{
    const t=await Tweet.find({}).populate('user');
    console.log(t);
}

findTweets();