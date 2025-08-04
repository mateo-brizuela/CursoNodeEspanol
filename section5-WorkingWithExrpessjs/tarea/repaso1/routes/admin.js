const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');


const router = express.Router();

router.get('/add-product',(req,res,next)=>{
    console.log('estoy enviando el formulario')
    res.sendFile(path.join(rootDir,'views','add-product.html'));
});

router.post('/add-product',(req,res,next)=>{
    console.log('estoy recibiendo el formulario');
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;

