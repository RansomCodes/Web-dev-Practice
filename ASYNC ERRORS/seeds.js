const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/farmStand2")
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("MONGO ERROR:", err);
  });

const Product = require("./models/product");

// const p = new Product({
//   name: "tomato",
//   price: "35",
//   category: "vegetables",
// });

// p.save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => console.log(e));

const seedProducts=[
    {
        name: 'Grapes',
        price: 40,
        category: 'fruits'
    },
    {
        name: 'Milk',
        price:32,
        category: 'dairy'
    },
    {
        name: 'Paneer',
        price:70,
        category: 'dairy'
    },
    {
        name: 'potato',
        price:35,
        category: 'vegetables'
    },
    {
        name: 'Orange',
        price:50,
        category: 'fruits'
    },
];

Product.insertMany(seedProducts)
    .then(r=>{
        console.log(r);
    })
    .catch(err=>{
        console.log(err);
    })
