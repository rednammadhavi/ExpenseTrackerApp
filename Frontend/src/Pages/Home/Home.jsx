import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../../components/Spinner";
import TableData from "./TableData";
import Analytics from "./Analytics";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";

const Home = () => {
  const navigate = useNavigate();
  const toastOpts = {
    position: "bottom-right", autoClose: 2000, theme: "dark"
  };

  const [cUser, setCUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "", amount: "", description: "", category: "", date: "", transactionType: ""
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return navigate("/login");
    const usr = JSON.parse(stored);
    if (!usr.isAvatarImageSet) return navigate("/setAvatar");
    setCUser(usr);
    setRefresh(true);
  }, [navigate]);

  useEffect(() => {
    if (!cUser) return;

    (async () => {
      setLoading(true);

      const {
        data
      } = await axios.post(getTransactions, {
        userId: cUser._id,
        frequency,
        startDate,
        endDate,
        type,
      });
      setTransactions(data.transactions);
      setLoading(false);
    })();
  }, [cUser, refresh, frequency, type, startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = Object.values(form).some((v) => !v);
    if (missing) return toast.error("Enter all fields", toastOpts);
    setLoading(true);

    const {
      data
    } = await axios.post(addTransaction, {
      ...form, userId: cUser._id
    });

    data.success ? toast.success(data.message, toastOpts) : toast.error(data.message, toastOpts);
    setLoading(false);
    setShowModal(false);
    setRefresh(!refresh);
  };

  const resetFilters = () => {
    setFrequency("7");
    setType("all");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="min-h-screen text-gray-200 px-2 sm:px-4">
      <div className="py-4 space-y-6">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* Filters & Controls */}
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[140px]">
                <label className="block mb-1">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full bg-gray-800 text-gray-200 p-2 rounded"
                >
                  <option value="7">Last Week</option>
                  <option value="30">Last Month</option>
                  <option value="365">Last Year</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-gray-800 text-gray-200 p-2 rounded"
                >
                  <option value="all">All</option>
                  <option value="expense">Expense</option>
                  <option value="credit">Earned</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <FormatListBulletedIcon
                  className={`p-2 rounded cursor-pointer ${view === "table" ? "bg-gray-700" : ""}`}
                  onClick={() => setView("table")}
                />
                <BarChartIcon
                  className={`p-2 rounded cursor-pointer ${view === "chart" ? "bg-gray-700" : ""}`}
                  onClick={() => setView("chart")}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                  onClick={() => setShowModal(true)}
                >
                  Add New
                </button>
                <button
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Custom Date Range */}
            {frequency === "custom" && (
              <div className="flex flex-wrap gap-4 items-center">
                <div className="min-w-[160px]">
                  <label className="block mb-1">Start Date:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full bg-gray-800 text-gray-200 p-2 rounded"
                  />
                </div>
                <div className="min-w-[160px]">
                  <label className="block mb-1">End Date:</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    className="w-full bg-gray-800 text-gray-200 p-2 rounded"
                  />
                </div>
              </div>
            )}

            {/* Data Display */}
            {view === "table" ? (
              <TableData data={transactions} user={cUser} />
            ) : (
              <Analytics transactions={transactions} />
            )}
          </>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-xl font-bold">Add Transaction</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {["title", "amount", "description", "category"].map((field) => (
                <div key={field}>
                  <label className="block ml-1 mb-1 capitalize">{field}</label>
                  <input
                    name={field}
                    type={field === "amount" ? "number" : "text"}
                    value={form[field]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    className="w-full bg-gray-700 text-gray-200 p-2 rounded"
                  />
                </div>
              ))}
              <div>
                <label className="block ml-1 mb-1">Transaction Type</label>
                <select
                  name="transactionType"
                  value={form.transactionType}
                  onChange={(e) =>
                    setForm({ ...form, transactionType: e.target.value })
                  }
                  className="w-full bg-gray-700 text-gray-200 p-2 rounded"
                >
                  <option value="">Select...</option>
                  <option value="credit">Credit</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block ml-1 mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-gray-700 text-gray-200 p-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;