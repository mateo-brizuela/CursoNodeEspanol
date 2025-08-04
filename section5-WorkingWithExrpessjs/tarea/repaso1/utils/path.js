const path = require('path');

// guardamos la ruta absoluta al proyecto para usarla de forma reutilizable cuando se necesite
module.exports = path.dirname(require.main.filename);
