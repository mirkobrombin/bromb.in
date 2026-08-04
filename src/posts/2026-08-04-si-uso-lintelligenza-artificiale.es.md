---
title: "Sí, uso inteligencia artificial"
description: "No tengo intención de negarlo, y creo que vale la pena explicar cómo."
published: true
layout: post
---

Cada tanto, bajo un post mío o entre los comentarios a mis tweets, aparece la observación: "es bastante evidente que Mirko usa IA", normalmente ni siquiera es una acusación, y algunas personas llegan a decir que confían en cómo la uso. Aun así, prefiero no dejar la cosa a la interpretación: la uso, lo he dicho ya varias veces, y quiero ponerlo negro sobre blanco de una vez por todas.

## El tiempo es la variable que cuenta

Tengo muchos proyectos que sacar adelante y las mismas veinticuatro horas que cualquiera, y Singularity no es un tema de GTK: es un entorno de escritorio, un compositor, un framework de widgets, un sistema operativo con una boot chain propia, imágenes transaccionales y un modelo de permisos repensado desde cero, y cualquiera que haya tocado aunque sea una de estas partes sabe cuánto trabajo hay detrás. Y que quede claro: llevo unos tres años trabajando en el proyecto Singularity entero, desde la primera pieza, Atom Loops, que al principio era solo una pequeña idea, cargar el sistema operativo desde un archivo en loopback y quitarse de encima las particiones.

En un proyecto así, una parte enorme del código no requiere pensamiento, requiere paciencia: mapear los valores de una API sobre una struct, repetir el mismo patrón por vigésima vez con nombres distintos, escribir el boilerplate que está entre una idea y su primera línea interesante, releer por centésima vez una documentación que ya he leído, cosas que no me enseñan nada y no mejoran el proyecto, solo me quitan horas y me desgastan.

## Qué le delego, y qué no

Uso la IA para los comentarios del código y para la documentación, no soy bueno comentando, no me sale natural, y me lleva mucho tiempo: es una debilidad mía y no tengo problema en admitirla, y el resultado es que hoy mi código está mejor documentado de lo que estaría si hubiera seguido haciéndolo solo.

La uso para el boilerplate, para las partes repetitivas, para todo lo que es "mira esta cosa e implementa otra igual con valores distintos".

Tampoco la dejo libre para inventar: en los proyectos en Go la limito a mis SDK, go-foundation sobre todo, así se mueve dentro de un super set que conozco de memoria en lugar de sacar soluciones propias o atajos que, en cualquier caso, pillaría, porque lo reviso todo.

No la uso para diseñar: la arquitectura, las lógicas complejas, el modelo de seguridad, la sandbox, el diseño y la experiencia de usuario siguen siendo míos, no por orgullo, sino porque es exactamente la parte que me gusta, es la razón por la que hago este trabajo, y delegarla significaría quitarme el oficio, no el peso.

Sí la uso para razonar: antes de escribir una línea discuto la idea, le hago buscar los puntos débiles, los casos que no he considerado, lo que se rompería tres meses después. Y seamos claros, yo molesto a mucha gente por mis proyectos, y son muchos los problemas que salen a la luz solo hablando de ellos, pero son más los que intercepto así, antes incluso de tener que afrontarlos, y cada uno de ellos son semanas o meses de trabajo inútil ahorrados, y el tiempo no es solo dinero: es energía, es salud mental.

## Me permite aspirar a algo más grande

Esta es la parte que casi nadie considera, porque Singularity OS es el sistema que siempre quise hacer, y lo curioso es que en gran parte ya existía: la boot chain, el arranque del sistema entero a partir de un archivo de imagen en lugar de particiones, el modelo de actualización, cosas que había diseñado y escrito negro sobre blanco hace años y con las que luego hice las paces, bonito pero realistamente nunca lo desarrollaré.

El muro no era el diseño, era escribirlo de verdad y sobre todo probarlo de verdad, porque cuando trabajas en una boot chain o en un modelo de permisos sin privilege escalation no basta con que el código compile: tiene que devolver exactamente el valor que esperas, en cualquier condición, y ese trabajo está hecho de ciclos, cambio un límite, relanzo el test, no cuadra, cambio otra vez, relanzo, durante horas, durante días.

Hoy puedo decir: este endpoint debe devolver este valor preciso, y dejar que sea un ciclo automático el que insista hasta llegar ahí, devolviéndome solo la aserción que ha fallado, así sé dónde intervenir. Y cuando tengo treinta ideas sobre cómo resolver un problema, puedo dejar a un agente probarlas todas y descubrir cuál aguanta, en lugar de elegir dos por intuición porque las otras veintiocho costarían demasiado tiempo.

