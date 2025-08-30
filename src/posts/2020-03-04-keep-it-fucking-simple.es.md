---
title: "Manténgalo jodidamente simple @css"
description: "De lo que quiero hablar con usted hoy es el método con el que cualquiera desarrolla normalmente la interfaz de un sitio web."
published: true
layout: post
lang: es
---

De lo que quiero hablar hoy es el método que cualquiera que use generalmente para desarrollar la interfaz de un sitio web.

Inicialmente (y estoy hablando hace muchos años), los sitios web estaban limitados por la falta de reglas y elementos, que forzaron a los desarrolladores (aún no clasificados como diseñadores web en ese momento) para crear interfaces simples pero funcionales.

A medida que pasaron los años, aumentaron las herramientas a nuestra disposición, HTML y CSS se convirtieron en idiomas adecuados por derecho propio, lo que nos permite hoy crear interfaces funcionales y complejas.

! [] (https://media0.giphy.com/media/10rjcb79m16ary/giphy.gif?cid=790b761110ab7d3263e17e79a1d6613a81f1f90e12e4e8b4&rid=giphy.gif)

Sin embargo, este es un ejemplo en el que el progreso <Mark> evoluciona más rápido que los desarrolladores/diseñadores </sk>, lo que los lleva a no explotar completamente los recursos, lo que resulta en una baja calidad y malos resultados de rendimiento.

Para dar un ejemplo práctico, los marcos CSS se han utilizado durante muchos años, que son un conjunto de componentes y reglas para crear aplicaciones y sitios web. Por un lado, estamos garantizados que al aplicar estas reglas, una solicitud estará bien integrada y consistente en todos los aspectos. Por otro lado, terminamos con sábanas de estilo pesado, a menudo con reglas innecesarias y código muerto que probablemente nunca usaremos.

Refiriéndose a la frase ** El progreso evoluciona más rápido que los desarrolladores/diseñadores **, si solíamos tener menos recursos a nuestra disposición, pero las conexiones mucho más lentas, hoy tenemos más recursos y conexiones increíblemente rápidas, sin embargo, la experiencia no ha cambiado mucho, y un sitio web se carga en aproximadamente el mismo tiempo.

En pocas palabras, utilizando solo los recursos verdaderamente esenciales y, por lo tanto, evitando el uso de marcos CSS, terminamos con aplicaciones más actuantes y livianas, con un código fuente más simple, reduciendo no solo los tiempos de carga sino también el tiempo dedicado a comprenderlo y mantenerlo.

Para dar un ejemplo práctico citando el código fuente ** Navbar ** ofrecido por Bootstrap:

`` `HTML
<Nav class = "Navbar Navbar-Expand-Lg Navbar-Light BG-Light">
<a class = "Navbar Brand" href = "#"> Navbar </a>
<Botton class = "Navbar-Toggler" type = "Button" data-toggle = "colapse" data-target = "#NavbarsupportedContent" aria-confuntrols = "navarsupportedContent" aria-expandy = "false" aria-label = "alternar">>>
<span class = "navbar-toggler-icon"> </span>
</botón>

<div class = "colapso Navbar-colapse" id = "NavbarsupportedContent">
<ul class = "Navbar-Sav Mr-Auto">
<li class = "nav-item activo">
<A class = "Nav-Link" Href = "#"> Home <span class = "sr-only"> (actual) </span> </a>
</li>
<li class = "nav-item">
<a class = "Nav-Link" href = "#"> Link </a>
</li>
</ul>
</div>
</am>
`` `` ``

Lo que se destaca de inmediato es:

* La legibilidad compleja del código
* El uso compulsivo de clases
* La repetición innecesaria de los elementos del contenedor

Todo se puede simplificar con una estructura mínima utilizando elementos HTML básicos, como en el ejemplo a continuación:

`` `HTML
<Header>
<a href = "#">
<h1> marca </h1>
</a>
<boton> </boton>
<Arr>
<ul>
<li seleccionado> <a href = "#"> inicio </a> </li>
<li> <a href = "#"> enlace </a> </li>
</ul>
</am>
</Header>
`` `` ``

Bootstrap, como muchos otros marcos CSS, utiliza varias clases para la gestión de eventos y la identificación de elementos en los scripts de JavaScript, por ejemplo, al abrir/cerrar el menú móvil.

! [] (https://media1.giphy.com/media/13xw2mje0xcom0/giphy.gif?cid=790b7611d6b872db885ff15e635a83fe915441b166232cf4&rid=giphy.gif)

El uso de clases no es necesario si tenemos una idea clara de la estructura del proyecto que queremos crear. En el ejemplo mencionado anteriormente, tenemos un encabezado simple con un logotipo, un botón y un menú de navegación.

Nuestro objetivo es mostrar el botón solo en dispositivos móviles, por ejemplo, en pantallas más pequeñas que 720px, por lo que ocultaremos este botón (que no tiene clase, ya que es el único presente en el encabezado):

`` `CSS
encabezado> botón {
Pantalla: ninguno
}
`` `` ``

Luego, para que aparezca nuevamente en dispositivos más pequeños que 720px:

`` `CSS
@Media Screen y (Max-Width: 719px) {
encabezado> botón {
Pantalla: bloque
}
}
`` `` ``

Con respecto a la administración del evento de menú Open/Close en dispositivos móviles, podemos optar por un script JavaScript utilizando el mismo elemento 'Header> Button' para la interacción. De lo contrario, como los dispositivos móviles tienen pantallas táctiles, podemos usar su percepción del pseudo _: Hover_ para recrear el evento de prensa:

`` `CSS
@Media Screen y (Max-Width: 719px) {
Encabezado> Nav {
Pantalla: ninguno;
}
Encabezado> Botón: Hover> Nav {
Pantalla: bloque;
}
}
`` `` ``

Esto logrará el mismo resultado ya que el Pseudo _: Hover_ on Touch Devices se interpreta como un clic sin liberación, lo que hace clic fuera del elemento logrará el efecto opuesto al eliminar el foco. El mismo procedimiento se puede aplicar a los menús contextuales.

! [] (https://media1.giphy.com/media/3ovva11fpuvfyrfjxs/giphy.gif?cid=790b7611f2ed0977755ca7a2d0285f73a616ed1d5649e50b0&rid=giphy.gif)

Mi objetivo con este artículo no es ilustrar cómo crear una interfaz, sino alentar a cualquiera que quiera probarlo para usar los recursos que tienen disponibles bien, evaluando cuidadosamente los pros y los contras de adoptar un marco.

El principio de ** beso ** (manténgalo simple, estúpido) nos enseña que es importante mantener un enfoque simple, para evitar ponerse a nuestra manera. Otro principio que puede resumir todo este artículo es definitivamente ** menos es más **, ya que usar menos recursos o más bien los necesarios nos permite tener una imagen más amplia de lo que será el producto final, mejorando no solo la forma final sino también los tiempos de mantenimiento futuros.

Espero haberte aburrido lo suficiente como para desinstalar tu sistema operativo.

Ya nos veremos.

__Mirko_
