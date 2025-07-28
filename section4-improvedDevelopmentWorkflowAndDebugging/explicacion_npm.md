Introducción a npm (Node Package Manager):

    Viene instalado automáticamente con Node.js, así que no tenés que hacer nada adicional.

    Sirve para instalar paquetes de terceros y para manejar scripts personalizados.

Scripts de npm:

    Te permiten automatizar tareas como iniciar tu app (en vez de escribir node app.js cada vez).

    También se pueden usar para pruebas, compilación, formateo, etc.

    Vas a empezar a usarlos ahora para mejorar tu flujo de trabajo.

Iniciar un proyecto con npm init:

    Aunque ya tenés un proyecto Node.js, usar npm init te permite crear un archivo package.json.

    Ese archivo permite:

        Definir scripts de ejecución personalizados.

        Administrar dependencias (como librerías que vas a instalar después).

        Agregar metadatos útiles del proyecto.




🧰 Inicializando un proyecto con npm

    ✅ Comando inicial:

        Usás npm init para configurar tu proyecto de Node.js.

        No borra ni modifica tu código, simplemente crea un archivo package.json.

    📝 Durante la ejecución de npm init:

        Te hace preguntas como:

            Nombre del proyecto (puede aceptar el sugerido o escribir uno propio).

            Descripción, archivo principal (como app.js), comando de prueba, autor, licencia, etc.

        Podés dejar la mayoría de estas opciones en blanco o aceptar las sugerencias.

    📦 Se crea package.json:

        Es un archivo de configuración que describe tu proyecto.

        Tiene estructura JSON, parecida a objetos JavaScript, pero con claves y strings entre comillas dobles.

        Podés editarlo manualmente si cometés errores en las respuestas.

🔧 Usando package.json para ejecutar scripts

    ⚙️ Scripts en package.json:

        Hay una sección "scripts" donde podés definir comandos que luego se ejecutan con npm.

        Por ejemplo, podés agregar:

    "scripts": {
      "start": "node app.js"
    }

🚀 Comando especial npm start:

    start es un nombre especial: al ejecutar npm start, Node busca automáticamente el script "start" y lo ejecuta.

    Es una forma más práctica y estándar de lanzar tu aplicación.

💡 Comandos personalizados:

    Podés agregar otros scripts como:

"scripts": {
  "start": "node app.js",
  "start-server": "node app.js"
}

Para correrlos, no alcanza con npm start-server. Debés usar:

        npm run start-server

    🧠 ¿Por qué es útil esto?

        Aunque escribir npm start en vez de node app.js no ahorra mucho, es una buena práctica porque:

            Estandariza cómo se lanza tu app.

            Es lo esperado por otros desarrolladores.

            Te permite automatizar tareas como tests, builds, linters, etc. (muy común en proyectos con React, Angular, Vue, etc.).

✅ Conclusión:

    npm init te ayuda a formalizar tu proyecto y preparar herramientas útiles.

    package.json es tu archivo central de configuración.

    Los scripts te permiten ejecutar comandos personalizados más fácilmente con npm start o npm run <script>.

    Esto mejora tu flujo de trabajo y mantenimiento del proyecto.

¿Querés que te ayude a crear tu package.json o agregar algún script útil?