import { Payment } from "../types";

export function isExpired(p: Payment): boolean {
	return Date.now() > Date.parse(p.expiration);
}
