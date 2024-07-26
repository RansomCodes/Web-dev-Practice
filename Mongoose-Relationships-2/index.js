const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride = require('method-override');

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

const Product=require('./models/product');
const Farm=require('./models/farm');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(()=>{
        console.log("MONGO CONNECTION OPEN");
    })
    .catch(err=>{
        console.log("MONGO ERROR:",err);
    })


app.listen(3000,()=>{
    console.log('LISTENING ON PORT 3000');
})

const categories=['fruits','vegetables','dairy'];

//FARM ROUTES

app.get('/farms',async (req,res)=>{
    const farms=await Farm.find({});
    res.render('farms/index',{ farms });
})

app.get('/farms/new',(req,res)=>{
    res.render('farms/new');
})

app.get('/farms/:id/products/new',async(req,res)=>{
    const {id}=req.params;
    const farm=await Farm.findById(id);
    res.render('products/new', {farmId: id,farmName: farm.name, categories});
})

app.post('/farms/:id/products',async (req,res)=>{
    const {id}=req.params;
    const {name, price,category}=req.body;
    const farm=await Farm.findById(id);
    const newProduct= new Product({name, price, category}); 
    newProduct.farm=farm;
    farm.products.push(newProduct);
    await newProduct.save();
    await farm.save();
    res.redirect(`/farms/${id}`);
})

app.delete('/farms/:id',async (req,res)=>{
    const {id}=req.params;
    await Farm.findByIdAndDelete(id);
    res.redirect('/farms');
})

app.get('/farms/:id',async (req,res)=>{
    const {id}=req.params;
    const farm=await Farm.findById(id).populate('products');
    console.log(farm);
    res.render('farms/show',{farm});
})


app.post('/farms',async (req,res)=>{
    const farm=new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
})

// PRODUCT ROUTES

app.get('/products',async (req,res)=>{
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
})

app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories});
})

app.post('/products',async (req,res)=>{
    const {name,price,category}=req.body;
    const new_product=new Product({name: name, price: price, category: category});
    await new_product.save();
    res.redirect('/products');
})

app.get('/products/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const prod=await Product.findById(id);
    res.render('products/edit',{product:prod,categories});
})

app.get('/products/:id',async (req,res)=>{
    const { id }=req.params;
    const product =await Product.findById(id).populate('farm','name');
    res.render('products/show',{product});
})

app.put('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    console.log(product);
    res.redirect(`/products/${id}`);
})

app.delete('/products/:id',async(req,res)=>{
    const {id}=req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