El resultado no es que escribo el mismo software más rápido, es que un proyecto que había archivado como irrealista hoy está en manos de la gente.

## Automatizar no es una novedad

En Bottles tenía casi doscientas issues abiertas, hubo años en los que cerraba una decena y llegaban otras tantas, simplemente no podía seguir el ritmo. Hoy ese backlog está gestionado, pero no es que la IA las cerrara sola: empezamos como se ha hecho siempre, yo con una issue, luego otra, luego otra más, hasta que dije espera, aquí veo un patrón, y puse a un agente a buscarlo, a filtrar las issues reales de las invalidadas o mal formateadas, los bugs todavía presentes de los que ya no existen, las peticiones de funcionalidades de los bugs de verdad, y por último a dividirlo todo en batches por similitud, para no volverme loco. A partir de ahí el ciclo era simple: el fix lo daba yo, la IA lo probaba.

No es que antes no lo intentara: recibía las notificaciones en Telegram, tenía scripts para intervenir en bloque sobre las issues parecidas entre sí, un algoritmo de distancia de Levenshtein para detectar duplicados, automatizaba con lo que tenía, y no pretendo comparar aquellos scripts con un modelo, hacían un trabajo mucho más tonto y mucho más limitado, pero la dirección ya era esa. La inteligencia artificial no me cambió la filosofía, me subió bastante el techo.

## La misma regla vale para los demás

Cuando alguien me abre una pull request, no me interesa saber si la escribió a mano, con un modelo, o con la ayuda de un amigo, no lo pregunto y no intento adivinarlo, miro el código: si es de calidad, si respeta las convenciones del proyecto, si hace lo que dice hacer, entra, si no, no.

Encuentro poco sensato aplicarme a mí mismo un criterio distinto del que aplico a los demás: la medida es la calidad del resultado, no la biografía de la herramienta.

## Una herramienta, no un atajo

Hace años que en el mundo del código abierto se discute sobre herramientas que cambian la forma de escribir software: de los primeros IDE a los linters, de los generadores de código a los gestores de paquetes, cada vez la misma dinámica, y cada vez la pregunta útil no es "¿lo has usado?", sino "¿el resultado aguanta?".

La inteligencia artificial tiene problemas reales, y no quiero hacer como si nada: consumos, licencias, datasets, el riesgo concreto de que alguien la use para llenar los repositorios de código que nunca ha leído, son discusiones que hay que tener, pero sobre las consecuencias reales, no sobre el uso en sí, si no nos quedamos en la superficie, como pasa a menudo cuando una cuestión compleja se reduce a una postura.

## Estudiad, y apuntad más alto

Si hay un consejo que me siento capaz de dar, sobre todo a quien está empezando ahora, es estudiar: no os fiéis de la IA para todo, porque si no sabéis reconocer un error en lo que os escribe no estáis delegando el trabajo mecánico, estáis delegando la comprensión, y esa no vuelve. Estas herramientas amplifican lo que sabes: si sabes poco, ¡amplifican poco! No seáis tacaños con vuestras ambiciones: yo retomé un sistema operativo que había archivado como irrealista, y no veo por qué vuestras ideas deberían ser más pequeñas que las mías. El techo ha subido para todos, sería una pena seguir diseñando como si aún estuviera bajo.

Y seamos sinceros: esta es la dirección en la que se mueve nuestro oficio, no una moda pasajera. No creo que quien no la usa hoy desaparezca mañana, pero dentro de unos años la diferencia entre quien avanzó y quien se quedó quieto no la marcará la herramienta en sí, la marcará quien siguió estudiando mientras aprendía a usarla, y quien en cambio se quedó discutiendo si era lícito tocarla.

## El tiempo que quito, y a quién se lo quito

Alguien a estas alturas diría: pues reduce el número de proyectos, pero yo los llevo adelante porque me gustan, y porque querría construir algo que quede en la vida de las personas, algo por lo que valga la pena ser recordado.

Hay sin embargo otra cosa, y es la que más pesa: las horas que paso persiguiendo un test que no cuadra, o reescribiendo por vigésima vez el mismo patrón, no se las estoy quitando a otro proyecto, se las estoy quitando a la familia que estoy construyendo, y tengo un tiempo contado como todos, no quiero elegir entre las dos cosas, quiero que puedan vivir en paralelo.

Cuando alguien me dice que usar la IA es un atajo, yo pienso en esto: no estoy copiando en un examen, estoy intentando hacer caber dos vidas en una sola, y cada hora que no gasto en trabajo mecánico es una hora que vuelve adonde de verdad importa.
