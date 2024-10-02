const jwt=require('jsonwebtoken');
const User = require('./models/User');

const maxAge=3*24*60*60;

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;

    //check json web token exists and is verified
    if(token){
        jwt.verify(token,'net ninja secret',(err,decodedToken)=>{
            if(err) {
                console.log(err.message);
                res.redirect('/login')
            }
            else {
                next();
            }
        })
    }
    else {
        res.redirect('/login')
    }
    next();
}

const checkUser= (req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'net ninja secret',async (err,decodedToken)=>{
            if(err) {
                console.log(err.message);
                res.locals.user=null;
                next();
            }
            else {
                let user=await User.findById(decodedToken.id);
                res.locals.user={
                    id: user._id,
                    name: user.username
                }
                next();
            }
        })
    }
    else
    {
        res.locals.user=null;
        next();
    }
}

const createToken=(id)=>{
    return jwt.sign(
        { 
            id 
        }, 
        'net ninja secret',
        {
            expiresIn: maxAge
        }
    );
}

module.exports={ requireAuth, checkUser,createToken }