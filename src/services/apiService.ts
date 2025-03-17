import api from './api';
import { AxiosError } from 'axios';
import { Transaction } from '../types/transaction';

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get('/transactions');
    if (!Array.isArray(response.data)) {
      return response.data.data;
    } else {
      throw new Error('Response data is not an array');
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const createTransaction = async (transactionData: Omit<Transaction, 'id'>): Promise<Transaction> => {
  try {
    const response = await api.post('/transactions', transactionData);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const updateTransaction = async (transaction: Transaction): Promise<Transaction> => {
  try {
    const response = await api.put(`/${transaction.id}`, transaction);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const removeTransaction = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
};