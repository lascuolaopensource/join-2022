# Installazione

## Prerequisiti

Assicurarsi di aver installato [NVM](https://github.com/nvm-sh/nvm).
Strapi è attualmente compatibile con node `14.18.0`.

## Installazione

Lanciare il comando

```bash
nvm use
```

quindi

```bash
npm install
```

quindi

```bash
npm run develop
```

Al primo lancio webpack installerà tutto quindi ci metterà un po'.

## Configurazione

Tutti gli step sono **OBBLIGATORI**.

### Settings

Una volta dentro strapi, andare in `Settings`:

- Andare in `USERS & PERMISSIONS PLUGIN > Roles`

  - Andare in `Public > Permissions > Application` e spuntare:
    - `Auth / Me`
    - `Exists / Check`
  - Andare in `Authenticated > Permissions > Application` e spuntare:
    - `Auth / Me`
    - `Corso`
      - `Count`
      - `Find`
      - `FindOne`
    - `Exists / Check`
    - `Iscrizione / Tutti`

- Andare in `Advanced settings`
  - Tutti gli switch devono stare su `On`
  - `Reset password page` dev'essere `http://localhost:3000/password/reset`
  - `Redirection url` dev'essere `http://localhost:3000/register/confirm`

### Env

Creare un file `.env` nella root di strapi con le seguenti voci:

```
HOST=0.0.0.0
PORT=1337
SIB_API_KEY= ... <- Qui va la chiave API di Sendinblue
SIB_DEFAULT_FROM= ...
SIB_DEFAULT_FROM_NAME= ...
SIB_DEFAULT_REPLY_TO= ...
```

<br>

---

<br>

# Utilizzo

- Lanciare sempre `nvm use` prima di `npm run develop`
- Quando si pubblica un contenuto, assicurarsi che il suo stato sia `Published`. Altrimenti non viene preso dalle query.

<br>

---

<br>

# Note di sviluppo

Alcuni appunti per ricordarsi su come sono state fatte (e su come fare) alcune cose :)

<br>

## Adding auth/me endpoint

1. checking everytime the token
2. storing User in store

(Going to explain better)

<br>

## How to query User's relational fields

To query a user's relational fields, you need to edit two files (and create them if they do not exist):

```
extensions/users-permissions/services/User.js
extensions/users-permissions/config/schema.graphql.js
```

### `User.js`

This is what you add inside:

```js
"use strict";

module.exports = {
  /**
   * Promise to fetch authenticated user.
   * @return {Promise}
   */
  fetchAuthenticatedUser(id) {
    return strapi
      .query("user", "users-permissions")
      .findOne({ id }, ["role", "..."]); // ← ADD OTHER FIELDS HERE!
  },
};
```

By default, you cannot access relational fields in users for performance issues (see [here](https://forum.strapi.io/t/get-currrent-logged-user-with-custom-data-added-to-the-user-collection-type/1024/2)).

So by creating this file you extend Strapi default behavior: in the `findOne` array argument you just add the extra fields you want to query.

### `schema.graphql.js`

In this file you simply tell GraphQL that there's a new field to query in User.

```js
module.exports = {
  definition: `
      extend type UsersPermissionsMe {
        <FieldName>: <FieldType>
      }
    `,
};
```

<br>

## Task automatiche

Per segnalare automaticamente che un’iscrizione é scaduta, o che un corso é partito:

- Utilizzare i CRON!

- https://stackoverflow.com/questions/60208028/strapi-cms-add-calculated-field
- https://strapi.io/documentation/developer-docs/latest/guides/custom-data-response.html
- https://strapi.io/documentation/developer-docs/latest/guides/slug.html#create-attributes
- https://stackoverflow.com/questions/59088220/update-given-field-value-with-every-fetch-request-in-strapi
- https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#routing
- https://github.com/unlocomqx/svelte-apollo/blob/patch-client/src/client.ts
