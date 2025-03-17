import { AxiosError } from 'axios';
import { ErrorData } from '../services/api';

export const handleError = (error: AxiosError): ErrorData => {
  const errorData: ErrorData = {
    message: error.message,
    status: error.response ? error.response.status : 'Network Error',
    data: error.response ? error.response.data : null,
  };
  return errorData;
};