import { Link } from 'react-router-dom';
import '../styles/NotFound.css'; // Import the CSS file

const NotFound = () => {
  return (
    <div className="not-found">
      <h3>404 - Page Not Found</h3>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound; 