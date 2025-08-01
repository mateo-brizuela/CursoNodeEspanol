const http = require('http');
const express = require('express'); // importamos el paquete express

const app = express(); // aca estamos creando una instancia de la aplicacion express

// express nos proporciona middleware, esto son una o varias funciones que se ejecutan desde que llega una request
// hasta que enviamos una response, express canaliza las request y las maneja atravez de un confunto de funciones middleware

//con la keyword use podemos crear una nueva funcion middleware
// una forma facil de utilizarlo es pasarle una funcion, esta funcion se va a ejecutar paracada request recibida
// la funcion recibe 3 argmunetos (req,res que ya los conocemos ) y next
// next es una funcion que se usa para permitir a la funcion middleware pase al siguiente middleware
app.use((req,res,next) => {
    console.log('we are in the middleware');
    next(); // permite a la request continuar al siguiente middleware
});

app.use((req,res,next)=>{
    console.log('we are in another middleware');
    // para enviar responses, podemos hacerlo de la forma que lo hicimos antes que es mas larga, o podemos usar
    // una instruccion que simplifica todo proporcionada por express llamada send
    res.send('<h1>Hello from express!!!</h1>');
});

//const server = http.createServer(app); // app es un manejador(handler) valido  para el servidor, asi que se puede usar
//server.listen(3000);
app.listen(3000); // podemos reemplazar las dos lineas de arriba por esta, que significa lo mismo cuando usamos express