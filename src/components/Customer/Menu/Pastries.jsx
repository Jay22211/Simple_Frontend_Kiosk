// Pastries.jsx
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import useCartStore from "../cartStore";
import CartDrawer from "../CartDrawer";
import CartIcon from "../CartIcon";

const pastries = [
  {
    id: 31,
    name: "Chocolate Cake",
    description: "Rich, moist chocolate layers with creamy ganache.",
    variations: {
      piece: 90,
      whole: 680,
    },
    img: "/images/ChocolateCake.png",
    alt: "Slice of chocolate cake.",
  },
  {
    id: 32,
    name: "Carrot Cake",
    description: "Spiced carrot cake with cream cheese frosting.",
    variations: {
      piece: 95,
      whole: 700,
    },
    img: "/images/CarrotCake.png",
    alt: "Slice of carrot cake.",
  },
  {
    id: 33,
    name: "Blueberry Cheesecake",
    description: "Classic cheesecake topped with fresh blueberries.",
    variations: {
      piece: 100,
      whole: 750,
    },
    img: "/images/BlueberryCheeseCake.png",
    alt: "Slice of blueberry cheesecake.",
  },
];

const portionOptions = ["Piece", "Whole"];

const getPriceRange = (item) => {
  const prices = Object.values(item.variations);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `₱${min} - ₱${max}`;
};

const Pastries = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState("Piece");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleImg, setBubbleImg] = useState(null);

  const { addToCart } = useCartStore();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedPortion("Piece");
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleAddToOrder = () => {
    addToCart({
      id: selectedItem.id,
      name: selectedItem.name,
      size: selectedPortion,
      temperature: "", // not needed
      price: selectedItem.variations[selectedPortion.toLowerCase()],
      img: selectedItem.img,
    });

    setBubbleImg(selectedItem.img);
    setShowBubble(true);

    setTimeout(() => setShowBubble(false), 1000);
    setTimeout(() => setBubbleImg(null), 1000);

    handleClose();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#eee4d4] to-[#eee4d4]">
      <Sidebar />
      <div className="flex-grow overflow-y-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-[#4b2e2e] mb-10 text-center font-poppins">
          Pastries
        </h1>
        <hr className="border-t-2 border-[#4b2e2e] w-30 mx-auto mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastries.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group bg-[#faf8f0] rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out p-6 cursor-pointer border border-transparent hover:border-[#4b2e2e]/30 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                alt={item.alt}
                src={item.img}
                className="w-full h-[160px] object-contain rounded-xl mb-4 transition-opacity duration-300 group-hover:opacity-90"
              />
              <h3 className="text-2xl font-bold text-[#4b2e2e] text-center font-playfair">
                {item.name}
              </h3>
              <div className="flex justify-center mt-3">
                <div className="bg-[#4b2e2e] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
                  {getPriceRange(item)}
                </div>
              </div>
              <p className="text-center text-sm text-[#4b2e2e] mt-2 italic">
                Piece & Whole options available
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl w-full max-w-4xl relative border border-white/50 transition-transform duration-200 scale-100">
            <div className="absolute top-4 right-5 flex flex-col items-end group">
              <div
                className="absolute top-1 left--1 flex items-center gap-1 whitespace-nowrap group cursor-pointer"
                onClick={handleClose}
              >
                <span className="text-[#4b2e2e] font-medium text-sm sm:text-base group-hover:underline transition-all duration-300">
                  Back to menu
                </span>
                <IoArrowBackCircle className="text-3xl sm:text-4xl text-[#4b2e2e] hover:text-[#2e1b1b] rotate-180 transition-all duration-300 drop-shadow-sm animate-[slideLR_1.2s_infinite]" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <img
                src={selectedItem.img}
                alt={selectedItem.alt}
                className="w-60 h-62 object-contain rounded-xl drop-shadow-lg"
              />

              <div className="flex-1">
                <h2 className="text-3xl font-bold font-playfair text-[#4b2e2e] mb-2">
                  {selectedItem.name}
                </h2>
                <p className="text-gray-600 italic mb-6 max-w-md text-base">
                  {selectedItem.description}
                </p>

                <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-[#4b2e2e] text-center">
  Choose Portion:
</h4>
<div className="flex justify-center gap-6">
                    {portionOptions.map((portion) => (
                      <div
                        key={portion}
                        onClick={() => setSelectedPortion(portion)}
                        className="flex flex-col items-center cursor-pointer group"
                      >
                        <div
                          className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                            selectedPortion === portion
                              ? "bg-[#4b2e2e] text-white shadow-md"
                              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                          }`}
                        >
                          <IoFastFoodOutline className="text-2xl" />
                        </div>
                        <span className="mt-2 text-sm font-medium text-[#4b2e2e]">{portion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f5ead1] rounded-xl p-4 mb-6 text-center shadow-sm border border-[#e4d3b6] mx-auto w-130">
                  <p className="text-sm text-[#4b2e2e] font-semibold mb-1">Your Selection:</p>
                  <p className="text-lg font-playfair text-[#4b2e2e]">
                    {selectedPortion} {selectedItem.name}
                  </p>
                  <p className="text-xl font-bold text-[#4b2e2e]">
                    ₱{selectedItem.variations[selectedPortion.toLowerCase()]}
                  </p>
                </div>

                <button
                  onClick={handleAddToOrder}
                  className="w-full py-4 rounded-full bg-[#4b2e2e] text-white text-xl font-bold shadow-md hover:bg-[#3c2424] transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBubble && (
        <div className="fixed top-30 right-12 z-[9999] animate-floatUp transition-opacity duration-1000">
          <div className="relative bg-white rounded-full shadow-xl border border-[#4b2e2e]/20 w-16 h-16 p-1 flex items-center justify-center">
            <div className="absolute -top-2 right-5.6 w-5 h-5 bg-white transform rotate-45 border-t border-l border-[#4b2e2e]/20" />
            <img
              src={bubbleImg}
              alt="added to cart"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      )}

      <CartIcon />
      <CartDrawer />
    </div>
  );
};

export default Pastries;
