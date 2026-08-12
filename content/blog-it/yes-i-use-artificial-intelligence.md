---
title: "Sì, uso l'intelligenza artificiale"
description: "Non ho intenzione di negarlo, e credo valga la pena spiegare come."
layout: "post"
lang: "it"
date: "2026-08-04"
published: true
permalink: "/it/blog/yes-i-use-artificial-intelligence/"
---

Ogni tanto, sotto un mio post o tra i commenti ai miei tweet, compare l'osservazione: "è abbastanza palese che Mirko usi l'AI", di solito non è nemmeno un'accusa, e alcune persone si spingono a dire che si fidano di come la uso. Preferisco però non lasciare la cosa all'interpretazione: la uso, l'ho già detto più volte, e voglio metterla nero su bianco una volta per tutte.

## Il tempo è la variabile che conta

Ho molti progetti da portare avanti e le stesse ventiquattro ore di chiunque altro, e Singularity non è un tema GTK: è un desktop environment, un compositor, un framework di widget, un sistema operativo con una boot chain custom, immagini transazionali e un modello di permessi ripensato da zero, e chiunque abbia toccato anche solo una di queste parti sa quanto lavoro ci sia dietro. E intendiamoci: sono circa tre anni che lavoro all'intero progetto Singularity, fin dal primo tassello, Atom Loops, che all'inizio era soltanto una piccola idea, caricare il sistema operativo da un file in loopback e togliere di mezzo le partizioni.

In un progetto del genere, una parte enorme del codice non richiede pensiero, richiede pazienza: mappare i valori di un'API su una struct, ripetere lo stesso pattern per la ventesima volta con nomi diversi, scrivere il boilerplate che sta tra un'idea e la sua prima riga interessante, rileggere per la centesima volta una documentazione che ho già letto, cose che non mi insegnano nulla e non migliorano il progetto, mi tolgono soltanto ore e mi snervano.

## Cosa le delego, e cosa no

Uso l'AI per i commenti al codice e per la documentazione, non sono bravo a commentare, non mi viene naturale, e mi porta via molto tempo: è una debolezza mia e non ho problemi ad ammetterla, e il risultato è che oggi il mio codice è documentato meglio di quanto lo sarebbe se avessi continuato a farlo da solo.

La uso per il boilerplate, per le parti ripetitive, per tutto quello che è "guarda questa cosa e implementane un'altra uguale con valori diversi".

Non la lascio nemmeno libera di inventare: sui progetti in Go la vincolo ai miei SDK, go-foundation su tutti, così si muove dentro un super set che conosco a memoria invece di tirare fuori soluzioni sue o scorciatoie che, in ogni caso, sgamerei, perché revisiono tutto.

Non la uso per progettare: l'architettura, le logiche complesse, il modello di sicurezza, la sandbox, il design e l'esperienza utente restano miei, non per orgoglio, ma perché è esattamente la parte che mi piace, è il motivo per cui faccio questo lavoro, e delegarla significherebbe togliermi il mestiere, non il peso.

La uso però per ragionare: prima di scrivere una riga discuto l'idea, le faccio cercare i punti deboli, i casi che non ho considerato, quello che si romperebbe tre mesi dopo. E capiamoci, io disturbo parecchia gente per i miei progetti, e sono tanti i problemi che saltano fuori solo parlandone, ma sono di più quelli che intercetto così, prima ancora di doverli affrontare, e ognuno di questi sono settimane o mesi di lavoro inutile risparmiati, e il tempo non è solo denaro: è energia, è sanità mentale.

## Mi permette di ambire a qualcosa di più grande

Questa è la parte che quasi nessuno considera, perché Singularity OS è il sistema che ho sempre voluto fare, e la cosa curiosa è che in gran parte esisteva già: la boot chain, il boot dell'intero sistema a partire da un file immagine invece che da partizioni, il modello di aggiornamento, cose che avevo progettato e scritto nero su bianco anni fa e su cui poi mi ero messo il cuore in pace, bello ma realisticamente non lo svilupperò mai.

Il muro non era la progettazione, era scriverlo davvero e soprattutto testarlo davvero, perché quando lavori su una boot chain o su un modello di permessi senza privilege escalation non basta che il codice compili: deve tornare esattamente il valore che ti aspetti, in ogni condizione, e quel lavoro è fatto di cicli, cambio un limite, rilancio il test, non torna, cambio ancora, rilancio, per ore, per giorni.

Oggi posso dire: questo endpoint deve restituire questo valore preciso, e lasciare che sia un ciclo automatico a insistere finché non ci arriva, restituendomi solo l'asserzione che è fallita, così so dove intervenire. E quando ho trenta idee su come risolvere un problema, posso lasciare un agente a provarle tutte e scoprire quale regge, invece di sceglierne due a intuito perché le altre ventotto costerebbero troppo tempo.

