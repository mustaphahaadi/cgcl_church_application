import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h2>About Us</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <Link to="/pages/Contact">Contact Us</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default About;