// src/pages/PaymentMethod.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const navigate = useNavigate();

  const handlePaymentSelection = (method) => {
    if (method === "gcash") {
      navigate("/payment/gcash");
    } else if (method === "cash") {
      navigate("/payment/cash");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#eee4d4] px-4">
      <h2 className="text-3xl font-bold text-[#4b2e2e] mb-6">Choose Payment Method</h2>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => handlePaymentSelection("gcash")}
          className="w-full bg-[#4b2e2e] text-white py-3 rounded-xl hover:bg-[#3a2323] transition"
        >
          Pay with GCash
        </button>
        <button
          onClick={() => handlePaymentSelection("cash")}
          className="w-full bg-gray-700 text-white py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Pay with Cash
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
