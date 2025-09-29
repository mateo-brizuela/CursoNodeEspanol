Perfecto 🙌 Te resumo y explico paso a paso lo que tu profesor dijo en esta clase. Esta es la **primera implementación práctica del patrón MVC**, concretamente la parte de los **controladores**.

---

## 1. Situación actual del proyecto

* Ya tenés una carpeta **views/** con tus plantillas → esas se dejan igual.
* Lo que **falta** es crear carpetas para:

  * **controllers/** (controladores)
  * **models/** (modelos, más adelante).

Hasta ahora, la lógica de control está **mezclada en los archivos de rutas** (`admin.js`, `shop.js`).

---

## 2. Qué es lógica de controlador

* Cuando en una ruta (`router.get(...)`) tenés código que:

  * trabaja con datos (aunque sea una línea)
  * y luego devuelve una vista
    👉 eso es **lógica de controlador**.

Ejemplo:

```js
router.get('/add-product', (req, res, next) => {
  res.render('add-product');
});
```

Ese bloque es un **controlador en acción**, aunque todavía esté dentro de la ruta.

---

## 3. Por qué separar rutas y controladores

* Si ponés **toda la lógica dentro de los archivos de rutas**, esos archivos crecen demasiado y se vuelven difíciles de mantener.
* Mejor:

  * **Rutas** → solo definen qué función se llama.
  * **Controladores** → contienen la lógica que se ejecuta.

Así podés ver rápidamente:

* en `routes/admin.js` → qué rutas existen.
* en `controllers/products.js` → qué hace cada ruta.

---

## 4. Crear carpeta y archivo de controladores

1. Se crea una carpeta `controllers/`.
2. Dentro, se crea un archivo `products.js` para toda la lógica relacionada con productos.

   * Más adelante, si hay usuarios, se puede hacer `users.js`.
   * Incluso se podrían dividir más (ej. `admin-products.js` y `shop-products.js`), pero por ahora todo va en `products.js`.

---

## 5. Mover funciones desde rutas a controladores

Ejemplo en **controllers/products.js**:

```js
exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
};
```

👉 Notas:

* Usamos `exports.nombreFuncion = ...` porque queremos **exportar varias funciones**.
* Cada función sigue siendo un **middleware de Express** (recibe `req, res, next`).

---

## 6. Ajustar las rutas para usar controladores

En `routes/admin.js`:

```js
const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
```

En `routes/shop.js`:

```js
const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;
```

👉 Ojo: **no se ejecutan** las funciones (`productsController.getAddProduct()`), se pasa **la referencia** → Express las ejecuta cuando llegue la request.

---

## 7. Cambios extra

* El array `products` que estaba en `admin.js` ahora vive en `controllers/products.js`, para que los controladores puedan usarlo.
* En `app.js` ya no se importa `adminData`, porque ahora solo exportamos el router. Se cambia por:

  ```js
  const adminRoutes = require('./routes/admin');
  app.use('/admin', adminRoutes);
  ```

---

## 8. Resultado final

* Todo sigue funcionando igual:

  * Podés añadir un producto.
  * Aparece en la tienda.
* Pero ahora tu código está **estructurado con controladores** → primera parte del patrón MVC.

---

## 🔑 Resumen claro

* **Antes**: lógica de controlador estaba dentro de `routes/*.js`.
* **Ahora**:

  * `routes/` → definen rutas y asignan controladores.
  * `controllers/` → funciones con la lógica (renderizar vistas, manipular datos).
* Esto hace que el código sea más limpio, escalable y fácil de mantener.

---

¿Querés que te arme un **diagrama sencillo** (tipo cajas y flechas) mostrando cómo fluye ahora: `Rutas → Controladores → Views`?
