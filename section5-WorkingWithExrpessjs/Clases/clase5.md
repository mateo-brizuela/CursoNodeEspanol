🎯 Objetivo de esta clase

Mostrar cómo Express.js maneja formularios HTML y cómo podemos extraer los datos enviados por el usuario en una petición POST.
🧱 1. Creamos un formulario en /add-product

Tu instructor crea una ruta que responde con un pequeño formulario HTML para agregar un producto:

<form action="/product" method="POST">
  <input type="text" name="title">
  <button type="submit">Add Product</button>
</form>

    El action="/product" indica que cuando se envíe el formulario, se hará una petición a esa ruta.

    El method="POST" hace que el navegador envíe una petición HTTP POST (no GET).

    El campo tiene name="title", que será la clave del dato enviado.

Nota: El HTML que escribe es reducido (sin <html>, <body>...) solo para simplificar el ejemplo, pero después harán HTML bien formado.
🔄 2. Creamos la ruta que recibe esa información

Luego, en Express, crea una ruta para manejar la petición que llega a /product.

app.use('/product', (req, res, next) => {
  console.log(req.body); // para ver qué datos llegan
  res.redirect('/');     // redirige a la página principal
});

    La intención es ver los datos enviados y luego redirigir.

    Usa res.redirect('/') que es una forma más fácil de redirigir que hacerlo manualmente (con código de estado y encabezado).

❌ 3. Pero los datos no llegan, vemos undefined

Cuando prueba el formulario, el valor de req.body es undefined. ¿Por qué?

Porque Express no procesa automáticamente el cuerpo (body) de la petición. Necesitás decirle explícitamente que lo haga.
🛠️ 4. Solución: instalar un middleware llamado body-parser

Para poder leer req.body, instalás el paquete:

npm install --save body-parser

Este paquete permite que Express interprete los datos enviados por formularios.

Aunque Express lo incluía antes, lo sacaron y ahora se usa como un paquete externo. Por eso es importante agregarlo vos mismo para que no falle si lo sacan otra vez.
🔌 5. Configurar body-parser

Una vez instalado, lo importás y lo configurás:

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

    urlencoded sirve para formularios con application/x-www-form-urlencoded (el formato que usan los formularios HTML normales).

    extended: false indica que no se va a intentar interpretar objetos anidados o complejos (como user[name]=Mauro), lo cual está bien para formularios simples.

Este middleware se debe colocar antes de las rutas que usan req.body, porque si no, no llega a procesarlos a tiempo.
✅ 6. Ahora sí los datos llegan correctamente

Después de reiniciar el servidor (porque agregaste un paquete nuevo), cuando envías el formulario:

    req.body contiene un objeto como { title: 'valor ingresado' }

    Eso es mucho más simple que hacer todo el parsing a mano como en Node puro.

🧩 7. Ventaja de Express

Gracias al uso de middlewares como body-parser, Express se vuelve muy extensible: podés "enchufar" funcionalidades fácilmente sin reescribir todo.

Por ejemplo:

    Formularios → body-parser

    Archivos → multer

    JSON → express.json()

    Seguridad → helmet, etc.

🧠 Conclusión

Tu instructor te enseñó:

    Cómo enviar datos desde un formulario HTML.

    Cómo recibirlos en Express.

    Por qué req.body no funciona por defecto.

    Cómo solucionarlo con body-parser.

    La importancia del orden de los middlewares.

    Cómo redirigir al usuario fácilmente con res.redirect().