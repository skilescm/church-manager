import { Link } from 'react-router-dom';
import { useAuth } from '../context/SupabaseProvider';

const AccountNav = () => {
  const { role } = useAuth();

  return (
    <div className="relative group">
      <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
        👤
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">Account</Link>
        <Link to="/account/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
        {role === 'admin' && (
          <Link to="/account/admin" className="block px-4 py-2 hover:bg-gray-100">Admin</Link>
        )}
      </div>
    </div>
  );
};

export default AccountNav;
