import React, { useState } from 'react';
import './PerPersonHisaab.css';

const PerPersonHisaab = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: '', amount: '', date: '' }
  ]);

  // Add new row
  const handleAddRow = () => {
    const newRow = {
      id: expenses.length + 1,
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses([...expenses, newRow]);
  };

  // Delete row
  const handleDeleteRow = (id) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter(row => row.id !== id));
    }
  };

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setExpenses(expenses.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  // Calculate total amount
  const calculateTotal = () => {
    return expenses.reduce((sum, row) => {
      const amount = parseFloat(row.amount) || 0;
      return sum + amount;
    }, 0);
  };

  return (
    <div className="expense-container">
      <h2>Expense Tracker</h2>
      
      <div className="table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Description</th> */}
              <th>Amount (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            {expenses.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="Name"
                    value={row.Name}
                    onChange={(e) => handleInputChange(row.id, 'date', e.target.value)}
                    className="Name-input"
                  />
                </td>
                {/* <td>
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) => handleInputChange(row.id, 'description', e.target.value)}
                    placeholder="Enter description"
                    className="description-input"
                  />
                </td> */}
                <td>
                  <input
                    type="number"
                    value={row.amount}
                    onChange={(e) => handleInputChange(row.id, 'amount', e.target.value)}
                    placeholder="0.00"
                    className="amount-input"
                  />
                </td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          
          <tfoot>
            <tr>
              <td colSpan="2" className="total-label">Total Amount:</td>
              <td className="total-amount">₹{calculateTotal().toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button className="add-row-btn" onClick={handleAddRow}>
        Add New Expense
      </button>
    </div>
  );
};

export default PerPersonHisaab;