"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
const lodash_1 = __importDefault(require("lodash"));
module.exports = {
    book: async (ctx, next) => {
        strapi.log.info("In book-tools/index controller");
        const body = ctx.request.body;
        console.log(body);
    },
    checkAvailability: async (ctx, next) => {
        strapi.log.info("In book-tools/check-availability controller");
        const body = ctx.request.body;
        let tool_ids = body.days.reduce((prev, curr) => {
            return [...prev, ...curr.tool_ids];
        }, []);
        tool_ids = lodash_1.default.uniq(tool_ids);
        const date_start = new Date();
        const date_end = shared_1.helpers.date.addDays(date_start, 7);
        const slots = await strapi.entityService.findMany(utils_1.entities.toolSlot, {
            populate: ["tool"],
            filters: {
                $and: [
                    {
                        tool: {
                            id: {
                                $in: tool_ids,
                            },
                        },
                    },
                    {
                        date: {
                            $gt: shared_1.helpers.date.formatQueryDate(date_start),
                        },
                    },
                    {
                        date: {
                            $lt: shared_1.helpers.date.formatQueryDate(date_end),
                        },
                    },
                ],
            },
        });
        try {
            ctx.body = { tool_ids, slots };
        }
        catch (err) {
            ctx.body = { err };
        }
    },
};
