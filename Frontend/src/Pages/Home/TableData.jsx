import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { deleteTransactions, editTransactions } from "../../utils/ApiRequest";

const TableData = ({ data, user, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    title: "", amount: "", description: "", category: "", date: "", transactionType: ""
  });
  const [currId, setCurrId] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEdit = (item) => {
    setCurrId(item._id);
    setValues({
      title: item.title,
      amount: item.amount,
      description: item.description,
      category: item.category,
      date: moment(item.date).format("YYYY-MM-DD"),
      transactionType: item.transactionType,
    });
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const { title, amount, transactionType, category, date } = values;
    if (!title || !amount || !transactionType || !category || !date) {
      toast.error("Please fill all required fields");
      setEditLoading(false);
      return;
    }

    try {
      const res = await axios.put(`${editTransactions}/${currId}`, values);
      if (res.data.success) {
        toast.success("Transaction updated successfully!");
        setShowModal(false);
        onRefresh();
      } else {
        toast.error("Update failed.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${deleteTransactions}/${id}`, {
        data: { userId: user._id },
      });
      if (res.data.success) {
        toast.success("Transaction deleted");
        onRefresh();
      }
    } catch (error) {
      toast.error("Error deleting transaction");
    }
  };

  return (
    <div className="px-4 py-6">
      <ToastContainer position="bottom-right" autoClose={2000} />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">₹{item.amount}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white text-xs font-semibold 
                    ${item.transactionType === "income" ? "bg-green-500" : "bg-red-500"}`}>
                    {item.transactionType}
                  </span>
                </td>
                <td className="px-4 py-2">{moment(item.date).format("DD-MM-YYYY")}</td>
                <td className="px-4 py-2 flex justify-center gap-3 text-lg">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800">
                    <AiFillEdit />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 w-full max-w-lg rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900  px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={values.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900  px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={values.category}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900  px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900  px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="transactionType"
                value={values.transactionType}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900  px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {editLoading ? "Updating..." : "Update Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableData;
