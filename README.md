# Sito Scuola Biblica Kairos

Sito statico (Eleventy) con pannello di gestione (Sveltia CMS) che scrive direttamente nel repository GitHub.

## Pubblicazione su GitHub Pages

1. Crea un repository su GitHub (pubblico, per usare Pages gratis) e carica tutti i file di questa cartella (escluse `node_modules` e `_site`, già ignorate da `.gitignore`).
2. Apri `src/admin/config.yml` e sostituisci `TUO-UTENTE/NOME-REPO` con il nome del tuo repository (per esempio `enzo/kairos`).
3. Su GitHub: Settings, Pages, Source: **GitHub Actions**. Ad ogni modifica sul ramo `main` il sito si ricostruisce da solo (circa un minuto).
4. Il sito sarà su `https://TUO-UTENTE.github.io/NOME-REPO/`.

## Accesso al pannello

1. Su GitHub: Settings, Developer settings, Personal access tokens, **Fine-grained tokens**, Generate new token.
2. Scegli solo questo repository e, in Permissions, imposta **Contents: Read and write**.
3. Apri `https://TUO-UTENTE.github.io/NOME-REPO/admin/`, scegli "Accedi con token" e incolla il token.

Il token resta nel tuo browser: non condividerlo e non scriverlo nei file del sito.

Dal pannello gestisci: Articoli (con categoria e tag), Categorie, Pagine, Corsi (le schede della home) e Impostazioni (menu e dati generali). Ogni salvataggio crea un commit e fa ripubblicare il sito.

## Lavorare in locale (senza token e senza GitHub per scrivere)

Il pannello può modificare direttamente i file sul tuo computer. Serve Node.js installato (XAMPP e MAMP non c'entrano).

1. Nella cartella del progetto: `npm install` (solo la prima volta), poi `npm start`.
2. Apri http://localhost:8080 per vedere il sito.
3. Apri http://localhost:8080/admin/ con **Chrome o Edge** (Firefox e Safari non sono compatibili con questa modalità).
4. Premi **Work with Local Repository** e scegli la cartella del progetto.
5. Scrivi e modifica dal pannello: ogni salvataggio cambia i file sul tuo disco e il sito locale si aggiorna (se non vedi la modifica, ricarica la pagina).

Il pannello locale non pubblica nulla. Per mettere online le modifiche:

- **GitHub Desktop** (consigliato): mostra da solo i file cambiati, scrivi una breve descrizione, poi "Commit" e "Push". Il sito si ripubblica in circa un minuto.
- **Dal sito di GitHub**: nel repository, Add file, Upload files, e trascina le cartelle o i file modificati (comprese le immagini in `src/assets/uploads`).

Se usi sia il pannello online sia quello locale: prima di lavorare in locale scarica sempre le ultime modifiche (in GitHub Desktop: Fetch o Pull), per non sovrascrivere ciò che hai scritto online.

## Cloudflare Pages o Netlify

Collega lo stesso repository e imposta: comando di build `npm run build`, cartella di output `_site`. Non serve nessuna variabile (il prefisso `/NOME-REPO/` serve solo a GitHub Pages).

## Da sostituire prima della pubblicazione

In `src/index.njk` la barra delle statistiche e le tre testimonianze sono segnaposto (cercare i commenti "ATTENZIONE"). L'articolo di prova e la pagina "Chi sono" sono esempi da modificare o eliminare dal pannello.
