"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
module.exports = {
    index: async (ctx, next) => {
        strapi.log.info("In pay controller");
        const body = ctx.request.body;
        const paymentRes = await strapi.entityService.findMany("api::payment.payment", {
            filters: { hash: body.paymentHash },
        });
        const payment = paymentRes[0];
        const billingData = {
            payment: payment.id,
            address: body.billing.address,
            data: [],
        };
        if (body.billing.billingOption == shared_1.f.billing.bOptions[0]) {
            const dataMe = {
                ...body.billing.me,
                __component: shared_1.f.billing.bOptionsComp.me,
                cf: body.billing.me.cf,
            };
            billingData.data?.push(dataMe);
        }
        else if (body.billing.billingOption == shared_1.f.billing.bOptions[1]) {
            const dataPerson = {
                ...body.billing.person,
                __component: shared_1.f.billing.bOptionsComp.person,
            };
            billingData.data?.push(dataPerson);
            billingData.email = body.billing.email;
        }
        else if (body.billing.billingOption == shared_1.f.billing.bOptions[2]) {
            const dataCompany = {
                ...body.billing.company,
                __component: shared_1.f.billing.bOptionsComp.company,
            };
            billingData.data?.push(dataCompany);
            billingData.email = body.billing.email;
        }
        const billing = await strapi.entityService.create("api::billing-info.billing-info", { data: billingData });
        await strapi.entityService.update("api::payment.payment", payment.id, {
            data: {
                billing: billing.id,
            },
        });
    },
};
//# sourceMappingURL=pay.js.map