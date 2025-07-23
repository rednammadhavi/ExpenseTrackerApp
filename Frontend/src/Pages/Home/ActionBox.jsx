import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ActionBox = ({ index, onEdit, onDelete }) => {
  const handleEditClick = (e) => {
    e.preventDefault();
    onEdit(index);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDelete(index);
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        onClick={handleEditClick}
        aria-label="Edit Transaction"
        title="Edit"
        className="text-gray-600 hover:text-blue-600 transition transform hover:scale-110 focus:outline-none"
      >
        <EditNoteIcon fontSize="medium" />
      </button>

      <button
        onClick={handleDeleteClick}
        aria-label="Delete Transaction"
        title="Delete"
        className="text-red-500 hover:text-red-700 transition transform hover:scale-110 focus:outline-none"
      >
        <DeleteForeverIcon fontSize="medium" />
      </button>
    </div>
  );
};

export default ActionBox;
