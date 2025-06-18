import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";

interface PurchaseHistoryResponse extends AxiosResponse {
    error: boolean
    result: Result
}

export interface Result {
    data: History[]
    pagination: Pagination
}

export interface History {
    id: number
    transaction_id: string
    order_status: string
    stripe_intent: string
    createdAt: string
    updatedAt: string
    UserUsername: string
    PurchaseItems: PurchaseItem[]
}

export interface PurchaseItem {
    id: number
    product_name: string
    qty: number
    unit_price: number
    media_image: string
    createdAt: string
    updatedAt: string
    PurchaseHistoryId: number
}

export interface Pagination {
    total_records: number
    total_per_page: number
    total_pages: number
    current_page: number
    next_page: any
    previous_page: any
}

export class PurchaseHistoryService {

    static getPurchases(token: string, pageNumber: number, pageSize: number): Promise<AxiosResponse<PurchaseHistoryResponse>> {
        return axiosInstance.get<PurchaseHistoryResponse>("/purchase", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        })
    }

    static getPurchaseById(token: string, id: number): Promise<AxiosResponse<PurchaseHistoryResponse>> {
        return axiosInstance.get<PurchaseHistoryResponse>("/purchase/id", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            params: {
                id: id
            }
        })
    }

}