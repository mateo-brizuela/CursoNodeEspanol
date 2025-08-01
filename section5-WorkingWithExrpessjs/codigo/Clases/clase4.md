🧠 Resumen general

Tu instructor está mostrando cómo Express usa middlewares para controlar qué respuesta enviar según la ruta (URL) que se visita, y cómo el orden y el uso de next() influyen en eso.
📌 1. El objetivo de la clase

Aprender a:

    Responder de forma diferente según la URL (por ejemplo, / o /add-product)

    Usar app.use(path, middleware) para filtrar por rutas específicas

    Entender por qué el orden de los middlewares importa

    Comprender cuándo llamar o no a next()

📌 2. Eliminando middlewares de prueba

Al inicio, tu instructor borra los middlewares anteriores de ejemplo para comenzar desde cero y enfocarse en rutas reales.
📌 3. ¿Cómo filtrar por rutas?

Express permite definir middlewares que solo se ejecutan si la ruta comienza con cierta cadena:

app.use('/add-product', (req, res, next) => {
  res.send('Add Product Page');
});

Esto significa que si el usuario entra a /add-product, esta función se ejecuta.
📌 4. ¿Qué pasa con rutas como /?

app.use('/', (req, res, next) => {
  res.send('Hello from Express');
});

Esto se ejecuta para todas las rutas que comiencen con /, como:

    /

    /add-product

    /cualquier-cosa

Porque todas las rutas empiezan con /.
📌 5. El orden importa

Express ejecuta los middlewares de arriba hacia abajo en el código. Si uno ya maneja la respuesta y no llama a next(), los de abajo no se ejecutan.

Entonces:

app.use('/add-product', (req, res) => {
  res.send('Página de agregar producto');
});

app.use('/', (req, res) => {
  res.send('Página principal');
});

    Si visitás /add-product, se usa el primero y NO el segundo.

    Si visitás /, se usa el segundo.

⚠️ Importante: Si ponés el middleware de / antes que el de /add-product, entonces Express va a responder con “Hello from Express” antes de llegar al otro middleware, a menos que llames a next() (pero si ya enviaste una respuesta, no deberías llamar a next() más).
📌 6. Evitar múltiples respuestas

Una vez que enviás una respuesta con res.send(), no debés llamar a next(), porque no se pueden enviar múltiples respuestas a una misma petición.
📌 7. Middleware global

Si querés un middleware que siempre se ejecute, simplemente usás:

app.use((req, res, next) => {
  console.log('Este middleware siempre se ejecuta');
  next();
});

Y lo colocás al principio del archivo, antes de los otros middlewares con rutas específicas.
✅ Conclusión

    Express permite usar middlewares para controlar cómo se manejan las rutas.

    app.use('/ruta', middleware) te permite aplicar lógica solo a ciertas URLs.

    El orden de los middlewares es clave: de arriba hacia abajo.

    Si no llamás a next(), el flujo termina ahí.

    Si enviás una respuesta con res.send(), no llames a next() después.

    Usá un middleware general al principio si querés algo que se ejecute siempre (por ejemplo, para logging o autenticación).

