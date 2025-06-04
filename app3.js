const http = require('http');

const server = http.createServer((req,res)=> {
    const url = req.url;
    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Mi primera pagina</title></head>');
        // estamos haciendo un formulario con input que recibe texto y un boton que al precionarlo se envia, utilizando el metodo POST 
        // de http, por otro lado ese formulario se envia a la direccion relativa /message de mi pagina web 
        res.write('<body><form action="/message" method="POST"><input type="text" name="mensaje"><button type="submit">Enviar</button></form></body>');
        res.write('</html>');
        return res.end(); // se guarda y se envia la respuesta
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Mi primera pagina</title></head>');
    res.write('<body>Hola desde mi pagina de Nodejs</body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);