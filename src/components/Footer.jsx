// import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-screen-xl mx-auto flex justify-around items-start px-4">
        <div className="flex-1 p-2">
          <h3 className="mb-2 text-lg font-semibold">Ministries</h3>
          <ul className="text-sm">
            <li className="mb-1">
              <a href="/Ministries" className="hover:underline">
                Youth Ministry
              </a>
            </li>
            <li>
              <a href="./Features.jsx" className="hover:underline">
                Worship Team
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-2">
          <h3 className="mb-2 text-lg font-semibold">Connect</h3>
          <ul className="text-sm">
            <li className="mb-1">
              <a href="/Events" className="hover:underline">
                Upcoming Events
              </a>
            </li>
            <li>
              <a href="/small-groups" className="hover:underline">
                Small Groups
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-2">
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
        <div className="flex-1 p-2">
          <h3 className="mb-2 text-lg font-semibold">Follow Us</h3>
          <ul className="flex space-x-4 text-sm">
            <li>
              <a href="https://facebook.com" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="hover:underline">
                Instagram
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
