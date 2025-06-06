const http = require('http'); // Módulo nativo de Node.js para crear servidores HTTP
const fs = require('fs');     // Módulo nativo para leer y escribir archivos

// Creamos el servidor
const server = http.createServer((req, res) => {
    const url = req.url;         // Ruta a la que se accedió (ej: '/', '/message', etc.)
    const method = req.method;   // Método HTTP usado (GET, POST, etc.)

    // Si el usuario accede a la página principal con GET (por defecto), mostramos un formulario
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html'); // Indicamos al navegador que el contenido es HTML
        res.write('<html>');
        res.write('<head><title>Mi primera pagina</title></head>');
        res.write('<body><form action="/message" method="POST">');
        res.write('<input type="text" name="mensaje">'); // Campo de texto para que el usuario escriba
        res.write('<button type="submit">Enviar</button>'); // Botón que envía el formulario
        res.write('</form></body>');
        res.write('</html>');
        return res.end(); // Terminamos y enviamos la respuesta al navegador (¡ojo! antes estaba sin paréntesis)
    }

    /*
    Si el usuario envía el formulario, se hace una petición POST a la ruta '/message'.
    En esta parte queremos capturar lo que el usuario escribió.
    Como los datos llegan en partes (chunks), usamos 'req.on' para escuchar el evento 'data'.
    */

    if (url === '/message' && method === 'POST') {
        const body = []; // Usamos este array para guardar todos los chunks del body

        // Cada vez que llega una parte de los datos (chunk), se ejecuta esta función
        req.on('data', (chunk) => {
            console.log(chunk);     // Mostramos el contenido en crudo (en formato Buffer)
            body.push(chunk);       // Guardamos cada chunk en el array
        });

        // Cuando terminan de llegar todos los chunks, se dispara el evento 'end'
        req.on('end', () => {
            /*
            Unimos todos los chunks en un solo Buffer y lo convertimos a string.
            Ejemplo: 'mensaje=Hola%20mundo'
            */
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody); // Para ver el contenido como string

            /*
            Usamos split para separar por el signo '='.
            parsedBody.split('=') → ['mensaje', 'Hola%20mundo']
            El [1] contiene el texto real del usuario (aunque puede venir codificado con %20 por los espacios).
            */
            const message = parsedBody.split('=')[1];

            // Guardamos el mensaje en un archivo llamado 'mensaje.txt' de forma sincrónica
            fs.writeFileSync('mensaje.txt', message);
        });

        // Redirigimos al usuario de nuevo a la página principal después de guardar el mensaje
        res.statusCode = 302; // Código de redirección temporal
        res.setHeader('Location', '/'); // Ruta a la que redirige el navegador
        return res.end(); // Finaliza la respuesta
    }

    // Si accedió a una ruta que no es ni '/' ni '/message', mostramos un mensaje genérico
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Mi primera página (saludo)</title></head>');
    res.write('<body>Hola desde mi página de Node.js!!!</body>');
    res.write('</html>');
    res.end();
});

// Activamos el servidor para que escuche en el puerto 3000
server.listen(3000);
