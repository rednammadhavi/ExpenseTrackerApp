import React, { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { editTransactions } from "../../utils/ApiRequest";
import axios from "axios";

const ActionBox = (props) => {
  const [index, setIndex] = useState();

  const handleEditClick = async (e) => {
    e.preventDefault();
    setIndex(index);
    // TODO: add logic to trigger edit modal or form
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    // TODO: add delete functionality here
  };

  return (
    <div className="flex items-center gap-4">
      <EditNoteIcon
        className="cursor-pointer text-gray-600 hover:text-blue-600"
        onClick={handleEditClick}
      />
      <DeleteForeverIcon
        className="cursor-pointer text-red-500 hover:text-red-700"
        onClick={handleDeleteClick}
      />
    </div>
  );
};

export default ActionBox;
