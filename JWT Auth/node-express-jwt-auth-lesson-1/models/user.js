const mongoose=require('mongoose');
const { isEmail }=require('validator');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Please enter an Email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required:[true, "Please enter a password"],
        minLength:[6, "Minimum Password length is 6 characters"],
    }
});


userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

//static method for user to login
userSchema.statics.login=async function(email,password){
    const user=await this.findOne({email});
    if(user)
    {
        const auth=await bcrypt.compare(password,user.password); //(not hashed, hashed)
        if(auth) {
            return user;
        }
        else throw Error("Email or password is incorrect");
    }
    else
    {
        throw Error("Incorrect Email");
    }
};

module.exports=mongoose.model('User',userSchema);