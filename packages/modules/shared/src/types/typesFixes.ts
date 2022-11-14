import { Enum_Enrollment_State, Payment } from "./types";

/**
 * Adds ID to any interface
 */

export type ID<T> = T & { id: string };

/**
 * Cleans a component interface from keys: __typename and ID
 */

export type CleanComp<T> = Omit<T, "id" | "__typename">;

/**
 * Adds confirmation code to Payment keys
 */

export interface PaymentC extends Payment {
	confirmationCode: string;
}

/**
 * Collects useful payment data to display to the user
 */

export interface PaymentDetails {
	category: string;
	title: string;
	price: number;
	executed: boolean;
	deadline: string;
	expired: boolean;
	owner: {
		name: string;
		surname: string;
		email: string;
	};
}

export enum PaymentCategories {
	course = "course",
}

/**
 * Enrollment states, as list
 */

export const EnrollmentStates = Object.values(Enum_Enrollment_State);

// import {
// 	UsersPermissionsMe,
// 	ComponentLocationAddress,
// 	BillingInfoDataDynamicZone,
// 	Payment,
// } from "./types";

// export type Comp<T> = Partial<T> & { __component: string };

// /**
//  * Login
//  */

// export interface LoginResponse {
// 	jwt?: string;
// 	user: UsersPermissionsMe;
// }

// /**
//  * Payment
//  */

// export interface PaymentC extends Payment {
// 	confirmCode: string;
// }

// export interface PaymentBillingInfo {
// 	address: ComponentLocationAddress;
// 	data: Comp<BillingInfoDataDynamicZone>;
// }

// /**
//  * Billing options
//  */

// // Lista dei componenti per la zona dinamica
// // Reference: strapi-backend/src/api/billing-info/content-types/billing-info/schema.json
// export enum BillingOptionsComponents {
// 	Company = "billing.company",
// 	Person = "billing.person",
// 	Me = "billing.me",
// }

// /**
//  * Roles
//  */

// export enum UserPermissionRoles {
// 	Public = "public",
// 	Authenticated = "authenticated",
// 	AdminEnrollments = "admin_enrollments",
// 	AdminTools = "admin_tools",
// }
