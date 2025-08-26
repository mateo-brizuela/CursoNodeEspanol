const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const users = [];

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('welcome',{
        pageTitle: 'Welcome!',
        path: '/'
    });
});

router.post('/',(req,res,next)=>{
    users.push({name: req.body.userName}); // paso como objeto el nombre de usuario al arreglo
    console.log(users);
    res.redirect('/');

});

exports.users = users;
exports.router = router;