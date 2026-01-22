
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const IncomeExpense = ({darkMode}) => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(t => t.amount);
  const income = amounts.filter(a => a > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const expense = amounts.filter(a => a < 0).reduce((acc, item) => acc + item, 0).toFixed(2);

  return (
    <div className={`flex justify-between p-4 rounded shadow
                ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
  <div className={`text-center w-1/2 mx-auto ${darkMode ? "text-white" : "text-black"}`}>
    <h4>Income</h4>
    <p className="text-green-500 font-bold">&#8377;{income}</p>
  </div>
  <div className={`text-center w-1/2 mx-auto border-l border-black ${darkMode ? "text-white" : "text-black"}`}>
    <h4>Expense</h4>
    <p className="text-red-500 font-bold">&#8377;{Math.abs(expense)}</p>
  </div>
</div>

  );
};

export default IncomeExpense;