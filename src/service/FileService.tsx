import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";


export class FileService {

    static buildURI(fileId: string): string {

        const params = {
            id: fileId
        };

        const config = {
            url: "/files",
            method: "GET",
            params: params
        }
        return axiosInstance.getUri(config);
    }

}