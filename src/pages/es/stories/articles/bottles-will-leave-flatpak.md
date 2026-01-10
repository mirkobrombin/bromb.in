---
title: Esta es la razón por la que Bottles está a punto de dejar Flatpak
author: Mirko
date: 2021-06-20
description: >-
  También veo que la comunidad de usuarios de Flathub (el repositorio donde se
  distribuye Bottles) es muy exigente.
cover: /pattern.png
layout: ../../../../layouts/ArticleLayout.astro
---

> Atención, este artículo está obsoleto, ha habido algunos cambios de decisión y
> los invito a leer este
> [comentario](https://github.com/flathub/com.usebottles.bottles/issues/90#issuecomment-872482952).

Bottles nació como un proyecto absolutamente sin pretensiones en 2017, era sobre todo
mi necesidad personal.
En 2020 decidí darle nueva vida al proyecto, con el objetivo de ofrecer un nuevo concepto
de Windows en una botella.

Desde ese día el proyecto ha dado muchos pasos, muchas personas se han unido a mí
contribuyendo con ideas, conceptos, traducciones y código.

A día de hoy Bottles es un proyecto maduro, su v3 trae consigo muchas correcciones
de errores, mejoras y una base sólida. Como se anunció hace meses, comenzó el trabajo
en Bottles v4, un rediseño completo del proyecto. De hecho, bajo el capó,
[todo cambia](https://github.com/bottlesdevs/Bottles/issues/133).
El proyecto se ha dividido en dos bibliotecas (
[libwine](https://github.com/bottlesdevs/libwine) y
[libbottles](https://github.com/bottlesdevs/libbottles)), los componentes del sistema,
dependencias e instalador también están siendo reescritos. En resumen, un proyecto realmente nuevo desde cero que avanza en pequeños pasos, pero del cual estoy orgulloso, *muy orgulloso*.

![](https://camo.githubusercontent.com/67c8dc53cbd154e38b2af4f22176da7246e70e720474b9bb5776550110d9694a/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f4579635231635758414145747856523f666f726d61743d6a7067)

Actualmente Bottles se distribuye en múltiples formatos: AppImage, deb, snap,
flatpak, AUR y rpm. Podemos decir que hemos logrado llegar a más usuarios de los
que jamás imaginamos y estoy agradecido a todos los que han contribuido con informes
constructivos. Un agradecimiento especial a todos ustedes, las palabras no son suficientes.

## El trabajo detrás de Bottles

*Bottles es un proyecto que consume muchísimo tiempo*, realmente **muchísimo**.

Solo aplicar las nuevas traducciones requiere revisión por mi parte: debo comprobar
que no hayan sido vandalizadas y que no contengan palabras ofensivas. Varios usuarios
contribuyen con correcciones y sugerencias, y estas también deben ser verificadas
y aprobadas manualmente.

Atender informes de errores y solicitudes de nuevas funciones también consume
mucho tiempo. Lamentablemente no todos los usuarios saben abrir un issue de manera
correcta y a menudo proporcionan pocos detalles para entender el problema. Entonces
empieza una conversación para tratar de comprenderlo, pidiendo más registros
(*por favor en inglés… en serio, una parte de mí muere cada vez que alguien sube
logs en otro idioma*). A menudo un log no basta y debemos replicar los pasos del
usuario creando una VM con la misma distro, entorno de escritorio y paquete.
Con suerte, a veces podemos replicar fácilmente el bug, confirmarlo y corregirlo
en un día dependiendo de su gravedad.

Pero cuando no logramos replicarlo, comienza una fase de investigación en el código
para intentar imaginar qué lo pudo causar. Si tampoco da resultado, el bug se marca
como “no replicable” y queda ahí hasta que surjan nuevos detalles. Nunca estamos
contentos (de verdad NUNCA) de dejar un bug en ese estado, pero cuando no es
replicable, no queda otra opción.

Cada nueva solicitud de función se analiza y, si la necesidad es alta, se estudia
si puede integrarse fácilmente y si mejoraría o empeoraría la UX del software.
Muchas veces debemos descartarla porque no es compatible con la estructura actual,
y queda pospuesta hasta la próxima versión principal.

Ok, acabo de describir la gestión de cualquier proyecto open source (y no solo),
pero en este caso es un proyecto diseñado y *desarrollado por una sola persona (yo)*.
Sí, he recibido muchas contribuciones y no me quejo, al contrario, gracias otra vez,
sigan así. Pero lamentablemente ninguna de esas contribuciones llega a Bottles v4,
ni a la gestión de issues, ni a la revisión de traducciones.

## Ok… ¿y qué pasa con Flatpak?

Flatpak es actualmente el paquete que menos uso personalmente y del que tengo menos
conocimientos. La mayoría de los errores reportados están relacionados con la versión
Flatpak de Bottles, y paso muchos días intentando resolverlos por mi poca experiencia.

*Esta falta de experiencia mía*, sumada al poco tiempo disponible (por lo ya explicado
y por mi trabajo), significa que no puedo concentrarme en desarrollar Bottles v4 como
debería, lo cual ralentiza el proyecto drásticamente.

También veo que la **comunidad de usuarios de Flathub** (el repositorio donde se distribuye Bottles)
es muy exigente (y a veces molesta). Revisé las reseñas de Bottles en GNOME Software y
me sorprendió encontrar que junto a reseñas positivas, hay otras muy negativas y
desafortunadamente nada constructivas. **Alto ahí**, sé lo que piensan y no, no espero
solo reseñas positivas; de hecho me alegra leer críticas negativas porque *me ayudan a
crecer y mejorar*. Pero estas críticas no son constructivas y a menudo se quejan de
problemas de **Wine** y no de Bottles.

*Bottles NO es Wine*: lo he repetido una y otra vez. Bottles es un gestor de prefijos
Wine, con varias funciones, y nada más. No prometemos hacer funcionar software de
Windows que no funcione en Wine, ni decimos que Bottles sea LA forma definitiva de
lograrlo. Lamentablemente este concepto tan simple no entra en sus cabezas y termino
siendo juzgado por software de terceros en vez del mío.

![](https://media.giphy.com/media/duJI8BEPPDkvm/giphy.gif)

También he leído críticas sobre la decisión de eliminar Winetricks de Bottles.
Sobre esa decisión ya he gastado muchísimas palabras explicando las razones, no lo
haré de nuevo. Solo diré que la intención de eliminar Winetricks se anunció hace más
de un año, incluso dentro de Bottles mismo con una alerta. Winetricks ya no está
presente en Bottles desde la versión 2.1.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I hope it is clear to everyone that Bottles is not Wine.<br>Bottles is a simple, intuitive and feature-rich (e.g. bottle versioning, DXVK, dependencies management and more) wine prefix manager.<br>With v4 we will introduce our installers to which we will give official support.<a href="https://twitter.com/hashtag/linux?src=hash&amp;ref_src=twsrc%5Etfw">#linux</a></p>&mdash; Bottles (@usebottles) <a href="https://twitter.com/usebottles/status/1396391067247915011?ref_src=twsrc%5Etfw">23 de mayo de 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**Bottles no es otro gestor de prefijos Wine más**, ya hay muchas herramientas
similares (y quizá mejores) que comparten cómo funcionan y las utilidades que
ofrecen (incluido Winetricks). Mi intención no es crear un programa que ya existe,
de lo contrario no perdería mi tiempo.

Así que… volviendo al tema de Flatpak. En los próximos días retiraré oficialmente
Bottles de Flathub, impidiendo la recepción de futuras actualizaciones oficiales.
Esto significa que Flatpak dejará de ser un canal oficial de distribución del proyecto
y no habrá soporte oficial para ese paquete. El repositorio beta de Flathub lo
mantienen terceros que lo mantienen alineado con git, pero tampoco tendrá soporte
oficial.

No me odien, pero personalmente me siento aliviado de abandonar Flatpak.
Entiendo que muchos no estarán de acuerdo, pero es mi tiempo y mi salud mental
(que se ve comprometida cuando intento arreglar un bug en Flatpak).

## ¿Adiós para siempre a Flatpak?

![](https://media1.tenor.com/images/b7e17ee010f0cc3955db366f931764f8/tenor.gif?itemid=10683738)

Oficialmente sí, *ya no distribuiré Bottles mediante Flatpak*.
Cualquiera puede republicarlo y mantenerlo, con parches y actualizaciones, pero
no contará con soporte oficial. Aún será posible compilar el Flatpak desde el
código fuente e instalar una copia local; mantendré el manifiesto actualizado a
la versión actual.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Para que quede claro: no hemos abandonado <a href="https://twitter.com/hashtag/Flathub?src=hash&amp;ref_src=twsrc%5Etfw">#Flathub</a> para siempre, simplemente buscamos a alguien que se haga responsable, lo que nos permitiría seguir desarrollando Bottles sin depender de los problemas de un único formato de distribución. 🥺</p>&mdash; Bottles (@usebottles) <a href="https://twitter.com/usebottles/status/1408776375155179522?ref_src=twsrc%5Etfw">26 de junio de 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Quiero terminar este post aclarando una vez más que Bottles no es solo un gestor
de prefijos Wine y que quiero mucho más de este proyecto. Entiendo que muchos lo
vean como una simple interfaz bonita sobre un gestor normal de prefijos, pero
para mí no es así. Tengo grandes planes y quiero llevarlos a cabo, sobre todo a
mi manera, ya que es mi idea y mi proyecto. Quiero revolucionar la forma en que
se usa Wine en los gestores, y quiero hacerlo a mi manera.

_Mirko
