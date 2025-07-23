import React from "react";
import CircularProgressBar from "../../components/CircularProgressBar";
import LineProgressBar from "../../components/LineProgressBar";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Analytics = ({ transactions }) => {
  const totalCount = transactions.length;
  const incomeTx = transactions.filter((t) => t.transactionType === "credit");
  const expenseTx = transactions.filter((t) => t.transactionType === "expense");

  const incomeCount = incomeTx.length;
  const expenseCount = expenseTx.length;
  const incomePct = ((incomeCount / totalCount) * 100).toFixed(0);
  const expensePct = ((expenseCount / totalCount) * 100).toFixed(0);

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const incomeAmount = incomeTx.reduce((sum, t) => sum + t.amount, 0);
  const expenseAmount = expenseTx.reduce((sum, t) => sum + t.amount, 0);

  const incomeAmountPct = ((incomeAmount / totalAmount) * 100).toFixed(0);
  const expenseAmountPct = ((expenseAmount / totalAmount) * 100).toFixed(0);

  const categories = ["Groceries", "Rent", "Salary", "Tip", "Food", "Medical", "Utilities", "Entertainment", "Transportation", "Other"];
  const colors = {
    Groceries: "#FF6384", Rent: "#36A2EB", Salary: "#FFCE56",
    Tip: "#4BC0C0", Food: "#9966FF", Medical: "#FF9F40",
    Utilities: "#8AC926", Entertainment: "#6A4C93",
    Transportation: "#1982C4", Other: "#F45B69",
  };

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-200">
        {/* Total Transactions */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-lg mb-2">Total Transactions</h3>
          <p className="text-green-400 flex items-center mb-1">
            <ArrowDropUpIcon /> Income: {incomeCount}
          </p>
          <p className="text-red-400 flex items-center mb-4">
            <ArrowDropDownIcon /> Expense: {expenseCount}
          </p>
          <div className="flex justify-center gap-4">
            <CircularProgressBar percentage={incomePct} color="green" />
            <CircularProgressBar percentage={expensePct} color="red" />
          </div>
        </div>

        {/* Total Turnover */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-lg mb-2">Total Turnover</h3>
          <p className="text-green-400 flex items-center mb-1">
            <ArrowDropUpIcon /> {incomeAmount} <CurrencyRupeeIcon className="ml-1" />
          </p>
          <p className="text-red-400 flex items-center mb-4">
            <ArrowDropDownIcon /> {expenseAmount} <CurrencyRupeeIcon className="ml-1" />
          </p>
          <div className="flex justify-center gap-4">
            <CircularProgressBar percentage={incomeAmountPct} color="green" />
            <CircularProgressBar percentage={expenseAmountPct} color="red" />
          </div>
        </div>

        {/* Category-wise Income */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-md overflow-y-auto max-h-[400px]">
          <h3 className="font-bold text-lg mb-3">Category-wise Income</h3>
          {categories.map((cat) => {
            const sum = incomeTx.filter((i) => i.category === cat).reduce((a, i) => a + i.amount, 0);
            if (!sum) return null;
            const pct = ((sum / totalAmount) * 100).toFixed(0);
            return (
              <LineProgressBar key={cat} label={cat} percentage={pct} lineColor={colors[cat]} />
            );
          })}
        </div>

        {/* Category-wise Expense */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-md overflow-y-auto max-h-[400px]">
          <h3 className="font-bold text-lg mb-3">Category-wise Expense</h3>
          {categories.map((cat) => {
            const sum = expenseTx.filter((i) => i.category === cat).reduce((a, i) => a + i.amount, 0);
            if (!sum) return null;
            const pct = ((sum / totalAmount) * 100).toFixed(0);
            return (
              <LineProgressBar key={cat} label={cat} percentage={pct} lineColor={colors[cat]} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
