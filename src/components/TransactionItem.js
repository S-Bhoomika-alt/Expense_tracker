import React from "react";
export const TransactionItem = ({ transaction, toggleSelect, isSelected, darkMode, onEdit }) => {
  const sign = transaction.amount < 0 ? "-" : "+";

  const textColor = transaction.amount < 0
    ? darkMode ? "text-red-400" : "text-red-500"
    : darkMode ? "text-green-400" : "text-green-500";

  return (
    <li
      className={`flex justify-between items-center p-2 rounded-xl
        ${transaction.amount < 0 ? "bg-red-50" : "bg-green-50"}
        ${darkMode ? "bg-gray-700" : ""} ${textColor}
         animate-wiggle hover:scale-105 transition-transform duration-200`}
      style={{ transformOrigin: "center" }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={toggleSelect}
        className={`${darkMode ? "accent-blue-400" : "accent-blue-600"} mr-2`}
      />

      <span>{transaction.text}</span>
      <span>{sign}&#8377;{Math.abs(transaction.amount)}</span>

      <button
        onClick={() => onEdit(transaction)}
        className="ml-2 px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
      >
        Edit
      </button>
    </li>
  );
};

export default TransactionItem;
