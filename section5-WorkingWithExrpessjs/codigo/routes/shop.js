// va a contener el codigo que los usuarios ven en la tienda web

const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.send('<h1>Hello and welcome to the main page</h1>');
});

module.exports = router;