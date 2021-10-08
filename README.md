# Notes to make it work

- After install, on strapi, go to users and permissions plugin and switch on correctly the authorizations
- Make sure content is "Published", otherwise you won't find it in the frontend and queries

# TODO

- Bloccare iscrizione ad un corso se ci si è già iscritti
- Far sì che i tab della navbar corrispondano ai link aperti
- Provare a togliere react dal frontend (?)
- Provare a mettere il client GraphQL dentro \_\_layout
  - Oppure fare in modo che stia da una parte soltanto
  - Oppure metterlo dentro Load
- Evitare che svelte marchi come errori i risultati delle query fatte con GraphQL (per via degli attributi mancanti). Soluzione: creare i tipi
