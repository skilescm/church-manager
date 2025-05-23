import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">Church Manager</div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/people">People</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/offering">Offering</Link>
        <Link to="/rewards">Rewards</Link>
      </nav>

      <div className="account-nav">
        <Link to="/account">Account</Link>
        <Link to="/account/settings">Settings</Link>
        <Link to="/account/admin">Admin</Link>
      </div>
    </header>
  );
};

export default Navbar;
