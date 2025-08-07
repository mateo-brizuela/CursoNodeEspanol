const path = require('path'); // importamos el modulo path de node 

module.exports = path.dirname(require.main.filename); // exportamos como ruta absoluta la direccion raiz del proyecto