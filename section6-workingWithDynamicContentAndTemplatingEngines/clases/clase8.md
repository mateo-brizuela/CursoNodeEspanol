Perfecto, Mauro 🙌
Te explico paso a paso lo que tu instructor enseñó en esa clase: **cómo marcar dinámicamente el link activo en la navbar y cómo manejar el título de cada página en un layout Pug**.

---

## 🔹 1. El problema

* Con el layout Pug ya evitaste repetir el header en cada archivo.
* Pero el **link activo** (el que debería tener la clase `active`) no estaba resuelto.
* Tampoco el **título de la página** (`<title>`) era dinámico: siempre mostraba lo mismo.

---

## 🔹 2. La idea: pasar datos adicionales desde las rutas

Cuando en Express hacés un `res.render(...)`, además de pasar el `pageTitle`, podés pasar otras claves.
Por ejemplo:

```js
// admin.js
res.render('add-product', { 
  pageTitle: 'Add Product', 
  path: '/admin/add-product' 
});
```

* `pageTitle` → se usa en el `<title>` del documento.
* `path` → un “marcador” que le dice a la vista en qué página estás (puede ser el path real, o cualquier string que vos definas).

---

## 🔹 3. Usar `path` en el layout para marcar el link activo

En `main-layout.pug`, tu instructor mostró que podés **inyectar lógica en el atributo `class`**:

```pug
ul.nav-links
  li
    a(href="/") 
      class=(path === '/' ? 'active' : '')
      | Inicio
  li
    a(href="/shop" class=(path === '/shop' ? 'active' : '')) Shop
  li
    a(href="/admin/add-product" class=(path === '/admin/add-product' ? 'active' : '')) Add Product
```

👉 Esto significa:

* Si la variable `path` coincide con el valor esperado, agrego la clase `active`.
* Si no, la dejo vacía.

De esta forma, **solo el link de la página actual se pinta como activo** (ej: amarillo).

---

## 🔹 4. Extender el layout en cada página

* `add-product.pug` extiende el layout y recibe `{ path: '/admin/add-product', pageTitle: 'Add Product' }`.
* `shop.pug` extiende el layout y recibe `{ path: '/shop', pageTitle: 'Shop' }`.
* `404.pug` extiende el layout y recibe `{ path: null, pageTitle: 'Page Not Found' }`.

---

## 🔹 5. El título dinámico

En el `<head>` del layout, en lugar de un título fijo, se usa una variable:

```pug
head
  title #{pageTitle}
```

Y ahora cada render pasa su propio `pageTitle`:

```js
res.render('shop', { pageTitle: 'Shop', path: '/shop' });
res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
res.status(404).render('404', { pageTitle: 'Page Not Found', path: null });
```

---

## 🔹 6. Corrección de un error

El instructor cometió un error al crear el objeto en Express (puso un `=` en lugar de `:` al definir la propiedad `path`).
Lo corrigió aclarando que en un objeto JS siempre se usa `clave: valor`.

---

## 🔹 7. Resultado final

* El layout **reutiliza el header y los estilos**.
* Los links de la navbar se marcan dinámicamente con `active` según el `path`.
* El `<title>` de la página ahora es dinámico (`Shop`, `Add Product`, `Page Not Found`).
* Cada página extiende el mismo layout, pero solo define sus bloques de contenido y estilos adicionales.

---

✅ **Resumen en una frase:**
Tu instructor te enseñó a **pasar variables adicionales (`path`, `pageTitle`) desde las rutas de Express hacia Pug**, para que el layout marque dinámicamente el link activo en el navbar y muestre el título correcto de cada página, sin repetir código.

---

¿Querés que te arme un ejemplo completo de `main-layout.pug` ya con la lógica de `active` lista para que lo copies en tu proyecto?
