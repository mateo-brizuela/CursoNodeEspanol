````md
# Unidad del curso: rutas dinámicas, query parameters, formularios, carrito y modelos en Node.js + Express

En esta unidad se trabajó sobre una idea central: **cómo hacer que una aplicación web deje de ser “estática” y empiece a reaccionar a los datos que llegan desde la URL o desde formularios**.

Hasta este punto del curso, la aplicación probablemente ya podía mostrar páginas, responder a ciertas rutas y renderizar vistas. En esta unidad, el paso importante fue aprender a trabajar con **información variable**, es decir, datos que no están escritos fijos en el código, sino que dependen de lo que el usuario hace.

Por ejemplo:

- qué producto quiere ver
- qué producto quiere agregar al carrito
- qué filtros quiere aplicar
- qué página quiere visitar
- qué elemento quiere eliminar

Todo eso requiere que el backend reciba datos, los interprete y actúe en consecuencia.

---

# Objetivo general de la unidad

El objetivo principal de esta unidad fue aprender a manejar tres grandes cosas:

1. **Datos que llegan por la URL**
2. **Datos que llegan por el body de una request**
3. **La organización de la lógica usando modelos**

Además, se empezó a construir la lógica del **carrito**, lo cual permitió ver cómo distintos modelos pueden relacionarse entre sí.

---

# 1. Rutas dinámicas (Dynamic Routing)

## Qué problema resuelven

Supongamos que tenés una tienda con muchos productos.

Si quisieras mostrar el detalle de cada producto, no tendría sentido crear rutas manuales como estas:

