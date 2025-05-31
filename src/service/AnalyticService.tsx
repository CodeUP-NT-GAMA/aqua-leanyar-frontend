import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";

// GA4 Event Item
export interface GA4Item {
    item_id?: string;
    item_name?: string;
    item_brand?: string;
    item_category?: string;
    item_variant?: string;
    price?: number;
    quantity?: number;
    coupon?: string;
    currency?: string;
    affiliation?: string;
    discount?: number;
    index?: number;
    item_list_id?: string;
    item_list_name?: string;
    location_id?: string;
}

// GA4 Event Parameters
export interface GA4EventParams {
    items?: GA4Item[];
    transaction_id?: string;
    value?: number;
    currency?: string;
    tax?: number;
    shipping?: number;
    coupon?: string;
    payment_type?: string;
    shipping_tier?: string;
    affiliation?: string;
}

// GA4 Event
export interface GA4Event {
    name: string;
    params: GA4EventParams;
}

export interface GA4EventResponse {
    error: string;
    result: string;
}

interface Product {
    product_id: number
    product_name: string
    product_price: number
    quantity: number
    type: string
    createdAt: string
    updatedAt: string
    ProductTypeId: number
    ProductMedia: ProductMedia[]
    ProductType: ProductType
}

interface ProductMedia {
    id: number
    type: string
    createdAt: string
    updatedAt: string
    ProductProductId: number
    MediaId: string
}

interface ProductType {
    id: number
    description: string
    icon: string
    createdAt: string
    updatedAt: string
}


function buildItems(products: Product[]) {

    let items: GA4Item[] = []

    products.forEach(product => {
        items.push({
            item_category: product.ProductType.description,
            item_id: product.product_id.toString(),
            item_name: product.product_name,
            price: product.product_price,
            quantity: 1,
            currency: 'AUD'
        })
    })

    return items;

}

function buildEvent(action: string, products: Product[]) {

    return {
        name: action,
        params: {
            items: buildItems(products)
        }
    };
}

export class AnalyticService {

    static viewProductEvent(token: string, product: Product): Promise<AxiosResponse<GA4EventResponse>> {
        return axiosInstance.post<GA4EventResponse>("/analytics", buildEvent('view_item', Array.of(product)), {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        })
    }

    static addToCartEvent(token: string, product: Product): Promise<AxiosResponse<GA4EventResponse>> {
        return axiosInstance.post<GA4EventResponse>("/analytics", buildEvent('add_to_cart', Array.of(product)), {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        })
    }

    static removeItemCartEvent(token: string, product: Product): Promise<AxiosResponse<GA4EventResponse>> {
        return axiosInstance.post<GA4EventResponse>("/analytics", buildEvent('remove_from_cart', Array.of(product)), {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        })
    }


}