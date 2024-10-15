import React from "react";
import styles from "../../styles"; 

const DeleteModel = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl shadow-lg p-5 max-w-sm w-full mx-auto ${styles.transition500}`}>
        <h2 className={`${styles.heading4} text-center mb-3`}>Confirm Deletion</h2>
        <p className={`${styles.paragraph3} text-center mb-6 text-sm text-gray-600`}>
          Are you sure you want to delete this user and all related ideas? This action cannot be undone.
        </p>
        <div className="flex justify-between space-x-4">
          <button
            className={`${styles.deleteButton} flex-1 py-2 px-4 transition duration-200`}
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="flex-1 bg-[#4e3797] text-white rounded-full py-2 px-4 hover:bg-[#3a2a70] transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
