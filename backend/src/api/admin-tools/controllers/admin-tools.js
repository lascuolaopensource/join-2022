"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
module.exports = {
    updateSlots: async (ctx, next) => {
        const { changes } = ctx.request.body;
        const groups = lodash_1.default.groupBy(changes, (c) => c.toolID);
        for (let [toolID, updates] of Object.entries(groups)) {
            updates.sort((a, b) => {
                return Date.parse(a.dateTime) - Date.parse(b.dateTime);
            });
            const groups = lodash_1.default.groupBy(updates, (u) => u.state);
            for (let [state, updates] of Object.entries(groups)) {
                const adjacentUpdates = [];
                let tempGroup = [];
                for (let i = 0; i < updates.length; i++) {
                    tempGroup.push(updates[i]);
                    if (i + 1 >= updates.length) {
                        adjacentUpdates.push(tempGroup);
                        tempGroup = [];
                    }
                    else {
                        const prevDate = Date.parse(updates[i].dateTime);
                        const nextDate = Date.parse(updates[i + 1].dateTime);
                        const hour = 1000 * 60 * 60;
                        if ((nextDate - prevDate) / hour != 1) {
                            adjacentUpdates.push(tempGroup);
                            tempGroup = [];
                        }
                    }
                }
                console.log(adjacentUpdates);
            }
        }
        return {};
    },
};
