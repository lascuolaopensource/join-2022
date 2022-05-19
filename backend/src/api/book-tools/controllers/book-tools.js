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
                        start: {
                            $gt: shared_1.helpers.date.formatQueryDate(date_start),
                        },
                    },
                    {
                        end: {
                            $lt: shared_1.helpers.date.formatQueryDate(date_end),
                        },
                    },
                ],
            },
        });
        const groups = lodash_1.default.groupBy(slots, (s) => s.tool.id);
        console.log(groups);
        const availabilities = {};
        for (let toolID of Object.keys(groups)) {
            const slots = groups[toolID];
            slots.sort((a, b) => {
                return Date.parse(a.start) - Date.parse(b.start);
            });
            const freeSlots = [];
            for (let [i, s] of slots.entries()) {
                if (i < slots.length - 1) {
                    const prevEnd = slots[i].end;
                    const nextStart = slots[i + 1].start;
                    if (prevEnd != nextStart) {
                        freeSlots.push({
                            start: prevEnd,
                            end: nextStart,
                            length: 1,
                        });
                    }
                }
            }
            for (let s of freeSlots) {
                let length = Date.parse(s.end) - Date.parse(s.start);
                length = length / 1000 / 60 / 60;
                s.length = length;
            }
            availabilities[toolID] = freeSlots;
        }
        try {
            ctx.body = { tool_ids, slots };
        }
        catch (err) {
            ctx.body = { err };
        }
    },
};
