const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const { route } = require('./main');
const { debug } = require('console');


const router = express.Router();

const newUsers = []; // defino un arreglodonde coloco losnuevos usuarios que se van a cargar desde la web
// esta practica no es recomendada, porque no es segura, pero con fines educativos esta bien 

router.get('/add-user',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-user.html'));
});

router.post('/add-user',(req,res,next)=>{
    console.log(req.body);
    newUsers.push({name: req.body.name});
    res.redirect('../users');
});

exports.router = router;
exports.newUsers = newUsers;