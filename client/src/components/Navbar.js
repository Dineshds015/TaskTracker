import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with Text - Link to Dashboard */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/task.png" // Ensure you place your logo in the public folder or use the correct path
              alt="CheckIt Logo"
              className="w-8 h-8 mr-2" // Adjust size as needed
            />
            <h1 className="text-lg font-semibold">CheckIt</h1>
          </Link>
        </div>

        {/* Links for Desktop and Mobile */}
        <div className={`hidden md:flex space-x-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <Link to="/" className="hover:text-blue-200">Dashboard</Link>
          <Link to="/tasks" className="hover:text-blue-200">All Tasks</Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            <i className={`fas fa-bars ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i> {/* Toggle hamburger icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4`}>
        <div className="flex flex-col space-y-2 text-center">
          <Link to="/" className="hover:text-blue-200">Dashboard</Link>
          <Link to="/tasks" className="hover:text-blue-200">All Tasks</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
