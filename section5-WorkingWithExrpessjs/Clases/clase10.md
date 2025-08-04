🎯 Objetivo del cambio

Hasta ahora, se devolvían respuestas como res.send('<h1>Hola</h1>'), es decir, HTML “de juguete” escrito como texto en el código. Ahora el objetivo es empezar a servir páginas HTML reales guardadas en archivos .html.
🗂️ Organización del proyecto

Se crea una carpeta llamada views/ (nombre convencional, pero no obligatorio) donde se colocarán estos archivos HTML. Esto es un paso inicial hacia la estructura MVC (Modelo-Vista-Controlador), donde:

    Modelo: lógica de negocio y datos

    Vista: lo que ve el usuario (HTML)

    Controlador: decide qué hacer ante una petición

📄 Archivos HTML creados

Se crean dos archivos:

    views/add-product.html → formulario para agregar un producto

    views/shop.html → muestra los productos (más adelante)

💡 Contenido de add-product.html

Es una página básica con:

    Un encabezado (<header>) con navegación entre / y /add-product

    Un formulario (<form>) que:

        Usa POST hacia /add-product

        Tiene un campo input de tipo text con nombre title

        Un botón de tipo submit que dice “Add Product”

🔁 Contenido de shop.html

Es igual a add-product.html, pero en vez del formulario, solo tiene:

    Un <h1> que dice “My Products”

    Una sección donde más adelante se listarán los productos desde el backend

🧠 Cosas a tener en cuenta

    Por ahora no hay estilo visual, solo estructura HTML básica

    Más adelante se usará un motor de plantillas (templating engine) para inyectar datos dinámicamente en el HTML

    Si no te interesa escribir HTML a mano, podés saltear esa clase y copiar el archivo terminado (según él, está disponible)

✅ Resumen final

Tu instructor está preparando el terreno para trabajar con archivos HTML reales (estáticos por ahora), como parte del enfoque MVC, y más adelante permitirá inyectar datos dinámicos en ellos.