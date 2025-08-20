const path = require('path');

const express = require('express');
const { route } = require('./shop');

const rootDir = require('../utils/path');

const router = express.Router();

const products = []; // hacemos un arreglo en el que almacenamos los productos que ingresan los usuarios 


router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-product.html'));
});

router.post('/add-product',(req,res,next)=>{
    //console.log(req.body); en vez de logear en la consola, vamos a agregarlo al array como un objeto
    // agregando el producto con su titulo y extrayendo el elemento titulo del body recibido
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;