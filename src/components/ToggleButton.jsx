import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleUser } from "../store/reducers/inventorySlice";

const ToggleButton = () => {
  const [isUser, setIsUser] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = (e) => {
    setIsUser(e.target.checked);
    dispatch(toggleUser(e.target.checked ? "user" : "admin"));
  };

  return (
    <div className="flex items-center justify-center w-full">
      <span className="px-2 cursor-pointer">admin</span>
      <label htmlFor="toggleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toggleA"
            type="checkbox"
            className="sr-only peer"
            checked={isUser}
            onChange={handleToggle}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner transition" />
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-200 ease-in-out peer-checked:translate-x-6 peer-checked:bg-white" />
        </div>
      </label>
      <span className="px-2 cursor-pointer">user</span>
    </div>
  );
};

export default ToggleButton;
