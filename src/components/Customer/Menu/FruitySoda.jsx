import React from "react";
import Sidebar from "../Sidebar"; // Import Sidebar from the correct location

const fruitySoda = [
  { name: "Caesar Salad", price: 7.0, img: "/caesar-salad.png" },
  { name: "Greek Salad", price: 7.5, img: "/greek-salad.png" },
  { name: "Avocado Salad", price: 8.0, img: "/avocado-salad.png" },
];

const FruitySoda = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> {/* Sidebar added here */}
      <div className="flex-grow p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Fruity Soda</h1>
        <div className="grid grid-cols-3 gap-6">
          {fruitySoda.map((item) => (
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

export default FruitySoda;