---
title: "Ecco perché Bottles sta per abbandonare Flatpak"
description: "Vedo anche che la comunità di utenti di Flathub (il repository dove Bottles è distribuito) è molto esigente."
published: true
layout: post
---

> Attenzione, questo articolo è obsoleto, ci sono stati alcuni cambiamenti di decisione e
> vi invito a leggere questo
> [commento](https://github.com/flathub/com.usebottles.bottles/issues/90#issuecomment-872482952).

Bottles è nato come un progetto assolutamente senza pretese nel 2017, era
principalmente un mio bisogno personale.
Nel 2020 decisi di dare nuova luce al progetto, con l’obiettivo di offrire un nuovo
concetto di Windows in bottiglia.

Da quel giorno il progetto ha fatto molti passi, molte persone si sono unite a me
contribuendo con idee, concetti, traduzioni e codice.

Ad oggi Bottles è un progetto maturo, la sua v3 porta con sé molte correzioni di bug,
miglioramenti e una base solida. Come annunciato mesi fa, è iniziato il lavoro su
Bottles v4, una completa riprogettazione del progetto. Infatti, sotto il cofano,
[tutto cambia](https://github.com/bottlesdevs/Bottles/issues/133).
Il progetto è stato diviso in due librerie (
[libwine](https://github.com/bottlesdevs/libwine) e
[libbottles](https://github.com/bottlesdevs/libbottles)), anche i componenti di sistema,
le dipendenze e l’installer sono stati riscritti. In breve, un progetto davvero nuovo
da zero che procede a piccoli passi, ma di cui sono orgoglioso, *davvero orgoglioso*.

![](https://camo.githubusercontent.com/67c8dc53cbd154e38b2af4f22176da7246e70e720474b9bb5776550110d9694a/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f4579635231635758414145747856523f666f726d61743d6a7067)

Attualmente Bottles è distribuito in diversi formati: AppImage, deb, snap,
flatpak, AUR e rpm. Possiamo dire di essere riusciti a raggiungere più utenti di
quanto avessimo mai immaginato e sono grato a tutti coloro che hanno contribuito
con segnalazioni costruttive. Un grazie speciale a tutti voi, le parole non bastano.

## Il lavoro dietro Bottles

*Bottles è un progetto che richiede tantissimo tempo*, davvero **tantissimo**.

Solo applicare le nuove traduzioni richiede una revisione da parte mia: devo
controllare che non siano state manomesse o che non contengano parole offensive.
Molti utenti contribuiscono con suggerimenti e correzioni, e anche queste devono
essere verificate e approvate manualmente.

Gestire le segnalazioni di bug e le richieste di nuove funzionalità richiede
molto tempo. Purtroppo non tutti gli utenti sanno aprire un issue nel modo
corretto e spesso forniscono pochi dettagli per capire il problema.
Inizia quindi una conversazione cercando di comprenderlo, chiedendo ulteriori
log (*possibilmente in inglese… davvero, una piccola parte di me muore ogni volta
che pubblicate log in un’altra lingua*). Spesso un log non basta e dobbiamo
replicare i passaggi dell’utente creando una VM con la stessa distro,
ambiente desktop e pacchetto.
Con un po’ di fortuna riusciamo a replicare facilmente il bug e lo correggiamo
entro un giorno, a seconda della gravità.

Ma quando non riusciamo a replicarlo, inizia una fase di ricerca nel codice per
immaginare cosa possa averlo causato. Se anche questo passo fallisce, il bug viene
segnalato come “non replicabile” e resta lì finché non emergono nuovi dettagli.
Non siamo mai felici (davvero MAI) di arrenderci su un bug, ma quando non è
replicabile non abbiamo altra scelta.

Ogni nuova richiesta di funzionalità viene analizzata e, se la necessità è alta,
si valuta se possa essere facilmente integrata e se migliori o peggiori la UX
del software. Molto spesso dobbiamo rinunciare perché non compatibile con
l’attuale struttura del progetto, e resta sospesa fino alla prossima major release.

Ok, ho appena descritto la gestione di qualsiasi progetto open source (e non solo),
ma in questo caso si tratta di un progetto progettato e *sviluppato da una sola persona (me)*.
Sì, ho ricevuto molti contributi e non mi lamento, anzi, grazie ancora, continuate così.
Purtroppo però nessuno di questi contributi arriva a Bottles v4, né nella gestione
delle Issues, né nella revisione delle traduzioni.

## Ok… e Flatpak?

Flatpak è attualmente il pacchetto che uso meno e di cui ho meno conoscenze.
La maggior parte dei bug segnalati riguarda la versione Flatpak di Bottles,
e passo molti giorni a capire come risolverli proprio per la mia scarsa esperienza.

*Questa mia mancanza di esperienza*, unita al poco tempo a disposizione (per quanto
già spiegato e per il mio lavoro), fa sì che non possa concentrarmi sullo sviluppo
di Bottles v4 come dovrei, rallentando drasticamente il progetto.

Vedo anche che la **comunità di utenti di Flathub** (il repository dove Bottles è
distribuito) è molto esigente (e a volte fastidiosa). Ho letto le recensioni di
Bottles su GNOME Software e sono rimasto sorpreso di trovare, accanto a quelle
positive, altre molto negative e purtroppo assolutamente non costruttive.
**Fermi tutti**, so cosa state pensando e no, non mi aspetto solo recensioni
positive; anzi, sono molto più felice di leggere quelle negative perché *mi
aiutano a crescere e migliorare*. Purtroppo, però, queste critiche non sono
costruttive e spesso si lamentano di problemi di **Wine** invece che di Bottles.

*Bottles NON è Wine*: lo ripeto ancora e ancora. Bottles è un gestore di prefissi
Wine, con diverse funzionalità, e finisce lì. Non promettiamo di far girare
software Windows che non funziona con Wine, né affermiamo che Bottles sia IL modo
definitivo per farlo. Purtroppo questo concetto così semplice non entra nelle loro
teste e mi ritrovo giudicato per software di terze parti e non per il mio.

![](https://media.giphy.com/media/duJI8BEPPDkvm/giphy.gif)

Ho anche letto critiche riguardo alla decisione di rimuovere Winetricks da Bottles.
Su questa decisione ho già speso tantissime parole, spiegando più volte le ragioni,
quindi non lo farò di nuovo. Dirò solo che l’intenzione di rimuovere Winetricks è
stata annunciata più di un anno fa, anche all’interno di Bottles stesso con un
avviso. Winetricks non è più presente in Bottles dalla versione 2.1.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I hope it is clear to everyone that Bottles is not Wine.<br>Bottles is a simple, intuitive and feature-rich (e.g. bottle versioning, DXVK, dependencies management and more) wine prefix manager.<br>With v4 we will introduce our installers to which we will give official support.<a href="https://twitter.com/hashtag/linux?src=hash&amp;ref_src=twsrc%5Etfw">#linux</a></p>&mdash; Bottles (@usebottles) <a href="https://twitter.com/usebottles/status/1396391067247915011?ref_src=twsrc%5Etfw">23 maggio 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**Bottles non è l’ennesimo gestore di prefissi Wine**, esistono già molti strumenti simili (e forse migliori) che condividono modalità di funzionamento e tool offerti (incluso Winetricks) e la mia intenzione non è creare un programma che esiste già, altrimenti non perderei il mio tempo.

Quindi… tornando al tema Flatpak. Nei prossimi giorni rimuoverò ufficialmente Bottles da Flathub, impedendo la ricezione di futuri aggiornamenti ufficiali. Questo significa che Flatpak non sarà più uno dei canali ufficiali di distribuzione del progetto e non verrà fornito supporto ufficiale per quel pacchetto. Il repository beta di Flathub è attualmente mantenuto da terze parti che lo tengono allineato con git, tuttavia anche questo non sarà più supportato ufficialmente.

Non odiatemi, ma personalmente mi sento sollevato ad abbandonare Flatpak.
Capisco che molti non saranno d’accordo, ma è il mio tempo e la mia sanità mentale
(che vacilla quando provo a sistemare un bug su Flatpak).

## Addio per sempre a Flatpak?

![](https://media1.tenor.com/images/b7e17ee010f0cc3955db366f931764f8/tenor.gif?itemid=10683738)

Ufficialmente sì, *non distribuirò più Bottles tramite Flatpak*.
Chiunque è libero di ripubblicarlo e mantenerlo, con patch e aggiornamenti, ma non avrà supporto ufficiale da parte del progetto. Sarà comunque possibile compilare il Flatpak dai sorgenti e installare una copia locale; manterrò il manifest aggiornato alla versione corrente.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Per chiarezza: non abbiamo abbandonato <a href="https://twitter.com/hashtag/Flathub?src=hash&amp;ref_src=twsrc%5Etfw">#Flathub</a> per sempre, stiamo semplicemente cercando qualcuno che se ne assuma la responsabilità, consentendoci di continuare a sviluppare Bottles senza dipendere dai problemi di un singolo formato di distribuzione. 🥺</p>&mdash; Bottles (@usebottles) <a href="https://twitter.com/usebottles/status/1408776375155179522?ref_src=twsrc%5Etfw">26 giugno 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Vorrei concludere questo post chiarendo ancora una volta che Bottles non è solo un gestore di prefissi Wine e che voglio molto di più da questo progetto. Capisco che molti lo vedano come una bella interfaccia sopra un normale gestore di prefissi, ma per me non è così. Ho grandi piani in mente e voglio realizzarli tutti, soprattutto a modo mio, perché è la mia idea e il mio progetto. Voglio rivoluzionare il modo in cui Wine viene usato nei manager, e voglio farlo a modo mio.

_Mirko
