const promise1= new Promise(function(resolve,reject){
    //Do an async task
    //DB calls
    //cryptography tasks
    //network calls
    setTimeout(function(){
        console.log('Task done');
        resolve();
    },1000);
});

promise1.then(function(){
    console.log("promise consumed");
})

new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log("Async task 2");
        resolve();
    },1000);
}).then(function(){
    console.log("Async 2 resolved");
})

const promise3=new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve({username: "chai",email: "chai@gmail.com"});
    },1000);
});

promise3.then(function(user){
    console.log(user);
})

const promise4=new Promise(function(resolve,reject){
    setTimeout(function(){
        let error=true;
        if(!error)
        {
            resolve({username: "Manmeet",pass:"2d3d3d3"});
        }
        else
        {
            reject('Error, something went wrong!');
        }
    },1000);
})

promise4
.then((user)=>{
    console.log(user);
    return user.username;
})
.then((username)=>{
    console.log(username);
})
.catch((err)=>{
    console.log(err);
})
.finally(()=>console.log("The promise is either resolved or rejected"));

const promise5=new Promise(function(resolve,reject){
    setTimeout(function(){
        let error=true;
        if(!error)
        {
            resolve({username: "javascript",pass:"123"});
        }
        else
        {
            reject('JS went wront');
        }
    },1000);
});

async function consumeP5(){
    try
    {
        const res=await promise5;
        console.log(res);
    }
    catch(e)
    {
        console.log(e);
    }
};

consumeP5();

// async function getAllUsers(){
//     try
//     {
//         const res=await fetch('https://jsonplaceholder.typicode.com/users');
//         const data=await res.json();
//         console.log(data);
//     }
//     catch(e)
//     {
//         console.log(e);
//     }
// }

// getAllUsers();

fetch('https://jsonplaceholder.typicode.com/users')
.then((res)=>{
    return res.json();
})
.then((res)=>{
    console.log(res);
})
.catch((e)=>{
    console.log(e)
})