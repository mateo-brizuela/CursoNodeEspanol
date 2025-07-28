const fs = require('fs');

const handler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>seccion 4</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="mensaje">');
        res.write('<button type="submit">Enviar</button></form>');
        res.write('</body></html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
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
                    console.log('hubo un error al registrar el mensaje');
                    return;
                }

                console.log('se registro el mensaje correctamente');
            });
        });

        res.statusCode = 302 // redireccion
        res.setHeader('Location','/');
        return res.end();
    }
};

module.exports.handler = handler;