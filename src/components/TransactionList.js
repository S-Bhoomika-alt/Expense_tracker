
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { TransactionItem } from "./TransactionItem";

export const TransactionList = ({ darkMode, startEditing }) => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteSelected = () => {
    selectedIds.forEach(id => deleteTransaction(id));
    setSelectedIds([]);
  };

  return (
    <div className={`${darkMode ? "text-white" : "text-gray-900"}`}>
      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
        History
      </h3>

      {selectedIds.length > 0 && (
        <button
          onClick={deleteSelected}
          className="mb-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete Selected transactions
        </button>
      )}

      <ul className="divide-y divide-gray-200">
        {transactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            toggleSelect={() => toggleSelect(transaction.id)}
            isSelected={selectedIds.includes(transaction.id)}
            darkMode={darkMode}
            onEdit={startEditing} 
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
