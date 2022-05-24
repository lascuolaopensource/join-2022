import { policies as p } from "../../../utils";
import { endpoints as e, types as t } from "shared";

module.exports = {
    routes: [
        {
            method: "POST",
            path: "/admin-tools/update-slots",
            handler: "admin-tools.updateSlots",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