```js
/products/1
/products/2
/products/3
/products/4
````

y luego definir una ruta distinta para cada una.

Eso sería imposible de mantener.

Lo que se hace entonces es definir una ruta **dinámica**, es decir, una ruta que tiene una parte variable.

## Cómo se escribe una ruta dinámica

En Express, una ruta dinámica se define usando `:` delante del nombre del parámetro.

Ejemplo:

```js
router.get('/products/:productId', shopController.getProduct);
```

Acá, `:productId` significa:

> “en esta parte de la URL puede venir cualquier valor, y quiero capturarlo”.

Entonces, estas URLs coinciden con esa ruta:

```text
/products/1
/products/2
/products/abc
/products/x99
```

Express no mira el valor exacto, sino que entiende que ahí hay un segmento dinámico.

---

## Cómo se obtiene ese valor

Cuando una request entra a esa ruta, Express guarda el valor dinámico dentro de `req.params`.

Ejemplo:

```js
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
};
```

Si la URL fue:

```text
/products/123
```

entonces:

```js
req.params.productId
```

vale:

```js
'123'
```

---

## Idea importante

El nombre que pongas después de `:` es el nombre que después usás en `req.params`.

Ejemplo:

```js
router.get('/products/:id', ...)
```

se accede con:

```js
req.params.id
```

En cambio, si la ruta fuese:

```js
router.get('/products/:productId', ...)
```

se accede con:

```js
req.params.productId
```

O sea, el nombre lo elegís vos, pero después tiene que coincidir.

---

## Qué significa conceptualmente

Cuando usás una ruta dinámica, estás diciendo:

> “Quiero una sola ruta capaz de manejar muchos casos parecidos”.

Por ejemplo:

* `/products/1`
* `/products/2`
* `/products/3`

todas representan el mismo tipo de operación:

> “mostrar el detalle de un producto”

Lo único que cambia es **cuál producto**.

---

## Se puede tener más de un segmento dinámico

Sí, totalmente.

Por ejemplo:

```js
router.get('/shops/:shopId/products/:productId', (req, res, next) => {
  const shopId = req.params.shopId;
  const productId = req.params.productId;
});
```

Si llega esta URL:

```text
/shops/10/products/55
```

entonces:

```js
req.params.shopId     // '10'
req.params.productId  // '55'
```

Esto muestra que una ruta puede capturar más de un dato dinámico.

---

## Cuándo conviene usar route params

Los `params` se usan cuando el dato forma parte de la identidad del recurso.

Ejemplos típicos:

* `/products/:productId`
* `/users/:userId`
* `/orders/:orderId`

La idea es que el valor en la URL identifica claramente **qué recurso específico querés consultar o manipular**.

---

# 2. Query Parameters (parámetros de consulta)

## Qué son

Además de los parámetros dinámicos en la ruta, existe otra forma de enviar datos por la URL: los **query parameters**.

Son los que van al final de la URL, después de un signo `?`.

Ejemplo:

```text
/products?sort=asc
```

En esa URL:

* `/products` es la ruta
* `sort=asc` es un query parameter

---

## Para qué sirven

Los query parameters suelen usarse para información **opcional** que modifica la forma en que se responde una request, pero no cambia la identidad principal del recurso.

Ejemplos comunes:

* filtrar
* ordenar
* paginar
* buscar
* activar opciones adicionales

Por ejemplo:

```text
/products?page=2
/products?sort=price
/products?category=books
/products?page=2&sort=asc
```

---

## Cómo se leen en Express

Se acceden con `req.query`.

Ejemplo:

```js
router.get('/products', (req, res, next) => {
  const page = req.query.page;
  const sort = req.query.sort;
});
```

Si la URL fue:

```text
/products?page=2&sort=asc
```

entonces:

```js
req.query.page  // '2'
req.query.sort  // 'asc'
```

---

## Importante: no se definen en la ruta

A diferencia de los route params, los query parameters **no se registran en la ruta**.

O sea, no hacés esto:

```js
router.get('/products?page=:page', ...)
```

Eso está mal.

Simplemente definís la ruta normal:

```js
router.get('/products', ...)
```

y después Express automáticamente te deja leer los query params con `req.query`.

---

## Por qué son opcionales

Los query parameters son opcionales porque una misma ruta puede funcionar con o sin ellos.

Ejemplo:

```text
/products
/products?page=2
/products?page=2&sort=asc
```

Todas esas URLs pueden ser atendidas por la misma ruta:

```js
router.get('/products', ...)
```

Eso significa que tu código debe estar preparado para que a veces el parámetro exista y a veces no.

---

## Validación necesaria

Como son opcionales, no podés asumir siempre que están presentes.

Ejemplo:

```js
router.get('/products', (req, res, next) => {
  const page = req.query.page;

  if (page) {
    console.log('Página solicitada:', page);
  } else {
    console.log('No se pasó página');
  }
});
```

Esto es importante porque si tu lógica depende de un query param, primero debés chequear que exista.

---

## Diferencia conceptual entre params y query

Esta diferencia es muy importante.

## Route params

Se usan para identificar **qué recurso** querés.

Ejemplo:

```text
/products/123
```

Acá, `123` identifica el producto.

## Query params

Se usan para indicar **cómo querés procesar o presentar la información**.

Ejemplo:

```text
/products?page=2&sort=asc
```

Acá no estás identificando un producto específico, sino pidiendo una lista de productos con ciertas condiciones.

---

# 3. GET y POST: qué diferencia hay y por qué importa

En la unidad también se trabajó sobre la diferencia entre **requests GET** y **requests POST**.

Esto es clave porque define **cómo se envían los datos** y **qué intención tiene la request**.

---

## GET

`GET` se usa, en general, para **pedir información**.

Ejemplos:

* mostrar una lista de productos
* mostrar un detalle
* ver el carrito
* mostrar una página

Ejemplo:

```js
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
```

Un `GET` normalmente no debería modificar datos del sistema. Su función principal es **leer**.

---

## POST

`POST` se usa cuando querés **enviar datos al servidor para provocar una acción o un cambio**.

Ejemplos:

* agregar producto al carrito
* crear producto
* enviar formulario
* guardar usuario

Ejemplo:

```js
router.post('/cart', shopController.postCart);
```

Acá, la idea no es “pedir información”, sino decirle al backend:

> “agregá este producto al carrito”

---

## Por qué esto importa

Porque según el tipo de request, los datos viajan de manera distinta.

### En GET

Los datos suelen viajar en:

* la ruta (`req.params`)
* la query string (`req.query`)

### En POST

Los datos suelen viajar en:

* el body (`req.body`)

---

# 4. Request body y formularios

## Qué es el body de una request

El **body** es el cuerpo de la request, es decir, una parte donde se pueden enviar datos que no van en la URL.

Esto es muy común en formularios HTML.

---

## Cómo un formulario HTML envía datos

Cuando tenés un formulario como este:

```html
<form action="/cart" method="POST">
  <input type="hidden" name="productId" value="123">
  <button type="submit">Add to Cart</button>
