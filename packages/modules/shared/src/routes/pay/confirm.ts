import * as yup from "yup";
import { HTTPMethod, Shape } from "$types";

export namespace Confirm {
    export const path = "/pay/confirm";
    export const method = HTTPMethod.POST;

    export interface Req {
        confirmationCode: string;
    }

    export const schema = yup.object<Shape<Req>>({
        confirmationCode: yup.string().required(),
    });

    export interface Res {
        confirmed: boolean;
    }

    export interface Pino {
        pino: number;
    }
}
