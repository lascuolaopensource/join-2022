# Note

- `microbundle` deve essere installato come `devDependency` (questo vale per tutti i moduli che sono tali)
  - altrimenti quando si importa la libreria creata vengono importati anche tutte le dipendenze di microbundle
- In `package.json`:
  - `"version"` deve essere impostato, altrimenti yarn da errore
    - la versione deve necessariamente avere questo schema: `N.N.N`
  - specificare il percorso dei `types` / `typings`, altrimenti intellisense non funziona
  - aggiungere agli script `--no-compress`, per evitare di avere versioni minificate
