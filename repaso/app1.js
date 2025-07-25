const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        // html con un campo para manda mensajes de texto atrabez del metodo post
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>mi primer repaso</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="mensaje">');
        res.write('<button type="submit">Enviar</button></form>');
        res.write('</body></html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => { // esperamos activamente todos los chunks del metodo post los recibimos los llemos y los guardamos
            console.log(chunk);
            body.push(chunk);
        });
        
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const mensaje = parsedBody.split('=')[1]; // me quedo solo con la parte despues del = del mensaje
            console.log(mensaje);
        });

        res.statusCode = 302; // indico que es una redireccion con el codigo
        res.setHeader('Location','/');
        return res.end();
    }
});

server.listen(3000);