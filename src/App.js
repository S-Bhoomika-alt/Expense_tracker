import React, { useContext, useState } from "react";
import { Balance } from "./components/Balance";
import { IncomeExpense } from "./components/IncomeExpense";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";
import { GlobalContext } from "./context/GlobalContext";
import "./style.css";

export const App = () => {
  const { resetTransactions } = useContext(GlobalContext);
  const [darkMode, setDarkMode] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const startEditing = (transaction) => {
    setEditingTransaction(transaction);
  };
  const clearEditing = () => {
    setEditingTransaction(null);
  };
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6
                ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h2 className="text-3xl font-bold text-blue-600 mb-2">Expense Tracker</h2>

      <div
        className={`w-full max-w-4xl rounded-xl p-6 space-y-4
                  ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >


        <Balance darkMode={darkMode} />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-6 px-4 py-2 rounded font-bold transition-colors duration-300
             bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="animate-fadeIn">
          <IncomeExpense darkMode={darkMode} />
        </div>

        <div className="animate-fadeIn">
          <AddTransaction
            darkMode={darkMode}
            editingTransaction={editingTransaction}
            clearEditing={clearEditing}
          />
        </div>

        <button
          onClick={resetTransactions}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 transform hover:scale-105"
        >
          Reset Transactions
        </button>

        <div className="animate-fadeIn">
          <TransactionList darkMode={darkMode} startEditing={startEditing} />
        </div>

        {/* <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; 2024 Expense Tracker. All rights reserved.
        </div> */}
      </div>
    </div>
  );
};

export default App;
