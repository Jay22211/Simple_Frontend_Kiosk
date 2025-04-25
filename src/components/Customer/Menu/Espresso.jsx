import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { AiFillRest } from "react-icons/ai";
import { TbCoffee, TbCoffeeOff } from "react-icons/tb";
import { IoArrowBackCircle } from "react-icons/io5"; 
import useCartStore from "../cartStore";
import CartDrawer from "../CartDrawer";
import CartIcon from "../CartIcon"; 

  const espresso = [
    {
      id: 1,
      name: "Americano",
      description: "Bold and rich coffee with a smooth finish",
      pricing: {
        Hot: { Tall: 70, Grande: 85 },
        Cold: { Tall: 80, Grande: 95 },
      },
      img: "/images/Americano.png",
      alt: "Hot espresso Americano in a ceramic cup.",
    },
    {
      id: 2,
      name: "Latte",
      description: "Enjoy a harmonious balance of smooth espresso and milk.",
      pricing: {
        Hot: { Tall: 90, Grande: 110 },
        Cold: { Tall: 100, Grande: 120 },
      },
      img: "/images/Latte.png",
      alt: "Smooth classic latte with milk.",
    },
    {
      id: 3,
      name: "Caramel Macchiato",
      description: "A perfect fusion of rich espresso, steamed milk, and a decadent swirl of caramel.",
      pricing: {
        Hot: { Tall: 100, Grande: 120 },
        Cold: { Tall: 110, Grande: 130 },
      },
      img: "/images/CaramelMacchiato.png",
      alt: "Rich caramel macchiato with espresso.",
    },
    {
      id: 4,
      name: "Salted Caramel",
      description: "Dive into the rich and flavorful taste of Salted Caramel, featuring the perfect balance of sweet and salty flavors.",
      variations: {
        hot: { tall: 115, grande: 130 },
        iced: { tall: 125, grande: 140 },
      },
      img: "/images/SaltedCaramel.png",
      alt: "Sweet and salty caramel espresso drink.",
    },
    {
      id: 5,
      name: "Spanish Latte",
      description: "Enjoy a delightful fusion of bold espresso and rich condensed milk.",
      variations: {
        hot: { tall: 95, grande: 110 },
        iced: { tall: 105, grande: 120 },
      },
      img: "/images/SpanishLatte.png",
      alt: "Creamy Spanish latte served iced.",
    },
    {
      id: 6,
      name: "Vanilla Latte",
      description: "Enjoy a perfect blend of smooth espresso and creamy vanilla!",
      variations: {
        hot: { tall: 90, grande: 105 },
        iced: { tall: 100, grande: 115 },
      },
      img: "/images/VanillaLatte.png",
      alt: "Smooth vanilla latte in a cozy cup.",
    },
    {
      id: 7,
      name: "Dirty Matcha",
      description: "Enjoy the delightful combination of smooth and creamy Matcha coffee.",
      variations: {
        hot: { tall: 95, grande: 110 },
        iced: { tall: 105, grande: 120 },
      },
      img: "/images/DirtyMatcha.png",
      alt: "Matcha latte with a shot of espresso.",
    },
    {
      id: 8,
      name: "Ube Latte",
      description: "Experience the unique and delightful flavor of this Ube Latte.",
      variations: {
        hot: { tall: 100, grande: 115 },
        iced: { tall: 110, grande: 125 },
      },
      img: "/images/UbeLatte.png",
      alt: "Vibrant purple ube latte with creamy texture.",
    },
    {
      id: 9,
      name: "White Chocolate Mocha",
      description: "A delightful blend of rich white chocolate and aromatic espresso, creating a creamy and indulgent coffee experience",
      variations: {
        hot: { tall: 110, grande: 125 },
        iced: { tall: 120, grande: 135 },
      },
      img: "/images/WhiteChocolateMocha.png",
      alt: "Rich white chocolate mocha topped with cream.",
    },
  ];

const sizeOptions = ["Tall", "Grande"];
const temperatureOptions = ["Hot", "Cold"]; 

const getUnifiedPricing = (item) => {
  if (item.pricing) return item.pricing;
  if (item.variations) {
    return {
      Hot: {
        Tall: item.variations.hot.tall,
        Grande: item.variations.hot.grande,
      },
      Cold: {
        Tall: item.variations.iced.tall,
        Grande: item.variations.iced.grande,
      },
    };
  }
  return {};
};

const getPriceRange = (item) => {
  const pricing = getUnifiedPricing(item);
  const prices = Object.values(pricing).flatMap((sizeObj) =>
    Object.values(sizeObj)
  );
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `₱${min} - ₱${max}`;
};

const getSelectedPrice = (item, size, temp) => {
  const pricing = getUnifiedPricing(item);
  return pricing?.[temp]?.[size] ?? 0;
};

