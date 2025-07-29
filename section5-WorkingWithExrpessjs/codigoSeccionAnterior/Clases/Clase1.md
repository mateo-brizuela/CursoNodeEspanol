💻 3. Importar Express en tu archivo app.js

Luego, en tu archivo principal (app.js), importás Express:

const express = require('express');

Este nombre (express) lo podés cambiar si querés, pero es una convención. El instructor también te sugiere organizar tus imports dejando una línea en blanco entre:

    los módulos de Node (como fs, http)

    los paquetes de terceros (como express)

    y tus propios archivos

Esto no es obligatorio, pero ayuda a tener el código más claro.
⚙️ 4. Crear una aplicación Express

Una vez importado Express, creás una "aplicación Express":

const app = express();

¿Por qué lo hacemos así? Porque:

    El paquete express exporta una función.

    Cuando la ejecutás (express()), te devuelve un objeto especial llamado app, que representa tu servidor Express.

    Ese objeto va a ser el corazón de tu servidor: ahí vas a definir rutas, middleware, lógica, etc.

El instructor incluso te muestra que, si hacés Ctrl + clic en express, podés ver que internamente exporta esa función. Lo hace desde un archivo de definición en TypeScript, pero no te preocupes por la sintaxis.
🔄 5. ¿Qué contiene app?

Ese objeto app tiene mucha lógica interna de Express. Es un manejador de solicitudes (request handler) válido, por lo que podés usarlo directamente así:

const server = http.createServer(app);

En este punto, si ejecutás npm start, tu servidor va a estar funcionando, pero todavía no va a hacer nada cuando lleguen solicitudes, porque no definiste ninguna ruta.
✅ 6. ¿Qué hace Express por ahora?

Aunque no maneja rutas todavía, sí hace una cosa:

    Express ya configura internamente cómo va a manejar las solicitudes.

    Esta configuración es parte de su "forma especial" de trabajar con peticiones HTTP, que veremos en la próxima clase.