---
title: "Mi experiencia creando una distribución de Linux"
description: "Crear una distribución de Linux es una tarea desafiante que requiere mucha dedicación y enfoque, y aprendí muchísimo a lo largo del proceso de crear la mía."
published: true
layout: post
---

Crear una distribución de Linux es una tarea desafiante que requiere mucha dedicación y concentración, y aprendí mucho a lo largo del proceso de crear la mía.

## El comienzo

Al principio, se sentía como nadar en mar abierto, porque no existe documentación al respecto; hay métodos comunes, pero no están realmente documentados y uno termina tomando el camino clásico de “veamos cómo lo hacen los demás”, acabando inevitablemente en una tormenta de terminologías y enfoques distintos, a menudo contradictorios.

Ahora puedo decir que crear una distribución en sí no es una tarea realmente complicada… claro, si entiendes cómo hacerlo. Me pregunté muchas veces por qué estos procedimientos no estaban documentados, por qué no existían guías “a prueba de novatos”, pero después de mi experiencia me di cuenta de que realmente no es posible documentar este proceso, ya que hay muchas formas de alcanzar el mismo resultado. Muchas distribuciones parecen similares a ojos del usuario final pero tienen estructuras muy diferentes por debajo, y crear “la guía definitiva” es simplemente imposible.

Por otro lado, admito que haber tenido que descubrir tantas cosas por mí mismo fue mucho más gratificante que seguir una documentación o una guía. Claro que pensé en abandonar el proyecto muchas veces durante el proceso y tuve muchos dolores de cabeza, pero estoy orgulloso de haber resistido.

## Siempre toma descansos

En la fase inicial del proyecto era importante para mí tener en mente todo el funcionamiento de la distribución. Escribir documentación habría ralentizado el proceso de desarrollo, y en ese momento era un volcán de ideas: habría sido una pérdida de tiempo escribir todo lo que tenía en la cabeza. Digamos que mi mente era el espacio más seguro y versátil en ese momento, aunque muchas veces saturaba ~~mi RAM~~.

Pasé meses en los que mi cerebro seguía generando ideas incluso cuando no quería pensar en el proyecto. En algún momento empecé a obsesionarme con la experiencia de usuario, quería que cada aspecto del despliegue fuese perfecto y brindara la mejor experiencia posible. Sin embargo, esto se estaba convirtiendo en una cacería de brujas, donde veía errores incluso donde no los había. Quería que el sistema hiciera exactamente lo que yo decía, incluso cuando no podía.

Siempre me ha apasionado la UX, siento casi un dolor físico cuando algo es tedioso, difícil y requiere un esfuerzo innecesario para usarse. A menudo experimento esta molestia también en mis propios proyectos, porque no es realmente posible pensar en cada detalle. Tuve que aprender a sacrificar algunos de esos detalles y volver a ellos más tarde, para no frenar el desarrollo real. Por supuesto, como diseñador UX entiendo que esta visión de lo “perfecto” es subjetiva y que algo que a mí me parece mal puede parecer perfecto a otra persona. Sin embargo, no lograba distinguir entre lo que estaba mal y lo que estaba bien, y estaba empezando a perder el enfoque en lo que realmente importaba para el proyecto.

En ese momento tuve que **tomar un descanso** y desconectarme completamente del proyecto por un día. Al día siguiente tenía mucho más claras las prioridades y pude terminar las tareas necesarias para la primera build importante de la distribución.

Esta experiencia me enseñó la importancia de tomar descansos y desconectarse de un proyecto para no perderse en él. También me ayudó a priorizar los aspectos más importantes y concentrarme en ellos para crear un mejor producto.

## Deja que otros te ayuden

Como suele ocurrir en los proyectos de código abierto, otros desarrolladores comenzaron a unirse y a contribuir. Este fue un punto de inflexión, ya que me permitió **delegar tareas** y reducir mi carga de trabajo. Al principio estaba tan concentrado que dudaba en hacerlo, pues temía que esas tareas no se realizaran como yo lo habría hecho. Estaba en una fase en la que sentía que era el único con una visión clara del proyecto, lo cual, en retrospectiva, no era una **actitud sana**.

