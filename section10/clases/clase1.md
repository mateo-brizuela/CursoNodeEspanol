````md
# 📚 Clase: Conexión a MySQL desde Node.js + Connection Pools

En esta clase tu instructor introduce uno de los cambios más importantes del curso:

👉 Pasar de trabajar con archivos → a trabajar con una **base de datos real (MySQL)**

Esto cambia completamente cómo se maneja la información en una aplicación backend.

---

# 🧠 1. Objetivo de la clase

El objetivo principal fue:

- conectar Node.js con una base de datos MySQL
- aprender cómo ejecutar queries SQL desde Node
- entender por qué usar **connection pools**
- preparar la base para reemplazar el sistema de archivos

---

# 📦 2. Instalación del paquete MySQL

Para poder interactuar con MySQL desde Node, se instala el paquete:

```bash
npm install mysql2
````

📌 Esto se instala como **dependency**, porque:

* es parte esencial de la app
* se usa en producción
* sin esto no podés hablar con la base de datos

---

## 🧠 Qué es `mysql2`

Es una librería que permite:

* conectarte a una base de datos MySQL
* ejecutar queries SQL desde Node
* leer resultados
* insertar, actualizar, borrar datos

👉 Básicamente, es el “puente” entre Node.js y MySQL

---

# 🔌 3. Conexión a la base de datos

Se crea un archivo tipo:

```text
/util/database.js
```

Ahí se centraliza toda la lógica de conexión.

---

## 🧠 Dos formas de conectarse

El instructor explica algo MUY importante:

### ❌ Opción 1: una sola conexión

```js
mysql.createConnection(...)
```

### Problema:

* cada query necesita abrir conexión
* hay que cerrarla después
* es lento
* no escala bien

👉 Es ineficiente

---

## ✅ Opción 2: Connection Pool (la correcta)

```js
mysql.createPool(...)
```

---

# 🧠 4. ¿Qué es un Connection Pool?

Un **connection pool** es:

> un conjunto (pool) de conexiones abiertas a la base de datos que se reutilizan

---

## 🔄 Cómo funciona (muy importante)

Imaginá esto como una pileta de conexiones:

1. Tu app crea varias conexiones al inicio
2. Cuando necesitás hacer una query:

   * pedís una conexión del pool
3. Ejecutás la query
4. Cuando termina:

   * la conexión vuelve al pool
5. Se reutiliza para otra query

---

## 🎯 Ventajas clave

### 🚀 1. Mucho más eficiente

No tenés que crear conexión cada vez.

---

### ⚡ 2. Permite múltiples queries simultáneas

Cada query usa una conexión distinta.

---

### 🔁 3. Reutilización

Las conexiones no se destruyen, se reciclan.

---

### 📉 4. Menor costo de performance

Crear conexiones es caro → evitás hacerlo constantemente

---

## 🧠 Analogía simple

Pensalo como taxis:

❌ Sin pool:

* cada vez que necesitás viajar → fabricás un taxi nuevo 😅

✅ Con pool:

* ya hay taxis disponibles
* agarrás uno, lo usás, lo devolvés

---

# 🧪 5. Implementación del Pool

Ejemplo típico:

```js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node_complete',
  password: 'tu_password'
});
```

---

## 📌 Configuración importante

* `host` → dónde está la DB
* `user` → usuario
* `database` → nombre del schema
* `password` → contraseña

---

# 🔄 6. Uso de Promises (muy importante)

El instructor agrega:

```js
module.exports = pool.promise();
```

---

## 🧠 ¿Por qué `.promise()`?

Porque permite usar:

* `.then()`
* `async/await`

En vez de callbacks.

---

## ❌ Sin promise

```js
db.query(sql, (err, result) => {});
```

👉 código más desordenado

---

## ✅ Con promise

```js
db.execute(sql)
  .then(result => {})
  .catch(err => {});
```

👉 más limpio y moderno

---

# 🧠 7. Uso del pool en la app

En `app.js`:

```js
const db = require('./util/database');
```

---

## Ejecutar una query

```js
db.execute('SELECT * FROM products')
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
```

---

## 🧠 Qué hace `execute`

* ejecuta SQL
* devuelve una Promise
* es más seguro que `query`

---

# 🧠 8. Importancia de SQL

El instructor menciona algo clave:

👉 Node no reemplaza SQL

Para trabajar con bases de datos:

* necesitás saber SQL
* Node solo ejecuta queries

---

## Ejemplo simple

```sql
SELECT * FROM products;
```

Esto significa:

> traer todos los productos

---

# 🧱 9. Creación de tablas

Antes de poder consultar datos, necesitás crear tablas en MySQL.

Ejemplo:

* tabla: `products`
* columnas:

  * id
  * title
  * price
  * description

Esto se hace desde herramientas como MySQL Workbench.

---

# ⚠️ 10. Cierre de conexiones

El pool se puede cerrar con:

```js
db.end();
```

Pero en una app web:

* no se cierra constantemente
* vive mientras la app está corriendo

---

# 🧠 11. Flujo completo de la clase

## Antes (con archivos)

* leer JSON
* parsear datos
* escribir en archivos

---

## Ahora (con MySQL)

1. Node se conecta a MySQL
2. Usa pool de conexiones
3. Ejecuta SQL
4. Recibe resultados
5. Usa esos datos en la app

---

# 🔥 12. Cambio mental importante

Este es el gran salto:

## ❌ Antes

```js
fs.readFile(...)
```

## ✅ Ahora

```js
db.execute('SELECT * FROM products')
```

---

# 🧠 13. Relación con lo que ya viste

Esto se conecta con la unidad anterior:

* antes obtenías datos desde archivos
* ahora los obtenés desde DB

Pero el resto sigue igual:

* rutas
* controllers
* views

👉 lo único que cambia es la fuente de datos

---

# 📊 14. Resumen conceptual fuerte

## Connection Pool

* conjunto de conexiones reutilizables
* mejora performance
* permite concurrencia

---

## mysql2

* librería para conectar Node con MySQL
* ejecuta SQL

---

## database.js

* centraliza la conexión
* exporta el pool

---

## execute()

* corre queries SQL
* devuelve Promises

---

## SQL

* lenguaje para manejar datos
* Node solo lo ejecuta

---

# 🧠 15. Idea clave para que te quede grabado

👉 Node.js no maneja datos por sí mismo

👉 necesita:

* archivos (simple)
* o base de datos (real)

👉 y para DB usa:

* librerías (mysql2)
* pools de conexión
* SQL

---

# 🚀 16. Conclusión de la clase

Esta clase es un punto de inflexión:

Pasás de:

👉 una app simple con archivos

a:

👉 una app más real, con base de datos y manejo eficiente de conexiones

Y el concepto más importante que aparece es:

🔥 **Connection Pool = eficiencia + escalabilidad + buenas prácticas**

---

# 🧠 17. Resumen ultra corto

* instalaste `mysql2`
* creaste un archivo `database.js`
* usaste `createPool`
* entendiste por qué no usar una sola conexión
* aprendiste a ejecutar queries con `execute`
* empezaste a usar Promises con `.promise()`

---

# 💬 18. Nota final importante

Este tema es CLAVE para backend real.

Si entendés bien:

* pools
* queries
* promesas

👉 ya estás entrando en nivel profesional de Node.js

---

```
```
