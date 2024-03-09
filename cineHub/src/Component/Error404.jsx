import React from "react";
import boy from "../assets/masha1.png";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex items-center justify-center flex-col sm:flex-row h-screen bg-[#070F2B] text-white gap-2 sm:gap-20 ">
      <div className="">
        <img className="w-60 sm:w-96" src={boy} alt="" />
      </div>
      <div className="flex flex-col gap-7 items-center">
        <div className="flex flex-col gap-3 items-center">
          <span className="text-3xl sm:text-6xl font-bold"> AWWW !!! ... DON'T</span>
          <span className="text-3xl sm:text-6xl font-bold ">CRY</span>
        </div>
        <div className="flex flex-col gap-2 items-center text-gray-600">
          <span>It's just a <span className="text-gray-800">404 Error!</span></span>
          <span className="flex text-center px-1 sm:px-0">
            What you are looking for may have been misplaced in long term memory.
          </span>
          <span className="text-gray-800 z-50">
            You can jump back <Link className="cursor-pointer text-blue-500 underline p-2 font-bold" to='/'>Home Page</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Error404;
