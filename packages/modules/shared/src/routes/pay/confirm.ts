import * as yup from "yup";
import { HTTPMethod, Shape, PaymentCategories } from "../../types";
import { send as s } from "../../join-request";

//

export const path = "/pay/confirm";

export const method = HTTPMethod.POST;

export type Req = {
    confirmationCode: string;
};

export const schema = yup.object<Shape<Req>>({
    confirmationCode: yup.string().required(),
});

export interface Res {
    category: PaymentCategories;
    id: string;
}

export async function send(confirmationCode: string, fetchImpl = fetch) {
    return s<Res>({
        path,
        method,
        data: { confirmationCode },
        fetchImpl,
    });
}
