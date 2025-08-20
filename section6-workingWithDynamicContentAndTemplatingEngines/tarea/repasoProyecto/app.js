// node modules
const http = require('http');
const path = require('path');

// third party packages
const express = require('express');
const bodyParser = require('body-parser');

// my packages
const rootDir = require('./utils/path');
const mainRoutes = require('./routes/main'); // pagina de bienvenida
const adminUsersRoutes = require('./routes/adminUsers'); // todas las paginas relacionadas a la administracion de usuarios
const usersRoutes = require('./routes/users'); // las paginas que muestran informacion de los usuarios

const app = express(); // inicializo la app
// configuracion de la aplicacion
app.set('view engine','pug');
app.set('views', 'views');

app.use(express.static(path.join(rootDir,'public'))); // configuro la carpeta public para que se acceda en el navegador
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminUsersRoutes.router);
app.use(usersRoutes);
app.use(mainRoutes);

app.use('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','404.html'));
});

app.listen(3000);

