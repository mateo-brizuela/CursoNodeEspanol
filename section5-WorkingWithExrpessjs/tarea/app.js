const http = require('http');
const express = require('express');

const app = express();

app.use('/user',(req,res,next)=>{
    res.send('<h1>welcome to the "User page"</h1>')
});

app.use((req,res,next)=>{
    console.log('in the first middleware');
    next();
});

app.use((req,res,next)=>{
    console.log('in another middleware');
    next();
});

app.use('/',(req,res,next)=>{
    res.send('<h1>Welcome to the "Main page"</h1>');
});



app.listen(3000);