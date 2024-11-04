import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

const Header = lazy(() => import("../components/Header"));

const InventoryLayout = () => {
  return (
    <div className="relative flex h-screen bg-[#161718] text-white">
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InventoryLayout;
