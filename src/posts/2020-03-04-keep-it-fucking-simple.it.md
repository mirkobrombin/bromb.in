---
title: "Mantienilo fottuto @css"
description: "Quello di cui voglio parlarti oggi è il metodo con cui chiunque sviluppa normalmente l'interfaccia di un sito Web."
published: true
layout: post
lang: it
---

Quello di cui voglio parlare oggi è il metodo che chiunque di solito utilizza per sviluppare l'interfaccia di un sito Web.

Inizialmente (e sto parlando molti anni fa), i siti Web erano limitati dalla mancanza di regole ed elementi, che hanno costretto gli sviluppatori (non ancora classificati come web designer al momento) per creare interfacce semplici ma funzionali.

Con il passare degli anni, gli strumenti a nostra disposizione aumentarono, HTML e CSS divennero lingue adeguate a sé stanti, permettendoci oggi di creare interfacce funzionali e complesse.

! [] (https://media0.giphy.com/media/10rjcb79m16ary/giphy.gif?cid=790b761110ab7d3263e17e79a1d6613a81f1f1f90e12e4e8b4&rid=gifhy.gif)

Tuttavia, questo è un esempio in cui <MARK> il progresso si evolve più velocemente degli sviluppatori/designer </MARK>, portandoli a non sfruttare completamente le risorse, con conseguenti risultati di bassa qualità e scarsi prestazioni.

Per dare un esempio pratico, i framework CSS sono stati utilizzati per molti anni, che sono un insieme di componenti e regole per la creazione di applicazioni e siti Web. Da un lato, siamo garantiti che, applicando queste regole, un'applicazione sarà ben integrata e coerente in ogni aspetto. D'altra parte, finiamo con fogli di stile pesante, spesso con regole inutili e codice morto che molto probabilmente non useremo mai.

Fare riferimento alla frase ** Il progresso si evolve più velocemente degli sviluppatori/designer **, se avessimo meno risorse a nostra disposizione ma connessioni molto più lente, oggi abbiamo più risorse e connessioni incredibilmente veloci, ma l'esperienza non è cambiata molto e un sito Web si carica circa lo stesso tempo.

In poche parole, utilizzando solo le risorse veramente essenziali e evitando così l'uso di framework CSS, finiamo con applicazioni più performanti e leggeri, con codice sorgente più semplice, riducendo non solo i tempi di caricamento ma anche il tempo trascorso a comprendere e mantenerlo.

Per dare un esempio pratico citando il codice sorgente ** Navbar ** offerto da Bootstrap:

`` `html
<nav class = "navbar navbar-expand-lg navbar-light bg-light">>
<a class = "navbar-brand" href = "#"> navbar </a>
<pulsante class = "navbar-toggler" type = "pulsante" data-toggle = "crolla" data-target = "#navbarsupportadContent" aria-confrols = "navbarsupportadContent" aria-expanded = "false" aria-label = "toggle navigation">
<span class = "navbar-toggler-icon"> </span>
</ball>

<div class = "crolla navbar-collapse" id = "navbarsupportedcontent">
<ul class = "navbar-nav mr-autho">
<li class = "nav-elem attivo">
<a class = "nav-link" href = "#"> home <span class = "sr-sola"> (corrente) </span> </a>
</li>
<li class = "nav-item">
<a class = "nav-link" href = "#"> link </a>
</li>
</ul>
</div>
</nav>
`` `

Ciò che si distingue immediatamente è:

* La complessa leggibilità del codice
* L'uso compulsivo delle classi
* La ripetizione inutile degli elementi container

Tutto può essere semplificato con una struttura minima usando elementi HTML di base, come nell'esempio seguente:

`` `html
<header>
<a href = "#">
<h1> marchio </h1>
</a>
<ottons> </ball>
<v>
<ul>
<li Selected> <a href = "#"> home </a> </li>
<li> <a href = "#"> link </a> </li>
</ul>
</nav>
</header>
`` `

Bootstrap, come molti altri framework CSS, utilizza diverse classi per la gestione degli eventi e l'identificazione degli elementi negli script JavaScript, ad esempio nell'apertura/chiusura del menu mobile.

! [] (https://media1.giphy.com/media/13xw2mje0xcom0/giphy.gif?cid=790b7611d6b872db885ff15e635a83fe915441b166232cf4&rid=gifhy.gif)

L'uso delle classi non è necessario se abbiamo una chiara idea della struttura del progetto che vogliamo creare. Nell'esempio sopra menzionato, abbiamo una semplice intestazione con un logo, un pulsante e un menu di navigazione.

Il nostro obiettivo è mostrare il pulsante solo sui dispositivi mobili, ad esempio su schermate inferiori a 720px, quindi nasconderemo questo pulsante (che non ha una classe in quanto è l'unico presente nell'intestazione):

`` `CSS
header> pulsante {
Display: nessuno
}
`` `

Quindi, per farlo apparire di nuovo su dispositivi inferiori a 720px:

`` `CSS
@media Screen e (massimo-larghezza: 719px) {
header> pulsante {
Visualizza: blocco
}
}
`` `

Per quanto riguarda la gestione dell'evento menu aperto/chiusura sui dispositivi mobili, possiamo optare per uno script JavaScript utilizzando lo stesso elemento `` heater> pulsante 'per l'interazione. Altrimenti, poiché i dispositivi mobili hanno touch screen, possiamo usare la loro percezione di pseudo _: hover_ per ricreare l'evento stampa:

`` `CSS
@media Screen e (massimo-larghezza: 719px) {
header> nav {
visualizzazione: nessuno;
}
Testa> Pulsante: Hover> nav {
Visualizza: blocco;
}
}
`` `

Ciò raggiungerà lo stesso risultato poiché lo pseudo _: hover_ su touch i dispositivi viene interpretato come un clic senza rilascio, facendo così clic all'esterno dell'elemento otterrà l'effetto opposto rimuovendo la messa a fuoco. La stessa procedura può essere applicata ai menu contestuali.

![](https://media1.giphy.com/media/3OvvA11fPUvfYRFjxS/giphy.gif?cid=790b7611f2ed097755ca7a2d0285f73a616ed1d5649e50b0&rid=giphy.gif)

Il mio obiettivo con questo articolo non è quello di illustrare come creare un'interfaccia ma di incoraggiare chiunque voglia provare a utilizzare le risorse che hanno a disposizione bene, valutando attentamente i pro e i contro dell'adozione di un framework.

Il principio di ** kiss ** (mantienilo semplice, stupido) ci insegna che è importante mantenere un approccio semplice, per evitare di interrompere a modo nostro. Un altro principio che può riassumere l'intero articolo è sicuramente ** meno è più **, poiché l'utilizzo di meno risorse o piuttosto solo quelli necessari ci consente di avere un quadro più ampio di quello che sarà il prodotto finale, migliorando non solo la forma finale ma anche i tempi di manutenzione futuri.

Spero di averti annoiato abbastanza da disinstallare il tuo sistema operativo.

Ci vediamo in giro.

__Mirko_
