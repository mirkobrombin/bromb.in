---
title: "This site now runs on Steno"
description: "A friend's static site generator, built the way things should be built: fast, safe, minimal."
layout: "post"
lang: "en"
date: "2026-08-12"
published: true
---

For years this site ran on a static site generator I wrote myself, about three hundred lines of Node, a little Jekyll clone tailored to my needs: minimal, mine, perfect for me. A while ago I asked myself whether it was worth turning it into a real framework, and the honest answer was no, because a framework is not code, it is a contract with whoever uses it: every assumption that saves me lines today would become an issue opened by someone else, and the minimalism would die right there.

Then there is Gabs.

## Steno

[Gabs](https://github.com/GabsEdits) is a friend, one of those people I have been sharing projects with for years, and that road, the one I chose not to take, he walked it all the way: it is called [Steno](https://steno.gxbs.dev), a static site generator built on Deno, and he poured into it a care you can see from every angle.

Let me tell you the things that struck me, as someone who has chewed through quite a few build systems:

**Builds are transactional**: if a build fails, the previous output stays intact, the site never ends up in a half-broken state. It sounds trivial, almost nobody does it.

**Builds are incremental**: pages that do not change reuse the cache, and rebuilding this site, sixty pages in three languages, takes an instant.

**Plugins run sandboxed**: isolated Deno processes, deny-by-default, with explicit permissions, memory limits and deadlines. Those who follow me know how much work I am putting into the permission model of Sinty OS, so you understand why I smiled when I read this part: it is the right mindset, applied where nobody bothers to apply it.

**It does minimal too**: you have a single markdown file? It builds it without even a configuration file. You want a structured project? Config, themes, collections, data, redirects. You pick the scale.

And around it there is already a small ecosystem of official plugins: syntax highlighting, SEO with sitemaps and feeds, image optimization, client-side search, Open Graph images generated for every page.

## The migration

The funny part is that I did not even do it myself: Gabs opened a pull request with the site already migrated, theme included, all three languages included, and all I had to do was verify and press merge. My little generator retires with full honors, it did its job for years without ever complaining, but when a friend builds something this well made, using it is the least I can do, and saying it publicly too.

If you have a static site and feel like trying something new, [Steno is here](https://steno.gxbs.dev), open source as it should be. And if you like it, a star on the [repo](https://github.com/stenopress/steno) is well deserved.
