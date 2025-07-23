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
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
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
    <div className="overflow-x-auto p-4">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden bg-white">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm text-gray-600 uppercase">
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
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
              <td className="px-4 py-2 flex gap-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEdit(item)}
                >
                  <AiFillEdit size={20} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(item._id)}
                >
                  <AiFillDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-4">Edit Transaction</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={values.amount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={values.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="transactionType"
                value={values.transactionType}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
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
