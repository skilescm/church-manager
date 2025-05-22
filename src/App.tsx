import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SupabaseProvider, useAuth } from './context/SupabaseProvider';
import { routes } from './routes';
import Navbar from './components/Navbar';
import AccountNav from './components/AccountNav';

function AppRoutes() {
  const { user, loading } = useAuth();
  const userRole = user?.user_metadata?.role ?? 'visitor';


  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Navbar />
      <AccountNav />
      <Routes>
        {routes.map(({ path, element, roles }) => {
          const hasAccess = !roles || roles.includes(userRole);
          return (
            <Route
              key={path}
              path={path}
              element={hasAccess ? element : <Navigate to="/login" />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <SupabaseProvider>
      <AppRoutes />
    </SupabaseProvider>
  );
}

export default App;
