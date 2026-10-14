# Overgroove

**Prototipo nel browser per organizzare le prove di un gruppo di danza.**

Permette di indicare le disponibilità, confrontare le fasce orarie, leggere avvisi e gestire una playlist. È un esperimento precedente ai progetti gestionali più strutturati.

## Stato e funzionamento

La pagina usa HTML, CSS e JavaScript. Avvisi, disponibilità e impostazioni sono salvati nel `localStorage` del browser; i file audio usano IndexedDB.

**I dati non vengono sincronizzati tra persone o dispositivi.** Chat e indicatori di presenza online fanno parte del prototipo locale. Il PIN gestito nel codice del browser non è un sistema di autenticazione sicuro per utenti reali.

## Leggere e provare il codice

- [`index.html`](./index.html): interfaccia e gestione locale.
- [`attendance.js`](./attendance.js): conteggio delle disponibilità, separato dall’interfaccia.
- [`tests`](./tests): soglie di partecipazione, pareggi e dati salvati incoerenti.

Apri `index.html` in un browser moderno, oppure servi la cartella con un server statico:

```bash
python3 -m http.server 3102 --bind 127.0.0.1
```

Gli account iniziali sono dimostrativi: il codice iniziale è `1234`. Per provare il prototipo usa nomi e codici inventati. Cancellare i dati del browser elimina le informazioni locali; i dati non vengono condivisi con uno staff remoto.

## Verifiche

Con Node.js:

```bash
node --check attendance.js
node --test tests/*.test.cjs
```

Il conteggio considera solo membri attuali e fasce valide. Voti duplicati o riferiti a persone rimosse non possono raggiungere la soglia di partecipazione.

## Contesto

Progetto di Daniele Bucca. Il portfolio corrente è [CPHR Studio](https://cphr.it/); [Open Dance](https://github.com/defnotafantom/open-dance) esplora un’applicazione con backend e ruoli per una scuola di danza.
