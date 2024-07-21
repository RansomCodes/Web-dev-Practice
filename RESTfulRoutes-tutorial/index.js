const express=require('express');
const app=express();
const path=require('path');
const methodOverride= require('method-override');
const {v4: uuidv4}= require('uuid');

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

let comments=[
    {
        id:uuidv4(),
        username: 'Todd',
        comment: 'This is too funny'
    },
    {
        id:uuidv4(),
        username: 'Billy',
        comment: "I'll kill you supe terrorist"
    },
    {
        id:uuidv4(),
        username: 'Frenchie',
        comment: 'Von Cover, I love You!!'
    },
    {
        id:uuidv4(),
        username: 'Hughie',
        comment: 'Starlight, You are my 2nd Wind'
    },
    {
        id:uuidv4(),
        username: 'Komiko',
        comment: 'Heyy there frenchie!!!'
    }
];

// console.log(comments);

app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});
});

app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
});

app.post('/comments',(req,res)=>{
    const {username,comment}=req.body;
    comments.push({username,comment, id: uuidv4()});
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    // console.log(id);
    const comment= comments.find((c) => {
        return id===c.id
    });
    if(comment) res.render('comments/show',{comment});
    else res.send("NOT FOUND");
})

app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const newComment=req.body.comment;
    const prevComment=comments.find(c=> c.id===id);
    console.log(prevComment);
    console.log(newComment);
    prevComment.comment=newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id',(req,res)=>{
    console.log("HERE");
    const {id}=req.params;
    comments=comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id}= req.params;
    const prevComment=comments.find((c)=> c.id===id);
    res.render('comments/edit',{prevComment});
})

app.listen(3000,()=>{
    console.log(3000);
});