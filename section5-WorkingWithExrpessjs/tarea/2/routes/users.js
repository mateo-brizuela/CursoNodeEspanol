const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');


const router = express.Router();

router.get('/users',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','users.html'));
});

router.get('/add-user',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-user.html'));
});

router.post('/add-user',(req,res,next)=>{
    console.log(req.body);
    res.redirect('./users');
});

module.exports = router;
