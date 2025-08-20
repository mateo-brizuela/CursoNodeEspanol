🧩 1. ¿Qué estamos haciendo?

Hasta ahora estábamos usando la plantilla shop.pug, pero no estábamos mostrando contenido dinámico (como productos).

Ahora queremos pasar los productos desde el backend (admin data) a la vista para renderizarlos dinámicamente.
📦 2. ¿Cómo se pasan los datos a la vista?

Tu instructor usa el método res.render('shop', { prods: products, docTitle: 'Shop' })

    res.render() sirve para renderizar una vista (en este caso, un archivo .pug).

    Se le pasa como segundo argumento un objeto JavaScript con los datos que queremos que estén disponibles en la plantilla.

    En este caso:

        prods → contiene el arreglo de productos.

        docTitle → una string con el título de la página.

Esto es importante: la vista no recibe directamente el array, sino un objeto con claves, y luego en la plantilla usamos esas claves (como prods o docTitle).
📝 3. ¿Cómo se usan esos datos en Pug?

    Para mostrar el docTitle en la etiqueta title, se usa:

    title #{docTitle}

    #{} es la forma en que Pug inserta variables.

📃 4. Estructura HTML con sintaxis Pug

Tu instructor luego convierte el HTML del producto en Pug.

    .grid → es un div con clase grid. Si no ponés ninguna etiqueta, Pug asume que es un div.

    article.card.product-item → crea un article con clases card y product-item.

    En Pug:

        No se usan etiquetas de cierre (</div>).

        La indentación determina la jerarquía de los elementos.

🖼️ 5. Agregar imágenes y atributos

Para un img:

img(src="..." , alt="...")

    Los atributos se ponen entre paréntesis.

    Si hay varios, se separan con coma.

🔁 6. Renderizar una lista con each

Pug permite iterar con la sintaxis:

each product in prods

Y luego todo el código HTML/Pug del producto se indenta dentro del bloque each. Así, se repite ese bloque por cada producto.

Para mostrar el título:

h1.product__title #{product.title}

✅ 7. ¿Cómo saber si no hay productos?

También enseña a hacer una verificación con if y else en Pug:

if prods.length > 0
  each product in prods
    // render producto
else
  h1 No products

    Si prods tiene elementos, se renderizan.

    Si no, se muestra un mensaje.

⚠️ Asegurarse de usar prods.length y no products, porque prods es el nombre de la clave que se pasó a la vista.
🔁 8. ¿Hay que reiniciar el servidor si cambio el .pug?

No.

    Las plantillas .pug se interpretan en tiempo real, así que los cambios se aplican al refrescar la página.

    Solo si cambias código del servidor (JS), necesitás reiniciar.

🎯 9. ¿Qué podés hacer ahora como práctica?

Tu instructor te sugiere practicar:

    Convertir otras páginas HTML a .pug (como add-product.html).

    Usar res.render() para mostrarlas.

    Pasar variables dinámicas como el título.

    No borres los HTML originales, porque más adelante los vas a usar para comparar con otros motores de plantillas (como EJS o Handlebars).

📌 Resumen general
Tema	Explicación
res.render()	Renderiza una vista y le pasa un objeto con datos
#{} en Pug	Inserta una variable en texto
each	Sirve para iterar sobre un array
if / else	Estructura condicional en la vista
.className	Crea elementos con clases, se asume div si no hay etiqueta
img()	Atributos entre paréntesis, separados por comas
No cerrar etiquetas	Pug las cierra automáticamente
No reiniciar por cambios en .pug	Se recargan automáticamente