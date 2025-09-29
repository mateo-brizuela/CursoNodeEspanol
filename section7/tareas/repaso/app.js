// Node modules
const path = require('path');

//third party modules
const express  = require('express');
const bodyParser = require('body-parser');

// my modules 
const rootPath = require('./utils/rootPath');
const taskRoutes = require('./routes/task');
const homeRoutes = require('./routes/home');

// inicio y configuracion
const app = express();

app.set('view engine', 'ejs'); // decalro el motor de plantilla a usar
app.set('views', 'views'); // declaroo donde se van a acceder a las vistas

app.use(express.static(path.join(rootPath, 'public'))); // declaro como static la carpeta public asi se puede acceder 
app.use(bodyParser.urlencoded({extended: true})); // para poder recibir info de los formularios

app.use('/tasks',taskRoutes);
app.use(homeRoutes);

app.listen(3000);


