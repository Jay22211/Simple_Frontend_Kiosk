// src/pages/CashConfirmation.jsx
import React, { useEffect, useState } from "react";
import useCartStore from "../components/cartStore"; // adjust path as needed
import { useNavigate } from "react-router-dom";

const CashConfirmation = () => {
  const { cartItems, clearCart } = useCartStore();
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();

  // Generate a simple random order number on mount
  useEffect(() => {
    const generateOrderNumber = () => {
      return "ORD" + Math.floor(100000 + Math.random() * 900000);
    };
    setOrderNumber(generateOrderNumber());

    // Simulate sending to backend/cashier (optional for now)
    // You can integrate a POST request here later
  }, []);

  const handleFinish = () => {
    clearCart();
    navigate("/"); // Back to menu or homepage
  };

  return (
    <div className="min-h-screen bg-[#eee4d4] flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#4b2e2e] mb-4">Cash Payment Confirmed</h2>
        <p className="text-gray-700 mb-2">Please proceed to the cashier to pay.</p>
        <p className="text-lg font-semibold text-[#4b2e2e]">Order Number: <span className="text-black">{orderNumber}</span></p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-[#4b2e2e]">Items Ordered:</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <li key={item.id} className="text-sm text-gray-800 flex justify-between">
                <span>{item.name} ({item.size}, {item.temperature})</span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleFinish}
          className="mt-6 w-full bg-[#4b2e2e] text-white py-2 rounded hover:bg-[#3a2323] transition"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default CashConfirmation;
