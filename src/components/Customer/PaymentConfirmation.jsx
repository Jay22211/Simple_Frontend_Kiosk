import React, { useEffect, useState, useRef } from "react";
import useCartStore from "../Customer/cartStore";
import { useNavigate } from "react-router-dom";

const PaymentConfirmation = () => {
  const { cartItems, clearCart } = useCartStore();
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();
  const hasSentOrder = useRef(false); // 🛡️ New protection!

  useEffect(() => {
    if (hasSentOrder.current) return; // 🛡️ already sent, skip
    hasSentOrder.current = true; // Mark as sent

    const sendOrder = async () => {
      try {
        const API_URL = 'http://localhost:5000/api/orders';
  
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            paymentMethod: "cash",
          }),
        });
  
        console.log("Response status:", res.status);
  
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error: ${res.status} - ${text}`);
        }
  
        const responseBody = await res.json();
        console.log("Response body:", responseBody);
  
        // Set the order number from the response body
        setOrderNumber(responseBody.orderNumber);

      } catch (err) {
        console.error("Error submitting order:", err);
      }
    };
  
    sendOrder();

    return () => {
      console.log('Cleanup if needed');
    };
  }, []); // ✅

  const handleFinish = () => {
    clearCart();
    navigate("/");
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

export default PaymentConfirmation;
