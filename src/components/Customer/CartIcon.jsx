import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useCartStore from "./cartStore";

const CartIcon = () => {
  const { toggleCart, cartItems } = useCartStore();
  const itemCount = cartItems.length;

  const handleClick = () => {
    toggleCart(); // Call the toggleCart function when the Lottie icon is tapped
  };

  return (
    <div className="fixed top-9 right-9 z-50">
      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "75px", // Reduced the size to 75px (you can adjust this value)
          height: "75px", // Reduced the size to 75px
        }}
      >
        <DotLottieReact
          src="/animations/Carticon.lottie" // Reference the Lottie file from the public directory
          loop
          autoplay
          style={{ width: "100%", height: "100%" }} // Ensures Lottie icon fills the container
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice", // Ensures aspect ratio is preserved when scaling
            scaleMode: "fit", // Scaling method
          }}
        />
      </div>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;


