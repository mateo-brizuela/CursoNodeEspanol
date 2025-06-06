🧠 1. ¿Cómo ejecuta Node.js tu código?
Node.js usa un solo hilo (thread) de JavaScript.

A diferencia de otros lenguajes como Java, no crea un nuevo hilo por cada request.

Esto plantea dos preguntas:

¿Cómo maneja muchas peticiones al mismo tiempo?

¿Puede ocurrir que una petición bloquee a otra?

⚙️ 2. ¿Qué es el event loop?
Es un mecanismo interno que mantiene corriendo a Node.js esperando eventos.

Ejecuta funciones (callbacks) asociadas a eventos cuando estos ocurren.

Por ejemplo: cuando se recibe un request, o se termina de leer un archivo.

🏋️‍♂️ 3. ¿Qué pasa con tareas pesadas (como leer un archivo)?
Node.js no usa el event loop para procesar directamente estas tareas.

En vez de eso, las manda a un "worker pool", un grupo de procesos en segundo plano que:

Usan múltiples hilos.

Ejecutan tareas pesadas (I/O como archivos, red, etc.).

Cuando termina el trabajo, el worker notifica al event loop, y este ejecuta el callback correspondiente.

⏱ 4. Fases del event loop
El event loop tiene varias etapas en cada ciclo (simplificado):

Timers: ejecuta callbacks de setTimeout, setInterval.

I/O callbacks: ejecuta funciones de tareas terminadas (como fs.readFile).

Poll: busca nuevos eventos de I/O.

Check: ejecuta callbacks de setImmediate.

Close callbacks: callbacks de eventos de cierre (como .on('close')).

Si no hay más cosas que hacer, el programa termina automáticamente.

Pero si hay un servidor escuchando (por ejemplo server.listen()), el programa sigue corriendo, porque Node lo considera un "evento pendiente".

🔐 5. ¿Es seguro usar un solo hilo?
Sí. Cada request se maneja dentro de su propia función.

Las variables que uses dentro de una función para un request no son accesibles desde otro.

Así se evita que los datos de un request interfieran con otros.

🧩 6. ¿Qué es lo importante que debes recordar?
Node.js es asíncrono y no bloqueante.

Usa un único hilo y un event loop para coordinar el trabajo.

Usa un worker pool para hacer tareas pesadas sin bloquear el resto del código.

Los callbacks se ejecutan cuando los eventos están listos.

No hace falta memorizar las fases del event loop, pero sí entender que tu código no se ejecuta de arriba hacia abajo linealmente cuando hay callbacks.

No usar funciones sincrónicas (como writeFileSync) en producción, porque bloquean el hilo.

