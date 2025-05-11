import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaCoffee,
  FaMugHot,
  FaCocktail,
  FaBirthdayCake,
  FaHamburger,
  FaBars,
  FaTimes,
} from 'react-icons/fa'; // React Icons

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle for mobile

  // Define routes to be used in sidebar
  const routes = [
    { label: "Espresso", path: "/kiosk/espresso", icon: <FaMugHot size={30} /> },
    { label: "Non-Coffee", path: "/kiosk/nonCoffee", icon: <FaCoffee size={30} /> },
    { label: "Fruity Soda", path: "/kiosk/fruitySoda", icon: <FaCocktail size={30} /> },
    { label: "Pastries", path: "/kiosk/pastries", icon: <FaBirthdayCake size={30} /> },
    { label: "Snacks", path: "/kiosk/snacks", icon: <FaHamburger size={30} /> },
  ];

  return (
    <>
      {/* Toggle Button - visible on small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-[#4b2e2e] p-3 rounded-full shadow-md"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed md:static z-40 top-0 left-0 h-full bg-[#4b2e2e] p-4 border-r flex flex-col items-center overflow-y-auto space-y-6 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:w-[240px] md:min-w-[240px]
      `}>
        {/* Logo */}
        <div
          className="flex justify-center mb-8 cursor-pointer transition-transform hover:scale-105"
          onClick={() => {
            setIsOpen(false);
            navigate('/kiosk');
          }}
        >
          <img
            src="/moonbuckslogo.png"
            alt="Moon Bucks Logo"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Navigation Links */}
        <div className="w-full space-y-4">
          {routes.map((item) => {
            const isActive = location.pathname === item.path; // Check if current route is active

            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path); // Navigate to route
                  setIsOpen(false); // Close sidebar on mobile after click
                }}
                className={`
                  w-full py-4 px-3 rounded-2xl font-bold text-lg font-serif text-center transition-all duration-300 flex flex-col items-center shadow-md border-2
                  ${isActive
                    ? "bg-[#ecb233] text-[#143d03] border-[#143d03] scale-[1.03]"
                    : "bg-[#f5ead1] text-[#4b2e2e] hover:bg-[#ffe4a3] border-transparent"
                  }
                `}
              >
                <div className="mb-1 text-2xl">{item.icon}</div>
                <span>{item.label}</span>
                <span className="text-xs italic mt-1 text-[#333]">Tap Me!</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
