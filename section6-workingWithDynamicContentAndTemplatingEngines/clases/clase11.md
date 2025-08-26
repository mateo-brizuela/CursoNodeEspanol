Vale, te hago un **resumen explicado paso a paso** de lo que tu instructor dijo en esa clase, para que quede claro qué significa cada parte y cómo funciona Handlebars con layouts en Express. 🚀

---

# 1. Diferencias entre Handlebars y Pug con layouts

* **Pug**: tenía el concepto de `extends` y `block`, con lo que podías definir en el layout zonas dinámicas que luego cada vista rellenaba.
* **Handlebars (hbs)**: también soporta layouts, pero **no tiene “block” como Pug**.
  → En vez de bloques usás un **placeholder fijo**:

  ```hbs
  {{{ body }}}
  ```

  Eso es entendido por Handlebars/Express-Handlebars como “donde va el contenido de cada vista”.

---

# 2. Configuración del motor en `app.js`

Cuando registrás el motor de hbs:

```js
app.engine('hbs', expressHbs({
  layoutsDir: 'views/layouts',
  defaultLayout: 'main-layout',
  extname: 'hbs'
}));
```

* **`layoutsDir`**: carpeta donde viven tus layouts. Por defecto es `views/layouts`, pero podés cambiarla.
* **`defaultLayout`**: el nombre del layout por defecto, ej. `main-layout.hbs`.
* **`extname`**: Handlebars por defecto espera `main.handlebars` (extensión completa). Con `extname: 'hbs'` le decís que acepte `.hbs` también en los layouts.

---

# 3. Creación del layout principal (`views/layouts/main-layout.hbs`)

Tu layout es la “plantilla base” que se usará en todas las vistas.
Ejemplo:

```hbs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{pageTitle}}</title>
  <link rel="stylesheet" href="/css/main.css">
  {{#if productCSS}}
    <link rel="stylesheet" href="/css/product.css">
  {{/if}}
  {{#if formsCSS}}
    <link rel="stylesheet" href="/css/forms.css">
  {{/if}}
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/" class="{{#if activeShop}}active{{/if}}">Shop</a></li>
        <li><a href="/admin/add-product" class="{{#if activeAddProduct}}active{{/if}}">Add Product</a></li>
      </ul>
    </nav>
  </header>

  <main>
    {{{ body }}}
  </main>
</body>
</html>
```

👉 Cosas a notar:

* `{{pageTitle}}`: variable que pasás desde la ruta en Express.
* `{{#if productCSS}} ... {{/if}}`: incluye el CSS solo si la ruta lo requiere.
* `{{#if activeShop}}`: añade la clase activa al link dependiendo de qué ruta esté activa.
* `{{{ body }}}`: el lugar donde se inyecta el contenido de cada vista (Shop, Add Product, etc.).

---

# 4. Vistas que usan ese layout

Las vistas (`shop.hbs`, `add-product.hbs`, etc.) ya **no necesitan repetir todo el HTML** del header, head, etc.
Ejemplo de `shop.hbs`:

```hbs
<h1>Welcome to the shop</h1>
<p>Here are the products...</p>
```

Eso es lo único que ponés en la vista. Automáticamente se inyecta en el `{{{ body }}}` del layout.

---

# 5. Pasar variables desde las rutas

Como ahora los estilos y las clases “activas” dependen de condiciones, tenés que pasar esas flags desde Express.

Ejemplo en `shop.js`:

```js
router.get('/', (req, res) => {
  res.render('shop', {
    pageTitle: 'Shop',
    productCSS: true,
    activeShop: true
  });
});
```

Ejemplo en `admin.js` para Add Product:

```js
router.get('/add-product', (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});
```

👉 Si **no pasás** la variable, Handlebars la trata como `false`.

---

# 6. Qué hacer si querés desactivar el layout

Por defecto, todas las vistas usan `main-layout.hbs`.
Si querés que una vista se renderice **sin layout**, podés pasar:

```js
res.render('shop', { layout: false });
```

---

# 7. Filosofía de Handlebars

* En **Pug** definías bloques y se componía más dentro del HTML.
* En **Handlebars**, el layout es **más rígido**: solo hay un placeholder `{{{ body }}}`.
* El contenido dinámico y condicional (como CSS extra o clases activas) se resuelve con **variables que vos le pasás desde Express**.
* Esto hace que las plantillas sean **más simples/limpias**, pero obliga a manejar la lógica desde el server.

---

# 8. Conclusión de tu instructor

* Handlebars funciona distinto a Pug, pero **no es mejor ni peor**, es otra filosofía.
* Las vistas quedan más “lean” (solo contienen el contenido, no la estructura completa).
* Se controla mucho desde **Node/Express** (pasando variables).
* Más adelante se verá también **EJS** como otra opción.

---

👉 En pocas palabras: **Pug = layouts flexibles con bloques**. **Handlebars = layouts con un placeholder fijo, lógica con variables e ifs**.

---

¿Querés que te arme un ejemplo completo de `main-layout.hbs`, `shop.hbs`, `add-product.hbs` y sus rutas en Express, listo para copiar/pegar?
