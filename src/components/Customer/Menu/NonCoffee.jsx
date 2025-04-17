import React from "react";
import Sidebar from "../Sidebar"; // Import Sidebar from the correct location

const nonCoffee = [
  { name: "BBQ Chicken Wings", price: 8.0, img: "/wings.png" },
  { name: "Ribs Platter", price: 12.0, img: "/ribs.png" },
  { name: "Grilled Chicken Breast", price: 9.5, img: "/grilled-chicken.png" },
];

const NonCoffee = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> {/* Sidebar added here */}
      <div className="flex-grow p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">NonCoffee</h1>
        <div className="grid grid-cols-3 gap-6">
          {nonCoffee.map((item) => (
            <div key={item.name} className="bg-white rounded-lg shadow p-4 text-center">
              <img src={item.img} alt={item.name} className="mx-auto h-24 mb-2" />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NonCoffee;