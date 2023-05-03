import axios, { type AxiosResponse } from 'axios';
import { ElNotification } from 'element-plus';

export interface Result {
  success: boolean,
  msg?: string,
  data?: any,
  total?: number
}

export const instance = axios.create({
  timeout: 10000,
});

instance.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.success) {
    return response.data;
  }
  return Promise.reject(response.data);
}, err => {
  ElNotification({
    title: '请求失败',
    message: err.message,
    type: 'error',
  })
  return Promise.reject(err)
})



export function get(url: string, params?: any): Promise<Result> {
  return instance.get(url, { params });
}

export function post(url: string, params?: any): Promise<Result> {
  return instance.post(url, { params });
}