import React, { useEffect, useState, useRef } from "react";
import useCartStore from "../Customer/cartStore";
import { useNavigate } from "react-router-dom";

const PaymentConfirmation = () => {
  const { cartItems, dineOption, clearCart, closeCart } = useCartStore();
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const navigate = useNavigate();
  const hasSentOrder = useRef(false);

  // Function to handle sending order to the backend
  useEffect(() => {
    if (hasSentOrder.current) return;
    hasSentOrder.current = true;

    const sendOrder = async () => {
      try {
        // Calculate totalPrice based on cartItems
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
        const API_URL = 'http://localhost:5000/api/orders';
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            paymentMethod: "cash", // or other selected payment method
            dineOption: dineOption, // Dine in or take out option
            totalPrice: totalPrice,  // Send totalPrice along with the other data
          }),
        });
    
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error: ${res.status} - ${text}`);
        }
    
        const responseBody = await res.json();
        setOrderNumber(responseBody.orderNumber);
      } catch (err) {
        console.error("Error submitting order:", err);
      }
    };
    

    sendOrder();

    return () => {
      console.log('Cleanup if needed');
    };
  }, [cartItems, dineOption]);

  const handleFinish = () => {
    clearCart();
    closeCart();
    navigate("/");
    printReceipt(); // Call printReceipt function when Done button is clicked
  };

  // Function to handle printing the receipt
  const printReceipt = () => {
    const receiptWindow = window.open('', 'PRINT', 'height=600,width=400');
    receiptWindow.document.write('<html><head><title>Receipt</title>');
    receiptWindow.document.write('</head><body>');
    receiptWindow.document.write(`<h2 style="text-align:center;">Moonbucks Coffee</h2>`);
    receiptWindow.document.write(`<p>Order Number: <strong>${orderNumber}</strong></p>`);
    receiptWindow.document.write(`<p>Dine Option: ${dineOption}</p>`);
    receiptWindow.document.write('<hr/>');

    cartItems.forEach(item => {
      receiptWindow.document.write(
        `<p>${item.name} (${item.size}, ${item.temperature}) - ₱${(item.price * item.quantity).toFixed(2)}</p>`
      );
    });

    receiptWindow.document.write('<hr/>');
    receiptWindow.document.write('<p style="text-align:center;">Please proceed to the cashier to pay.</p>');
    receiptWindow.document.write('</body></html>');
    receiptWindow.document.close();

    receiptWindow.focus();
    try {
      // Delay printing slightly to ensure window content is ready
      setTimeout(() => {
        receiptWindow.print();
        receiptWindow.close();
      }, 100);
    } catch (err) {
      console.error('Error printing receipt:', err);
      receiptWindow.close(); // Close window if printing fails
    }
  };

  return (
    <div className="min-h-screen bg-[#eee4d4] flex flex-col items-center justify-start pt-12 px-4">
      <div className="text-center mb-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#4b2e2e] leading-tight">
          Cash Payment
          <br />
          <span className="block text-[#4b2e2e] mt-2">Confirmed</span>
        </h2>
        <p className="text-lg text-[#000000] mt-2">Please proceed to the cashier to pay.</p>
      </div>

      {isLoading ? (
        <div className="text-center mt-4 text-lg text-[#4b2e2e]">Processing your order...</div> // Loading message
      ) : (
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <p className="text-lg text-[#4b2e2e] font-medium">Your Order Number</p>
            <p className="text-6xl font-extrabold text-[#070505] tracking-wider mt-2">{orderNumber}</p>
          </div>

          <div>
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
      )}
    </div>
  );
};

export default PaymentConfirmation;

