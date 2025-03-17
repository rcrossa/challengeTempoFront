'use client';
import React, { useEffect, useState } from 'react';
import { getTransactions, addTransaction, deleteTransaction, editTransaction } from '@/services/transaction';
import { Transaction } from '@/types/transaction';
import TransactionTable from '@/components/transactionTable/TransactionTable';
import TransactionForm from '@/components/transactionForm/TransactionForm';
import PanelHeader from '@/components/panelheader/Panelheader';
import './panel.css';

const Panel = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState<Transaction>({ id: 0, amount: 0, clientName: '', merchant: '', transactionDate: '' });
  const [errors, setErrors] = useState({ amount: '', clientName: '', merchant: '', transactionDate: '', form: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await getTransactions();
        setTransactions(transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = { amount: '', clientName: '', merchant: '', transactionDate: '', form: '' };
    if (!form.amount) newErrors.amount = 'Amount is required';
    if (!form.clientName) newErrors.clientName = 'Client Name is required';
    if (!form.merchant) newErrors.merchant = 'Merchant is required';
    if (!form.transactionDate) newErrors.transactionDate = 'Transaction Date is required';
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        await editTransaction(form);
        setTransactions(transactions.map(t => (t.id === form.id ? form : t)));
      } else {
        const newTransaction = { ...form };
        const addedTransaction = await addTransaction(newTransaction);
        setTransactions([...transactions, addedTransaction]);
      }
      setForm({ id: 0, amount: 0, clientName: '', merchant: '', transactionDate: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ ...errors, form: (error as Error).message });
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setForm(transaction);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="panel">
      <PanelHeader />
      <TransactionForm
        form={form}
        errors={errors}
        isEditing={isEditing}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <div>
        {loading ? (
          'Loading...'
        ) : (
          <TransactionTable
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Panel;