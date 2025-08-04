🧠 Contexto

Tu aplicación Express ya sirve archivos HTML con res.sendFile(...) desde shop.js y admin.js. Para eso, necesitás construir una ruta absoluta hacia esos archivos, que están en la carpeta /views.

Hasta ahora venías usando esto:

path.join(__dirname, '..', 'views', 'shop.html');

Esto está bien, pero puede volverse repetitivo y engorroso. Entonces, el instructor propone una forma más limpia y reutilizable para obtener la ruta al directorio raíz del proyecto.
✅ 1. Mejorar la forma de escribir rutas

Primero aclara que:

    Es mejor usar '..' (sin slash) que '../' directamente en path.join, porque el método se encarga de usar el separador adecuado (/ o \) según el sistema operativo (Linux o Windows).

    path.join(__dirname, '..', 'views', 'shop.html'); // correcto, multiplataforma

📦 2. Crear un helper para la ruta raíz

Luego propone un enfoque más limpio y reutilizable:

    Crear una carpeta util/ (o helpers/, como prefieras).

    Dentro, crear un archivo path.js.

    En ese archivo exportar la ruta al directorio raíz del proyecto.

Código que sugiere:

// util/path.js
const path = require('path');

// Versión antigua (puede dar warning deprecado):
// module.exports = path.dirname(process.mainModule.filename);

// Versión nueva recomendada:
module.exports = path.dirname(require.main.filename);

    require.main.filename te da la ruta completa del archivo que inició tu aplicación (normalmente app.js).

    path.dirname(...) extrae solo el directorio contenedor de ese archivo.

👉 Entonces module.exports devuelve la ruta al directorio raíz del proyecto.
📥 3. Usar ese helper en tus rutas

Ahora, en vez de repetir __dirname, '..', ..., solo hacés esto:

// admin.js o shop.js
const path = require('path');
const rootDir = require('../util/path');

res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

Así mantenés el código más limpio, más DRY (Don’t Repeat Yourself), y 100% compatible con cualquier sistema operativo.
✅ Ventajas

    Código más reutilizable y mantenible.

    Compatible con Windows y Linux.

    Fácil de entender si tenés varios archivos que necesitan construir rutas relativas al proyecto.