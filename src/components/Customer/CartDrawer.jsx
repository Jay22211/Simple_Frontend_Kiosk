import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import useCartStore from "./cartStore";
import { HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart, clearCart, addToCart } = useCartStore();
  const navigate = useNavigate(); // Initialize navigate

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Function to handle checkout button click
  const handleCheckout = () => {
    navigate("/payment-method"); // Redirect to the PaymentMethod page
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex">
        <div className="w-1/3 bg-[#4b2e2e] relative">
          <button
            onClick={closeCart}
            aria-label="Return to Menu"
            className="absolute top-6 left-6 flex items-center text-white gap-2"
          >
            <IoArrowBackCircle className="text-3xl text-[#eee4d4] hover:text-[#fafafa]" />
            <span className="text-lg text-[#eee4d4] hover:text-[#fafafa]">Return to Menu</span>
          </button>
        </div>

        <div className="w-2/3 flex flex-col">
          <div className="p-6 flex items-start justify-between border-b">
            <h2 className="text-2xl font-bold text-[#4b2e2e]">Your Order</h2>
            {cartItems.length > 0 && (
              <button onClick={clearCart} className="text-sm text-red-500 hover:underline">
                Clear All
              </button>
            )}
          </div>

          <div className="px-6 py-2 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 italic">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-3 bg-white p-4 rounded-lg shadow-lg relative"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-[#4b2e2e]">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.size} • {item.temperature}
                    </p>
                    <p className="text-[#4b2e2e] font-bold">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-center justify-between gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="w-6 h-6 flex items-center justify-center text-white bg-[#4b2e2e] hover:bg-[#3a2323] rounded"
                    >
                      +
                    </button>
                    <span className="text-sm text-[#4b2e2e] font-medium">{item.quantity}</span>
                    {item.quantity > 1 ? (
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 flex items-center justify-center text-white bg-gray-400 hover:bg-gray-500 rounded"
                      >
                        -
                      </button>
                    ) : (
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 flex items-center justify-center text-white bg-red-500 hover:bg-red-600 rounded"
                        aria-label="Remove item"
                      >
                        <HiTrash className="text-base" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="absolute bottom-0 right-0 w-2/3 p-6 bg-white border-t">
              <div className="flex justify-between mb-4 text-lg font-bold text-[#4b2e2e]">
                <span>Total</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout} // Trigger checkout navigation
                className="w-full bg-[#4b2e2e] text-white py-2 rounded hover:bg-[#3a2323] transition"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
