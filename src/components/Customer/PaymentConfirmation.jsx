import React, { useEffect, useState, useRef } from "react";
import useCartStore from "../Customer/cartStore";
import { useNavigate } from "react-router-dom";

const PaymentConfirmation = () => {
  const { cartItems, dineOption, clearCart, closeCart } = useCartStore();
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();
  const hasSentOrder = useRef(false);

  useEffect(() => {
    if (hasSentOrder.current) return;
    hasSentOrder.current = true;

    const sendOrder = async () => {
      try {
        const totalPrice = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
    
        console.log("Sending order with totalPrice:", totalPrice); // 👈 Add this
    
        const res = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            paymentMethod: "cash",
            dineOption,
            totalPrice, // 👈 Make sure this is here
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
  }, [cartItems, dineOption]);

  const handleFinish = () => {
    printReceipt();
    clearCart();
    closeCart();
    navigate("/");
  };

  const printReceipt = () => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const receiptWindow = window.open("", "PRINT", "height=600,width=400");
    receiptWindow.document.write("<html><head><title>Receipt</title>");
    receiptWindow.document.write("</head><body>");
    receiptWindow.document.write(
      `<h2 style="text-align:center;">Moonbucks Coffee</h2>`
    );
    receiptWindow.document.write(
      `<p>Order Number: <strong>${orderNumber}</strong></p>`
    );
    receiptWindow.document.write(`<p>Dine Option: ${dineOption}</p>`);
    receiptWindow.document.write("<hr/>");

    cartItems.forEach((item) => {
      receiptWindow.document.write(
        `<p>${item.name} (${item.size}, ${item.temperature}) - ₱${(
          item.price * item.quantity
        ).toFixed(2)}</p>`
      );
    });

    receiptWindow.document.write("<hr/>");
    receiptWindow.document.write(`<p><strong>Total: ₱${totalPrice.toFixed(2)}</strong></p>`);
    receiptWindow.document.write(
      "<p style='text-align:center;'>Please proceed to the cashier to pay.</p>"
    );
    receiptWindow.document.write("</body></html>");
    receiptWindow.document.close();

    receiptWindow.focus();
    setTimeout(() => {
      receiptWindow.print();
      receiptWindow.close();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#eee4d4] flex flex-col items-center justify-start pt-12 px-4">
      <div className="text-center mb-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#4b2e2e] leading-tight">
          Cash Payment
          <br />
          <span className="block text-[#4b2e2e] mt-2">Confirmed</span>
        </h2>
        <p className="text-lg text-[#000000] mt-2">
          Please proceed to the cashier to pay.
        </p>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <p className="text-lg text-[#4b2e2e] font-medium">Your Order Number</p>
          <p className="text-6xl font-extrabold text-[#070505] tracking-wider mt-2">
            {orderNumber}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#4b2e2e]">
            Items Ordered:
          </h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="text-sm text-gray-800 flex justify-between"
              >
                <span>
                  {item.name} ({item.size}, {item.temperature})
                </span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <p className="text-right font-semibold text-[#4b2e2e]">
            Total: ₱
            {cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
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




