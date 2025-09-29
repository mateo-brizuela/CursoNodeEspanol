¡Vamos a destrabar esa clase paso a paso! La idea central que trabajó tu instructor es **migrar el “almacenamiento” de productos** desde un array en memoria a un **archivo JSON** en disco, y entender los detalles que eso implica: `fs`, `path`, `JSON.parse/stringify`, el `this` dentro de callbacks, y el **scope** (alcance) de variables como `p`.

---

# 1) Objetivo

> “Cuando llamo `save()`, quiero **guardar** el producto en un archivo `products.json`. Si ya hay productos guardados, **leerlos**, agregar el nuevo y **volver a escribir** el archivo.”

Esto evita que se pierdan los datos al reiniciar el servidor.

---

# 2) Módulos que usa

* **`fs`**: módulo core de Node para **leer/escribir archivos**.
* **`path`**: para **construir rutas** portables (`path.join(...)`) sin romper en Windows/Linux/Mac.
* (Opcional) un helper `rootDir` para apuntar a la **carpeta raíz** del proyecto.

---

# 3) Armar la ruta del archivo

Dentro del método `save()` (o mejor, a **nivel de módulo** para compartirla entre métodos), se construye la ruta:

```js
const p = path.join(rootDir, 'data', 'products.json');
```

* `rootDir` → carpeta del proyecto
* `data/` → subcarpeta donde guardamos datos
* `products.json` → el archivo

> Si `p` se declara **dentro** de `save()`, **no existe** en `fetchAll()`. Por eso más adelante ves el error “`p` is not defined”. Solución: **definir `p` una sola vez arriba del archivo**, fuera de la clase.

---

# 4) Flujo completo de `save()`

Dentro de `save()` ocurren **4 pasos**:

1. **Leer** el archivo si existe:

```js
fs.readFile(p, 'utf8', (err, fileContent) => {
  // ...
});
```

* Si **no existe** (`ENOENT`), `err` tendrá valor → empezamos con `[]`.
* Si existe, `fileContent` será un **string JSON**.

2. **Parsear** el JSON:

```js
let products = [];
if (!err && fileContent) {
  products = JSON.parse(fileContent); // de "texto JSON" a array JS
}
```

> `JSON.parse` convierte el texto del archivo (ej. `[{"title":"A"}]`) a **array JS** (`[{ title: "A" }]`).

3. **Agregar el nuevo producto**:

```js
products.push(this);  // 'this' es la instancia actual de Product
```

> `this` apunta al objeto creado con `new Product(req.body.title)`.
> **Importante**: El callback de `readFile` debe ser **arrow function** (`(err, data) => { ... }`) para **no perder** el `this` de la instancia. Las funciones normales (`function (...) {}`) tienen su propio `this` y lo “desenfocan”.

4. **Escribir** el archivo nuevamente:

```js
fs.writeFile(p, JSON.stringify(products), (err) => {
  if (err) console.error(err);
});
```

> `JSON.stringify` hace la operación inversa: de **array/objeto** → **texto JSON** para guardarlo en disco.

---

# 5) ¿Por qué al principio “dio undefined” o “no such file or directory”?

* La **primera vez**, el archivo no existe → `readFile` falla con `ENOENT` → no hay `fileContent`.
* Se maneja con:

  * `if (err) products = [];` (arrancá vacío)
  * Después igual hacés `push(this)` y escribís un **nuevo** `products.json`.

También conviene **crear la carpeta** `data/` si no existe:

```js
fs.mkdir(path.dirname(p), { recursive: true }, () => {
  fs.writeFile(p, JSON.stringify(products), cb);
});
```

---

# 6) `fetchAll()` leyendo del archivo

Tu instructor también implementa el “leer todos” para reemplazar el array en memoria:

**Patrón asíncrono con callback** (típico del curso):

```js
static fetchAll(cb) {
  fs.readFile(p, 'utf8', (err, fileContent) => {
    if (err || !fileContent) return cb([]);
    try {
      cb(JSON.parse(fileContent));
    } catch {
      cb([]);
    }
  });
}
```

> Nota: “`return` dentro del callback” **no** devuelve desde `fetchAll()`; por eso se usa un **callback `cb`** que recibe el array y *ahí* renderizás.

En el **controlador**:

```js
Product.fetchAll((products) => {
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
});
```

**Errores típicos que tu instructor muestra:**

* Intentar hacer `return products;` **dentro** del callback → no sirve (no retorna desde `fetchAll`, retorna solo del callback).
* Usar `p` sin definirlo en ese scope → “`p` is not defined”. Solución: **elevar `p` al tope del módulo**.

---

# 7) Alternativas válidas

Tienes 2 formas de implementar `fetchAll` y `save`:

### A) **Asíncrono con callback** (igual al curso)

* Pros: no bloquea el event loop.
* Contras: hay que **adaptar el controlador** a callback (como arriba).

### B) **Síncrono** (para no cambiar controladores)

* Pros: `fetchAll()` **retorna** el array (como antes) y encaja con controladores que esperan retorno inmediato.
* Contras: bloquea el event loop mientras lee/escribe (para este curso y prototipos suele estar bien).

Ejemplo síncrono:

```js
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'products.json');

function readAllSync() {
  try {
    const raw = fs.readFileSync(p, 'utf8');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAllSync(products) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(products, null, 2), 'utf8');
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const products = readAllSync();
    products.push(this);
    writeAllSync(products);
  }

  static fetchAll() {
    return readAllSync();
  }
};
```

---

# 8) Cosas finas a tener en cuenta

* **Encoding**: pasá `'utf8'` a `readFile` para obtener un **string** (y no un `Buffer`).
* **`JSON.parse` puede fallar** si el archivo tiene basura → protégelo con `try/catch`.
* **Condiciones de carrera** (dos saves simultáneos) pueden pisarse; para el curso no pasa nada, con DB se soluciona.
* **Scope**: si definís `const p` **dentro de `save()`**, no existe en `fetchAll()`. Llévalo arriba del archivo.
* **`this`** en callbacks: usá **arrow functions** para que `this` siga siendo la instancia del producto.

---

## Mini TL;DR (micro-resumen)

1. `save()` → lee `products.json` → `JSON.parse` → `push(this)` → `JSON.stringify` → escribe de vuelta.
2. `fetchAll()` → lee `products.json` → devuelve array (callback o retorno, según estilo).
3. `p` (la ruta) debe estar en un **scope compartido** (arriba del archivo).
4. Usá **arrow functions** en callbacks para **no perder `this`**.

Si querés, te paso un **`product.js` listo** en el estilo (A) asíncrono del curso con el helper `getProductsFromFile(cb)` y te marco exactamente cómo queda el controlador.
