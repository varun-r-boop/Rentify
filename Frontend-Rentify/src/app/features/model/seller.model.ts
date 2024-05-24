import { BaseResponse } from "./common.model";

export interface PropertyEntity {
    id: string;
    userId: string;
    place: string;
    area: number;
    info: string;
    image: any;
}

export interface Property extends BaseResponse{
    place: string;
    area: number;
    info: string;
    image: string;
}