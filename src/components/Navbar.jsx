import { useState, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown, Church } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigationItems = {
    worship: {
      label: "Worship",
      items: [
        "Service Times",
        "Watch Live",
        "Sermon Archive",
        "Music Ministry",
        "Prayer Requests",
      ],
    },
    ministries: {
      label: "Ministries",
      items: [
        "Children's Ministry",
        "Youth Ministry",
        "Adult Groups",
        "Outreach",
        "Care & Support",
      ],
    },
    connect: {
      label: "Connect",
      items: [
        "New Here?",
        "Events Calendar",
        "Small Groups",
        "Volunteer",
        "Contact Us",
      ],
    },
    support: {
      label: "Support",
      items: ["Give", "Contact Us"],
    },
  };

  const handleEscape = useCallback((e) => {
    if (e.key === "Escape") {
      setActiveDropdown(null);
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  const handleDropdownClick = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <nav
      className="bg-white shadow-lg border-b border-gray-200"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Home Link */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="/"
              className="flex items-center space-x-2"
              aria-label="Home"
            >
              <Church className="h-8 w-8 text-blue-600 transition-transform duration-300 hover:scale-110" />
              <span className="text-2xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600">
                CLGC CHURCH
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Home
            </a>

            {Object.entries(navigationItems).map(([key, { label, items }]) => (
              <div key={key} className="relative">
                <button
                  className="text-gray-700 group inline-flex items-center px-3 py-2 text-sm font-medium hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md transition-colors duration-200"
                  onClick={() => handleDropdownClick(key)}
                  aria-expanded={activeDropdown === key}
                  aria-haspopup="true"
                >
                  {label}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:text-blue-600" />
                </button>

                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute z-10 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5"
                      role="menu"
                    >
                      {items.map((item) => (
                        <Link
                          key={item}
                          to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                          role="menuitem"
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded={isOpen}
              aria-label="Main menu"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Move Home link to the top */}
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
              >
                Home
              </Link>

              {Object.entries(navigationItems).map(
                ([key, { label, items }]) => (
                  <div key={key} className="space-y-1">
                    <button
                      onClick={() => handleDropdownClick(key)}
                      className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200"
                      aria-expanded={activeDropdown === key}
                    >
                      {label}
                    </button>

                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={dropdownVariants}
                          className="pl-4"
                        >
                          {items.map((item) => (
                            <Link
                              key={item}
                              to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                            >
                              {item}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
