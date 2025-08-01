🧱 1. Problema actual: todo el código está en app.js

    Hasta ahora toda la lógica de rutas estaba escrita directamente en app.js.

    Aunque por ahora es un archivo chico, esto se vuelve inmanejable en apps grandes.

    La solución es dividir el código en múltiples archivos (modularización).

📁 2. Nueva estructura: carpeta routes/

Se crea una nueva carpeta llamada routes (nombre de convención) con dos archivos:

    admin.js: para rutas administrativas (como crear productos).

    shop.js: para rutas del sitio público (lo que ve el cliente).

🛣 3. Uso de express.Router()

En lugar de exportar funciones manualmente, se usa el método que Express provee:

const express = require('express');
const router = express.Router();

    router es como una mini-app Express donde definís rutas con .get(), .post(), .use(), etc.

    Luego se exporta con:

module.exports = router;

✂️ 4. Mover las rutas a sus respectivos archivos

    Se cortan las rutas relacionadas al admin (como /add-product y el POST /product) y se colocan en admin.js.

    Se cortan rutas públicas (como /) y se colocan en shop.js.

    En esos archivos se usa router.get() o router.post() en lugar de app.get().

🔁 5. Importar los routers en app.js

En app.js:

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(adminRoutes);
app.use(shopRoutes);

    Esto conecta ambos routers con la aplicación principal.

    ¡Ojo! No se llaman como funciones, solo se pasan como objetos (app.use(adminRoutes)).

⚠️ 6. Importancia del orden

    El orden de los app.use() sigue siendo importante.

    Si un middleware anterior responde y no llama a next(), los siguientes no se ejecutan.

    Aunque ahora estés usando .get() y .post() (que hacen matching exacto), si volvieras a usar .use(), el orden sería clave.

✅ 7. Resultado final

    Tu código ahora está mejor organizado.

    Cada archivo se encarga de un conjunto de rutas.

    Usás router para modularizar.

    app.js es más limpio y claro.