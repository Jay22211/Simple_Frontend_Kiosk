import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "./cartStore";

const CartIcon = () => {
  const { toggleCart, cartItems } = useCartStore();

  const itemCount = cartItems.length;

  return (
    <button
      onClick={toggleCart}
      className="fixed top-9 right-15 bg-[#4b2e2e] text-white p-3 rounded-full shadow-md hover:bg-[#5c3a3a] transition-colors z-50"
    >
      <FaShoppingCart size={30} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-s rounded-full px-1.5">
          {itemCount}
        </span> 
      )}
    </button>
  );
};

export default CartIcon;