Perfecto 🙌 Vamos a desmenuzar **todo lo que tu instructor explicó en esa clase** sobre **EJS, includes (partials)** y cómo reemplazan la idea de layouts de Pug/Handlebars.

---

# 1. El problema inicial

* En **Pug** y **Handlebars** teníamos **layouts**: un archivo base (layout principal) donde metíamos bloques o placeholders, y cada vista rellenaba esas zonas.
* **EJS** no soporta layouts de forma nativa.
* ¿La alternativa? Usar **partials** o **includes**: trozos de HTML compartido que podés insertar en distintas vistas.

👉 Es como la idea inversa al layout:

* Con un layout → 1 base + muchas vistas que se “inyectan”.
* Con includes → varias partes reutilizables que se van “incluyendo” en distintas vistas.

---

# 2. Crear el folder `includes/`

Dentro de `views/`, el instructor crea una carpeta `includes/` (el nombre es libre).
Ahí guarda archivos parciales reutilizables, por ejemplo:

* **`head.ejs`** → `<html>`, `<head>`, `<title>`, CSS comunes, apertura de `<body>`.
* **`navigation.ejs`** → `<nav>` con el menú.
* **`end.ejs`** → cierre de `</body>` y `</html>`.

Estos tres bloques se usan en **todas las páginas**.

---

# 3. Cómo usar un include en EJS

En una vista (ej. `404.ejs`) podés importar con:

```ejs
<%- include('includes/head.ejs') %>
```

* `<%- ... %>`: incluye el HTML tal cual (no lo escapa).
* `<%= ... %>`: sí escaparía caracteres especiales (mostraría el HTML como texto).
* Por eso usamos `<%- ... %>` para incluir código HTML confiable.

Después podés incluir también la navegación:

```ejs
<%- include('includes/navigation.ejs') %>
```

Y al final:

```ejs
<%- include('includes/end.ejs') %>
```

---

# 4. Ventaja de includes

* Podés escribir `<head>`, `<nav>`, y `</body></html>` **una sola vez**.
* Si cambia algo global (ej. agregar un CSS en el `<head>`), lo cambiás en `head.ejs` y se actualiza en todas las vistas.

---

# 5. Manejo del link activo en la navegación

Problema: cuando usás un menú compartido, ¿cómo marcas qué link está activo?

Solución:

* Pasás una variable `path` desde tu ruta en Express. Ejemplo:

  ```js
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
  ```

* En `navigation.ejs` podés hacer:

  ```ejs
  <li class="main-header__item">
    <a href="/" class="<%= path === '/' ? 'active' : '' %>">Shop</a>
  </li>
  <li class="main-header__item">
    <a href="/admin/add-product" class="<%= path === '/admin/add-product' ? 'active' : '' %>">Add Product</a>
  </li>
  ```

👉 Así, dependiendo de la ruta actual (`path`), EJS genera dinámicamente `class="active"` en el link correspondiente.

---

# 6. Aplicar includes en todas las vistas

El instructor va por cada vista (`404.ejs`, `add-product.ejs`, `shop.ejs`) y:

1. Corta el bloque común del inicio → lo sustituye por `include('includes/head.ejs')`.
2. Reemplaza la barra de navegación → `include('includes/navigation.ejs')`.
3. Cierra el documento con `include('includes/end.ejs')`.

El contenido único de cada página queda en el medio.

Ejemplo `add-product.ejs` después de refactorizar:

```ejs
<%- include('includes/head.ejs') %>
<%- include('includes/navigation.ejs') %>

<main>
  <form action="/admin/add-product" method="POST">
    <label for="title">Title</label>
    <input type="text" id="title" name="title">
    <button type="submit">Add Product</button>
  </form>
</main>

<%- include('includes/end.ejs') %>
```

---

# 7. Resultado final

* Ahora **todas las páginas funcionan igual que antes**, pero:

  * El código común está centralizado en `includes/`.
  * La navegación marca dinámicamente la opción activa según el `path`.
* Se parece mucho a tener layouts, pero con EJS lo logramos a base de **includes**.

---

# 8. Conclusión del instructor

* Con EJS **no hay layouts nativos**, pero sí **includes/partials**.
* El resultado es prácticamente el mismo: menos repetición, más mantenibilidad.
* Podés compartir código entre vistas fácilmente (head, nav, footer).
* EJS te da simplicidad: HTML normal + lógica de JS + includes.
* Con esto queda cerrada la introducción a motores de plantillas: Pug, Handlebars y EJS → ahora podés elegir el que prefieras.

---

👉 ¿Querés que te arme el ejemplo completo (`head.ejs`, `navigation.ejs`, `end.ejs`, y cómo se vería `shop.ejs`) para que lo tengas ya listo y lo compares con tu código?
