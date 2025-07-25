const fs = require('fs');

const requestHandler = (req, res) => {
    const method = req.method;
    const url = req.url;

    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>mi segundo repaso</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="mensaje">');
        res.write('<button type="submit">Enviar</button></form>');
        res.write('<form action="/redir" method="POST"><button type="submit">Otra pagina</button></form>')
        res.write('</body></html>');
        return res.end();
    }

    if (url === '/redir' && method === 'POST'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>pagina facherita</title></head>');
        res.write('<body>Bienvenidos a mi pagina facherita</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data',(chunks) => {
            body.push(chunks);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const mensaje = parsedBody.split('=')[1];
            console.log(mensaje);

            fs.writeFile('mensaje.txt',mensaje, (err) => {
                if(err){
                    console.log(' Hubo un error para escribir el archivo');
                    return;
                }
                console.log('Se guardo el archivo correctamente');
            });
        });

        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();

    }
}

module.exports.handler = requestHandler;