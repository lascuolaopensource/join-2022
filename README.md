# Notes to make it work

- After install, on strapi, go to users and permissions plugin and switch on correctly the authorizations
- Make sure content is "Published", otherwise you won't find it in the frontend and queries
- Controllare sempre le impostazioni avanzate di strapi per conferma email e link reindirizzamento password e robe varie

---

# Da chiedere a Raffa

- Sicurezza: quanto dovremmo preoccuparci?
  - https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id
- src/routes/\_\_layout.svelte : Line 38
- Come gestire il logout? Mi pare la cosa giusta sia creare un endpoint, ma poi da lì non riesco a svuotare il localstorage. Per questo al momento ho un componente specifico per il bottone di logout ma non mi quadra tanto.
- Come gestire i testi? Si fa un file unico con tutte le stringhe?
- Come si fa il 2-step login?
- Risistemiamo le issues su github?
- Come bloccare (se serve) l'accesso alle pagine di conferma dell'invio di email o conferma dell'invio email recupero password?
- Va bene che la parte autenticata è "inside" o sarebbe più bello avere che l'url principale sia Join e basta, senza /inside?

---

# TODO

- Mettere la scadenza ad email di conferma e recupero password?
- Astrarre logiche come quella del recupero password, secondo me si possono assimilare alcune
- Impostare i messaggi di errore per form recupero password, registrazione e login
- Login: prima si controlla email, poi password (2-step)
- Capire come integrare le icone
- Nascondere il logout dentro un dropdown, in modo tale da evitare misclick quando l'utente clicca sul suo profilo
- Bloccare iscrizione ad un corso se ci si è già iscritti
- Provare a mettere il client GraphQL dentro \_\_layout
  - Oppure fare in modo che stia da una parte soltanto
  - Oppure metterlo dentro Load
- Evitare che svelte marchi come errori i risultati delle query fatte con GraphQL (per via degli attributi mancanti). Soluzione: creare i tipi
- Fare i field che diventano rossi quando c'è un errore
- Conferma password sia in registrazione che in recupero

## Done

- Provare a togliere react dal frontend (?)
- Far sì che i tab della navbar corrispondano ai link aperti
- Mettere in home il login, e la registrazione come link? Senza stare a mettere la navbar sopra
