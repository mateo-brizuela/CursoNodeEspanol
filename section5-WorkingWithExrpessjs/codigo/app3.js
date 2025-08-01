const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
    // el extend false, es para que 
app.use(bodyParser.urlencoded({extended: false})); // este metodo lo que hace es registrar un middleware que que toma el flujo de datos de la req
// y lo parsea, es decir lo arma en un formato que se puede leer, y por ultimo llama a next (body parsing)

app.use('/',(req,res,next)=>{
    next();
});

app.use('/add-product',(req,res,next)=>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>');
});

// esto hace lo mismo qe app.use, la diferencia es que solo si va a disparar si el metodo de la request es un POST
app.post('/product',(req,res,next)=>{
    console.log(req.body); // hay un nuevo campo de la req, proporcionado por express llamado body, pero por defecto no funciona
    // debemos usar una parser

    //hay una instruccionn conveniente que proporciona express llamada redirect(), que sirve justamente para hacer un redirect
    // pero en una sola instruccion 
    res.redirect('/');
});


// en vez de usar app.use, podemos usar app.get, que hace lo mismo pero la diferencia es que solo se disara si la 
// request es de tipo get 
app.get('/',(req,res,next)=>{
    res.send('<h1>welcome to the main page</h1>');
});

app.listen(3000);