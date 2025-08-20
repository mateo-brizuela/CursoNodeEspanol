const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const { route } = require('./main');
const { debug } = require('console');


const router = express.Router();

router.get('/users',(req,res,next)=>{
    res.render('users');
});

router.get('/add-user',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-user.html'));
});

router.post('/add-user',(req,res,next)=>{
    console.log(req.body);
    res.redirect('./users');
    
});

module.exports = router;

