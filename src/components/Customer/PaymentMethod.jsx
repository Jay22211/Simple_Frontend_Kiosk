// src/pages/PaymentMethod.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";

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
  <div className="min-h-screen bg-[#eee4d4] flex flex-col items-center justify-center px-6 py-10">
    <h2 className="text-4xl font-bold text-[#4b2e2e] mb-12">Choose Payment Method</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
      {/* GCash Card */}
      <div
        onClick={() => handlePaymentSelection("gcash")}
        className="bg-white rounded-3xl shadow-2xl cursor-pointer p-12 min-h-[450px] flex flex-col items-center justify-center hover:bg-[#f6f0e4] transition transform hover:scale-105"
      >
        <FaMobileAlt className="text-7xl text-[#4b2e2e] mb-6" />
        <h3 className="text-3xl font-bold text-[#4b2e2e]">Pay with GCash</h3>
      </div>

      {/* Cash Card */}
      <div
        onClick={() => handlePaymentSelection("cash")}
        className="bg-white rounded-3xl shadow-2xl cursor-pointer p-12 min-h-[450px] flex flex-col items-center justify-center hover:bg-[#f6f0e4] transition transform hover:scale-105"
      >
        <FaMoneyBillWave className="text-7xl text-[#4b2e2e] mb-6" />
        <h3 className="text-3xl font-bold text-[#4b2e2e]">Pay with Cash</h3>
      </div>
    </div>
  </div>
);

};

export default PaymentMethod;
