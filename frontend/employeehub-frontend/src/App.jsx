import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { Menu, X, Users, Home, BarChart2 } from 'lucide-react';

// --- Page Imports ---
// Corrected the import paths to be more explicit for the build tool.
import EmployeePage from './pages/EmployeePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

// --- Sidebar Component ---
const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Employees', icon: Users, path: '/employees' },
    { name: 'Reports', icon: BarChart2, path: '/reports' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:w-64`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">EmployeeHub</h1>
          <button onClick={toggleSidebar} className="lg:hidden text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="px-4">
                <Link
                  to={item.path}
                  className="flex items-center p-2 my-1 rounded-md hover:bg-gray-700"
                >
                  <item.icon className="mr-3" size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

// --- Main Layout Component ---
// This component wraps pages that should have the sidebar and header.
const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header for mobile and main content */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md lg:hidden">
           <button onClick={toggleSidebar} className="text-gray-800">
             <Menu size={24} />
           </button>
           <h2 className="text-xl font-semibold">EmployeeHub</h2>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {/* The Outlet will render the specific page component (e.g., EmployeePage) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the full-screen SignUpPage */}
        <Route path="/signup" element={<SignUpPage />} />

        {/* Routes that use the MainLayout (with sidebar) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<EmployeePage />} />
          <Route path="/employees" element={<EmployeePage />} />
          {/* Add other main application routes here, e.g., /reports */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

