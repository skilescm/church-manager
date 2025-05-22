import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/people">People</Link> |{" "}
      <Link to="/attendance">Attendance</Link> |{" "}
      <Link to="/offering">Offering</Link> |{" "}
      <Link to="/rewards">Rewards</Link>
    </nav>
  );
};

export default Navbar;
