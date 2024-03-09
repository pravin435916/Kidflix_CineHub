import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { GiTireIronCross } from "react-icons/gi";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closed = () => {
    setMenuOpen(false);
  };

  return (
    <div className="stikcy top-0 m-0 p-0 flex flex-col sm:flex-row justify-between items-end sm:items-center h-16 w-full border-b-4 px-4 sm:px-10 bg-[#070F2B] text-white shadow-lg">
      <Link to="/" className=" absolute sm:sticky left-4 top-4 text-2xl font-bold text-white mb-2 sm:mb-0">
        KidFlix
      </Link>
      <div className="sm:hidden">
        <button
          className="absolute top-2 right-2 text-4xl text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <GiTireIronCross /> : <HiMiniBars3BottomRight />}
        </button>
      </div>
      <ul
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-0 sm:gap-x-6 text-base uppercase sm:items-center bg-gray-600 sm:bg-transparent mt-14 sm:mt-0 p-16 z-10 border-md transition ease-in-out delay-150`}
      >
        <li className="focus:text-violet-600">
          <Link
            to="/"
            className="cursor-pointer hover:text-gray-300 transition-all"
            onClick={closed} 
          >
            Home
          </Link>
        </li>
        <li className="focus:text-violet-600">
          <Link
            onClick={closed}
            to="/cartoons"
            className="cursor-pointer hover:text-gray-300 transition-all"
          >
            cartoons
          </Link>
        </li>
        <li>
          <Link
          onClick={()=> setMenuOpen(false)}
            to="/watch"
            className="cursor-pointer hover:text-gray-300 transition-all"
          >
            WatchList
          </Link>
        </li>
        <li>
          <Link
          onClick={()=> setMenuOpen(false)}
            to="/new"
            className="cursor-pointer hover:text-gray-300 transition-all"
          >
            Newly Released
          </Link>
        </li>
      </ul>
      <div className="p-3 text-base font-semibold">
        <button className="absolute right-20 top-2 border rounded-full px-4 py-2 bg-white text-gray-800 hover:bg-gray-200 transition-all">
          <Link to="/login">Sign In</Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
