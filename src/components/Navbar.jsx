import { useState } from "react";
import reactLogo from "../assets/react.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white-to-r from-black-500 to-black-700 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={reactLogo} className="mr-3 h-8 sm:h-10" alt="Church Logo" />
          <span className="self-center text-2xl font-bold text-blue whitespace-nowrap">
            CGCL CHURCH
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out bg-gray-800"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white-800 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-800 rounded-md transition duration-200 ease-in-out"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/ministries"
                className="block py-2 px-3 text-gray-800 rounded-md transition duration-200 ease-in-out"
              >
                Ministries
              </Link>
            </li>
            <li>
              <Link
                to="/sermons"
                className="block py-2 px-3 text-gray-800 rounded-md transition duration-200 ease-in-out"
              >
                Sermons
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-800 rounded-md transition duration-200 ease-in-out"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-800 rounded-md transition duration-200 ease-in-out"
              >
                Contact
              </Link>
            </li>
          {/* <li>
              <Link
                to="/dashboard"
                className="block py-2 px-3 text-gray-800 rounded-md transition duration-200 ease-in-out"
              >
                Dashboard
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
