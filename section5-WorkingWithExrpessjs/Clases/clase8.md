✅ Contexto:

    Hasta ahora, si ingresás una ruta inexistente (como /algo-invalido), Express lanza un error por no encontrar ningún middleware que la maneje.

📌 Solución propuesta:

    Agregar un middleware al final del archivo app.js, sin ruta específica, que actúe como “catch-all” (captura todo).

    app.use((req, res, next) => {
      res.status(404).send('<h1>Page Not Found</h1>');
    });

🧠 Por qué funciona:

    Express procesa los middlewares de arriba hacia abajo.

    Si ninguna ruta anterior coincide con la solicitud, este middleware al final se ejecuta y responde con un mensaje personalizado y código HTTP 404.

🔧 Extra:

    Se usa .status(404) antes de .send() para establecer el código de estado.

    Podés encadenar métodos (res.status(...).send(...)), pero .send() siempre debe ser el último.

🧪 Resultado:

    Si visitás una ruta válida (como /add-product), funciona normal.

    Si visitás una ruta inválida (como /nada), ahora ves un mensaje "Page Not Found" con código 404.