</form>
```

al apretar el botón, el navegador construye una request `POST` a `/cart` y envía en el body los campos del form.

En este caso, manda algo equivalente a:

```text
productId=123
```

---

## Cómo se lee en Express

En el backend, ese valor se obtiene con `req.body`.

Ejemplo:

```js
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
};
```

Si el formulario envió `productId=123`, entonces:

```js
req.body.productId
```

vale:

```js
'123'
```

---

## Idea importante

El nombre del input:

```html
name="productId"
```

es lo que define la propiedad en `req.body`.

O sea:

* `name="productId"` → `req.body.productId`
* `name="title"` → `req.body.title`

---

# 5. Hidden inputs

## Qué son

Un `input` hidden es un campo de formulario que no se muestra en pantalla, pero igual se envía al backend.

Ejemplo:

```html
<input type="hidden" name="productId" value="<%= product.id %>">
```

---

## Para qué se usan

Sirven para mandar información importante sin necesidad de que el usuario la vea o la escriba manualmente.

En esta unidad, se usaron para enviar el ID del producto al hacer click en “Add to Cart”.

El usuario ve solo el botón, pero el formulario también manda el identificador del producto.

---

## Por qué tiene sentido

Porque cuando hacés click en “Add to Cart”, el backend necesita saber **qué producto agregar**.

El botón por sí solo no alcanza. El servidor necesita un dato concreto.

Entonces se incluye el `productId` como hidden input.

---

# 6. Por qué agregar al carrito se hace con POST

Esto es una de las ideas más importantes de la unidad.

Aunque para agregar al carrito solo haga falta un ID, la operación **no es una consulta**. Es una acción que cambia el estado del sistema.

Agregar al carrito significa modificar algo:

* el contenido del carrito
* los datos persistidos
* la sesión o almacenamiento

Por eso se usa `POST` y no `GET`.

---

## Qué pasaría si se usara GET

Técnicamente podría hacerse algo así:

```text
/cart/add/123
```

o

```text
/cart?productId=123
```

Pero semánticamente no es lo ideal, porque `GET` se usa para consultar, no para modificar.

Entonces, aunque sea “solo un id”, lo importante no es el tamaño del dato sino la **intención de la request**.

---

## Regla mental útil

Si la request responde a esta idea:

> “mostrame algo”

normalmente será `GET`.

Si la request responde a esta idea:

> “hacé algo” o “guardá algo”

normalmente será `POST` (o PUT/PATCH/DELETE según el caso).

Agregar al carrito entra claramente en el segundo grupo.

---

# 7. Includes en EJS y reutilización de código

En la unidad también apareció una mejora de estructura en las vistas: sacar un bloque repetido y moverlo a un include.

Esto se hizo porque el formulario “Add to Cart” aparecía en varias vistas:

* detalle de producto
* listado de productos
* página principal

En lugar de repetir el mismo HTML varias veces, conviene reutilizarlo.

---

## Ejemplo conceptual

En vez de escribir el mismo formulario en tres archivos distintos, se crea un archivo como:

```text
views/includes/add-to-cart.ejs
```

y dentro se pone el formulario.

Luego, desde otras vistas, se lo incluye con:

```ejs
<%- include('../includes/add-to-cart') %>
```

---

## Ventaja

Esto mejora mucho el código porque:

* evitás duplicación
* si tenés que cambiar algo, lo cambiás una sola vez
* las vistas quedan más limpias
* el mantenimiento es más fácil

---

## Problema que apareció con loops

En el transcript se menciona algo importante: cuando un include está dentro de un loop, la variable local del loop no siempre llega automáticamente al include.

Entonces hay que pasarla explícitamente.

Ejemplo conceptual:

```ejs
<%- include('../includes/add-to-cart', { product: product }) %>
```

Eso significa:

> “en este include quiero que exista una variable `product`, y su valor será el `product` actual del loop”.

Esto es importante para que el include pueda acceder a:

```ejs
product.id
```

---

# 8. Modelos (Models)

## Qué es un modelo en este contexto

En esta app, un modelo representa la lógica relacionada con un tipo de dato.

Por ejemplo:

* `Product` para productos
* `Cart` para carrito

El modelo no es la vista ni la ruta. Es la parte que se encarga de trabajar con los datos.

---

## Por qué usar modelos

Porque ayuda a separar responsabilidades.

## Las rutas

Definen qué paths existen y qué controller se ejecuta.

## Los controllers

Reciben la request, coordinan la lógica y devuelven una respuesta.

## Los models

Se encargan de leer, guardar, buscar o transformar datos.

Esto hace que el proyecto esté mejor organizado.

---

# 9. El modelo Cart

En esta unidad se agregó un modelo `Cart`.

El instructor menciona que este modelo tiene **solo métodos estáticos**.

---

## Qué significa un método estático

Un método estático pertenece a la clase, no a una instancia concreta.

Ejemplo:

```js
class Cart {
  static addProduct(id) {
    // lógica
  }
}
```

Y se usa así:

```js
Cart.addProduct(prodId);
```

No hace falta hacer:

```js
const cart = new Cart();
cart.addProduct(prodId);
```

---

## Por qué en Cart tiene sentido usar métodos estáticos

Porque en esta etapa del curso no se está creando “objetos carrito” complejos una y otra vez, sino trabajando directamente contra el almacenamiento.

Es decir, el modelo `Cart` funciona más como una capa utilitaria que como una entidad instanciable.

La idea es:

* leer los datos del carrito
* agregar productos
* eliminar productos
* actualizar cantidades

Todo eso se hace sobre el almacenamiento, sin necesidad de construir muchas instancias de `Cart`.

---

# 10. Interacción entre modelos

Esta parte es muy importante porque muestra que los modelos no viven aislados.

Ejemplo mencionado en la unidad:

> si se elimina un producto, también puede ser necesario eliminarlo del carrito

Eso significa que el modelo `Product` y el modelo `Cart` están relacionados.

---

## Por qué esto es lógico

Imaginá que el carrito guarda referencias a productos.

Si eliminás un producto del sistema y no lo sacás del carrito, podrías dejar datos inconsistentes.

Por ejemplo:

* el carrito apunta a un producto que ya no existe
* la vista del carrito intenta renderizar algo que fue borrado
* aparecen errores o datos “rotos”

Entonces, al borrar un producto, puede ser necesario que el carrito también se actualice.

---

## Qué enseña esto

Enseña que el sistema no es una suma de piezas independientes. Muchas veces una acción sobre una entidad afecta a otra.

Eso es muy común en cualquier aplicación real.

---

# 11. Persistencia usando archivos

Hasta este punto del curso, la app no usa base de datos real. Usa archivos para guardar datos.

Eso sirve para aprender, porque permite enfocarse en la lógica general sin sumar todavía la complejidad de una DB.

Por ejemplo:

* leer productos desde un archivo
* guardar cambios en un archivo
* leer carrito desde un archivo

---

## Qué ventajas tiene trabajar con archivos

Para aprender, tiene varias ventajas:

* es simple
* no necesita instalar una base de datos
* permite ver claramente qué se está guardando
* ayuda a entender el flujo completo de lectura/escritura

---

## Pero tiene limitaciones

El instructor remarca que no es una buena solución real a largo plazo.

### Razones:

## 1. Es más lento

Leer y escribir archivos en disco no es la forma más eficiente de manejar datos en una app.

## 2. Escala mal

A medida que la aplicación crece y hay más datos o más usuarios, los archivos se vuelven una solución limitada.

## 3. Es más frágil

No tenés las ventajas de una base de datos, como:

* búsquedas optimizadas
* relaciones
* índices
* consultas complejas
* concurrencia más robusta

## 4. Es una solución más “manual”

Tenés que resolver muchas cosas que una base de datos ya resuelve por vos.

---

# 12. Por qué el módulo termina hablando de bases de datos

Porque esta unidad prepara el terreno para el paso siguiente.

Primero aprendiste:

* cómo llegar al producto correcto usando rutas dinámicas
* cómo recibir datos del cliente con formularios
* cómo organizar lógica con modelos
* cómo hacer que un carrito guarde información

Una vez entendido todo eso, el siguiente paso natural es mejorar el almacenamiento.

O sea:

> seguir haciendo lo mismo, pero en vez de guardar en archivos, guardar en una base de datos

Eso es justamente lo que suele venir en el próximo módulo.

---

# 13. Resumen conceptual de toda la unidad

Esta unidad no fue solo “agregar detalles técnicos”. En realidad, introdujo una forma más realista de pensar una aplicación web.

Se aprendió que una app backend necesita poder:

## 1. Leer datos variables desde la URL

Eso se hace con:

* `req.params`
* `req.query`

## 2. Recibir datos enviados por formularios

Eso se hace con:

* `req.body`

## 3. Distinguir entre consultar y modificar

Eso se refleja en el uso de:

* `GET`
* `POST`

## 4. Organizar la lógica

Eso se logra con:

* rutas
* controllers
* models

## 5. Mantener consistencia entre distintos datos

Eso se ve cuando los modelos interactúan entre sí, como `Product` y `Cart`.

## 6. Entender las limitaciones del almacenamiento actual

Eso abre el camino hacia el uso de una base de datos.

---

# 14. Relación entre todos los conceptos de la unidad

Una buena forma de entender la unidad es verla como un flujo completo.

## Escenario: ver un producto

1. el usuario entra a una URL como `/products/123`
2. Express matchea la ruta dinámica `/products/:productId`
3. el backend obtiene `req.params.productId`
4. busca el producto correspondiente en el modelo
5. renderiza la vista con los datos

---

## Escenario: agregar un producto al carrito

1. el usuario ve un botón “Add to Cart”
2. ese botón está dentro de un formulario `POST`
3. el formulario incluye un hidden input con `productId`
4. al enviar, el navegador manda una request `POST /cart`
5. Express recibe la request
6. el controller lee `req.body.productId`
7. el modelo `Cart` agrega ese producto al almacenamiento
8. luego se redirige al carrito o a otra vista

---

## Escenario: borrar un producto

1. se elimina el producto desde el modelo `Product`
2. también puede ser necesario actualizar `Cart`
3. así se evita que el carrito quede con referencias inválidas

---

# 15. Qué deberías poder entender después de estudiar esta unidad

Después de repasar bien esta unidad, deberías poder responder con claridad cosas como estas:

## Sobre rutas dinámicas

* qué son
* para qué sirven
* cómo se definen
* cómo se leen con `req.params`

## Sobre query parameters

* qué son
* cómo viajan en la URL
* cómo se leen con `req.query`
* por qué son opcionales

## Sobre formularios y POST

* cómo un form HTML manda datos
* qué es `req.body`
* por qué un hidden input sirve para mandar un ID
* por qué agregar al carrito usa POST y no GET

## Sobre modelos

* para qué sirven
* por qué ayudan a organizar la app
* qué significa que un método sea estático
* cómo dos modelos pueden interactuar

## Sobre persistencia

* por qué usar archivos sirve al principio
* por qué no es ideal a largo plazo
* por qué el siguiente paso lógico es una base de datos

---

# 16. Mini resumen final para repaso rápido

## Rutas dinámicas

Se usan cuando una parte de la URL cambia según el recurso pedido.

Ejemplo:

```js
/products/:productId
```

Se leen con:

```js
req.params.productId
```

---

## Query parameters

Son parámetros opcionales al final de la URL.

Ejemplo:

```text
/products?page=2&sort=asc
```

Se leen con:

```js
req.query.page
req.query.sort
```

---

## POST y body

Cuando querés enviar datos para provocar una acción, usás `POST`.

Los formularios envían sus datos en el body.

Se leen con:

```js
req.body
```

---

## Hidden inputs

Permiten mandar datos invisibles al backend.

Ejemplo:

```html
<input type="hidden" name="productId" value="123">
```

---

## Cart model

Se creó para encapsular la lógica del carrito.

Usa métodos estáticos porque en esta etapa se trabaja directamente con almacenamiento.

---

## Interacción entre modelos

Los modelos pueden depender entre sí.

Ejemplo:

* si borrás un producto, quizá debés borrarlo también del carrito

---

## Archivos vs base de datos

Los archivos sirven para aprender, pero son lentos y limitados.

Por eso el siguiente paso del curso es usar una base de datos.

---

# 17. Conclusión general

Esta unidad fue importante porque marca el paso desde una app simple a una app con comportamiento dinámico real.

Ya no se trata solo de responder páginas fijas, sino de:

* capturar datos desde la URL
* recibir datos desde formularios
* actuar según esos datos
* organizar la lógica en modelos
* mantener consistencia entre entidades
* preparar la app para evolucionar hacia una base de datos

En otras palabras, esta unidad empieza a mostrar cómo se construye una aplicación backend de verdad en Express.

```
```
