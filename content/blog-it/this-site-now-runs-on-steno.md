---
title: "Questo sito ora gira su Steno"
description: "Il generatore statico di un amico, fatto come vanno fatte le cose: veloce, sicuro, minimale."
layout: "post"
date: "2026-08-12"
lang: "it"
published: true
permalink: "/it/blog/this-site-now-runs-on-steno/"
---

Per anni questo sito è girato su un generatore statico che mi ero scritto da solo, circa trecento righe di Node, un piccolo clone di Jekyll cucito sulle mie esigenze: minimale, mio, perfetto per me. Qualche tempo fa mi sono chiesto se valesse la pena farlo diventare un framework vero, e la risposta onesta è stata no, perché un framework non è codice, è un contratto con chi lo usa: ogni assunzione che oggi mi fa risparmiare righe diventerebbe una issue aperta da qualcun altro, e la minimalità morirebbe lì.

Poi c'è Gabs.

## Steno

[Gabs](https://github.com/GabsEdits) è un amico, uno di quelli con cui condivido progetti da anni, e quella strada lì, quella che io ho scelto di non percorrere, lui l'ha percorsa fino in fondo: si chiama [Steno](https://steno.gxbs.dev), un generatore di siti statici costruito su Deno, e ci ha messo dentro una cura che si vede da ogni angolo.

Vi dico le cose che mi hanno colpito, da persona che di build system ne mastica parecchi:

**Le build sono transazionali**: se una build fallisce, l'output precedente resta intatto, il sito non finisce mai in uno stato rotto a metà. Sembra banale, non lo fa quasi nessuno.

**Le build sono incrementali**: le pagine che non cambiano riusano la cache, e ricompilare questo sito, sessanta pagine in tre lingue, è questione di un attimo.

**I plugin girano sandboxati**: processi Deno isolati, deny-by-default, con permessi espliciti, limiti di memoria e deadline. Chi mi segue sa quanto lavoro sto mettendo nel modello di permessi di Sinty OS, quindi capite perché quando ho letto questa parte ho sorriso: è la mentalità giusta, applicata dove nessuno si prende il disturbo di applicarla.

**Fa anche il minimale**: hai un solo file markdown? Lo builda senza nemmeno un file di configurazione. Vuoi il progetto strutturato? Config, temi, collezioni, dati, redirect. La scala la scegli tu.

E attorno c'è già un piccolo ecosistema di plugin ufficiali: syntax highlighting, SEO con sitemap e feed, ottimizzazione immagini, ricerca client-side, immagini Open Graph generate per ogni pagina.

## La migrazione

La parte divertente è che non l'ho nemmeno fatta io: Gabs mi ha aperto una pull request con il sito già migrato, tema compreso, tre lingue comprese, e io ho dovuto solo verificare e premere merge. Il mio piccolo generatore va in pensione con tutti gli onori, ha fatto il suo lavoro per anni senza mai lamentarsi, ma quando un amico costruisce una cosa fatta così bene, usarla è il minimo, e dirlo pubblicamente pure.

Se avete un sito statico e voglia di provare qualcosa di nuovo, [Steno è qui](https://steno.gxbs.dev), open source come dev'essere. E se vi piace, una stella al [repo](https://github.com/stenopress/steno) gliela meritate.
