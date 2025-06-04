// importamos el modulo de http
const http = require('http');
// importamos el modulo fs(file system) porque necesitamos usar funciones del sistema de archivos del SO
// para escribir y guardaer archivos usando tambien el path donde lo vamos a guardar



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

        // ahora vamos a usat la funcion writeSyncFile que toma dos parametros, el nombre del archivo que vamos a escribir
        // y el segundo parametro es la ruta(path) donde se va a guardar ese archivo
        

    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Mi primera pagina</title></head>');
    res.write('<body>Hola desde mi pagina de Nodejs</body>');
    res.write('</html>');
    res.end();
});

server.listen(3000); 