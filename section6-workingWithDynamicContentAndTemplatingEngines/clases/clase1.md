🧠 Resumen de la clase:
📁 1. Cambios en HTML y CSS

    El instructor actualizó el diseño y contenido de los archivos .html y .css.

    Te pide:

        Colocar los .html en la carpeta views

        Colocar los .css en la subcarpeta css dentro de public

    Son ajustes estéticos y agregados necesarios para lo que se verá en este módulo.

📦 2. Simulación de almacenamiento de datos

    Hasta ahora, cuando se enviaba un producto desde el formulario en add-product, solo se hacía un console.log() del título.

    Ahora quiere guardar esa información en memoria, en una variable (sin usar aún una base de datos).

📌 3. Cómo se implementa
a. Se crea un array products en admin.js:

const products = [];

    Se usa const porque el referente al array no cambia, aunque se le puedan agregar elementos.

b. Se exporta el array junto con las rutas:

exports.routes = router;
exports.products = products;

c. En app.js, se debe adaptar la importación:

const adminData = require('./routes/admin');
app.use('/admin', adminData.routes);

d. En shop.js, se importa el array de productos:

const adminData = require('./routes/admin');
console.log(adminData.products);  // Se ve el contenido actualizado

🧪 4. Cómo se prueba

    Se agrega un producto desde el formulario → el producto se guarda en el array.

    Luego, al cargar /shop, se ve que ese producto aparece en adminData.products, porque:

        Se está compartiendo una misma instancia de ese array entre archivos.

        En Node.js, cuando exportás un objeto o array, se comparte por referencia (no se copia), así que si se modifica, el cambio se refleja donde sea que lo hayas importado.

⚠️ 5. Problema importante: ¡datos compartidos entre usuarios!

    Abrió otro navegador distinto (Firefox) → el producto también aparecía ahí.

    Eso muestra que los datos guardados en variables en el servidor son globales y compartidos entre todos los usuarios.

📌 Conclusión del instructor:

    Esto está bien para practicar, pero en una app real no se debe compartir así la información entre usuarios. Más adelante vamos a:

    Usar sesiones para mantener datos por usuario

    Y eventualmente, usar una base de datos real para persistir los datos correctamente

✅ En resumen

Tu profe te enseñó a:

    Simular almacenamiento de productos usando arrays compartidos

    Entender cómo se comparten objetos entre módulos en Node.js

    Identificar por qué este enfoque no es ideal para apps reales multiusuario

    Prepararte para los siguientes pasos: manejo de sesiones y bases de datos