import { HTTPMethod } from "$types";
import { PaymentDetails } from "$types";
import { send as s } from "../../join-request";

//

export type Params = { id: string };

export const path = (params: Params = { id: ":id" }) =>
    `/pay/get-info/${params.id}`;

export const method = HTTPMethod.GET;

//

export interface Res extends Omit<PaymentDetails, "owner.email"> {}

export async function send(id: string, fetchImpl = fetch) {
    return s<Res>({
        path: path({ id }),
        method,
        fetchImpl,
    });
}
