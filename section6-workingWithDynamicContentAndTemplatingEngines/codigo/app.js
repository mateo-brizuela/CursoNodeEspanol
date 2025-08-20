// node packages
const http = require('http');
const path = require('path');

// third party packages
const express = require('express');
const bodyParser = require('body-parser');

// my packages
const adminData = require('./routes/admin'); // cambio el nombre porque ahora tengo 2 exports
const shopRoutes = require('./routes/shop');
const rootDir = require('./utils/path'); // 

const app = express();

//app.set() es una funcion de express que nos permite configurar ajustes globales de la aplicacion 
// tambien para configurar palabras clabes que podemos usar en el resto de la aplicacion 
// en este caso vamos a configurar el parametro "view engine" que configura que dynamic template se va a usar 
app.set('view engine','pug'); // aca estoy configurando que motor de plantillas va a usar la aplicacion 
app.set('views','views'); // aca estoy especificando donde la aplicacion debe buscar las views

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir,'public'))); 

app.use('/admin',adminData.routes); // accedo especificamente al router
app.use(shopRoutes);

app.use('/',(req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','404.html'));
});

app.listen(3000);

