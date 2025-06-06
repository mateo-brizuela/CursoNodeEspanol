// movimos toda la logica e if-statments de el sitio a routes.js, y lo conectamos atravez de module.exports a app.js
// esto hace que el codigo sea mas modular y legible, ya que esta distribuido en multiples archivos
const http = require('http');
const routes = require('./routes'); // traemos la funcion desde routes.js
console.log(routes.someText);
const server = http.createServer(routes.handler);

server.listen(3000);