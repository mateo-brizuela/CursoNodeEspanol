🧱 1. El rol de next() en los middlewares

    En Express, los middlewares son funciones que procesan una petición (request).

    Cada middleware puede:

        Hacer algo con la petición o respuesta.

        Llamar a next() → para pasarle el control al próximo middleware.

        O bien, terminar el flujo enviando una respuesta (res.send(), res.json(), etc).

📌 Si no llamás a next() ni enviás una respuesta, la petición queda "colgada" y el cliente nunca recibe respuesta.
✋ 2. ¿Qué pasa si no hay next() y tampoco mandás una respuesta?

El servidor no hace nada por defecto. Express no envía una respuesta automática, por lo que vos tenés que hacerlo manualmente.
✅ 3. Usar res.send() para enviar respuestas fácilmente

En vez de usar:

res.setHeader('Content-Type', 'text/html');
res.write('<h1>Hola</h1>');
res.end();

Ahora podés usar:

res.send('<h1>Hello from Express</h1>');

Express se encarga de:

    Configurar automáticamente el header Content-Type (por ejemplo, text/html si mandás una cadena).

    Enviar la respuesta y cerrar la conexión.

🧪 4. ¿Qué muestra el navegador?

Al recargar localhost:3000, ves el texto "Hello from Express" en el navegador.

Si abrís la pestaña Network en las herramientas de desarrollador del navegador, vas a ver que:

    El header Content-Type fue puesto automáticamente como text/html.

⚙️ 5. Recordá:

    Si usás next(), la ejecución sigue al siguiente middleware.

    Si usás res.send(), ahí termina el flujo y ya no se ejecutan los middlewares posteriores.

    Podés seguir usando setHeader, write y end si lo necesitás, pero res.send() es más cómodo y Express-friendly.

🧠 Idea clave

Express es como un embudo por el que pasa cada request. Cada middleware puede:

    Hacer algo y pasar la petición al siguiente (next()), o

    Responder directamente (res.send(), etc.), y cortar el flujo.