---
title: "La mia esperienza nella creazione di una distribuzione Linux"
description: "Creare una distribuzione Linux è un compito impegnativo che richiede molta dedizione e concentrazione, e ho imparato moltissimo attraverso il processo di creazione della mia."
published: true
layout: post
---

Creare una distribuzione Linux è un compito impegnativo che richiede molta dedizione e concentrazione, e ho imparato molto durante il processo di creazione della mia.

## L’inizio

All’inizio sembrava di nuotare in mare aperto, perché non esiste documentazione a riguardo; ci sono metodi comuni, ma non sono davvero documentati e si finisce per percorrere la classica vecchia strada del “vediamo come lo fanno gli altri”, ritrovandosi inevitabilmente in una tempesta di terminologie e approcci diversi, spesso contraddittori.

Ora posso dire che creare una distribuzione in sé non è un compito davvero complicato… certo, se capisci come farlo. Mi sono chiesto molte volte perché queste procedure non fossero documentate, perché non ci fossero guide “a prova di principiante”, ma dopo la mia esperienza mi sono reso conto che non è realmente possibile documentare questo processo, poiché esistono moltissimi modi per ottenere lo stesso risultato. Molte distribuzioni appaiono simili agli occhi dell’utente finale ma hanno strutture profondamente diverse sotto la superficie, e creare “la guida definitiva” è semplicemente impossibile.

D’altra parte ammetto che aver dovuto scoprire così tante cose da solo è stato molto più gratificante che seguire una documentazione o una guida. Certo, ho pensato molte volte di abbandonare il progetto e ho avuto parecchi mal di testa, ma sono orgoglioso di aver resistito.

## Fai sempre delle pause

Nella fase iniziale del progetto era importante per me avere in mente l’intero funzionamento della distribuzione. Scrivere documentazione avrebbe rallentato il processo di sviluppo e in quel periodo ero un vulcano di idee: sarebbe stato davvero uno spreco di tempo scrivere tutto ciò che avevo in testa. Diciamo che la mia mente era lo spazio più sicuro e versatile in quel momento, anche se spesso saturava ~~la mia RAM~~.

Ho passato mesi in cui il mio cervello macinava idee anche quando non volevo pensare al progetto. A un certo punto ho iniziato a ossessionarmi con l’esperienza utente del progetto, volevo che ogni singolo aspetto del rilascio fosse perfetto e garantisse la migliore esperienza possibile. Tuttavia, questo stava diventando una caccia alle streghe, in cui vedevo errori anche dove non ce n’erano. Volevo che il sistema facesse esattamente ciò che dicevo, anche quando non poteva.

Sono sempre stato appassionato di UX, provo quasi dolore fisico quando qualcosa è tedioso, difficile e richiede uno sforzo inutile per essere utilizzato. Vivo spesso questa sensazione anche nei miei progetti, perché non è realmente possibile pensare a ogni dettaglio. Ho dovuto imparare a sacrificare alcuni di questi dettagli e a tornarci sopra col tempo, per non rallentare lo sviluppo reale. Naturalmente, come UX designer, capisco che questa visione di “perfetto” sia soggettiva e che ciò che per me è sbagliato possa sembrare perfetto a qualcun altro. Tuttavia, non riuscivo a distinguere ciò che era davvero importante e stavo iniziando a perdere il focus su quello che contava per il progetto.

A quel punto ho dovuto **prendermi una pausa** e disconnettermi completamente dal progetto per un giorno. Il giorno successivo avevo una comprensione molto più chiara delle priorità e sono riuscito a completare le attività necessarie per la prima build importante della distribuzione.

Questa esperienza mi ha insegnato l’importanza di prendersi delle pause e di staccare da un progetto per non perdersi in esso. Mi ha anche aiutato a stabilire le priorità e a concentrarmi sugli aspetti fondamentali per creare un prodotto migliore.

## Lascia che gli altri ti aiutino

Come spesso accade nei progetti open source, altri sviluppatori hanno iniziato a unirsi e a contribuire. Questo è stato un punto di svolta perché mi ha permesso di **delegare compiti** e ridurre il mio carico di lavoro. All’inizio ero così concentrato che ero riluttante a farlo, temendo che quei compiti non venissero svolti come li avrei svolti io. Ero in una fase in cui pensavo di essere l’unico con una visione chiara del progetto, il che col senno di poi non era un **atteggiamento sano**.

