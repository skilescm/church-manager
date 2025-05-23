import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SupabaseProvider } from './context/SupabaseProvider';
import { routes } from './routes';
import Layout from './components/Layout';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <SupabaseProvider>
      <AppRoutes />
    </SupabaseProvider>
  );
}
