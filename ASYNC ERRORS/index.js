const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride = require('method-override');
const AppError=require('./AppError');

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

const Product=require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand2')
    .then(()=>{
        console.log("MONGO CONNECTION OPEN");
    })
    .catch(err=>{
        console.log("MONGO ERROR:",err);
    })
    
const categories=['fruits','vegetables','dairy'];
    
function wrapAsync(fn){
    return function(req,res,next)
    {
        fn(req,res,next).catch(e=>next(e));
    }
}

app.get('/products',wrapAsync(async (req,res)=>{
    const { category } = req.query;
    if(category)
    {
        const products= await Product.find({ category });
        res.render('products/index',{products, category});
    }
    else
    {
        const products= await Product.find({});
        res.render('products/index',{products,category: 'All'});
    }
}));

app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories});
})

app.post('/products',wrapAsync(async (req,res,next)=>{
    const {name,price,category}=req.body;
    const new_product=new Product({name: name, price: price, category: category});
    await new_product.save();
    res.redirect('/products');
}));

app.get('/products/:id/edit',wrapAsync(async (req,res,next)=>{
    const {id}=req.params;
    const prod=await Product.findById(id);
    if(!prod) throw new Error("Product not found");
    else res.render('products/edit',{product:prod,categories});
}))


app.get('/products/:id',wrapAsync(async (req,res,next)=>{
    const { id }=req.params;
    const product =await Product.findById(id)
    if(!product) {
        throw new AppError("Product Not Found",404);
    }
    else res.render('products/show',{product});
}))

app.put('/products/:id',wrapAsync(async(req,res,next)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect(`/products/${id}`);
}))

app.delete('/products/:id',wrapAsync(async(req,res)=>{
    const {id}=req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
}))

const handleValidationError=(err)=>{
    console.dir(err);
    return err;
}

app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name==="ValidationError") err=handleValidationError(err);
    next(err);
})

app.use((err,req,res,next)=>{
    const {status=500,message="SOMETHING WENT WRONG"}=err;
    res.status(status).send(message);
})

app.listen(3000,()=>{
    console.log('LISTENING ON PORT 3000');
})