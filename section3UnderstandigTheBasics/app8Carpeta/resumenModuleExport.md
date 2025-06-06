🧠 ¿Qué es module.exports?
module.exports es un objeto especial que Node.js crea automáticamente en cada archivo .js que vos escribís.
Sirve para exportar funciones, objetos, clases o valores desde un archivo para que otros archivos los puedan importar usando require().

🧱 ¿Por qué existe?
En Node.js, cada archivo JavaScript es un módulo independiente.
Si vos querés que un archivo (por ejemplo routes.js) comparta una función con otro archivo (app.js), necesitás usar module.exports para "publicar" esa función y que sea visible desde afuera.

🛠 ¿Cómo funciona?
📤 Exportar desde un módulo
Supongamos que tenés esta función en routes.js:

js
Copiar
Editar
const requestHandler = (req, res) => {
  // ... lógica de manejo de rutas
};

module.exports = requestHandler;
Lo que estás haciendo es:

📌 "Estoy exportando la función requestHandler como la única cosa pública desde este archivo."

📥 Importar en otro módulo
Luego, en app.js, podés usar esa función:

js
Copiar
Editar
const http = require('http');
const requestHandler = require('./routes'); // importa lo que exportó module.exports

const server = http.createServer(requestHandler);

server.listen(3000);
💡 Node.js va a ejecutar el archivo routes.js y va a obtener lo que se guardó en module.exports.

