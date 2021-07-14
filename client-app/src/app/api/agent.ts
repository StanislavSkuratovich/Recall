import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}
// axios.interceptors.response.use(response=>{
//   return sleep(4000).then(()=>{
//     return response;
//   }).catch((error)=>{
//     console.log(error);
//     return Promise.reject(error);
//   })
// })

axios.interceptors.response.use(async response => {
  try {
    await sleep(4000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
})

axios.defaults.baseURL = 'http://localhost:5000/api';

const responceBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responceBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responceBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responceBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responceBody)
}

const Activities = {
  list: () => request.get<Activity[]>('/activities'),
  detauls: (id: string) => request.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => axios.post<void>('/activities', activity),
  update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
  Activities
}

export default agent;