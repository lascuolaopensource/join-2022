import { PaymentDetails } from "../types";

export type PayConfirmRes = {
	confirmed: boolean;
	details: PaymentDetails;
};
