---
title: El IDE que estaba buscando
author: Mirko
date: 2021-01-03
description: >-
  GNOME Builder es una herramienta muy potente: permite desarrollar
  principalmente en 7 lenguajes.
cover: /pattern.png
layout: ../../../../layouts/ArticleLayout.astro
---

Soy desarrollador desde hace varios años. Empecé googleando <mark>cómo hacer un sitio web</mark> a los 14 y desde entonces he hecho unos cuantos *(luego me pasé a StackOverflow 👅)*.

Tuve la suerte de crecer en una época en la que la informática —en particular la programación— evolucionaba muy rápido. Por entonces nadie imaginaba que JavaScript se volvería un lenguaje tan famoso como para generar ríos de frameworks a su alrededor.

La tecnología ha evolucionado a tal velocidad que hoy está al alcance de todos. Hay muchos lenguajes de programación, adecuados para cada contexto y para cada desarrollador.

### IDE y editores de código

Empecé en Windows: abría el Bloc de notas y me divertía haciendo aparecer textos de colores en mi página web que, por suerte, estaba en local 😅.

Cuando descubrí PHP sentí la necesidad de pasar a un editor más estructurado, como Notepad++. Ofrecía plugins, resaltado de sintaxis, formato y muchas otras herramientas que me ayudaron a digerir mejor el lenguaje.

En un año pasé a Visual Studio por necesidades con Visual Basic y C#, aunque abandoné esos lenguajes bastante rápido cuando compré un iMac con OS X Mountain Lion. Empecé a usar editores como BBEdit y Brackets.

El gran cambio llegó cuando me pasé a Ubuntu hace años. Me ahorro el desfile de editores e IDE probados; por citar algunos: Geany, Gedit, Eclipse, Atom, VS Code, Elementary Code y JetBrains*. Todos me sirvieron para llegar a él: el IDE definitivo.

#### El IDE definitivo

Mi forma de programar y el objetivo han cambiado recientemente. Desde 2017 empecé a desarrollar [bots de Telegram](https://unifiedban.solutions) para la seguridad y gestión de grupos, software de escritorio y servidor (Linux), portales y [CMS](https://github.com/biskuitorg/), etc.

Como el desarrollo de aplicaciones GTK es mi objetivo principal, empecé a usar <mark>GNOME Builder</mark>, el IDE “todo en uno” de GNOME.

![](/uploads/2021-01-03-09-00-54-gnome-builder.png)

Evito hablar de su elegancia y de mi cariño por GTK en general, o no terminamos nunca.

GNOME Builder es muy potente: permite desarrollar principalmente en 7 lenguajes (los que GNOME usa habitualmente para sus aplicaciones):

- C
- JavaScript
- Python 💘
- Rust
- C++
- C#
- Vala

![](/uploads/2021-01-03-09-50-43-gnome-builder-new-project.png)

Te deja elegir de inmediato la licencia con la que distribuir el software, habilitar Git y preconfigurar el proyecto para un contexto dado. Puedes elegir el target para el tipo de aplicación que vas a desarrollar:

- Aplicación GNOME (con soporte de widgets GTK)
- Librería compartida
- Aplicación de línea de comandos
…o, sencillamente, un proyecto vacío.

Incluso puedes elegir uno de los proyectos de GNOME para aprender o colaborar.

![](/uploads/2021-01-03-09-55-09-gnome-builder-gnome-sources.png)

#### Integración con Meson y Flatpak

GNOME Builder integra <mark>Flatpak y Meson</mark> por defecto. Esto significa que cada aplicación creada nace como Flatpak y con el sistema de build meson+ninja.

Es una opción: basta con eliminar el manifest `.json` en la raíz del proyecto para usar solo la pareja meson+ninja. Aun así me parece una gran decisión: Flatpak es “de casa” en GNOME y es un buen incentivo para distribuir el proyecto como Flatpak desde el principio.

#### ¿Glade, eres tú?

Llevo tiempo usando Glade para crear interfaces GTK. Es una herramienta muy potente que, desde un editor gráfico, devuelve el proyecto en formato ‘xml’, normalmente con extensión `.ui` o `.glade`.

![](/uploads/2021-01-03-10-03-31-glade.png)

Incluye todos los [widgets](https://developer.gnome.org/gtk3/stable/GtkWidget.html) GTK, propiedades, señales, atajos: todo. Permite crear una interfaz completa desde cero. Al principio, fascinado por su eficiencia, no esperaba su integración en GNOME Builder. Pero con la expansión del código de [Bottles](https://github.com/bottlesdevs/Bottles), una de las apps en las que trabajo, empecé a sentir *el peso* de saltar entre aplicaciones.

Luego —porque soy un 🙈 y no exploro a fondo un programa antes de usarlo— no había notado que Builder integra Glade.

![](/uploads/2021-01-03-09-05-21-gnome-builder-glade.png)

Creo que aún no está del todo estable, he notado algún que otro parón, pero esta integración convierte a Builder en el IDE completo para mi uso. Desde aquí puedo empezar y terminar el desarrollo de una app sin abandonar la pantalla. Permite consultar la documentación sin pasar al navegador, integra la to-do list generada analizando el código. Ofrece un depurador funcional, la herramienta de análisis Valgrind y permite el profiling del proceso.

Gracias, GNOME 💖. Les estaré siempre agradecido.

__Mirko_
