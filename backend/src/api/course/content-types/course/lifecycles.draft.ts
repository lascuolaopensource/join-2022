import { LifecycleEvent } from "@utils";
import { types as t } from "join-shared";

function getMeetings() {}

export default {
    beforeUpdate(event: LifecycleEvent<t.Course, any>) {
        const { data } = event.params;

        const deadline = new Date(data.enrollmentDeadline);
        const meetings = data.meetings;
        console.log(, deadline, meetings);
    },
};
