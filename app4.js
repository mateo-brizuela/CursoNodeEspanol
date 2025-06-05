// importamos el modulo de http
const http = require('http');
// importamos el modulo fs(file system) porque necesitamos usar funciones del sistema de archivos del SO
// para escribir y guardar archivos usando tambien el path donde lo vamos a guardar
const fs = require('fs');



// creamos el servidor
const server = http.createServer((req,res) => {
    // guardamos la url y el method htttp de la request
    const url = req.url;
    const method = req.method;

    // preguntamos si la url es '/'
    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Mi primera pagina</title></head>');
        res.write('<body><form action="message" method="POST"><input type="text" name="mensaje"><button type="submit">Enviar</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    // ahora vamos a peguntar si la url de la request es /message y si esta utilizando el metodo POST
    if (url === '/message' && method === 'POST') {
        // en este caso queremos hacer dos cosas, redirigir al usuario nuevamente a '/'y guardar el input de su metodo
        // en un documento de texto

        // ahora vamos a usar la funcion writeSyncFile que toma dos parametros, el nombre del archivo que vamos a escribir junto con el path
        // y el segundo parametro es el contenido que se va a escribir en el archivo
        fs.writeFileSync('mensaje.txt','pruebita');
        //res.writeHead() // se usa para enviar todos los headers de respuesta de una sola vez
        /* ejemplo
        res.writeHead(302, {
            'Location': '/',
            'Content-Type': 'text/html'
        });
        */
        res.statusCode = 302; // establece un codigo de estado http(302 indica que la pagina due encontrada pero el cliente debe 
        // hacer una redireccion temporal)
        res.setHeader('Location', '/'); // este header, indica la locacion a donde el cliente debe ser redirigido
        // en este caso es una ruta relativa, pero podria ser una ruta absoluta como 
        //res.setHeader('Location','https://www.google.com');
        return res.end(); // guarda la response y la envia al cliente

    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Mi primera pagina</title></head>');
    res.write('<body>Hola desde mi pagina de Nodejs</body>');
    res.write('</html>');
    res.end();
});

server.listen(3000); 