import { Timestamp } from "firebase-admin/firestore";

export interface UserInterface {
    name?: string;
    email: string;
    customerId: string;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
    subscriptionPlan?: string;
    domains?: string[];
    isActive: boolean;
}

export interface NavigationInterface {
    name: string;
    href: string;
    current: boolean;
}

export interface SubscriptionPlanInterface {
    name: string;
    price: number;
    websiteStorageLimit: number;
    emailStorageLimit: number;
    domainsLimit: number;
    features: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface DomainInterface {
    domainName: string;
    userId: string;
    status: string;
    hostingPlan: string;
    dns: { [key: string]: string };
    createdAt: Timestamp;
    updatedAt: Timestamp;
}