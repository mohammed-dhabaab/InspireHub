import React from "react";

function Alert({ message, accept, cancel }) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className=" bg-white shadow-lg rounded-lg text-center p-6">
          <h1>{message}</h1>
          <div className="flex items-center justify-center gap-2 pt-3">
            <button
              onClick={accept}
              className="btn btn-circle min-h-6 h-9 w-20 text-white bg-primary hover:bg-[rgb(63,44,126)]"
            >
              Confirm
            </button>
            <button
              onClick={cancel}
              className="btn btn-circle min-h-6 h-9 w-20 text-white bg-red-400 hover:bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;


// 
// {showAlart && (
//     <Alert
//       message="are you sure you want to delete this item?"
//       accept={handleDelete}
//       cancel={handleCancleDelete}
//     />
//   )}

//   const handleshowAlart = (id) => {
//     setDeleteId(id);
//     setShowAlart(true);
//   };

//   const handleDelete = () => {
//     axios.delete(`${urlapi}/${deleteId}`).then(function (response) {
//       const newdata = data.filter((ele) => ele.id !== deleteId);
//       setData(newdata);
//       setDeleteId("");
//       setShowAlart(false);
//     });
//   };
//   const handleCancleDelete = () => {
//     setDeleteId("");
//     setShowAlart(false);
//   };

