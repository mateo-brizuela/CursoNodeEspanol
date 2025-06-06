const http = require('http');

const server = http.createServer((req,res) => {
    // para hacer una respuesta(reponse) por lo general usamos headers(tambien se usa para las request), esto contiene meta-datos(meta-information)
    // que nos indica como se debe procesar esa respuesta o solicitud, por ejemplo el siguiente header que nos dice que vamos a devolver
    // contenido de tipo html
    res.setHeader('Content-Type', 'text/html');
    // write() nos permite escribir una respuesta en multiples lineas
    res.write('<html>');
    res.write('<head><title>Mi Primera Pagina</title></head>');
    res.write('<body>Hola desde mi servidor de Node.js</body>');
    res.write('</html>');
    res.end(); // end() termina la respuesta y la envia al cliente que hizo la request
})

server.listen(3000);