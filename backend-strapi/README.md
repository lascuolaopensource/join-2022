# Development notes

Just some notes on fixes and procedures :)

---

## Email confirmation!

Important: activate the email confirmation in advanced settings!

---

## Adding auth/me endpoint

1. checking everytime the token
2. storing User in store

(Going to explain better)

---

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

---

TODO

creare degli endpoint come "check email" e "check username"
per vedere se quelle cose stanno già dentro il database
in modo da ritornare errori specifici per il singolo field

---

NOTE

Per segnalare automaticamente che un’iscrizione é scaduta, o che un corso é partito:

• UPDATE: si possono usare i CRON

https://stackoverflow.com/questions/60208028/strapi-cms-add-calculated-field

https://strapi.io/documentation/developer-docs/latest/guides/custom-data-response.html

https://strapi.io/documentation/developer-docs/latest/guides/slug.html#create-attributes

https://stackoverflow.com/questions/59088220/update-given-field-value-with-every-fetch-request-in-strapi

https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#routing

https://github.com/unlocomqx/svelte-apollo/blob/patch-client/src/client.ts
