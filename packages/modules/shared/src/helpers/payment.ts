import { Payment as IPayment } from "../types";

export namespace Payment {
	export function isExpired(date: string): boolean {
		return new Date() > new Date(date);
	}
}
