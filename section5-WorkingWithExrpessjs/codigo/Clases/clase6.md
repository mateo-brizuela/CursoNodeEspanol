📌 Tema principal: usar app.get() y app.post() en lugar de app.use()

    Hasta ahora usaban app.use() para definir middlewares, pero eso se ejecuta para cualquier tipo de petición HTTP (GET, POST, etc.).

    Ahora aprendiste que podés usar:

        app.get() → solo responde a peticiones GET.

        app.post() → solo responde a peticiones POST.

    Esto permite filtrar no solo por ruta sino también por método.

🧪 Ejemplo práctico:

    Si usás app.post('/product', handler), esa función solo se ejecuta cuando llega una petición POST a /product (como al enviar un formulario).

    Si visitás /product con el navegador (lo cual hace un GET), no entra al middleware.

🔧 También existen otros métodos:

    app.put(), app.delete(), app.patch() → para otros tipos de operaciones HTTP que se usan más en APIs.