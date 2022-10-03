"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    beforeCreate(event) {
        const { data, where, select, populate } = event.params;
        console.log(data);
    },
};
