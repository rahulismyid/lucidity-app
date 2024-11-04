import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#161718] text-white mt-20">
      <div className="text-6xl mb-4">
        <i className="fas fa-exclamation-circle"></i>
      </div>
      <h1 className="text-4xl font-bold mb-2">Error</h1>
      <p className="text-lg mb-6">
        Something went wrong while fetching the data. Please try again later.
      </p>
      <Link
        to="/"
        className="bg-[#df5]  text-[#161718] font-bold py-2 px-4 rounded"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default ErrorPage;
