export interface BaseResponse {
    isSuccess: boolean;
    exception?: string;
    stackTrace?: string;
}

export interface PaginationData{
    pageNumber: number;
    pageSize: number;
}