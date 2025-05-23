import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Fixed Top Navbar */}
      <header className="bg-blue-700 text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Navbar />
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-24 px-6 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}
