🔧 Problema que plantea:

En tu archivo admin.js (rutas de administrador), tenés rutas como:

router.get('/add-product', ...);
router.post('/add-product', ...);

Y estas rutas están pensadas para ser accedidas como:

/admin/add-product

Pero hoy, eso no está reflejado en el archivo, ya que las rutas comienzan directamente con /add-product.
🧠 Solución propuesta:

En el archivo principal app.js, cuando usás el router, podés especificar un prefijo para todas esas rutas:

app.use('/admin', adminRoutes);

Esto hace que todas las rutas dentro de adminRoutes (tu admin.js) se sirvan bajo el prefijo /admin.
✨ Comportamiento importante:

Cuando hacés eso:

    Express filtra las rutas que comienzan con /admin para que solo esas pasen al router adminRoutes.

    Dentro del archivo admin.js, ya no hace falta escribir /admin. Solo se escriben los sub-paths (/add-product, /edit, etc.).

    Express “omite” el prefijo /admin dentro del router. Por eso router.get('/add-product') sí matchea /admin/add-product.

🖼️ Ejemplo práctico:
En admin.js:

router.get('/add-product', (req, res) => {
  res.send('<form action="/admin/add-product" method="POST">...</form>');
});

router.post('/add-product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

En app.js:

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

⚠️ Detalle importante:

Como ahora todo lo de admin.js vive bajo /admin, también debés actualizar cualquier action o link HTML, por ejemplo:

<form action="/admin/add-product" method="POST">

De lo contrario, enviaría el POST a /add-product (sin /admin) y Express no lo encontraría, por eso da “Page Not Found”.
✅ Beneficio:

Esto evita que tengas que repetir /admin en cada ruta dentro del archivo admin.js y te ayuda a mantener un código más limpio, organizado y escalable.