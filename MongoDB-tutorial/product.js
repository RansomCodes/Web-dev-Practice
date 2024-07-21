const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shop')
    .then(()=>{
        console.log("OPEN");
    })

const productsSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: [0,'price must be positive']
    },
    qty: Number,
    onSale: {
        type: Boolean,
        default:false
    },
    size: {
        type:String,
        enum: ['S','M','L']
    }
});

productsSchema.methods.greet=function(){
    console.log("HELLO");
}

productsSchema.methods.toggleOnSale=function(){
    this.onSale=!this.onSale;
    this.save();
}

productsSchema.statics.fireSale=function(){
    return this.updateMany({},{onSale:true, price:0});
}

const Product=mongoose.model('Product',productsSchema);

const findProduct=async()=>{
    const foundP=await Product.findOne({name:"Inosuke uno"});
    await foundP.toggleOnSale();
    console.log(foundP);
}

Product.fireSale().then(r=> console.log(r)).catch(err=>console.log(err));
// findProduct();
// const bike=new Product({
//     name: "Cycling Jersey",
//     price: "28.50",
//     color:"red",
//     size: 'SS'
// });

// bike.save()
// .then((r)=>{
//     console.log(r);
// })
// .catch((err)=>{
//     console.log(err);
// });

// Product.findOneAndUpdate({name:'Inosuke uno'},{price:-8.99},{new:true, runValidators: true})
//     .then(data=>{
//         console.log(data);
//     })
//     .catch(err=>{
//         console.log(err);
//     })