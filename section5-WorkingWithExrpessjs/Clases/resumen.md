🧱 1. Express.js como base del desarrollo

    Express.js es un framework para Node.js, no reemplaza Node, sino que lo extiende.

    Sigue usando módulos nativos como path, pero te da utilidades adicionales y una estructura clara para organizar tus aplicaciones.

    Lo más importante que introdujo fue el concepto de middleware.

🔁 2. Middleware: el corazón de Express

    Un middleware es una función que recibe (req, res, next).

    Se usa para:

        Leer o transformar la solicitud (req)

        Enviar una respuesta (res)

        Pasar el control al siguiente middleware con next()

    ⚠️ Regla clave:

        Si envías una respuesta, NO llamás a next().

        Si NO enviás respuesta, SÍ debés llamar a next().

🛣 3. Control de rutas

    Usaste app.use(), app.get(), app.post():

        app.use(path): aplica el middleware a todas las rutas que comienzan con ese path.

        app.get(path): aplica solo a método GET y coincidencia exacta de la ruta.

    Esto te permite distinguir acciones según el path y el método de la solicitud HTTP.

🗂 4. Express Router: modularización de rutas

    Aprendiste a usar express.Router() para separar rutas en archivos independientes.

    Después las importás y usás con app.use().

    Esto hace que tu proyecto sea más organizado y escalable.

🧾 5. Servir archivos

    Express no sirve archivos directamente por seguridad.

    Para que el navegador pueda acceder a archivos como .css, .js o imágenes, usaste:

app.use(express.static(path.join(__dirname, 'public')));

    Así pudiste servir archivos estáticos, por ejemplo CSS, desde una carpeta public/.

📦 6. Middleware externo y extensibilidad

    Viste cómo usar paquetes de terceros como body-parser (o express.urlencoded en versiones modernas).

    Esto muestra lo flexible que es Express: muchos paquetes son solo middleware plug-and-play.

📚 7. Lo que viene

    Esta base de Express es fundamental para lo que sigue:

        Renderizar contenido dinámico con plantillas

        Conectar con bases de datos

        Autenticación de usuarios

        Gestión de datos en el servidor

✅ En resumen:

Este módulo fue sobre construir una base sólida con Express:

    Entender y usar middleware correctamente

    Modularizar rutas

    Servir archivos estáticos

    Preparar todo para aplicaciones más complejas
