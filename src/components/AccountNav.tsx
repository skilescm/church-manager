import { Link } from 'react-router-dom';

const AccountNav = () => {
  return (
    <div>
      <Link to="/account">My Account</Link> |{" "}
      <Link to="/account/admin">Admin</Link> |{" "}
      <Link to="/account/settings">Settings</Link>
    </div>
  );
};

export default AccountNav;
