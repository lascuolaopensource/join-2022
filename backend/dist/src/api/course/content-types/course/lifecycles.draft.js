"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMeetings() { }
exports.default = {
    beforeUpdate(event) {
        const { data } = event.params;
        const deadline = new Date(data.enrollmentDeadline);
        const meetings = data.meetings;
        console.log(event.params.where.id, deadline, meetings);
    },
};
