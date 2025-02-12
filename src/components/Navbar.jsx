import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="../assets/react.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Church Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
            Our Church
          </span>
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-gray-800 hover:text-blue-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 transition duration-200 ease-in-out"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/ministries"
                className="block py-2 px-3 text-gray-800 hover:text-blue-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 transition duration-200 ease-in-out"
              >
                Ministries
              </a>
            </li>
            <li>
              <a
                href="/sermons"
                className="block py-2 px-3 text-gray-800 hover:text-blue-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 transition duration-200 ease-in-out"
              >
                Sermons
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 px-3 text-gray-800 hover:text-blue-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 transition duration-200 ease-in-out"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block py-2 px-3 text-gray-800 hover:text-blue-600 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 transition duration-200 ease-in-out"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
