🔹 1. Conversión de HTML a Pug

Comenzó con add-product.html y lo convirtió en add-product.pug dentro de la carpeta views/.

Usó Emmet para generar rápidamente un esqueleto HTML5 y luego lo fue traduciendo a sintaxis Pug.

Ajustó el <title> de la página y copió el header (barra de navegación) desde otro archivo (shop.pug) para mantener consistencia.

🔹 2. Creación del formulario en Pug

Convirtió el <main> y el <form> de HTML a Pug:

main → main

<form class="..." method="POST" action="/..."> → form.className(method="POST", action="/...")

Dentro del form:

<div class="..."> → .className (div implícito).

<label for="title">Title</label> → label(for="title") Title.

<input type="text" name="title" id="title"> → input(type="text", name="title")#title.

<button type="submit" class="btn">Add Product</button> → button.btn(type="submit") Add Product.

👉 Resaltó cómo en Pug se usan selectores CSS (# para id y . para class) en lugar de escribir atributos completos.

🔹 3. Uso de contenido dinámico

En vez de texto fijo, introdujo variables dinámicas pasadas desde Express.

En Pug: title= docTitle o h1= pageTitle.

En Express:
res.render('add-product', { pageTitle: 'Add Product' });

Esto permite reutilizar la misma plantilla con distinto contenido según la ruta.

🔹 4. Importación de estilos

Se dio cuenta de que faltaban los CSS.

Copió los <link rel="stylesheet" ...> desde otra plantilla (shop.pug) para mantener los estilos.

Agregó también forms.css porque el formulario lo necesitaba.

🔹 5. Conversión de la página 404

Creó un 404.pug con un esqueleto HTML5.

Copió el header y los estilos desde add-product.pug.

En el <main> agregó un h1 Page Not Found.

En Express, en el middleware catch-all (al final de app.js), cambió de res.sendFile a res.render('404').

🔹 6. Resultado

Ahora tanto la página Add Product como la de 404 se renderizan con Pug en lugar de HTML plano.

Ya está usando Pug como templating engine configurado en app.js (app.set('view engine', 'pug')).

Mostró que al cambiar los .pug, no hace falta reiniciar el servidor (Nodemon no reinicia porque no se tocan archivos .js, solo vistas).

🔹 7. Próximos pasos (lo que vendrá)

El instructor anticipó que va a mostrar otras funcionalidades de Pug: bucles (each), condiciones (if/else), layouts, includes, etc.

✅ Resumen corto en una frase:
Tu instructor convirtió las vistas estáticas (add-product.html, 404.html) a Pug, les agregó variables dinámicas (pageTitle), importó estilos, y configuró Express para renderizar esas plantillas en vez de HTML estático.