const bcrypt=require('bcrypt');

// const hashPassword=async(pw)=>{
//     const salt=await bcrypt.genSalt(12)
//     const password=await bcrypt.hash(pw,salt);
//     console.log(salt);
//     console.log(password);
// }

const hashPassword=async(pw)=>{
    const hash=await bcrypt.hash(pw,12)
    console.log(hash);
}

const login=async(pw,hashedPw)=>{
    const result=await bcrypt.compare(pw,hashedPw);
    if(result){
        console.log("Logged in!");
    }
    else
    {
        console.log("Incorrect");
    }
}

hashPassword('monkey');
login('monkey','$2b$12$pY/sB3V5.X.OI/EOKz3kEe8SQE1caT07iG6JokDV6FXWVyIQB1Lyy');
