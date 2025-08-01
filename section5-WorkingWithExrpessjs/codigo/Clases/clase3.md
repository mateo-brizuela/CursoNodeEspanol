🧩 1. Internals de res.send() (el método para enviar respuestas)

Te mostró cómo investigar lo que hace Express "por dentro":

    Express es open source y su código está disponible en GitHub:
    👉 https://github.com/expressjs/express

    Dentro del repositorio, si navegás a /lib/response.js, vas a ver cómo está implementado el método res.send().

🔍 ¿Qué hace res.send() internamente?

    Hace verificaciones para asegurarse de que no estás usando una versión antigua de la función.

    Detecta qué tipo de datos estás enviando:

        Si es un string (como <h1>Hello</h1>), automáticamente pone el Content-Type como text/html, pero solo si no lo seteaste vos antes.

        Si es un número, booleano, o un objeto, puede poner el Content-Type como application/json o algo apropiado.

👉 Conclusión: res.send() te ahorra tener que configurar headers manualmente, aunque podés hacerlo si querés.

💡 Consejo general de tu instructor:
Si alguna vez te preguntás “¿cómo hace esto Express?”, podés ir a su código fuente y buscar esa función.
🔧 2. Usar app.listen() en lugar de http.createServer(app).listen(...)

Antes hacías algo como esto:

const http = require('http');
const server = http.createServer(app);
server.listen(3000);

Ahora podés simplemente hacer:

app.listen(3000);

¿Por qué?

Porque app.listen() es un atajo que internamente hace lo mismo:

    Llama a http.createServer(app)

    Luego llama a .listen(...) en el servidor creado.

Esto lo podés ver si inspeccionás el código de Express en /lib/application.js.
✅ Beneficio:

Menos código, más legibilidad, y mantiene tu archivo más limpio.
🧠 Resumen conceptual

    Express no es magia negra. Podés mirar su código y entender cómo funciona.

    Métodos como res.send() te simplifican la vida (envían la respuesta y manejan headers automáticamente).

    app.listen() es una forma más corta de levantar el servidor.

    Ahora tu aplicación está más limpia, con estructura clara gracias al uso de middleware.