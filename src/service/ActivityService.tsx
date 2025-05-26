import {axiosInstance} from "@/utils/backend";
import {AxiosResponse} from "axios";

interface ActivityResponse {
    error: boolean
    result: Result
}

interface Result {
    data: Activity[]
    pagination: Pagination
}

interface Activity {
    id: number
    name: string
    short_name: string
    description: string
    sort_order: number
    type: string
    createdAt: string
    updatedAt: string
    ActivityMedia: ActivityMedia[]
}

interface ActivityMedia {
    id: number
    type: string
    createdAt: string
    updatedAt: string
    ActivityId: number
    MediaId: string
}

interface Pagination {
    total_records: number
    total_per_page: number
    total_pages: number
    current_page: number
    next_page: number
    previous_page: any
}


export class ActivityService {

    static getActivities(token: string, page: number): Promise<AxiosResponse<ActivityResponse>> {
        return axiosInstance.get<ActivityResponse>("/activities", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            params: {
                "page": page
            }
        })
    }

}