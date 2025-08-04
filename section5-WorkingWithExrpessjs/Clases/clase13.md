🎯 Objetivo de la clase

Aunque el curso no es de CSS, el instructor quiere mostrar cómo aplicar estilos básicos en tus páginas HTML servidas desde Node.js y preparar todo para tener un diseño más limpio y funcional.
🧱 1. CSS Inline con <style> en el HTML (provisorio)

    Para comenzar rápido, se agregaron estilos dentro de etiquetas <style> en el <head> del HTML.

    Esto se hace así por ahora, porque todavía no está configurado cómo servir archivos CSS externos, pero se hará después.

🧑‍🎨 2. Estructura y nomenclatura de clases

    Usa un sistema de nombres llamado BEM (Block Element Modifier), por ejemplo:

    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item">...</li>
        </ul>
      </nav>
    </header>

    Ventaja: más claridad, escalabilidad, y evita conflictos de nombres.

    💡 BEM es opcional pero recomendado en proyectos grandes para mantener ordenado el CSS.

🎨 3. Estilos básicos aplicados

    Se define un header con color de fondo, padding, altura fija, y display: flex para alinear elementos horizontal y verticalmente.

    Se eliminan márgenes y padding predeterminados del navegador.

    Se eliminan los list-style de las listas de navegación.

    Se agregan estilos a los links: sin subrayado, color personalizado, y efecto hover.

    Se cambia la fuente global a sans-serif.

📝 4. Formulario en add-product.html

    Se reorganiza el formulario:

        Se agrega un div.form-control alrededor de cada input.

        Se agregan label asociados a los input con el atributo for.

        Se estiliza cada form-control para que los inputs y labels estén alineados y tengan márgenes adecuados.

    El formulario:

        Tiene un ancho fijo (20rem), centrado con margin: auto.

        Inputs con bordes redondeados y colores coherentes con la paleta general.

        Botón con estilos similares: color, borde, hover y cursor tipo "manito".

📄 5. 404.html también estilizado

    Se copia el mismo header y estilos de shop.html al archivo 404.html.

    Así la página de error también luce como el resto del sitio y tiene navegación funcional.

🔄 6. Ajustes menores finales

    Cambios de color (por ejemplo, el texto de los links de blanco a negro para mejor contraste).

    Reemplazos rápidos con las herramientas del editor (como VS Code).

    Correcciones menores en rutas mal escritas (admin/add-product, etc.).

📦 7. Próximo paso sugerido

    Actualmente el CSS está dentro del HTML, lo cual no es ideal.

    El siguiente paso (en otra clase) será mover ese CSS a archivos externos y aprender a servirlos correctamente desde Express.

✅ Conclusión

Esta clase te enseña a:

    Aplicar estilos básicos a tus páginas HTML servidas por Express.

    Usar buenas prácticas de nomenclatura (como BEM).

    Preparar la base para una estructura más profesional con CSS externo.