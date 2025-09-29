const path = require('path');
const rootDir = require('../utils/path');

const newUsers = [];

exports.getAddUser = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-user.html'));
}

exports.postAddUser = (req,res,next)=>{
    console.log(req.body);
    newUsers.push({name: req.body.name});
    res.redirect('../users');
}

exports.getUsers = (req,res,next)=>{
    res.render('users',{users: newUsers, docTitle: 'Users'});
}