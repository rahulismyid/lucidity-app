import React from "react";

const iconMap = {
  totalProducts: <i className="fa-solid fa-cart-shopping"></i>,
  totalAmount: <i className="fa-solid fa-dollar-sign"></i>,
  outOfStock: (
    <>
      <div className="w-[20px] h-[2px] text-white out-of-stock-cart" />
      <i className="fa-solid fa-cart-shopping"></i>
    </>
  ),
  categories: <i className="fa-solid fa-shapes"></i>,
};

const Status = (props) => {
  const { iconKey = null, label = null, value = null } = props;
  return (
    <div className="bg-[#2a2b25] w-full h-40 rounded-xl flex justify-start gap-6 p-8 px-4">
      <div className="flex items-start justify-center w-12 h-12 text-5xl">
        {iconMap[iconKey]}
      </div>
      <div className="flex flex-col text-white gap-2">
        <h1 className="text-sm font-normal">{label}</h1>
        <div className="text-4xl font-medium">{value}</div>
      </div>
    </div>
  );
};

export default Status;
