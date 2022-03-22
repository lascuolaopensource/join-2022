import { UsersPermissionsMe, ComponentLocationAddress, BillingInfoDataDynamicZone } from "./types";
export declare type ID<T> = T & {
    id: string;
};
export declare type Comp<T> = Partial<T> & {
    __component: string;
};
export interface LoginResponse {
    jwt?: string;
    user: UsersPermissionsMe;
}
export interface PaymentDetails {
    category: string;
    title: string;
    price: number;
}
export interface PaymentBillingInfo {
    address: ComponentLocationAddress;
    data: Comp<BillingInfoDataDynamicZone>;
}
export declare enum PaymentCategories {
    course = "course"
}
