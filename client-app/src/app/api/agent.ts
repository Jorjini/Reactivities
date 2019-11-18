import axios, {AxiosResponse} from 'axios';
import {IActivity} from "../models/activity";

axios.defaults.baseURL = 'http://localhost:5000/api';
const responseBody = (response: AxiosResponse) => response.data;
const sleep = (ms: number) => (response: AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requets = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Activities = {
    list: (): Promise<IActivity []> => requets.get('/activities'),
    details: (id: string) => requets.get(`/activities/${id}`).then(sleep(1000)),
    create: (activity: IActivity) => requets.post('/activities', activity).then(sleep(1000)),
    update: (activity: IActivity) => requets.put(`/activities/${activity.id}`, activity).then(sleep(1000)),
    delete: (id: string) => requets.del(`/activities/${id}`).then(sleep(1000))
};

export default {
    Activities
};
