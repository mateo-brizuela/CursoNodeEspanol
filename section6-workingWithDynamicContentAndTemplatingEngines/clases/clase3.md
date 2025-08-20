🧱 1. Instalación de los motores de plantillas

Usó npm install --save para instalar tres motores populares:

npm install --save ejs pug express-handlebars

    ✅ ejs y pug se integran directamente con Express.

    ⚠️ handlebars requiere express-handlebars para funcionar con Express.

    Se instalan como dependencias de producción, ya que serán parte del código que se despliega.

⚙️ 2. Configuración de Express para usar Pug

Se dirigió a app.js y configuró el motor de vistas:

app.set('view engine', 'pug');       // Motor de plantillas
app.set('views', 'views');           // Carpeta donde están las vistas

    Estas son claves reservadas que Express sí entiende, a diferencia de claves personalizadas que podés usar con app.set() y app.get().

    'view engine' le dice a Express qué motor usar.

    'views' le dice dónde buscar las plantillas (por defecto es views, pero se puede cambiar).

📝 3. Creación de la vista con sintaxis Pug

Creamos un archivo:
views/shop.pug

Y explicó cómo la sintaxis de Pug es mínima (no se usan los <>, todo se basa en identación):

html
  head
    title My Shop
    link(rel="stylesheet", href="/css/main.css")
    link(rel="stylesheet", href="/css/product.css")
  body
    header.main-header
      nav.main-header__nav
        ul.main-header__item-list
          li.main-header__item
            a.active(href="/") Shop
          li.main-header__item
            a(href="/admin/add-product") Add Product

Tips importantes que mencionó:

    La identación importa en Pug para reflejar jerarquía HTML.

    Se pueden usar atajos como .main-header o a(href="/") texto.

    El IDE (Visual Studio Code) ayuda a autocompletar esta sintaxis.

🚀 4. Renderizando la vista

En el archivo shop.js, cambió la forma de responder:

res.render('shop');

    Ya no se usa res.sendFile().

    res.render() usa el motor configurado (pug) y busca shop.pug en la carpeta views.

🔍 5. Verificación en el navegador

    Al recargar la página en localhost:3000, se vio la cabecera generada con Pug.

    Aún no había contenido dinámico (lo va a agregar en la próxima clase).

    Si inspeccionás el HTML que llega al navegador, es HTML tradicional, porque Express y Pug ya lo procesaron en el servidor.

📌 Conclusión

Esta clase fue una introducción a:

✅ Qué son los templating engines
✅ Cómo se instalan
✅ Cómo se configuran en Express
✅ Cómo se usa Pug para estructurar HTML con sintaxis mínima
✅ Cómo usar res.render() para generar HTML dinámico desde el servidor