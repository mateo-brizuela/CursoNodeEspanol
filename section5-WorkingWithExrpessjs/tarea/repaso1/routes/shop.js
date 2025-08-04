const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('en la pagina pricipal, enviando html de pagina principal');
    res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports = router;