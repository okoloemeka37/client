export  function ConfirmDelModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null; // modal hidden when isOpen is false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-olive-700 opacity-90">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6">{message || "Are you sure you want to delete this item?"}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={()=>{onConfirm();onClose()}}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}