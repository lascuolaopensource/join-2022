import { LifecycleEventParam } from "@utils";

export default {
    beforeUpdate(event: LifecycleEventParam<any>) {
        const { data, where, select, populate } = event.params;

        console.log(data);
    },
};
