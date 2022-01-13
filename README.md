# Documentazione

https://sos-nuovo-sito.notion.site/Documentazione-885d9b79e4554c0c8ccd441966384788

# Da chiedere

- Controllare le issue taggate come "Question" in GitHub

- Sicurezza: quanto dovremmo preoccuparci? Attualmente gestiamo tutto con localstorage. https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id
- Come gestire il logout? Mi pare la cosa giusta sia creare un endpoint, ma poi da lì non riesco a svuotare il localstorage. Per questo al momento ho un componente specifico per il bottone di logout ma non mi quadra tanto.
- Come gestire i testi? Si fa un file unico con tutte le stringhe?
- Potrebbe aver senso separare le repo? Temo che i commit poi confondano l'idea su cosa si abbia lavorato. Ma forse no.
- É scritta bene questa funzione? `api/exists/controllers/exists.js`
- Controllare anche qui `/src/routes/__layout.svelte` se è scritto bene (riga 37 NOTA)
- Va bene che la parte autenticata è "inside" o sarebbe più bello avere che l'url principale sia Join e basta, senza /inside?
- Va bene che per fare il 2-step login salvo la mail in localstorage? Come si dovrebbe fare altrimenti?
- Verificare il 2-step login?

## Risolto

- Chiedere la questione della sovrascrizione degli errori nel login.
