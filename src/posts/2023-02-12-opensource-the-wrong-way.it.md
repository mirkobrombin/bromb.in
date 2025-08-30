---
title: "Open Source nel modo sbagliato"
description: "Perché ricreare un progetto open source: motivazioni e conseguenze"
published: true
layout: post
review_by: TheEvilSkeleton
---

Capita spesso che gli sviluppatori avviino un nuovo progetto invece di contribuire a uno già esistente. Questa decisione può portare a diversi problemi, non solo per gli autori del software già esistente, ma anche per la comunità più ampia.

Dalla mia esperienza, una delle principali ragioni di questa tendenza è la mancanza di tempo e risorse per contribuire a un progetto esistente, il che è ironico, poiché avviare un nuovo progetto richiede comunque moltissimo tempo: bisogna impostare tutto, come le chat, i forum, ecc. Molti sviluppatori sono spinti dal desiderio di creare qualcosa di nuovo e innovativo, piuttosto che semplicemente migliorare ciò che è già stato fatto. Possono percepire un progetto esistente come troppo complesso o difficile con cui lavorare, o semplicemente non condividere la direzione o la filosofia di quel progetto.

## I problemi

Questo può aggravare la frammentazione della comunità del software libero e open source, poiché gli sviluppatori lavorano ai propri progetti evitando di collaborare con altri. Può anche portare a una duplicazione inutile degli sforzi, poiché nascono più progetti per risolvere lo stesso problema e con implementazioni simili.

Un altro problema è il potenziale danno alla reputazione del progetto esistente. Quando viene creato un nuovo progetto, può essere visto come un concorrente diretto. Questo può generare risentimento e sfiducia tra gli sviluppatori. Il risultato può essere la frammentazione della comunità, con sviluppatori divisi che si rifiutano di collaborare.

Infine, gli autori del progetto esistente possono essere danneggiati dal nuovo progetto, poiché alcuni collaboratori possono decidere di contribuire al nuovo anziché al progetto già consolidato. Questo accade spesso perché un nuovo progetto ha più bisogno di contributori e una barriera di ingresso estremamente bassa, poiché non è ancora pienamente strutturato.

## Le eccezioni

In alcuni casi, creare un nuovo progetto è essenziale, anche se il risultato può sembrare simile. A volte cambia solo l’obiettivo finale, a volte l’implementazione, e altre volte entrambi.

Ad esempio, [Bottles](https://usebottles.com/) è stato creato per essere un frontend Wine di uso generale, in grado di integrare graficamente l’intero set di strumenti di Wine, eliminando la necessità di usare utility diverse e incoerenti, mentre Lutris è pensato specificamente per il gaming.

Un altro esempio è [Vanilla OS](https://vanillaos.org/), nato perché la filosofia e le implementazioni non sarebbero mai state compatibili con una distro come Fedora Silverblue, Ubuntu o altre. Vanilla OS rimuove Packagekit, implementa un sistema immutabile con partizionamento A/B, l’uso di un meta–package manager chiamato Apx, aggiornamenti automatici basati sulle condizioni del PC, e inoltre consente all’utente di scegliere tra Flatpak, Snap (presto), AppImage o semplicemente Apx. Uno degli obiettivi di Vanilla OS è rendere molto facile per i nuovi arrivati contribuire: i nostri progetti sono su GitHub e chat e forum su Discord.

Un terzo esempio è [Distrobox](https://distrobox.privatedns.org/), creato per essere portabile e compatibile con Docker e Podman. Inoltre, è stato progettato per offrire all’utente l’accesso a un’ampia gamma di distribuzioni.

*Piccola nota: negli esempi mi riferisco solo a progetti che conosco bene.*

In questi casi, creare un nuovo progetto è la soluzione migliore per raggiungere obiettivi specifici che non potrebbero essere raggiunti contribuendo a un progetto esistente. Questo perché il nuovo progetto può essere adattato alle esigenze concrete degli sviluppatori e degli utenti, e progettato da zero per conseguire i risultati desiderati.

## Alcune ragioni “sbagliate”

Creare un nuovo progetto che abbia lo stesso scopo e gli stessi obiettivi di uno già esistente non è solo una perdita di tempo e risorse, ma può anche danneggiare la comunità open source.

Preferisco non fare nomi, poiché non voglio danneggiare nessuno, ma farò alcuni esempi di ciò che considero il modo sbagliato di agire.

Per esempio, se qualcuno ricreasse Firefox con gli stessi obiettivi e lo stesso approccio, non farebbe altro che duplicare lo sforzo e le risorse già investite nel progetto originale. Non porterebbe nuove idee o innovazioni, ma solo confusione tra utenti e sviluppatori.

Allo stesso modo, un ipotetico clone di Apx, il gestore pacchetti di Vanilla OS, con i medesimi identici obiettivi, non porterebbe beneficio a nessuno. Creerebbe solo frammentazione e concorrenza non necessarie, oltre a sottrarre risorse e attenzione dal progetto originale. Nel caso di Apx, le ragioni per clonare il progetto sono ancora meno: Apx è un progetto relativamente giovane ed è anche distro-agnostico, progettato per essere il più versatile e compatibile possibile con molte distribuzioni Linux. Questo è stato fatto proprio per incoraggiare la collaborazione, in modo che chiunque possa usarlo su qualsiasi distribuzione. Clonare Apx causerebbe solo frammentazione inutile e forse anche concorrenza.

## Considerazioni finali

Se qualcuno ha ragioni chiare per voler contribuire a un progetto, come una funzionalità mancante o incompleta, dovrebbe agire di conseguenza. In questi casi, la cosa migliore è contattare uno o più membri del team per trovare un terreno comune. Nei casi estremi, in cui queste richieste non possano essere accolte, può essere necessario un fork del progetto, in modo da minimizzare la divergenza del codice e ridurre lo spreco di sforzi. Questo assicura che il nuovo progetto possa continuare a svilupparsi pur contribuendo al progetto originale, e viceversa, invece di divergere completamente e duplicare gli sforzi. In questi casi è importante lavorare insieme e mantenere una linea di comunicazione chiara tra entrambi i progetti, per evitare malintesi e garantire che tutti lavorino verso lo stesso obiettivo.

Questo articolo riguarda più che altro l’etica dietro queste azioni. Non intende accusare nessuno e, finché non vi è violazione di copyright, è semplicemente un invito ad agire come comunità invece che gli uni contro gli altri. Il mondo open source si basa sulla collaborazione e sul supporto reciproco, ed è importante ricordarlo quando prendiamo decisioni su come contribuire a progetti esistenti o avviarne di nuovi. Lavorando insieme possiamo costruire soluzioni più solide ed efficaci per tutti.
