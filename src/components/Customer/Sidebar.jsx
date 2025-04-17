import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { label: "Espresso", path: "/kiosk/espresso", img: "/Espresso3.png" },
    { label: "NonCoffee", path: "/kiosk/nonCoffee", img: "/images/Americano.jpg" },
    { label: "FruitySoda", path: "/kiosk/fruitySoda", img: "/images/Americano.jpg" },
    { label: "Pastries", path: "/kiosk/pastries", img: "/box.png" },
  ];

  return (
    <div className="w-[240px] min-w-[240px] h-screen bg-[#924d0d] border-r p-4 flex flex-col items-center overflow-y-auto space-y-6 sidebar-no-scroll">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img 
          src="/moonbuckslogo.png"
          alt="Moon Bucks Logo" 
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* Navigation */}
      <div className="w-full space-y-4">
        {routes.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center cursor-pointer p-3 rounded-lg transition-all duration-300
                ${isActive 
                  ? "bg-[#ecb233] border-l-4 border-[#ecb233] shadow-md scale-[1.02]" 
                  : "hover:bg-[#ff9a16]/50"
                }`}
            >
              <img 
                src={item.img} 
                alt={item.label} 
                className="w-24 h-24 mb-4 object-cover rounded-lg transition duration-300 group-hover:opacity-90" 
              />
              <span className={`text-xl font-bold text-center font-serif transition-colors duration-300 
                ${isActive ? "text-[#143d03]" : "text-[#3b1b00]"}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
