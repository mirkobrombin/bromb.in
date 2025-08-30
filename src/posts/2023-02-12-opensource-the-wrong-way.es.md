---
title: "Open Source de la manera equivocada"
description: "Por qué recrear un proyecto open source: motivaciones y consecuencias"
published: true
layout: post
review_by: TheEvilSkeleton
---

A menudo sucede que los desarrolladores inician un nuevo proyecto en lugar de contribuir a uno existente. Esta decisión puede acarrear varios problemas, no solo para los autores del software ya existente, sino también para la comunidad en general.

En mi experiencia, una de las principales razones de esta tendencia es la falta de tiempo y recursos para contribuir a un proyecto ya existente, lo cual es irónico, ya que iniciar un nuevo proyecto también consume mucho tiempo: hay que configurarlo todo, como salas de chat, foros, etc. Muchos desarrolladores se sienten impulsados por el deseo de crear algo nuevo e innovador, en lugar de simplemente mejorar lo que ya se ha hecho. Pueden ver un proyecto existente como demasiado complejo o difícil de manejar, o simplemente no estar de acuerdo con la dirección o filosofía de dicho proyecto.

## Los problemas

Esto puede agravar la fragmentación de la comunidad de software libre y de código abierto, ya que los desarrolladores trabajan en sus propios proyectos y pueden evitar colaborar con otros. También puede dar lugar a una duplicación innecesaria de esfuerzos, ya que se crean múltiples proyectos para resolver los mismos problemas y se implementan de manera similar.

Otro problema es el posible daño a la reputación del proyecto existente. Cuando se crea un nuevo proyecto, puede percibirse como un competidor directo. Esto puede generar resentimiento y desconfianza entre los desarrolladores. El resultado puede ser la fragmentación de la comunidad, con desarrolladores divididos que se niegan a trabajar juntos.

Finalmente, los autores del proyecto existente pueden verse perjudicados por el nuevo, ya que algunos colaboradores podrían decidir trabajar en el nuevo proyecto en lugar de hacerlo en el ya consolidado. Esto suele suceder porque un proyecto nuevo tiene más necesidad de colaboradores y una barrera de entrada extremadamente baja, al no estar aún completamente establecido.

## Las excepciones

En algunos casos, crear un nuevo proyecto es esencial, incluso si el resultado puede parecer similar. A veces solo cambia el objetivo final, a veces la implementación, y en ocasiones ambos.

Por ejemplo, [Bottles](https://usebottles.com/) fue creado para ser una interfaz gráfica general de Wine que integrara todo el conjunto de herramientas de Wine, eliminando la necesidad de usar diferentes utilidades inconsistentes, mientras que Lutris está diseñado específicamente pensando en los videojuegos.

Otro ejemplo es [Vanilla OS](https://vanillaos.org/), que nació porque la filosofía y las implementaciones nunca serían compatibles con una distro como Fedora Silverblue, Ubuntu u otras. Vanilla OS elimina Packagekit, implementa un sistema inmutable con particiones A/B, el uso de un gestor de paquetes meta llamado Apx, actualizaciones automáticas basadas en las condiciones del PC, y además permite al usuario elegir entre Flatpak, Snap (próximamente), AppImage o simplemente Apx. Uno de los objetivos de Vanilla OS es hacer muy sencillo que los recién llegados puedan contribuir: nuestros proyectos están en GitHub, y el chat y foros en Discord.

Un tercer ejemplo es [Distrobox](https://distrobox.privatedns.org/), que fue creado para ser portable y compatible con Docker y Podman. Además, fue diseñado para proporcionar al usuario acceso a una amplia gama de distribuciones.

*Pequeña nota: en los ejemplos me refiero únicamente a proyectos que conozco bien.*

En estos casos, crear un nuevo proyecto es la mejor solución para alcanzar objetivos específicos que no pueden lograrse contribuyendo a un proyecto ya existente. Esto se debe a que el nuevo proyecto puede adaptarse a las necesidades concretas de los desarrolladores y usuarios, y diseñarse desde cero para lograr los resultados deseados.

## Algunas razones “equivocadas”

Crear un nuevo proyecto que tenga el mismo propósito y objetivos que uno ya existente no solo es una pérdida de tiempo y recursos, sino que también puede perjudicar a la comunidad de código abierto.

Prefiero no señalar a nadie en particular, ya que no quiero perjudicarlo, pero daré algunos ejemplos de lo que considero formas equivocadas de actuar.

Por ejemplo, si alguien recreara Firefox con los mismos objetivos e idéntico enfoque, solo duplicaría el esfuerzo y los recursos ya invertidos en el proyecto original. No aportaría ideas nuevas o innovadoras y solo generaría confusión entre usuarios y desarrolladores.

De manera similar, un clon hipotético de Apx, el gestor de paquetes de Vanilla OS, con los mismos objetivos exactos, no beneficiaría a nadie. Solo causaría fragmentación y competencia innecesarias, además de desviar recursos y atención del proyecto original. En el caso de Apx, existen aún menos razones para clonarlo: Apx es un proyecto relativamente joven y además es agnóstico de distribución, diseñado para ser lo más versátil y compatible posible con la mayor cantidad de distribuciones Linux. Esto se hizo precisamente para fomentar la colaboración, de modo que cualquiera pueda usarlo en cualquier distro. Clonar Apx solo causaría fragmentación innecesaria y quizá incluso competencia.

## Reflexiones finales

Si alguien tiene razones claras para contribuir a un proyecto, como una función faltante o incompleta, debería actuar en consecuencia. En estos casos, lo mejor es contactar a uno o más miembros del equipo para encontrar un terreno común. En casos extremos, donde esas solicitudes no pueden satisfacerse, un fork del proyecto puede ser necesario para minimizar la divergencia del código y reducir el desperdicio de esfuerzos. Esto asegura que el nuevo proyecto pueda seguir desarrollándose mientras sigue contribuyendo al proyecto existente, y viceversa, en lugar de divergir por completo y duplicar esfuerzos. En estos casos es importante trabajar juntos y mantener una línea de comunicación clara entre ambos proyectos para evitar malentendidos y asegurarse de que todos trabajen hacia el mismo objetivo.

Este artículo trata más sobre la ética detrás de estas acciones. No pretende incriminar a nadie y, mientras no haya violación de copyright, es simplemente una invitación a actuar como comunidad en lugar de enfrentarnos entre nosotros. El mundo del open source se basa en la colaboración y el apoyo mutuo, y es importante recordarlo cuando tomamos decisiones sobre cómo contribuir a proyectos existentes o iniciar nuevos. Trabajando juntos podemos construir soluciones más sólidas y efectivas para todos.
