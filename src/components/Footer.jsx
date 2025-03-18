import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mb-0">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        <div className="p-2">
          <h3 className="mb-2 text-lg font-semibold">Ministries</h3>
          <ul className="text-sm">
            <li className="mb-1">
              <Link to="/youthministry" className="hover:underline">
                Youth Ministry
              </Link>
            </li>
            <li>
              <Link to="/worshipteam" className="hover:underline">
                Worship Team
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-lg font-semibold">Connect</h3>
          <ul className="text-sm">
            <li className="mb-1">
              <Link to="/events" className="hover:underline">
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link to="/fellowships" className="hover:underline">
                Fellowships
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-lg font-semibold">Support</h3>
          <ul className="text-sm">
            <li className="mb-1">
              <Link to="/give" className="hover:underline">
                Give
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-lg font-semibold">Follow Us</h3>
          <ul className="flex space-x-4 text-sm">
            <li>
              <Link to="/contact" className="hover:underline">
                <FaFacebook className="inline-block" />
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                <FaTwitter className="inline-block" />
              </Link>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                <FaInstagram className="inline-block" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t border-gray-700 pt-4 text-xs">
        <span>
          © {new Date().getFullYear()} CGCL Church. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
