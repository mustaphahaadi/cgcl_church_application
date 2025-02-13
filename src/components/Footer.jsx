import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mb-0">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        <div className="p-2">
          <h3 className="mb-2 text-lg font-semibold">Ministries</h3>
          <ul className="text-sm">
            <li className="mb-1">
              <a href="/YouthMinistry" className="hover:underline">
                Youth Ministry
              </a>
            </li>
            <li>
              <a href="/WorshipTeam" className="hover:underline">
                Worship Team
              </a>
            </li>
          </ul>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-lg font-semibold">Connect</h3>
          <ul className="text-sm">
            <li className="mb-1">
              <a href="/Events" className="hover:underline">
                Upcoming Events
              </a>
            </li>
            <li>
              <a href="/SmallGroups" className="hover:underline">
                Small Groups
              </a>
            </li>
          </ul>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-lg font-semibold">Support</h3>
          <ul className="text-sm">
            <li className="mb-1">
              <a href="/Give" className="hover:underline">
                Give
              </a>
            </li>
            <li>
              <a href="/Contact" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="p-2">
          <h3 className="mb-2 text-lg font-semibold">Follow Us</h3>
          <ul className="flex space-x-4 text-sm">
            <li>
              <a href="/Contact" className="hover:underline">
                <FaFacebook className="inline-block" />
              </a>
            </li>
            <li>
              <a href="/Contact" className="hover:underline">
                <FaTwitter className="inline-block" />
              </a>
            </li>
            <li>
              <a href="/Contact" className="hover:underline">
                <FaInstagram className="inline-block" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t border-gray-700 pt-4 text-xs">
        <span>© 2025 CGCL Church. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
