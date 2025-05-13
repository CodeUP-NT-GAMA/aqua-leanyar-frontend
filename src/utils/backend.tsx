import {default as axios} from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://express:3000/',
    timeout: 999999,
    headers: {'X-Custom-Header': 'App Calling'}
});
