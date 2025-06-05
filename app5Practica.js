// importamos los modulos
const http = require('http');
const fs = require('fs');

// creamos el servidor
const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Mi primera pagina</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="mensaje"><button type="submit">Enviar');
        res.write('</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = []; // guardamos los chunks o partes del flujo de datos de la request
        req.on('data',(chunk) => { // configuramos el listener cada vez que el server recibe datos del cliente 
            console.log(chunk); // vemos los datos del buffer en crudo
            body.push(chunk); //vamos metiendo los chunks en el arreglo
        });

        req.on('end', () => {
            // es el formato del body convertido a texto
            const parcedBody = Buffer.concat(body).toString();
            // tomamos solo la parte despues del =
            const mensaje = parcedBody.split('=')[1];
            fs.writeFileSync('mensaje.txt',mensaje);
        });

        res.statusCode = 302; // indico que es una redireccion 
        res.setHeader('Location','/');
        return res.end();
    }
});

server.listen(3000);