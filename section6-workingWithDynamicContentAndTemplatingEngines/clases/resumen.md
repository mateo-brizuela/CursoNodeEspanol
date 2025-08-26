Perfecto 🙌, te hago un resumen claro y detallado de lo que explicó tu profesor en **esta clase de cierre de la unidad sobre motores de plantillas (templating engines)**.

---

## 1. Limpieza del proyecto

* Como ya se decidió trabajar con **EJS**, se eliminan:

  * La carpeta `layouts/` (solo se usaba con Pug y Handlebars).
  * Todos los archivos `.pug`, `.hbs` y `.html`.
* Ahora el proyecto queda más limpio, solo con los archivos `.ejs`.

---

## 2. Cómo funciona el flujo de datos en un motor de plantillas

El profesor repasó el **flujo de datos → desde Express → hacia la vista**:

1. En Express usamos el método especial:

   ```js
   res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
   ```

   * `render()` busca la **vista** en la carpeta `views/` y usa el **view engine** configurado (en este caso, EJS).
   * No es necesario escribir la extensión (`.ejs`), Express la infiere.
   * Si la vista está en un subfolder, se indica con la ruta relativa:
     Ejemplo: `"products/add-product"` → buscaría `views/products/add-product.ejs`.

2. En `app.js` configuramos el motor:

   ```js
   app.set('view engine', 'ejs');
   app.set('views', 'views'); // opcional, porque 'views' ya es la carpeta por defecto
   ```

   * `view engine` le dice a Express qué motor usar.
   * `views` le dice en qué carpeta buscar las plantillas.

3. Importante: hay que instalar el motor como dependencia con npm (`npm install ejs`).

---

## 3. Qué pasa dentro de la plantilla

* El objeto que pasamos en `res.render()` se **desestructura en variables disponibles en la plantilla**.
  Ejemplo:

  ```js
  res.render('shop', { pageTitle: 'Shop', path: '/' });
  ```

  → Dentro de `shop.ejs`, podés usar:

  ```ejs
  <title><%= pageTitle %></title>
  <a href="/" class="<%= path === '/' ? 'active' : '' %>">Shop</a>
  ```

* EJS interpreta las etiquetas `<%= %>` o `<% %>`:

  * `<%= variable %>` → imprime el valor de la variable.
  * `<% if (...) { %> ... <% } %>` → bloques de lógica con JS.
  * `<% for (...) { %> ... <% } %>` → loops con JS.

---

## 4. Qué devuelve al navegador

* Aunque en la vista escribas EJS (con `<% %>`), **el navegador nunca ve ese código**.
* El servidor (Node + EJS) genera un archivo **HTML plano** con los valores ya sustituidos.
* Ejemplo:

  * Código en la vista:

    ```ejs
    <h1><%= pageTitle %></h1>
    ```
  * Resultado en el navegador:

    ```html
    <h1>Shop</h1>
    ```

---

## 5. Rendimiento (behind the scenes)

* Los motores de plantillas como EJS no solo renderizan, también hacen **caching**:

  * Si la estructura de la plantilla no cambió, la compilan una vez y luego la reutilizan.
  * Así la respuesta es más rápida, solo se cambia la parte dinámica (las variables).
* Esto ocurre de forma automática, el programador no necesita hacer nada.

---

## 6. Resumen conceptual de la unidad

* **Qué son los templating engines**: herramientas para generar HTML dinámico en el servidor.
* **Por qué usarlos**:

  * Evitan repetir el mismo HTML (con includes o layouts).
  * Permiten insertar valores dinámicos (`pageTitle`, `products`, etc.).
  * Soportan lógica básica (if, for).
* **Diferencias vistas**:

  * Pug → sintaxis reducida, soporta layouts y lógica, pero no HTML puro.
  * Handlebars → HTML puro, layouts con `{{{ body }}}`, pero lógica limitada.
  * EJS → HTML puro + lógica JS, no tiene layouts nativos pero usa includes.

👉 Con cualquiera de los tres, el resultado final que llega al navegador **siempre es HTML plano**.

---

✅ En pocas palabras:
Con Express + un motor de plantillas (EJS en este caso), cada request se procesa en el servidor → se combina una plantilla con datos dinámicos → y se devuelve **HTML listo** al navegador.

---

¿Querés que te arme un **mapa visual del flujo completo** (Request → Express → `res.render()` → EJS → HTML en navegador) para que lo tengas como resumen gráfico de la unidad?
