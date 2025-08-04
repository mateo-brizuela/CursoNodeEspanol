📄 Resumen de lo que explicó
✅ 1. Objetivo

Servir archivos HTML (shop.html y add-product.html) desde el servidor Express, en lugar de texto plano.
✅ 2. Problema

Cuando intentó usar rutas relativas o absolutas como:

res.sendFile('/views/shop.html');

No funcionó porque:

    /views/... apunta al directorio raíz del sistema operativo, no al proyecto.

    Express necesita una ruta absoluta del sistema de archivos, no relativa.

✅ 3. Solución correcta

Importar el módulo path de Node.js y usar path.join() para construir la ruta absoluta de forma segura y compatible con cualquier sistema operativo.

const path = require('path');

res.sendFile(
  path.join(__dirname, '..', 'views', 'shop.html')
);

🧠 ¿Qué hace esto?

    __dirname → te da la ruta absoluta del archivo actual (en este caso, routes/shop.js).

    '..' → sube un nivel, desde /routes al directorio raíz del proyecto.

    'views' → entra a la carpeta views.

    'shop.html' → apunta al archivo a servir.

Esto arma una ruta como:

/home/usuario/mi-proyecto/views/shop.html  ← en Linux
C:\Users\usuario\mi-proyecto\views\shop.html ← en Windows

✅ 4. Aplicado también a add-product.html

Lo mismo se aplica a la ruta de add-product:

res.sendFile(
  path.join(__dirname, '..', 'views', 'add-product.html')
);

Y se asegura que al visitar /admin/add-product se vea ese formulario HTML.
📌 ¿Por qué usar path.join()?

Porque:

    Evita errores de compatibilidad con / (Linux/macOS) y \ (Windows).

    Construye rutas seguras y absolutas automáticamente.