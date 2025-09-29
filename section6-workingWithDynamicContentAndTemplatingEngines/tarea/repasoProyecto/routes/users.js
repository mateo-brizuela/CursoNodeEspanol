// node modules
const path = require('path');

// third party packages
const express = require('express');

// my modules
const rootDir = require('../utils/path');
const usersController = require('../controllers/users');

const { route } = require('./main');
const { debug } = require('console');


const router = express.Router();

router.get('/users',usersController.getUsers);

module.exports = router;

