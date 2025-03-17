/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.response.use(
  response => response,
  error => {
    const errorData = {
      message: error.message,
      status: error.response ? error.response.status : 'Network Error',
      data: error.response ? error.response.data : null,
    };

    handleFormErrors(errorData);

    return Promise.reject(error);
  }
);

export interface ErrorData {
    message: string;
    status: number | string;
    data: any;
}

export function handleFormErrors(errorData: ErrorData): ErrorData {
    const { data } = errorData;
    console.error('Error:', data.message);
    console.error('Status:', data.status);
    return errorData.data;
}

export default api;
