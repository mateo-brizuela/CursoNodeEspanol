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
            const mensaje = parcedBody.split('=')[1];

            // writeFileSync es una operacion bloqueante, lo que significa que el resto del codigo se bloquea hasta que la operacion
            // haya terminado 
            // por otro lado writeFile es asincrono y recibe un tercer parametro que puede ser una funcion callback que se 
            // ejecuta cuando la operacion haya finalizado

            // por otro lado hay que aclarar que Nodejs define llisteners de forma implicita como es este caso, que esta atento a 
            // que la operacion de escritura del archivo haya finalizado, es este caso se va a ejecutar si hubo un error en la operacion
            fs.writeFile('mensaje.txt',mensaje,(error)=>{
                res.statusCode = 302; // indico que es una redireccion 
                res.setHeader('Location','/');
                return res.end();
            });
        });

    }
});

server.listen(3000);