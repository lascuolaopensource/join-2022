import {
	UsersPermissionsMe,
	ComponentLocationAddress,
	BillingInfoDataDynamicZone,
} from "./types";

/**
 * Utility
 */

export type ID<T> = T & { id: string };

export type Comp<T> = Partial<T> & { __component: string };

/**
 * Login
 */

export interface LoginResponse {
	jwt?: string;
	user: UsersPermissionsMe;
}

/**
 * Payment
 */

export interface PaymentDetails {
	category: string;
	title: string;
	price: number;
	paid: boolean;
	expiration: string;
	expired: boolean;
}

export interface PaymentBillingInfo {
	address: ComponentLocationAddress;
	data: Comp<BillingInfoDataDynamicZone>;
}

export enum PaymentCategories {
	course = "course",
}

/**
 * Billing options
 */

export const BillingOptions = ["me", "person", "company"] as const;

export type BillingOptions = typeof BillingOptions[number];

// Lista dei componenti per la zona dinamica
// Reference: strapi-backend/src/api/billing-info/content-types/billing-info/schema.json
export enum BillingOptionsComponents {
	Company = "billing.company",
	Person = "billing.person",
	Me = "billing.me",
}
