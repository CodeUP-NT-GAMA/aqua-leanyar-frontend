import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";

export interface ProductResponse {
    error: boolean;
    result: Result;
}

export interface Result {
    data: Product[];
    pagination: Pagination;
}

export interface Product {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    ProductTypeId: number;
    ProductMedia: ProductMedia[];
}

export interface ProductMedia {
    id: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    ProductProductId: number;
    MediaId: string;
}

export interface Pagination {
    total_records: number;
    total_per_page: number;
    total_pages: number;
    current_page: number;
    next_page: number | null;
    previous_page: number | null;
}

export interface ProductType {
    id: number;
    description: string;
    icon: string;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
}

export interface ProductTypeResponse {
    error: boolean;
    result: ProductType[];
}

export class ProductService {

    static getProducts(token: string, page: number, page_size: number): Promise<AxiosResponse<ProductResponse>> {
        return axiosInstance.get<ProductResponse>("/products", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            params: {
                "page": page,
                "size": page_size
            }
        })
    }

    static getProductTypes(token: string, page: number, page_size: number): Promise<AxiosResponse<ProductTypeResponse>> {
        return axiosInstance.get<ProductTypeResponse>("/products/types", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            params: {
                "page": page,
                "size": page_size
            }
        })
    }

}