# Notes to make it work

- After install, on strapi, go to users and permissions plugin and switch on correctly the authorizations
- Make sure content is "Published", otherwise you won't find it in the frontend and queries

---

# Da chiedere a Raffa

- Come gestire il logout? Mi pare la cosa giusta sia creare un endpoint, ma poi da lì non riesco a svuotare il localstorage. Per questo al momento ho un componente specifico per il bottone di logout ma non mi quadra tanto.
- Come gestire i testi? Si fa un file unico con tutte le stringhe?

---

# TODO

- Mettere in home il login, e la registrazione come link? Senza stare a mettere la navbar sopra
- Capire come integrare le icone
- Nascondere il logout dentro un dropdown, in modo tale da evitare misclick quando l'utente clicca sul suo profilo
- Bloccare iscrizione ad un corso se ci si è già iscritti
- Provare a mettere il client GraphQL dentro \_\_layout
  - Oppure fare in modo che stia da una parte soltanto
  - Oppure metterlo dentro Load
- Evitare che svelte marchi come errori i risultati delle query fatte con GraphQL (per via degli attributi mancanti). Soluzione: creare i tipi

## Done

- Provare a togliere react dal frontend (?)
- Far sì che i tab della navbar corrispondano ai link aperti
