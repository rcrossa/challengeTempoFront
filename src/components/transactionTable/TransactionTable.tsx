import React from 'react';
import { Transaction } from '@/types/transaction';
import './transactionTable.css';

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onEdit, onDelete }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Client Name</th>
            <th>Merchant</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: Transaction) => (
            <tr key={transaction.id} className="transaction-row">
              <td data-label="ID">{transaction.id}</td>
              <td data-label="Amount">{transaction.amount}</td>
              <td data-label="Client Name">{transaction.clientName}</td>
              <td data-label="Merchant">{transaction.merchant}</td>
              <td data-label="Date">{transaction.transactionDate}</td>
              <td data-label="Actions">
                <div className="button-container">
                  <button className="edit-button" onClick={() => onEdit(transaction)}>✏️ Edit</button>
                  <button className="delete-button" onClick={() => onDelete(transaction.id)}>🗑️ Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;