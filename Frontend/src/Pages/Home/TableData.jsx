import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTransactions, editTransactions } from "../../utils/ApiRequest";
import axios from "axios";

const TableData = ({ data, user }) => {
  const [show, setShow] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currId, setCurrId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleEditClick = (id) => {
    const editTran = data.find((item) => item._id === id);
    setEditingTransaction(editTran);
    setCurrId(id);
    setShow(true);
  };

  const handleDeleteClick = async (id) => {
    await axios.post(`${deleteTransactions}/${id}`, {
      userId: user._id,
    });
    setRefresh(!refresh);
    window.location.reload();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(`${editTransactions}/${currId}`, values);
    if (data.success) {
      setShow(false);
      setRefresh(!refresh);
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-300">
          <tr>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b bg-gray-800 border-gray-700">
              <td className="px-6 py-4">{moment(item.date).format("YYYY-MM-DD")}</td>
              <td className="px-6 py-4">{item.title}</td>
              <td className="px-6 py-4">{item.amount}</td>
              <td className="px-6 py-4">{item.transactionType}</td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <EditNoteIcon
                    className="text-blue-400 cursor-pointer"
                    onClick={() => handleEditClick(item._id)}
                  />
                  <DeleteForeverIcon
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteClick(item._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTransaction && (
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder={editingTransaction.title}
                  value={values.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  type="number"
                  placeholder={editingTransaction.amount}
                  value={values.amount}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  {[
                    "Groceries",
                    "Rent",
                    "Salary",
                    "Tip",
                    "Food",
                    "Medical",
                    "Utilities",
                    "Entertainment",
                    "Transportation",
                    "Other",
                  ].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder={editingTransaction.description}
                  value={values.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Transaction Type</Form.Label>
                <Form.Select
                  name="transactionType"
                  value={values.transactionType}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="credit">Credit</option>
                  <option value="expense">Expense</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default TableData;
