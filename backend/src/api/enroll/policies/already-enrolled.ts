// import { entities as e, CTX, getUserByEmail } from "../../../utils";
// import { errors as err, routes as r } from "join-shared";

// import { Strapi } from "@strapi/strapi";
// import { errors } from "@strapi/utils";
// const { PolicyError } = errors;

// //

// export default async function (
//     policyContext: CTX<r.Enroll.Req>,
//     config: any,
//     { strapi }: { strapi: Strapi }
// ) {
//     const policyName = "user-exists";
//     strapi.log.info(`POLICY - ${policyName}`);

//     // Getting data
//     const user = policyContext.state.user;
//     const body = policyContext.request.body;

//     // If user is logged, it's fine
//     if (user) {
//         return true;
//     }
//     // If no user, then we have to check if the email doesn't exist already
//     else {
//         const email = body.contacts.email;
//         // Search for user
//         const users = await getUserByEmail(email);
//         // If user exists, then it's bad request
//         if (users.length > 0) {
//             throw new PolicyError(err.emailAlreadyExisting, { policyName });
//         }
//         // Otherwise it's good
//         return true;
//     }
// }