Sin embargo, los nuevos colaboradores aportaron perspectivas e ideas frescas, que ayudaron a mejorar el proyecto significativamente. Comencé a confiar en mi equipo y me sentí seguro al delegarles tareas. El trabajo que produjeron fue mejor de lo que podría haber imaginado. Nuestro equipo se unió gracias a una pasión compartida por el proyecto, basada en la amistad y el respeto mutuo, algo que no he visto a menudo en otros proyectos.

A medida que el proyecto crecía y nuestro equipo se expandía, aprendí la **importancia de la colaboración** y los beneficios de buscar la opinión de los demás. Las diferentes perspectivas y experiencias de mis compañeros me ayudaron a entender el proyecto de otra manera y abrieron posibilidades que nunca habría imaginado por mi cuenta. También aprendí a confiar en mi equipo, lo que me permitió delegar tareas y concentrarme en las áreas donde podía aportar mejor.

## Mis habilidades mejoraron

Trabajar en este proyecto mejoró enormemente mis habilidades de programación. Hace apenas unos días, necesitaba crear dos aplicaciones Gtk, la Drivers Utility y la PRIME Utility, para reemplazar las funciones correspondientes en el Vanilla Control Center. Para mi sorpresa, pude diseñar, desarrollar y empaquetar estas aplicaciones en menos de dos días.

Me impresioné a mí mismo porque me di cuenta de que no había pensado mucho en la fase de desarrollo, ya que se había vuelto casi automático para mí. Esto fue una prueba de cuánto habían mejorado mis habilidades desde que empecé el proyecto, aunque todavía me cuesta llamarme desarrollador.

Adquirí una comprensión más profunda de la arquitectura y el diseño subyacente de una distribución Linux. Me siento mucho más seguro con mi código que cuando desarrollaba Bottles, donde podía perder semanas investigando cuál era el enfoque correcto o simplemente reflexionando si ese enfoque podría ser criticado por otros desarrolladores, haciéndome parecer un tonto. De hecho, una de las barreras más comunes que yo —y supongo que otros también— superamos es la preocupación por cómo otros desarrolladores juzgarán nuestro código. Este miedo es inútil, porque no solo te lleva a buscar problemas donde no los hay, sino que te hace creer que no estás a la altura. Cualquiera que no esté de acuerdo con mi código siempre puede decírmelo o abrir un PR para mejorarlo.

Además, trabajar con un equipo de colaboradores me permitió aprender de otros y compartir mis conocimientos y experiencias. Colaborar con otros me ayudó a ganar nuevas perspectivas y enfoques sobre el desarrollo. También me enseñó la importancia de la **comunicación, la coordinación y el trabajo en equipo** en el desarrollo de software.

## Reflexiones finales

En general, crear una distribución de Linux ha sido una experiencia increíblemente gratificante para mí. He aprendido mucho sobre Linux, programación y gestión de proyectos, así como sobre la importancia de la colaboración y de tomar descansos.

Una de las cosas más importantes que aprendí es el valor de la perseverancia. Crear una distribución de Linux no es una tarea fácil, y hubo muchas ocasiones en las que quise rendirme. Sin embargo, logré superar esos momentos y salir del otro lado con una comprensión mucho mejor de lo que se necesita para crear un proyecto exitoso.

Estoy orgulloso de lo que mi equipo y yo hemos logrado con esta distribución, y creo que hemos creado algo único y valioso para la comunidad Linux. Espero que esta distribución continúe creciendo y mejorando con el tiempo, y que ayude a inspirar a otros a crear sus propios proyectos y a contribuir a la comunidad de código abierto.

Pequeña adición: Durante más de la mitad del artículo me refiero a la primera versión de Vanilla OS, hoy muy distante de la versión actual. Esa versión fue la base de las posteriores con Almost y ABRoot, en las que el proyecto fue llevado adelante junto a Luca di Maio. Quería aclararlo.
