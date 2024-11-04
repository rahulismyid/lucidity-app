import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  disableProduct,
  updateProduct,
} from "../store/reducers/inventorySlice";

const Modal = lazy(() => import("./Modal"));

const ProductList = () => {
  const { products, userType } = useSelector((state) => state.inventory);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProductsList(products);
  }, [products]);

  const renderHeaders = () => {
    if (productsList?.length && productsList[0]) {
      return Object.keys(productsList[0])?.map((key) => {
        if (key === "disable") return null;

        return (
          <th key={key} className="px-4 py-2 rounded-xl text-left">
            <span className="bg-[#161718] px-4 py-2 rounded-lg">{key}</span>
          </th>
        );
      });
    } else {
      return [];
    }
  };

  const handleDeleteClick = (product) => {
    dispatch(deleteProduct({ ...product, disable: true }));
  };

  const handleEditClick = (product) => {
    setModalData(product);
    setOpenModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...modalData, [name]: value };

    if (name === "value") {
      updatedFormData.value = `$${value.replace("$", "").trim()}`;
    }

    if (name === "value" || name === "quantity") {
      const numericValue =
        parseFloat(updatedFormData.value.replace("$", "")) || 0;
      const numericQuantity = parseInt(updatedFormData.quantity, 10) || 0;
      const totalPrice = numericValue * numericQuantity;
      updatedFormData.price = `$${totalPrice}`;
    }

    setModalData(updatedFormData);
  };

  const handleOnSave = (formData = {}) => {
    setModalData({});
    dispatch(updateProduct(formData));
  };

  const handleDisableClick = (product) => {
    dispatch(disableProduct({ ...product, disable: !product.disable }));
  };

  const renderCell = (product) => {
    return Object?.keys(product).map((key) => {
      if (key === "disable") return null;

      return (
        <td
          key={key}
          className={`py-5 px-4 ${
            product?.disable || userType !== "admin" ? "text-[#707070]" : ""
          }`}
        >
          {product[key]}
        </td>
      );
    });
  };

  const renderActionCells = (product) => {
    return (
      <td
        className={`py-5 px-4 text-center ${
          product?.disable ? "text-[#707070]" : ""
        }`}
      >
        <span
          onClick={() =>
            product.disable ||
            (userType === "admin" && handleEditClick(product))
          }
        >
          <i
            className={`fa fa-pencil ${
              product?.disable || userType !== "admin"
                ? "text-[#707070]"
                : "text-green-600"
            }`}
            aria-hidden="true"
          />
        </span>
        <span
          className="ml-5"
          onClick={() => userType === "admin" && handleDisableClick(product)}
        >
          <i
            className={`fa-solid fa-eye ${
              userType !== "admin" ? "text-[#707070]" : "text-blue-300"
            }`}
          />
        </span>
        <span
          className="ml-5"
          onClick={() => userType === "admin" && handleDeleteClick(product)}
        >
          <i
            className={`fa fa-trash ${
              userType !== "admin" ? "text-[#707070]" : "text-red-600"
            }`}
            aria-hidden="true"
          />
        </span>
      </td>
    );
  };

  return (
    <>
      {openModal && (
        <Modal
          openModal={openModal}
          onClose={() => setOpenModal(false)}
          product={modalData}
          handleOnSave={handleOnSave}
          handleChange={handleChange}
        />
      )}
      <table className="w-full capitalize text-[#df5] bg-[#25272b] rounded-xl">
        <thead className="bg-[#25272b]">
          <tr className="border-b-[1px] h-12">
            {renderHeaders()}
            <th className="py-5 px-4">
              <span className="bg-[#161718] px-4 py-2 rounded-lg">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {productsList?.map((product) => (
            <tr
              key={product.name}
              className="border-b-[1px] text-white text-left hover:bg-[#161718] hover:cursor-pointer"
            >
              {renderCell(product)}
              {renderActionCells(product)}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
