// node modules
const http = require('http');
const path = require('path');

// third party packages
const express = require('express');
const bodyParser = require('body-parser');

// my packages
const rootDir = require('./utils/path');
const mainRoutes = require('./routes/main');
const usersRoutes = require('./routes/users');

const app = express(); // inicializo la app
// configuracion de la aplicacion
app.set('view engine','pug');
app.set('views', 'views');

app.use(express.static(path.join(rootDir,'public'))); // configuro la carpeta public para que se acceda en el navegador
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',usersRoutes);
app.use(mainRoutes);

app.listen(3000);

