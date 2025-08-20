// node modules
const path = require('path');

// third party packages
const express = require('express');

// my packages
const rootDir = require('../utils/path'); 
const adminData = require('./admin'); // traigo adminData porque me interesa mostrar los productos en shop

const router = express.Router();


router.get('/',(req,res,next)=>{
    //console.log(adminData.products);
    //res.sendFile(path.join(rootDir,'views','shop.html'));
    
    const products = adminData.products;// guardamos los productos en una constante 

    // vamos a usar otro metodo para mandar el html dinamico llamado render
    // express va a usar el motor de plantillas por defecto  y va a retornar la plantilla
    // por otro lado el path ya esta configurado a la carpeta views, solo tenemos que escribir el nombre de la plantilla 
    res.render('shop.pug',{prods: products, docTitle: 'shop'});
});

module.exports = router;