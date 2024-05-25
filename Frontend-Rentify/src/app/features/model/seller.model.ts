import { BaseResponse } from "./common.model";

export interface PropertyEntity {
    id: string;
    userId: string;
    place: string;
    area: number;
    info: string;
    image: string;
    contact :ContactDetails;
    intrestedUserIds: string[];
}

export interface Property extends BaseResponse{
    id: string;
    place: string;
    area: number;
    info: string;
    image: string;
    contact :ContactDetails;
    intrestedUserIds : string[];
}

export interface ContactDetails{
    mobile: string ;
    email: string;
}