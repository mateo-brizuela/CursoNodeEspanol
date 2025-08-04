const path = require('path');

// basicamente estamos haciendo una direccion que contiene la ruta absoluta desde la raiz hasta el proyecto
// de tal forma que sea reutilizable y se vea mas limpia en el codigo
    module.exports = path.dirname(require.main.filename);