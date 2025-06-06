const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Mi primera pagina</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="mensaje">');
        res.write('<button type="submit">Enviar</button></form></body>');
        res.write('</html>');
        return res.end;
    }

    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('mensaje.txt','pruebita');
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Mi primera pagina(saludo)</title></head>');
    res.write('<body>Hola desde mi pagina de Nodejs!!!</body>');
    res.write('</html>');
    res.end();

});

server.listen(3000);