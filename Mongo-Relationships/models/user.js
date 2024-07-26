const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDBDemo')
    .then(()=>{
        console.log("DB CONNECTED");
    }).catch((err)=>{
        console.log(err);
    })

const userSchema=new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {_id: false},
            street: String,
            city: String,
            state: String,
            country: String
        },
    ],
})

const User=mongoose.model('User',userSchema);
const makeUser= async()=>{
    const u =new User({
        first: 'Tarun',
        last: 'Madan',
        addresses: [
            {
                street: 'Ghatkhopar',
                city: 'Nagpur',
                state: 'Maharashtra',
                country: 'India',
            }
        ]
    });
    const res=await u.save();
    console.log(res);
};

const addAddress=async(id)=>{
    const user=await User.findById(id);
    user.addresses.push({
        street: 'Nandgram',
        city:'Ghaziabad',
        state: 'Uttar Pradesh',
        country: 'India'
    });
    const res=await user.save();
    console.log(res);
}

addAddress('66a1f244467e6fc5d3e90596');
