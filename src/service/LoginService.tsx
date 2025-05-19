import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";

interface ILoginResponse extends AxiosResponse {
    token: string;
}

interface IRegisterResponse extends AxiosResponse {
    message: string;
}

export class LoginService {

    static login(email: string, password: string): Promise<AxiosResponse<ILoginResponse>> {

        return axiosInstance.post<ILoginResponse>("/api/login",
            {
                email: email,
                password: password
            });
    }

    static register(fName: string, lName: string, email: string, password: string): Promise<AxiosResponse<IRegisterResponse>> {

        return axiosInstance.post<IRegisterResponse>("/users",
            {
                username: email,
                email: email,
                password: password,
                first_name: fName,
                last_name: lName
            });


    }

}