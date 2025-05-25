import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";

interface CartResponse extends AxiosResponse {
    error: boolean
    result: Result
}

interface Result {
    cart: Cart
    items: Item[]
}

interface Cart {
    id: number
    type: string
    status: string
    stripe_intent: string
    createdAt: string
    updatedAt: string
    UserUsername: string
}

interface Item {
    id: number
    quantity: number
    createdAt: string
    updatedAt: string
    CartId: number
    ProductProductId: number
    Product: Product
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


export class CartService {

    static addToCart(token: string, productId: number, quantity: number): Promise<AxiosResponse<CartResponse>> {
        return axiosInstance.post<CartResponse>("/cart", {}, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            params: {
                quantity: quantity,
                product_id: productId,
            }
        })
    }

}