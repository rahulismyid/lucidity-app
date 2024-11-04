import React, { useEffect, useState } from "react";

const Modal = ({ product, handleOnSave, onClose, handleChange, openModal }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSave = () => {
    handleOnSave(formData);
    onClose();
  };

  const disableBtn = formData.price === "$0" || formData.value === "$0";

  if (!openModal) return null;

  return (
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className="inline-block align-center bg-[#252629] rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-[#25272b] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between pb-4">
              <div>
                <h2 className="text-3xl text-white">Edit Product</h2>
                <p>{formData?.name}</p>
              </div>
              <div className="bg-[#303239] h-fit flex justify-center items-center rounded-md">
                <button
                  className="text-[#df5] py-[5px] px-[15px] text-xl"
                  onClick={onClose}
                >
                  X
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ""}
                  onChange={handleChange}
                  className="w-full outline-none rounded-xl bg-[#303239] text-[#707070] p-2 mt-2 mb-3"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white">Value</label>
                <input
                  type="text"
                  name="value"
                  value={formData.value || ""}
                  onChange={handleChange}
                  className="w-full outline-none rounded-xl bg-[#303239] text-[#707070] p-2 mt-2 mb-3"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity || ""}
                  onChange={handleChange}
                  className="w-full outline-none rounded-xl bg-[#303239] text-[#707070] p-2 mt-2 mb-3"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white">Price</label>
                <input
                  type="text"
                  name="price"
                  readOnly
                  value={formData.price || ""}
                  onChange={handleChange}
                  className="w-full outline-none rounded-xl bg-[#303239] text-[#707070] p-2 mt-2 mb-3"
                />
              </div>
            </div>
          </div>
          <div className="bg-[#25272b] px-4 py-3 text-right">
            <button
              type="button"
              className="py-2 px-4 rounded-xl text-[#df5] mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={disableBtn}
              className={`py-2 px-4 rounded-xl mr-2 transition duration-500 ${
                disableBtn ? "bg-[#303239] text-[#707070]" : " text-[#fff]"
              }`}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
