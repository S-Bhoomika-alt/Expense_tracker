
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";


export const Balance = ({ darkMode }) => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(t => t.amount);
  const balance = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  return (
    <div className="text-center mb-2">
      <h4 className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Your Balance</h4>
      <h1 className="text-2xl font-bold">&#8377;{balance}</h1>
    </div>
  );
};

export default Balance;

