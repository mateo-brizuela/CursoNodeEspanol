const http = require('http');
const express = require('express');

const app = express();

// podemos agregar en use un primer argumento opcional que es l ruta(path) y esto nos permite manejar diferentes rutas
// por defecto la ruta ue trata use() es '/'

app.use('/add-product',(req,res,next)=>{
    console.log('in the "add-product" middleware');
    res.send('<h1>The "add product" page!</h1>');
});

app.use('/',(req,res,next)=>{
    console.log('in the "/" middleware');
    res.send('<h1>Hello from express!</h1>');
});

app.listen(3000);