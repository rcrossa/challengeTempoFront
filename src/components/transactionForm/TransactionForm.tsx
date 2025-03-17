import React from 'react';
import { Transaction } from '@/types/transaction';

interface TransactionFormProps {
  form: Transaction;
  errors: { amount: string; clientName: string; merchant: string; transactionDate: string; form: string };
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ form, errors, isEditing, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Amount
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={onChange}
          placeholder="Amount"
          required
        />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </label>
      <label>
        Merchant
        <input
          type="text"
          name="merchant"
          value={form.merchant}
          onChange={onChange}
          placeholder="Merchant"
          required
        />
        {errors.merchant && <span className="error">{errors.merchant}</span>}
      </label>
      <label>
        Client Name
        <input
          type="text"
          name="clientName"
          value={form.clientName}
          onChange={onChange}
          placeholder="Client Name"
          required
        />
        {errors.clientName && <span className="error">{errors.clientName}</span>}
      </label>
      <label>
        Transaction Date
        <input
          type="date"
          name="transactionDate"
          value={form.transactionDate}
          onChange={onChange}
          required
        />
        {errors.transactionDate && <span className="error">{errors.transactionDate}</span>}
      </label>
      <div className="form-error">
        {errors.form && <div className="error error-form">{errors.form}</div>}
      </div>
      <div className="form-submit">
        <button type="submit">{isEditing ? 'Edit' : 'Add'} Transaction</button>
      </div>
    </form>
  );
};

export default TransactionForm;