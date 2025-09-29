// esta seccion va a contener toda slas rutas de acceso publico, como la pagina de bienvenida secciones de informacion
// publica y demas


// third party modules 
const express = require('express');

//my modules 
const homeController = require('../controller/homeController');

const router = express.Router(); // creo el enrutador

router.get('/',homeController.getWelcome);



module.exports = router;