import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";

interface IHostedResponse extends AxiosResponse {
    client_secret: string,
    url: string
}

interface IIntendResponse extends AxiosResponse {
    paymentIntent: string,
    ephemeralKey: string,
    customer: string
}


export class CheckoutService {

    static createHostedSession(token: string): Promise<AxiosResponse<IHostedResponse>> {
        return axiosInstance.get<IHostedResponse>("/checkout/hosted", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
        });
    }

    static createPaymentIntend(token: string): Promise<AxiosResponse<IIntendResponse>> {
        return axiosInstance.get<IIntendResponse>("/checkout/intend", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
        });
    }

}