// va a contener el codigo que los usuarios ven en la tienda web

const path = require('path');

const express = require('express');

const rootDir = require('../utils/path'); // usamos la direccion de la raiz del proyecto reutilizable

const router = express.Router();

// 1
/*
router.get('/',(req,res,next)=>{
    res.send('<h1>Hello and welcome to the main page</h1>');
});
*/

//2
router.get('/',(req,res,next)=>{
    // para enviar un documento html entero usamos el metodo sendFile
    // por otro lado usamos path y su metodo join, para describir la ruta de tal forma que se pueda usar en cualquier SO
    // __dirname contiene la ruta absoluta desde la raiz del SO hasta la carpeta que contiene el archivo que invoco(por eso ..) 
    // el metodo
    // luego separado por , y ''  vamos describiendo la ruta que queremos 
    res.sendFile(path.join(rootDir,'views','shop.html'));
});
module.exports = router;