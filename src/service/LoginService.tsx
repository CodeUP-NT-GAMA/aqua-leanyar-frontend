import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";

interface ILoginResponse extends AxiosResponse {
    token: string;
}

export class LoginService {

    static login(email: string, password: string): Promise<AxiosResponse<ILoginResponse>> {

        return axiosInstance.post<ILoginResponse>("/api/login",
            {
                email: email,
                password: password
            });
    }

    static register(email: string, firstName: string, lastName: string, password: string, phone: string): Promise<AxiosResponse<ILoginResponse>> {

        return axiosInstance.post<ILoginResponse>("/users",
            {
                username: email,
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName
            });


    }

}