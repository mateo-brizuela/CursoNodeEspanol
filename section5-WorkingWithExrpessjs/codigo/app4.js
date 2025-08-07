// node packages
const http = require('http');
const path = require('path');

// third party packages
const express = require('express');
const bodyParser = require('body-parser');

// my packages
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utils/path'); // usamos la direccion de la raiz del proyecto reutilizable

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// estamos estableciendo un middleware, pero le pasamos un objeto estatico que queremos servir para que sea accesible desde 
// el navegador y le pasamos como parametro la carpeta que uqeremos que sea accesible atravez del navegador
app.use(express.static(path.join(rootDir,'public'))); 

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use('/',(req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','404.html'));
});

app.listen(3000);

