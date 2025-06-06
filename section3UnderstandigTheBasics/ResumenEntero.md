🧠 Resumen Teórico del Módulo - Fundamentos de Node.js
🌐 ¿Cómo funciona la web?
Un cliente (navegador) hace una request al servidor.

El servidor procesa (accede a base de datos, archivos, etc.) y devuelve una response al navegador.

Esa respuesta puede ser HTML, JSON, texto, etc.

⚙️ ¿Qué es Node.js?
Es el motor del servidor en este flujo.

Node usa un único hilo (single-threaded) de ejecución, pero puede manejar múltiples peticiones gracias al modelo no bloqueante.

🔄 Event Loop
El event loop es el núcleo de Node.js.

No ejecuta código bloqueante directamente. En lugar de eso:

Registra callbacks (funciones a ejecutar en el futuro).

Despacha tareas pesadas (como leer archivos) a un worker pool en segundo plano.

Una vez que una tarea termina, su callback vuelve al event loop para ser ejecutado.

🔁 Flujo de ejecución
Node no espera a que algo termine para seguir con lo siguiente.

Por eso es importante no asumir que el orden en que escribís código es el orden en que se ejecuta.

Código como req.on('data') o fs.writeFile(...) se ejecuta después, cuando ocurre el evento correspondiente.

⛔ Evitar bloqueos
Usar writeFileSync bloquea el hilo, por eso se recomienda usar writeFile con un callback.

Si bloqueás el hilo principal, Node no puede manejar otras requests.

📦 Módulos y el sistema de archivos
Node tiene módulos core como:

http: para crear servidores

fs: para leer/escribir archivos

path: para manejar rutas de archivos

Se importan con require.

Si querés usarlo en otro archivo, también tenés que volver a require ahí.

🔁 Sistema de Módulos (require y module.exports)
Para usar código de otro archivo:

Lo exportás con module.exports.

Lo importás con require('./archivo').

Podés exportar funciones, objetos, clases, arrays, etc.

📥 Request & 📤 Response
Las request llegan en partes (chunks), por eso usamos eventos como req.on('data').

Después de res.end(), no podés enviar más respuestas.

Si lo hacés, Node lanza un error ("Cannot set headers after they are sent").

⚠️ ¿Por qué estudiar Node "a bajo nivel"?
Muchos cursos empiezan con Express.js y nunca ves lo que pasa detrás.

Aprender Node.js sin frameworks primero te da:

Entendimiento profundo.

Control absoluto.

Capacidad para depurar y escalar mejor.

✨ En resumen
Node.js usa un único hilo pero es eficiente gracias al event loop.

Usa callbacks para ejecutar código cuando las operaciones asíncronas terminan.

No bloquea el flujo, despacha tareas pesadas a un worker pool.

Las respuestas deben gestionarse con cuidado (no dobles respuestas, no escribir después del res.end()).

Aprende a usar los módulos core, el sistema de módulos (require/module.exports), y el manejo de request y response.

Todo esto sienta las bases para usar frameworks como Express más adelante.