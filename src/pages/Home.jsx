import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Link to="/kiosk"> {/* Wrap everything in Link */}
      <div
        className="w-full h-screen bg-cover bg-center relative flex items-center justify-center cursor-pointer"
        style={{
          backgroundImage: "url('/moonbucksbackround.jpg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

        {/* Content */}
        <div className="z-10 text-center text-white px-4">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/moonbuckslogo.png"
              alt="Moonbucks Coffee"
              className="h-64 sm:h-80 md:h-76 drop-shadow-2xl animate-fade-in"
            />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            Moonbucks Coffee
          </h1>

          {/* Tagline */}
          <p className="text-lg text-gray-300 mb-6 italic">
            <span className="typewriter">"Brewed by the Moonlight"</span>
          </p>

          {/* Call to Action */}
          <div className="animate-bounce text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl px-12 py-5 rounded-full shadow-lg inline-block hover:scale-105 transition-transform duration-300">
            Touch anywhere
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Home;
