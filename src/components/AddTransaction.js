import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const AddTransaction = ({ darkMode, editingTransaction, clearEditing }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("Please fill in all fields");
  const { addTransaction, updateTransaction, transactions } = useContext(GlobalContext);
  const balance = transactions
    .map(t => t.amount)
    .reduce((acc, item) => acc + item, 0);

  useEffect(() => {
    if (editingTransaction) {
      setText(editingTransaction.text);
      setAmount(Math.abs(editingTransaction.amount));
      setType(editingTransaction.amount >= 0 ? "expense" : "expense");
    }
  }, [editingTransaction]);

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      setError("Please enter a description");
      return;
    }
    if (!amount || +amount <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    const finalAmount = type === "expense" ? -Math.abs(+amount) : +amount;

    if (!editingTransaction && finalAmount < 0 && balance + finalAmount < 0) {
      setError("Warning: Expense exceeds current balance!");
      return;
    }

    const newTransaction = editingTransaction
      ? { ...editingTransaction, text, amount: finalAmount }
      : { id: Math.floor(Math.random() * 1000000), text, amount: finalAmount };

    if (editingTransaction) {
      updateTransaction(newTransaction);
      clearEditing(); 
    } else {
      addTransaction(newTransaction);
    }

    setText("");
    setAmount("");
    setType("expense");
    setError("");
  };

  return (
    <div className={`${darkMode ? "text-white" : "text-gray-900"}`}>
      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
        {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label>Text</label>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter text..."
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
              }`}
          />
        </div>

        <div>
          <label>Amount</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
              }`}
          />
        </div>

        <div className="flex space-x-4">
          <label className="flex items-center">
            <input type="radio" value="income" checked={type === "income"}
              onChange={e => setType(e.target.value)}
              className="mr-1"
            />
            Income
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              onChange={e => setType(e.target.value)}
              className="mr-1"
            />
            Expense
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className={`w-full font-bold py-2 px-4 rounded transition-colors duration-300 transform hover:scale-105 ${darkMode ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          {editingTransaction ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
    </div>
  );
};
export default AddTransaction;