Tuttavia, i nuovi collaboratori hanno portato nuove prospettive e idee, che hanno contribuito a migliorare notevolmente il progetto. Ho iniziato a fidarmi del mio team e mi sono sentito sicuro nel delegare loro dei compiti. Il lavoro che hanno prodotto è stato migliore di quanto potessi immaginare. Il nostro team è unito da una passione condivisa per il progetto e si basa su un’amicizia e un rispetto reciproco che non ho visto spesso in altri progetti.

Con la crescita del progetto e l’espansione del nostro team, ho imparato l’**importanza della collaborazione** e i benefici del confronto con gli altri. Le diverse prospettive ed esperienze dei membri del team mi hanno aiutato a comprendere il progetto sotto una luce diversa e hanno aperto possibilità che non avrei mai immaginato da solo. Ho anche imparato a fidarmi del mio team, il che mi ha permesso di delegare compiti e concentrarmi sulle aree in cui potevo contribuire meglio.

## Le mie competenze sono migliorate

Lavorare a questo progetto ha migliorato enormemente le mie capacità di programmazione. Pochi giorni fa dovevo creare due applicazioni Gtk, la Drivers Utility e la PRIME Utility, per sostituire le funzioni corrispondenti nel Vanilla Control Center. Con mia sorpresa sono riuscito a progettare, sviluppare e pacchettizzare queste applicazioni in meno di due giorni.

Sono rimasto colpito da me stesso perché mi sono reso conto di non aver pensato troppo alla fase di sviluppo, ormai diventata quasi automatica per me. Questo è stato la prova di quanto le mie competenze fossero migliorate dall’inizio del progetto, anche se faccio ancora fatica a definirmi sviluppatore.

Ho acquisito una comprensione più profonda dell’architettura e del design alla base di una distribuzione Linux. Mi sento molto più sicuro del mio codice rispetto a quando sviluppavo Bottles, quando sprecavo anche settimane per capire quale fosse l’approccio giusto o semplicemente riflettevo sul fatto che potesse essere criticato da altri sviluppatori, facendomi sembrare uno sciocco. In realtà uno degli ostacoli più comuni che io —e immagino molti altri— ho superato è stata la paura di come altri sviluppatori avrebbero giudicato il mio codice. Questa è una paura inutile, perché non solo ti porta a cercare problemi anche quando non esistono, ma ti fa credere di non essere all’altezza. Chi non è d’accordo con il mio codice può sempre farmelo notare o aprire una PR per migliorarlo.

Inoltre, lavorare con un team di collaboratori mi ha permesso di imparare dagli altri e condividere le mie conoscenze e le mie esperienze. Collaborare con altri mi ha aiutato ad acquisire nuove prospettive e approcci allo sviluppo. Mi ha anche insegnato l’importanza della **comunicazione, del coordinamento e del lavoro di squadra** nello sviluppo software.

## Considerazioni finali

Nel complesso, creare una distribuzione Linux è stata un’esperienza incredibilmente gratificante per me. Ho imparato molto su Linux, sulla programmazione e sulla gestione dei progetti, oltre che sull’importanza della collaborazione e delle pause.

Una delle lezioni più importanti che ho imparato è il valore della perseveranza. Creare una distribuzione Linux non è un compito facile, e ci sono stati molti momenti in cui ho voluto mollare. Tuttavia, sono riuscito a superare quei momenti e a uscirne con una comprensione molto più profonda di ciò che serve per creare un progetto di successo.

Sono orgoglioso di ciò che io e il mio team abbiamo realizzato con questa distribuzione, e credo che abbiamo creato qualcosa di unico e prezioso per la comunità Linux. Spero che questa distribuzione continui a crescere e a migliorare nel tempo, e che possa ispirare altri a creare i propri progetti e contribuire alla comunità open source.

Piccola aggiunta: Per più di metà dell’articolo mi riferisco alla prima versione di Vanilla OS, oggi molto distante dalla versione attuale. Quella versione è stata la base delle successive con Almost e ABRoot, in cui il progetto è stato portato avanti insieme a Luca di Maio. Volevo precisarlo.
