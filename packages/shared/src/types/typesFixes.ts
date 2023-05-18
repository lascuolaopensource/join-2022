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

/**
 * Roles
 */

export enum UserPermissionRoles {
    Public = "public",
    Authenticated = "authenticated",
    AdminEnrollments = "admin_enrollments",
    AdminTools = "admin_tools",
}
