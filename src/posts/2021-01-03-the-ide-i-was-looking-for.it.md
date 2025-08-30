---
title: "L’IDE che stavo cercando"
description: "GNOME Builder è uno strumento molto potente: permette di sviluppare principalmente in 7 linguaggi."
published: true
layout: post
---

Sono sviluppatore da diversi anni. Ho iniziato googlando <mark>come fare un sito web</mark> a 14 anni e da allora ne ho fatti *(poi sono passato a StackOverflow 👅)*.

Ho avuto la fortuna di crescere in un periodo in cui l’informatica, in particolare la programmazione, era in forte evoluzione. In quegli anni nessuno avrebbe immaginato che JavaScript sarebbe diventato un linguaggio così famoso da generare fiumi di framework basati su di esso.

La tecnologia è evoluta a una velocità tale da diventare alla portata di tutti. Esistono molti linguaggi di programmazione, adatti a ogni contesto e a ogni sviluppatore.

### IDE & editor di codice

Ho iniziato su Windows: aprivo il Blocco note e mi divertivo a far apparire scritte colorate sulla mia pagina web che, per fortuna, era in locale 😅.

Quando ho scoperto PHP ho sentito il bisogno di passare a un editor più strutturato, come Notepad++. Offriva plugin, evidenziazione della sintassi, formattazione e tanti altri strumenti che mi hanno aiutato a digerire meglio quel linguaggio.

Nel giro di un anno sono passato a Visual Studio per necessità con Visual Basic e C#, anche se ho abbandonato piuttosto in fretta quando ho comprato un iMac con OS X Mountain Lion. Ho iniziato a usare editor come BBEdit e Brackets.

Il grande cambiamento è arrivato quando sono passato a Ubuntu diversi anni fa. Vi risparmio la carrellata di editor e IDE provati, giusto per citarne alcuni: Geany, Gedit, Eclipse, Atom, VS Code, Elementary Code e JetBrains*. Tutti utili per arrivare a lui: l’IDE definitivo.

#### L’IDE definitivo

Il mio modo di programmare e il target stesso sono cambiati di recente. Dal 2017 ho iniziato a sviluppare [bot di Telegram](https://unifiedban.solutions) per la sicurezza e la gestione dei gruppi, software desktop e server (Linux), portali e [CMS](https://github.com/biskuitorg/), ecc.

Dato che lo sviluppo di applicazioni GTK è il mio obiettivo principale, ho iniziato a usare <mark>GNOME Builder</mark>, l’IDE “tutto in uno” di GNOME.

![](/uploads/2021-01-03-09-00-54-gnome-builder.png)

Evito di parlare della sua eleganza e del mio affetto per GTK in generale, o non finiamo più.

GNOME Builder è uno strumento molto potente: permette di sviluppare principalmente in 7 linguaggi (quelli comunemente usati da GNOME per le sue applicazioni):

- C
- JavaScript
- Python 💘
- Rust
- C++
- C#
- Vala

![](/uploads/2021-01-03-09-50-43-gnome-builder-new-project.png)

Consente di scegliere subito la licenza con cui distribuire il software, abilitare il versionamento Git e preconfigurare il progetto per un dato contesto. Puoi scegliere il target per il tipo di applicazione che stai per sviluppare:

- Applicazione GNOME (con supporto ai widget GTK)
- Libreria condivisa
- Applicazione a riga di comando
…o, banalmente, un progetto vuoto.

Possiamo persino scegliere uno dei progetti GNOME da cui imparare o a cui collaborare.

![](/uploads/2021-01-03-09-55-09-gnome-builder-gnome-sources.png)

#### Integrazione Meson & Flatpak

GNOME Builder integra <mark>Flatpak e Meson</mark> di default. Questo significa che ogni applicazione creata nasce come Flatpak e con sistema di build meson+ninja.

È una scelta opzionale: basta eliminare il manifest `.json` nella root del progetto per usare solo la coppia meson+ninja. Ma apprezzo la scelta: Flatpak è di casa in GNOME e lo trovo un ottimo incentivo a distribuire il progetto come Flatpak fin dall’inizio.

#### Glade, ci sei?

Uso Glade da tempo per realizzare interfacce GTK. È uno strumento davvero potente che, da un editor grafico, restituisce il progetto in formato ‘xml’, di solito con estensione `.ui` o `.glade`.

![](/uploads/2021-01-03-10-03-31-glade.png)

Include tutti i [widget](https://developer.gnome.org/gtk3/stable/GtkWidget.html) GTK, proprietà, segnali, scorciatoie: tutto. Permette di creare un’interfaccia completa da zero. Inizialmente, affascinato dall’efficienza di questo tool, non mi aspettavo la sua integrazione in GNOME Builder. Ma con la crescita del codice di [Bottles](https://github.com/bottlesdevs/Bottles), una delle applicazioni su cui lavoro, ho iniziato a sentire *il peso* del passare da un’applicazione all’altra.

Poi — perché sono un 🙈 e non esploro a fondo un programma prima di usarlo — non avevo notato che Builder fornisce l’integrazione con Glade.

![](/uploads/2021-01-03-09-05-21-gnome-builder-glade.png)

Credo sia ancora in una fase non perfettamente stabile, qualche rallentamento l’ho percepito, ma questa integrazione rende Builder l’IDE completo per il mio uso. Da qui posso iniziare e finire lo sviluppo di un’applicazione senza mai abbandonare lo schermo. Permette di consultare la documentazione senza passare al browser, integra la to-do list generata analizzando il codice dell’applicazione. Fornisce un debugger funzionale, lo strumento di analisi Valgrind e consente il profiling del processo.

Grazie GNOME 💖, ve ne sarò per sempre grato.

__Mirko_
