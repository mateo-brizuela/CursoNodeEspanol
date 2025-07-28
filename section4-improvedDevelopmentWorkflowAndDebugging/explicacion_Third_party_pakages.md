🛠️ Instalación de paquetes externos
✔️ Caso práctico:

Queremos evitar reiniciar el servidor manualmente cada vez que editamos el código.
✅ Solución:

Instalamos el paquete nodemon, que reinicia automáticamente el servidor al detectar cambios.
🔽 Comando:

npm install nodemon --save-dev

    --save-dev: indica que es solo para desarrollo.

    También existen:

        --save: para dependencias de producción.

        -g: para instalación global (en toda la máquina).

📁 ¿Qué se genera al instalar?

    node_modules/: carpeta con todos los paquetes y sus dependencias.

    package.json: archivo que declara las dependencias y scripts del proyecto.

    package-lock.json: registra las versiones exactas de los paquetes instalados.

    ✅ Se puede eliminar node_modules/ y regenerar luego con npm install.

🚀 ¿Cómo lo usamos?

    Agregamos en package.json:

"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}

Ejecutamos con:

    npm run dev

Esto inicia el servidor con reinicio automático cuando detecta cambios en el código.
🧰 Evitá reinventar la rueda

    En Node.js existe un ecosistema inmenso de paquetes listos para usar.

    Muchos resuelven tareas comunes como:

        Validación de formularios

        Manejo de rutas

        Conexión a bases de datos

        Autenticación

    En lugar de desarrollar todo desde cero, reutilizás código confiable y probado.

    Algunos ejemplos populares:

        express: framework para servidores web

        body-parser: para manejar datos del body en formularios

        dotenv: para manejar variables de entorno

🧠 Conclusión

    npm es clave para automatizar tareas, instalar utilidades y facilitar el desarrollo.

    Usar scripts como npm start o npm run dev mejora tu flujo de trabajo.

    Gracias a los paquetes de terceros, podés concentrarte en la lógica de tu aplicación, sin preocuparte por problemas ya resueltos por la comunidad.








    Características Globales vs Módulos Nativos vs Módulos de Terceros

Las últimas clases incluyeron conceptos importantes sobre las características disponibles en Node.js y cómo acceder a ellas.

Básicamente podés diferenciar entre:
✅ Características globales

    Palabras clave como const o function.

    Algunos objetos globales como process.

    Siempre están disponibles, no necesitás importarlas para usarlas en tus archivos.

📦 Módulos nativos (Core Modules) de Node.js

    Ejemplos:

        Módulo del sistema de archivos: "fs"

        Módulo de rutas: "path"

        Módulo HTTP: "http"

    No es necesario instalarlos (npm install NO es requerido).

    Pero sí deben importarse en los archivos donde los vayas a usar.

Ejemplo:

const fs = require('fs');

Ahora podés usar el objeto fs que exporta el módulo "fs".
🌐 Módulos de terceros (Third-party Modules)

    Deben ser instalados con npm install dentro del proyecto.

    También deben ser importados explícitamente.

Ejemplo (no hace falta entenderlo todavía, se verá más adelante en el curso):

# En la terminal
npm install --save express-session

// En un archivo de código (por ejemplo, app.js)
const sessions = require('express-session');


Aquí tienes la traducción y un resumen de lo que explicó tu instructor sobre los paquetes de npm globales y locales:

Traducción:

Paquetes npm Globales y Locales

En la última lección, agregamos nodemon como una dependencia local a nuestro proyecto.

Lo bueno de las dependencias locales es que puedes compartir proyectos sin la carpeta node_modules (donde se almacenan) y puedes ejecutar npm install en un proyecto para recrear esa carpeta node_modules. Esto te permite compartir solo tu código fuente, lo que reduce enormemente el tamaño del proyecto compartido.

Los fragmentos de código del curso adjuntos también se comparten de esa manera, por lo que ¡necesitas ejecutar npm install en los paquetes extraídos para poder ejecutar mi código!

Mostré que nodemon app.js no funcionaría en la terminal o línea de comandos porque allí no usamos dependencias locales, sino paquetes globales.

Podrías instalar nodemon globalmente si quisieras (aunque NO es necesario — porque podemos simplemente ejecutarlo localmente): npm install -g nodemon lo lograría. Específicamente, la bandera -g asegura que el paquete se agregue como un paquete global que ahora puedes usar en cualquier lugar de tu máquina, directamente desde la terminal o el símbolo del sistema.