Il risultato non è che scrivo lo stesso software più in fretta, è che un progetto che avevo archiviato come irrealistico oggi è in mano alle persone.

## Automatizzare non è una novità

Su Bottles avevo quasi duecento issue aperte, ci sono stati anni in cui ne chiudevo una decina e ne arrivavano altrettante, non riuscivo semplicemente a starci dietro. Oggi quel backlog è gestito, ma non è che l'AI le abbia chiuse da sola: abbiamo iniziato come si è sempre fatto, io su una issue, poi un'altra, poi un'altra ancora, finché non ho detto aspetta, qui vedo un pattern, e ho messo un agente a cercarlo, a filtrare le issue reali da quelle invalidate o mal formattate, i bug ancora presenti da quelli ormai spariti, le richieste di funzionalità dai bug veri, e infine a dividere tutto in batch per similarità, per non impazzire. Da lì il giro era semplice: il fix lo davo io, l'AI lo testava.

Non è che prima non ci provassi: ricevevo le notifiche su Telegram, avevo script per intervenire in blocco sulle issue simili tra loro, un algoritmo di distanza di Levenshtein per individuare i duplicati, automatizzavo con quello che avevo, e non pretendo di paragonare quegli script a un modello, facevano un lavoro molto più stupido e molto più limitato, ma la direzione era già quella. L'intelligenza artificiale non mi ha cambiato la filosofia, mi ha alzato di parecchio il soffitto.

## La stessa regola vale per gli altri

Quando qualcuno mi apre una pull request, non mi interessa sapere se l'ha scritta a mano, con un modello, o con l'aiuto di un amico, non lo chiedo e non provo a indovinarlo, guardo il codice: se è di qualità, se rispetta le convenzioni del progetto, se fa quello che dice di fare, entra, altrimenti no.

Trovo poco sensato applicare a me stesso un criterio diverso da quello che applico agli altri: il metro è la qualità del risultato, non la biografia dello strumento.

## Uno strumento, non una scorciatoia

Sono anni che nel mondo open source si discute di strumenti che cambiano il modo di scrivere software: dai primi IDE ai linter, dai generatori di codice ai package manager, ogni volta la stessa dinamica, e ogni volta la domanda utile non è "l'hai usato?", ma "il risultato regge?".

L'intelligenza artificiale ha problemi veri, e non voglio far finta di niente: consumi, licenze, dataset, il rischio concreto che qualcuno la usi per riempire i repository di codice che non ha mai letto, sono discussioni che vanno fatte, ma sulle conseguenze reali, non sull'uso in sé, altrimenti restiamo alla superficie, come capita spesso quando una questione complessa viene ridotta a una posizione.

## Studiate, e puntate più in alto

Se c'è un consiglio che mi sento di dare, soprattutto a chi sta iniziando adesso, è di studiare: non affidatevi all'AI per tutto, perché se non sapete riconoscere un errore in quello che vi scrive non state delegando il lavoro meccanico, state delegando la comprensione, e quella non torna indietro. Questi strumenti amplificano quello che sai: se sai poco, amplificano poco! Non essere tirchi con le proprie ambizioni: io ho ripreso in mano un sistema operativo che avevo archiviato come irrealistico, e non vedo perché le vostre idee dovrebbero essere più piccole delle mie. Il soffitto si è alzato per tutti, sarebbe un peccato continuare a progettare come se fosse ancora basso.

E diciamocelo: questa è la direzione in cui il nostro mestiere si sta muovendo, non una moda che passa. Non credo che chi non la usa oggi sparirà domani, ma tra qualche anno la differenza tra chi è andato avanti e chi è rimasto fermo non la farà lo strumento in sé, la farà chi ha continuato a studiare mentre imparava a usarlo, e chi invece è rimasto a discutere se fosse lecito toccarlo.

## Il tempo che tolgo, e a chi lo tolgo

Qualcuno a questo punto direbbe: e allora riduci il numero di progetti, ma io li porto avanti perché mi piacciono, e perché vorrei costruire qualcosa che resti nella vita delle persone, qualcosa per cui valga la pena essere ricordato.

C'è però un'altra cosa, ed è quella che pesa di più: le ore che passo a rincorrere un test che non torna, o a riscrivere per la ventesima volta lo stesso pattern, non le sto togliendo a un altro progetto, le sto togliendo alla famiglia che sto costruendo, e ho un tempo contato come tutti, non voglio scegliere tra le due cose, voglio che possano vivere in parallelo.

Quando qualcuno mi dice che usare l'AI è una scorciatoia, io penso a questo: non sto barando su un compito in classe, sto cercando di far entrare due vite in una sola, e ogni ora che non spendo in lavoro meccanico è un'ora che torna dove conta davvero.
