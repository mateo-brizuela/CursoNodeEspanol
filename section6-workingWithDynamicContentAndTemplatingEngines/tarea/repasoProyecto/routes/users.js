// node modules
const path = require('path');

// third party packages
const express = require('express');

// my modules
const rootDir = require('../utils/path');
const importedUsers = require('./adminUsers');

const { route } = require('./main');
const { debug } = require('console');


const router = express.Router();

router.get('/users',(req,res,next)=>{
    res.render('users',{users: importedUsers.newUsers, docTitle: 'Users'});
});

module.exports = router;

