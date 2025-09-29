const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const usersController = require('../controllers/users');

// auto
const { route } = require('./main');
const { debug } = require('console');



const router = express.Router();

const newUsers = []; // defino un arreglodonde coloco losnuevos usuarios que se van a cargar desde la web
// esta practica no es recomendada, porque no es segura, pero con fines educativos esta bien 

router.get('/add-user',usersController.getAddUser);

router.post('/add-user', usersController.postAddUser);

exports.router = router;
exports.newUsers = newUsers;