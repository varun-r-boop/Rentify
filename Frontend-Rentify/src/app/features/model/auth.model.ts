export interface UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    email: string;
    mobile: string;
    password: string;
    profileLogoUrl: string;
    isEmailVerified: boolean;
}

export interface Login {
    email: string;
    password: string
}

export enum UserType {
    Buyer,
    Seller
}

const Direction = {
    Buyer: 0,
    Seller: 1,
};