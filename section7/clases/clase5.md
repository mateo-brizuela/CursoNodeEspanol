¡Clave esta clase! Tu profe está resolviendo **el error de “no tiene length”** demostrando que el problema no es el array sino **la asincronía**.

## ¿Qué estaba pasando?

En `fetchAll()` se hace `fs.readFile(...)`. Eso es **asíncrono**:

* `fetchAll()` **termina** antes de que `readFile` acabe y por eso **no retorna** los productos.
* Los `return ...` que ves están **dentro del callback** de `readFile`, así que **no retornan desde `fetchAll`**, sino desde esa función interna.
* Resultado: `fetchAll()` devuelve `undefined` y en la vista hacés `undefined.length` → **error**.

## ¿Cómo lo arregla?

Convierte `fetchAll` a una función **basada en callback**:

### Modelo (mal enfoque original)

```js
static fetchAll() {
  fs.readFile(p, 'utf8', (err, fileContent) => {
    if (err) return [];               // ❌ Este return NO sale de fetchAll
    return JSON.parse(fileContent);   // ❌ Tampoco
  });
}
```

### Modelo (enfoque correcto con callback)

```js
static fetchAll(cb) {
  fs.readFile(p, 'utf8', (err, fileContent) => {
    if (err || !fileContent) return cb([]);        // ✅ devolvés por callback
    try {
      cb(JSON.parse(fileContent));                 // ✅ pasás los datos por cb
    } catch {
      cb([]);                                      // ✅ fallback seguro
    }
  });
}
```

> Idea clave: **no retornes** el resultado; **ejecutá** el `cb` cuando `readFile` termine y **pasale** los productos.

### Controlador

Antes (esperando retorno inmediato):

```js
const products = Product.fetchAll();               // ❌ undefined
res.render('shop', { prods: products });
```

Ahora (pasando un callback):

```js
Product.fetchAll((products) => {                   // ✅ se ejecuta al terminar
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
});
```

> Es **exactamente** el mismo patrón que `fs.readFile`: vos le pasás una función y **Node te la ejecuta** cuando tiene los datos.

## ¿Por qué ahora sí funciona?

* `fetchAll` **no intenta retornar**; en cambio, **avisa** “ya terminé y acá están los productos” llamando al callback.
* El controlador **renderiza dentro** de ese callback, cuando los datos **ya están disponibles**.
* Así la vista recibe un **array real** y `length` funciona.

## Extra: alternativas modernas

Si más adelante querés evitar callbacks anidados:

* Promesas:

  ```js
  static fetchAll() {
    return fs.promises.readFile(p, 'utf8')
      .then(txt => JSON.parse(txt))
      .catch(() => []);
  }

  // controlador
  Product.fetchAll().then(products => res.render('shop', { prods: products }));
  ```
* `async/await`:

  ```js
  static async fetchAll() {
    try { return JSON.parse(await fs.promises.readFile(p, 'utf8')); }
    catch { return []; }
  }

  // controlador
  const products = await Product.fetchAll();
  res.render('shop', { prods: products });
  ```

Pero en la clase, la corrección fue: **usar un callback en `fetchAll` y renderizar dentro**. Con eso desaparece el “no tiene length”.
