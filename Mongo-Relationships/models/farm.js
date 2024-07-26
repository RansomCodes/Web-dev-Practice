const mongoose=require('mongoose');
const {Schema}=mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDBDemo')
    .then(()=>{
        console.log("DB CONNECTED");
    }).catch((err)=>{
        console.log(err);
    })

const productSchema=new Schema({
    name: String,
    price: Number,
    season:{
        type:String,
        enum: ['Spring','Summer','Fall','Winter'],
    }
});

const farmSchema=new Schema({
    name: String,
    city: String,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Product=mongoose.model('Product',productSchema);
const Farm=mongoose.model('Farm',farmSchema);

// Product.insertMany([
//     {
//         name: 'melon',
//         price: 25,
//         season: 'Winter'
//     },
//     {
//         name: 'potato',
//         price: 50,
//         season: 'Fall'
//     },
//     {
//         name: 'olives',
//         price: 150,
//         season: 'Summer'
//     },
//     {
//         name: 'guava',
//         price: 80,
//         season: 'Spring'
//     }
// ]);

// const makeFarm=async()=>{
//     const farm=new Farm({name: 'Amar veggies', city: 'Banda'});
//     const melon=await Product.findOne({name: 'melon'});
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// }
// makeFarm();

// const addProduct=async()=>{
//     const farm=await Farm.findOne({name:'Amar veggies'});
//     const olives=await Product.findOne({name: 'potato'});
//     farm.products.push(olives);
//     await farm.save();
// }

// addProduct();

Farm.findOne({name:'Amar veggies'})
    .populate('products')
    .then(farm=> console.log(farm));