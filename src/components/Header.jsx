import React, { lazy } from "react";

const ToggleButton = lazy(() => import("./ToggleButton"));

const Header = () => {
  return (
    <header
      className={`shadow absolute top-0 border-b-[1px] border-white-700 w-full h-14 flex items-center justify-end`}
    >
      <div className="flex items-center justify-end">
        <nav className="hidden lg:block">
          <ul className="flex justify-center items-center p-4 gap-14">
            <li>
              <ToggleButton />
            </li>
            <li>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
