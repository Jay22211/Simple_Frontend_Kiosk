import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useCartStore from "./cartStore";

const CartIcon = () => {
  const { toggleCart, cartItems } = useCartStore();
  const itemCount = cartItems.length;

  // Toggle cart drawer
  const handleClick = () => {
    toggleCart();
  };

  return (
    <div className="fixed top-9 right-9 z-50">
      {/* Animated Cart Icon */}
      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "75px",
          height: "75px",
        }}
      >
        <DotLottieReact
          src="/animations/Carticon.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
            scaleMode: "fit",
          }}
        />
      </div>

      {/* Item count bubble */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
