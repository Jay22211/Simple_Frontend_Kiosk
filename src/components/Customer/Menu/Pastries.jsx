import React from "react";
import Sidebar from "../Sidebar"; // Ensure the import path is correct

const pastries = [
  { name: "Spaghetti Bolognese", price: 10.0, img: "/spaghetti.png" },
  { name: "Grilled Chicken Alfredo", price: 11.5, img: "/alfredo.png" },
  { name: "Penne Arrabbiata", price: 9.5, img: "/penne.png" },
];

const Pastries = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> {/* Sidebar added here */}
      <div className="flex-grow p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Pastries</h1>
        <div className="grid grid-cols-3 gap-6">
          {pastries.map((item) => (
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

export default Pastries;