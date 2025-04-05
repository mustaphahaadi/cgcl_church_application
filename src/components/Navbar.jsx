import { useState, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown, Church, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutApi } from "../hooks/apiHooks";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {isLoggedIn, logout} = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigationItems = {
    worship: {
      label: "Worship",
      items: [
        { label: "Service Times", to: "/service-times" },
        { label: "Testimony", to: "/testimonies" },
        { label: "Sermon Archives", to: "/sermons" },
        { label: "Prayer Requests", to: "/prayer-requests" },
      ],
    },
    // ministries: {
    //   label: "Ministries",
    //   items: [
    //     { label: "Youth Ministry", to: "/youthministry" },
    //     { label: "Adult Groups", to: "/fellowships" },
    //     { label: "Outreach", to: "/outreach" },
    //     { label: "Care & Support", to: "/contact" },
    //   ],
    // },
    streaming: {
      label: "Streaming",
      items: [
        { label: "Live Services", to: "/live-stream" },
        { label: "Worship Music", to: "/worship-music" },
        { label: "Bible Study Channel", to: "/bible-study" },
      ],
    },
    connect: {
      label: "Connect",
      items: [
        { label: "New Here?", to: "/signup" },
        { label: "Events Calendar", to: "/events" },
        { label: "Fellowships", to: "/fellowships" },
        { label: "Ministries", to: "/ministries" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
    support: {
      label: "Support",
      items: [
        { label: "Give", to: "/give" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
  };

  const ProfileNavigation = {
    profile:{
      label:"Profile",
      items:[
        { label: "Dashboard", to: "/dashboard" },
        { label: "Account", to: "/profile" },
        { label: "Settings", to: "/settings" },
        { label: "Logout", to: "/logout" },
      ]
    }
  }
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

  const onLogout = async () => {
    try{
      const refresh_token = localStorage.getItem("refresh_token")
      const response = await logoutApi(refresh_token)

      if(response?.status !== 200){
        throw new Error("unable to logout")
      }

      logout();
      navigate("/login");
    }catch(error){
      console.error(error)
    }
  } 
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <nav
      className="bg-white text-gray-800 shadow-lg sticky top-0 z-50"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Home Link */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2"
              aria-label="CLGC Church Home"
            >
              {/* isAuthenticated ? "/dashboard" : "/"" */}
              <Church className="h-8 w-8 text-blue-800 transition-transform duration-300 hover:scale-110" />
              <span className="text-xl md:text-2xl font-extrabold tracking-tight transition-colors duration-300 hover:text-blue-800">
                CLGC CHURCH
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {/* isAuthenticated ? "/dashboard" : "/"" */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-200"
            >
              Home
            </Link>

            {Object.entries(navigationItems).map(([key, { label, items }]) => (
              <div key={key} className="relative group">
                <button
                  className="text-gray-900 inline-flex items-center px-3 py-2 text-sm font-medium hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-white rounded-md transition-colors duration-300 hover:bg-gray-200"
                  onClick={() => handleDropdownClick(key)}
                  aria-expanded={activeDropdown === key}
                  aria-haspopup="true"
                  aria-label={`Open ${label} menu`}
                >
                  {label}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute z-20 mt-2 w-52 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden"
                      role="menu"
                    >
                      {items.map(({ label, to }) => (
                        <Link
                          key={label}
                          to={to}
                          className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 hover:text-blue-800 transition-colors duration-200"
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)} // Close dropdown on click
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {
              isLoggedIn 
              ? 

              Object.entries(ProfileNavigation).map(([key, { label, items }]) => (
              <div key={key} className="relative group">
                <button
                  className="text-gray-900 inline-flex items-center px-3 py-2 text-sm font-medium hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-white rounded-md transition-colors duration-300 hover:bg-gray-200"
                  onClick={() => handleDropdownClick(key)}
                  aria-expanded={activeDropdown === key}
                  aria-haspopup="true"
                  aria-label={`Open ${label} menu`}
                >
                  {label}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute z-20 mt-2 w-52 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden"
                      role="menu"
                    >
                      {items.map( ({ label, to }) => (
                       
                        label == "Logout"?
                       
                          <Link
                            key={label}
                            // to={to}
                            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 hover:text-blue-800 transition-colors duration-200"
                            role="menuitem"
                            onClick={() => onLogout()} // Close dropdown on click
                          >
                            {label}
                          </Link>
                        
                          :
                          <Link
                            key={label}
                            to={to}
                            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 hover:text-blue-800 transition-colors duration-200"
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)} // Close dropdown on click
                          >
                            {label}
                          </Link>

                        
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )) 
              :
              <Link
              to="/login"
              className="text-gray-900 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-200"
            >
              Login
            </Link>
              }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-300 transition-colors duration-300"
              aria-expanded={isOpen}
              aria-label="Toggle main menu"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="md:hidden bg-white"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-200 rounded-md transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {Object.entries(navigationItems).map(
                ([key, { label, items }]) => (
                  <div key={key} className="space-y-1">
                    <button
                      onClick={() => handleDropdownClick(key)}
                      className="w-full text-left px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md transition-colors duration-300"
                      aria-expanded={activeDropdown === key}
                      aria-label={`Toggle ${label} submenu`}
                    >
                      <span className="flex items-center justify-between">
                        {label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            activeDropdown === key ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={dropdownVariants}
                          className="pl-4 space-y-1"
                        >
                          {items.map(({ label, to }) => (
                            <Link
                              key={label}
                              to={to}
                              className="block px-3 py-2 text-base text-gray-800 hover:text-blue-800 hover:bg-gray-200 rounded-md transition-colors duration-300"
                              onClick={() => {
                                setIsOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              )}
              
              {
              isLoggedIn 
              ?
              Object.entries(ProfileNavigation).map(([key, { label, items }]) => (
              <div key={key} className="relative group">
                <button
                  className="text-gray-900 inline-flex items-center px-3 py-2 text-sm font-medium hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-white rounded-md transition-colors duration-300 hover:bg-gray-200"
                  onClick={() => handleDropdownClick(key)}
                  aria-expanded={activeDropdown === key}
                  aria-haspopup="true"
                  aria-label={`Open ${label} menu`}
                >
                  {label}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute z-20 mt-2 w-52 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden"
                      role="menu"
                    >
                      {items.map(({ label, to }) => (
                        label == "Logout"?
                       
                        <Link
                          key={label}
                          // to={to}
                          className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 hover:text-blue-800 transition-colors duration-200"
                          role="menuitem"
                          onClick={() => onLogout()} // Close dropdown on click
                        >
                          {label}
                        </Link>
                      
                        :
                        <Link
                          key={label}
                          to={to}
                          className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 hover:text-blue-800 transition-colors duration-200"
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)} // Close dropdown on click
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )) 
              :
              <Link
              to="/login"
              className="text-gray-900 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-200"
            >
              Login
            </Link>
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
