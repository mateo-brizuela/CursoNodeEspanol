// node modules
const http = require('http');
const path = require('path');

// third party packages
const express = require('express');
const bodyParser = require('body-parser');

// my packages
const rootDir = require('./utils/path');
const mainRoute = require('./routes/main');
const usersRoute = require('./routes/users');

const app = express();
app.use(bodyParser.urlencoded({extended: false})); // configuro el body parser
app.use(express.static(path.join(rootDir,'public'))); // que se pueda acceder a la carpeta public en el navegador

app.use('/admin',usersRoute);
app.use(mainRoute);

app.use('/',(req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','404.html'));
});

app.listen(3000);