const Espresso = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Grande");
  const [selectedTemp, setSelectedTemp] = useState("Hot");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleImg, setBubbleImg] = useState(null);
  

  const { addToCart } = useCartStore();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedSize("Grande");
    setSelectedTemp("Hot");
    
  };


  const handleClose = () => {         
    setSelectedItem(null);
  };

  const handleAddToOrder = () => {
    addToCart({
      id: selectedItem.id,
      name: selectedItem.name,
      size: selectedSize,
      temperature: selectedTemp,
      price: getSelectedPrice(selectedItem, selectedSize, selectedTemp),
      img: selectedItem.img,
    });
  
    setBubbleImg(selectedItem.img); // cache image
    setShowBubble(true);
  
    setTimeout(() => setShowBubble(false), 1000);
    setTimeout(() => setBubbleImg(null), 1000); // optional cleanup
  
    handleClose(); // Close modal
  };


  return (
    <div className="flex h-screen bg-gradient-to-br from-[#eee4d4] to-[#eee4d4]">
      <Sidebar />
      <div className="flex-grow overflow-y-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-[#4b2e2e] mb-10 text-center font-poppins">
          Espresso
        </h1>

        <hr className="border-t-2 border-[#4b2e2e] w-30 mx-auto mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {espresso.map((item, index) => (
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
                Available in hot & cold
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl w-full max-w-4xl relative border border-white/50 transition-transform duration-200 scale-100">
    <div className="absolute top-4 right-5 flex flex-col items-end group">
      

      <div className="absolute top-1 left--1 flex items-center gap-1 whitespace-nowrap group cursor-pointer" onClick={handleClose}>
    <span className="text-[#4b2e2e] font-medium text-sm sm:text-base group-hover:underline transition-all duration-300">
      Back to menu
    </span>
    <IoArrowBackCircle
    className="text-3xl sm:text-4xl text-[#4b2e2e] hover:text-[#2e1b1b] rotate-180 transition-all duration-300 drop-shadow-sm animate-[slideLR_1.2s_infinite]"
  />
  </div>

</div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
        {/* Image Left */}
        <img
          src={selectedItem.img}
          alt={selectedItem.alt}
          className="w-60 h-62 object-contain rounded-xl drop-shadow-lg"
        />

        {/* Content Right */}
        <div className="flex-1">
        <div className="mb-4">
        <h2 className="text-3xl font-bold font-playfair text-[#4b2e2e] mb-2">
  {selectedItem.name}
</h2>
</div>
          <p className="text-gray-600 italic mb-6 max-w-md text-base">
            {selectedItem.description}
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-start mb-6">
            {/* Size Options */}
            <div className="flex-1">
              <h4 className="text-md font-semibold mb-3 text-[#4b2e2e] text-center md:text-left">
                Size Options:
              </h4>
              <div className="flex justify-center md:justify-start gap-6">
                {sizeOptions.map((size) => (
                  <div
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <div
                      className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-[#4b2e2e] text-white shadow-md"
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                      }`}
                    >
                      <AiFillRest className={size === "Tall" ? "text-xl" : "text-3xl"} />
                    </div>
                    <span className="mt-2 text-sm font-medium text-[#4b2e2e]">{size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Temperature Options */}
            <div className="flex-1">
              <h4 className="text-md font-semibold mb-3 text-[#4b2e2e] text-center md:text-left">
              Drink Type:
              </h4>
              <div className="flex justify-center md:justify-start gap-6">
                {temperatureOptions.map((temp) => {
                  const Icon = temp === "Hot" ? TbCoffee : TbCoffeeOff;
                  return (
                    <div
                      key={temp}
                      onClick={() => setSelectedTemp(temp)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div
                        className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                          selectedTemp === temp
                            ? "bg-[#4b2e2e] text-white shadow-md"
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                        }`}
                      >
                        <Icon className="text-2xl" />
                      </div>
                      <span className="mt-2 text-sm font-medium text-[#4b2e2e]">{temp}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


          <div className="bg-[#f5ead1] rounded-xl p-4 mb-6 text-center shadow-sm border border-[#e4d3b6] mx-auto w-130">
  <p className="text-sm text-[#4b2e2e] font-semibold mb-1">Your Selection:</p>
  <p className="text-lg font-playfair text-[#4b2e2e]">
    {selectedSize} {selectedItem.name} ({selectedTemp})
  </p>
  <p className="text-xl font-bold text-[#4b2e2e]">₱{getSelectedPrice(selectedItem, selectedSize, selectedTemp)}</p>
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
  <div className="fixed top-23 right-13 z-[9999] animate-floatUp transition-opacity duration-1000">
    <div className="relative bg-white rounded-full shadow-xl border border-[#4b2e2e]/20 w-16 h-16 p-1 flex items-center justify-center">
      {/* Bubble tail/arrow */}
      <div className="absolute -top-2 right-5.6 w-5 h-5 bg-white transform rotate-45 border-t border-l border-[#4b2e2e]/20" />

      {/* Product image */}
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

export default Espresso;
