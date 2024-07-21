const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies')
    .then(()=>{
        console.log("OPEN");
    })

const movieSchema=new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    hidden: Boolean,
});

const Movie=mongoose.model('Movie',movieSchema);
// const m1=new Movie({
//     title: 'Interstellar',
//     year: 2003,
//     score: 9.8,
//     hidden: false
// });

// Movie.insertMany([
//     {title: 'Iratta', year:2017, score:8.7, hidden: true},
//     {title: 'Dilawaaale Dulhaniya Le jayenge', year: 2007, score:8, hidden:false},
//     {title: 'Pakhi', year:2013, score:3, hidden: false},
//     {title: 'Laapata Ladies', year: 2024, score:6, hideen:false}
// ])
//     .then((data)=>{
//         console.log(data);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });