---
title: "Este sitio ahora funciona con Steno"
description: "El generador de sitios estáticos de un amigo, hecho como deben hacerse las cosas: rápido, seguro, minimalista."
layout: "post"
lang: "es"
date: "2026-08-12"
published: true
permalink: "/es/blog/this-site-now-runs-on-steno/"
---

Durante años este sitio funcionó con un generador estático que me escribí yo mismo, unas trescientas líneas de Node, un pequeño clon de Jekyll cosido a mis necesidades: minimalista, mío, perfecto para mí. Hace un tiempo me pregunté si valía la pena convertirlo en un framework de verdad, y la respuesta honesta fue no, porque un framework no es código, es un contrato con quien lo usa: cada suposición que hoy me ahorra líneas se convertiría en una issue abierta por otra persona, y el minimalismo moriría ahí mismo.

Luego está Gabs.

## Steno

[Gabs](https://github.com/GabsEdits) es un amigo, de esos con los que comparto proyectos desde hace años, y ese camino, el que yo elegí no recorrer, él lo recorrió hasta el final: se llama [Steno](https://steno.gxbs.dev), un generador de sitios estáticos construido sobre Deno, y le puso un mimo que se nota desde cualquier ángulo.

Os cuento las cosas que me llamaron la atención, como persona que ha masticado unos cuantos build systems:

**Las builds son transaccionales**: si una build falla, el output anterior queda intacto, el sitio nunca acaba en un estado roto a medias. Parece trivial, casi nadie lo hace.

**Las builds son incrementales**: las páginas que no cambian reutilizan la caché, y recompilar este sitio, sesenta páginas en tres idiomas, es cuestión de un instante.

**Los plugins corren en sandbox**: procesos Deno aislados, deny-by-default, con permisos explícitos, límites de memoria y deadlines. Quien me sigue sabe cuánto trabajo estoy metiendo en el modelo de permisos de Sinty OS, así que entendéis por qué sonreí al leer esta parte: es la mentalidad correcta, aplicada donde nadie se molesta en aplicarla.

**También hace lo minimalista**: ¿tienes un solo archivo markdown? Lo compila sin necesidad de un archivo de configuración. ¿Quieres el proyecto estructurado? Config, temas, colecciones, datos, redirects. La escala la eliges tú.

Y alrededor ya hay un pequeño ecosistema de plugins oficiales: resaltado de sintaxis, SEO con sitemaps y feeds, optimización de imágenes, búsqueda del lado del cliente, imágenes Open Graph generadas para cada página.

## La migración

La parte divertida es que ni siquiera la hice yo: Gabs me abrió una pull request con el sitio ya migrado, tema incluido, tres idiomas incluidos, y yo solo tuve que verificar y pulsar merge. Mi pequeño generador se jubila con todos los honores, hizo su trabajo durante años sin quejarse nunca, pero cuando un amigo construye algo tan bien hecho, usarlo es lo mínimo, y decirlo públicamente también.

Si tenéis un sitio estático y ganas de probar algo nuevo, [Steno está aquí](https://steno.gxbs.dev), open source como debe ser. Y si os gusta, una estrella al [repo](https://github.com/stenopress/steno) se la merece.
