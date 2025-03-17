import { fetchTransactions, createTransaction, updateTransaction, removeTransaction } from './apiService';
import { handleError } from '../utils/errorHandler';
import { Transaction } from '../types/transaction';
import { AxiosError } from 'axios';

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    return await fetchTransactions();
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error fetching transactions:', axiosError.message);
    throw handleError(axiosError);
  }
};

export const addTransaction = async (transaction: Transaction): Promise<Transaction> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...transactionData } = transaction;
  try {
    return await createTransaction(transactionData);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error adding transaction:', axiosError.message);
    throw handleError(axiosError);
  }
};

export const editTransaction = async (transaction: Transaction): Promise<Transaction> => {
  try {
    return await updateTransaction(transaction);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error editing transaction:', axiosError.message);
    throw handleError(axiosError);
  }
};

export const deleteTransaction = async (id: number): Promise<void> => {
  try {
    await removeTransaction(id);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};