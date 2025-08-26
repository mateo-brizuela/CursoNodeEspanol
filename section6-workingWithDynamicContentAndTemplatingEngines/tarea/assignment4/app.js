// node modules
const path = require('path');

// third party packages
const express = require('express');
const bodyParser = require('body-parser');

// my packages
const rootDir = require('./utils/path');
const welcomeRoutes = require('./routes/welcome');
const usersRoutes = require('./routes/users');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware de utilidades
app.use(express.static(path.join(rootDir,'public')));
app.use(bodyParser.urlencoded({extended: false}));


// middleware con las paginas
app.use(usersRoutes.router);
app.use(welcomeRoutes.router);


app.listen(3000);



