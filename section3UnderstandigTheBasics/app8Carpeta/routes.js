  // queremos poner aca todas las rutas y los if en este otro archivo, para trabajarlos de una forma modular
  // por otro lado tenemos que conectar app.js con routes.js. enviando la request entrante a este archivo routes.js
  // para eso vamos a crear una funcion que vamos a llamar desde app.js
const fs = require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
      res.setHeader('Content-Type','text/html');
      res.write('<html>');
      res.write('<head><title>Mi primera pagina</title></head>');
      res.write('<body>');
      res.write('<form action="/message" method="POST">');
      res.write('<input type="text" name="mensaje">');
      res.write('<button type="submit">Enviar</button>');
      res.write('</form>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    }

    if(url === '/message' && method === 'POST'){
        const body = [];

        req.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',() => {
            const parcedBody = Buffer.concat(body).toString();
            const mensaje = parcedBody.split('=')[1]
            fs.writeFile('mensaje.txt',mensaje, (error) => {
                res.statusCode = 302; // redireccion
                res.setHeader('Location','/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Mi primera pagina</title></head>');
    res.write('<body>Hola desde mi pagina de Nodejs</body>');
    res.write('</html>');
    res.end();
};

// una forma de que esta funcion pueda ser accedida es atravez de module.exports
// donde en este caso hacemos puclica esta funcion, para que otros archivos, puedan acceder a ella y ejecutarla
//module.exports = requestHandler;
// por otro lado no solo podemos poner funciones, podemos poner clases, valores primitivos, arreglos, entre otros

// tambien podemos exportar un grupo de cosas, en este caso lo ponemos todo dentro de un objeto
//module.exports = {
//    handler: requestHandler,
//    someText: 'podemos poner algo de texto'
//};

//otra forma de exportar
module.exports.handler = requestHandler;
module.exports.someText = 'podemos poner algo de texto';

