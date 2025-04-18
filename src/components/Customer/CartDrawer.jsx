import React from "react";
import useCartStore from "./cartStore";

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart } = useCartStore();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold text-[#4b2e2e]">Your Order</h2>
        <button onClick={closeCart} className="text-xl text-[#4b2e2e] hover:text-red-500">&times;</button>
      </div>

      <div className="p-6 overflow-y-auto space-y-4">
        {cartItems.length === 0 ? ( 
          <p className="text-gray-500 italic">Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 border-b pb-3">
              <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded" />
              <div>
                <h4 className="font-semibold text-[#4b2e2e]">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.size} • {item.temperature}</p>
                <p className="text-[#4b2e2e] font-bold">₱{item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartDrawer;