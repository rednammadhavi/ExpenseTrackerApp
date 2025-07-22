import React from "react";
import { Container, Row } from "react-bootstrap";
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
    <Container className="mt-6">
      <Row className="flex flex-wrap gap-6 text-gray-200">
        {/* Count Card */}
        <div className="bg-gray-800 rounded-lg p-4 w-full sm:w-1/2 lg:w-1/4">
          <h3 className="font-bold mb-2">Total Transactions</h3>
          <p className="mb-1 text-green-400 flex items-center">
            <ArrowDropUpIcon /> Income: {incomeCount}
          </p>
          <p className="mb-4 text-red-400 flex items-center">
            <ArrowDropDownIcon /> Expense: {expenseCount}
          </p>
          <div className="flex justify-center space-x-4">
            <CircularProgressBar percentage={incomePct} color="green" />
            <CircularProgressBar percentage={expensePct} color="red" />
          </div>
        </div>

        {/* Turnover Card */}
        <div className="bg-gray-800 rounded-lg p-4 w-full sm:w-1/2 lg:w-1/4">
          <h3 className="font-bold mb-2">Total Turnover</h3>
          <p className="mb-1 text-green-400 flex items-center">
            <ArrowDropUpIcon /> {incomeAmount} <CurrencyRupeeIcon />
          </p>
          <p className="mb-4 text-red-400 flex items-center">
            <ArrowDropDownIcon /> {expenseAmount} <CurrencyRupeeIcon />
          </p>
          <div className="flex justify-center space-x-4">
            <CircularProgressBar percentage={incomeAmountPct} color="green" />
            <CircularProgressBar percentage={expenseAmountPct} color="red" />
          </div>
        </div>

        {/* Category-wise Income */}
        <div className="bg-gray-800 rounded-lg p-4 w-full lg:w-1/4">
          <h3 className="font-bold mb-2">Category-wise Income</h3>
          {categories.map((cat) => {
            const sum = incomeTx.filter((i) => i.category === cat).reduce((a, i) => a + i.amount, 0);
            if (!sum) return null;
            const pct = ((sum / totalAmount) * 100).toFixed(0);
            return <LineProgressBar key={cat} label={cat} percentage={pct} lineColor={colors[cat]} />;
          })}
        </div>

        {/* Category-wise Expense */}
        <div className="bg-gray-800 rounded-lg p-4 w-full lg:w-1/4">
          <h3 className="font-bold mb-2">Category-wise Expense</h3>
          {categories.map((cat) => {
            const sum = expenseTx.filter((i) => i.category === cat).reduce((a, i) => a + i.amount, 0);
            if (!sum) return null;
            const pct = ((sum / totalAmount) * 100).toFixed(0);
            return <LineProgressBar key={cat} label={cat} percentage={pct} lineColor={colors[cat]} />;
          })}
        </div>
      </Row>
    </Container>
  );
};

export default Analytics;
