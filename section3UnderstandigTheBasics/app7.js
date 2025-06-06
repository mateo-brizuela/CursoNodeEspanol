// simplemente voy a rescribir todo el codigo sin comentarios y con todas las paginas que cree hasta ahora
const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
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
    
});

server.listen(3000);