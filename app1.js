// importamos el modulo de http 
const http = require('http');

// el modulo de http nos ofrece varias funcionalidades, una de las mas importantes es createServer()
// esta es muy importante para crear un servidor, este metodo toma un requestListener como argumento el cual es una funcion
// que se va a ejecutar cada vez que el servidor reciba una peticion(request)

function rqListener(req, res) {
    // Nodejs maneja las request y las response como objetos, estos los podemos poner como argumentos dentro de la funcion rqListener
    // req nos va a permitir leer y extraer informacion de las peticiones(request) recibidas
    // res nos va a permitir generar una respuesta(response) a esas peticiones


}
// solo debemos pasar el nombre de la funcion, createServer lo interpreta, y le pasa como primer parametro la request
// y como segundo parametro el response
//http.createServer(rqListener) 

// y tambien calramente podemos asignar esta funcion en formato de arrow function
const server = http.createServer((req,res) => { // Create server nos retorna un servidor, y lo debemos almacenar en una constante 
    console.log(req);
});

server.listen(3000) // listen() hace que el servidor no se cierre inmediatemente, sino que se quede esperando request
// listen toma varios argumentos opcionales, el primero el puerto por donde queremos que escuche el servidor