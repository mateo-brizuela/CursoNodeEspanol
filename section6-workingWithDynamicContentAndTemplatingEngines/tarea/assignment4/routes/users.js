const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const usersImport = require('./welcome'); // traigo el arreglo con todos los usuarios 

const router = express.Router();

router.get('/users',(req,res,next)=>{
    res.render('users',{
        pageTitle:'Users',
        path: '/users',
        users: usersImport.users
    });
});

exports.router = router;