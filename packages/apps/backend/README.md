# Note

- `Role` ha `find` e `findOne` attivati per tutti. È un problema?

- `.env` file:

  - `FRONTEND_PAYMENT_PATH` ha questa struttura: `any/path/you/[id]/like`

    Ricordarsi che `[id]` verrà poi sostituito dall'ID del pagamento

- L'invio delle mail non ha await prima perché in teoria così il controller ci mette meno tempo a caricare e poi invia le mail con calma
