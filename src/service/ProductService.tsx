import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";

export interface ProductResponse {
    error: boolean;
    result: Result;
}

export interface SingleProductResponse {
    error: boolean;
    result: Product;
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

    static async getProduct(token : string, id : number): Promise<AxiosResponse<SingleProductResponse>>  {
        return axiosInstance.get<SingleProductResponse>("/products/id", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            params: {
                "id": id,
            }
        })
    }

    static async searchProduct(
        token: string,
        params: {
            types?: string | null;
            page?: number;
            page_size?: number;
            name?: string;
            start_price?: number;
            end_price?: number;
            in_stock?: string;
          }
    ): Promise<AxiosResponse<ProductResponse>> {
        return axiosInstance.get<ProductResponse>("/products/search", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            params: {
                types: params.types ?? undefined,
                page: params.page ?? 1,
                size: params.page_size ?? 12,
                name: params.name,
                start_price: params.start_price,
                end_price: params.end_price,
                in_stock: params.in_stock,
              }
        })
    }
}