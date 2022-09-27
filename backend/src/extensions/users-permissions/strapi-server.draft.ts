// import _ from "lodash";

// interface Route {
//     method: string;
//     path: string;
//     handler: string;
//     config: {
//         prefix?: string;
//         middlewares?: Array<string>;
//         policies?: Array<string>;
//     };
// }

// export default (plugin) => {
//     plugin.controllers.controllerA.find = (ctx) => {};
//     plugin.policies[newPolicy] = (ctx) => {};
//     plugin.routes['content-api'].routes.push({
//       method: 'GET',
//       path: '/route-path',
//       handler: 'controller.action',
//     });

//     // Getting all the routes in the plugin
//     const routes = plugin.routes["content-api"].routes as Array<Route>;

//     // Getting the ones we want to add policies
//     const findOne = _.find(routes, (r) => {
//         return r.handler == "role.findOne";
//     });
//     const find = _.find(routes, (r) => {
//         return r.handler == "role.find";
//     });

//     for (let f of [findOne, find]) {
//         // Adding config and policies if missing
//         if (!f.config) {
//             f["config"] = {};
//         }
//         if (!f.config.policies) {
//             f.config["policies"] = [];
//         }
//         // Adding policy
//     }

//     console.log(routes);

//     return plugin;
// };
