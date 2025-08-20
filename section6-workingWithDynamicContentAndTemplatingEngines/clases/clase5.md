1️⃣ Pasar datos del servidor a la vista

    Usamos res.render('shop', { prods: products, docTitle: 'Shop' }).

    El primer argumento es el nombre de la plantilla (shop.pug).

    El segundo argumento es un objeto con los datos que queremos usar en la vista.

    Las claves de ese objeto (prods, docTitle) se convierten en variables disponibles en Pug.

    Se usa prods en lugar de products para evitar confusiones de nombres.

📌 Idea clave: siempre se pasa un objeto, no un array suelto.
2️⃣ Usar variables en Pug

    Para mostrar el título en la plantilla:

    title #{docTitle}

    #{variable} inserta el valor de esa variable como texto.

3️⃣ Convertir HTML a sintaxis Pug

    .grid → es un <div class="grid">.

    article.card.product-item → <article class="card product-item">.

    No se usan etiquetas de cierre.

    La indentación marca la jerarquía de elementos.

    Atributos en etiquetas se ponen entre paréntesis:

    img(src="url", alt="texto")

    Si hay varias clases, se separan con puntos: .clase1.clase2.

4️⃣ Iterar sobre los productos

    Se usa each para recorrer el array:

    each product in prods
      h1 #{product.title}

    product es una variable temporal para cada elemento.

    prods es el array que pasamos desde res.render().

5️⃣ Mostrar contenido condicional

    Si no hay productos:

    if prods.length > 0
      each product in prods
        // render producto
    else
      h1 No products

    Esto evita mostrar una lista vacía.

6️⃣ Cambios en la vista

    Si solo cambias .pug, no necesitas reiniciar el servidor: el cambio se refleja al refrescar el navegador.

    Si cambias código JS del servidor, ahí sí necesitas reiniciar.

7️⃣ Práctica recomendada

    Convertir otras páginas HTML (como add-product.html) a .pug.

    Mantener los HTML originales para después comparar con otros motores de plantillas.

    Pasar también datos dinámicos como títulos de página.

💡 En resumen, esta clase te enseñó:

    Pasar datos desde Express a Pug con un objeto.

    Usar variables en Pug (#{variable}).

    Iterar arrays (each).

    Condicionales (if / else).

    Sintaxis básica de Pug para reemplazar HTML.

    Que las vistas no requieren reinicio del servidor.