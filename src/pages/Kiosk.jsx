import React from 'react';

const Kiosk = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <img 
        src="/malu.jpeg" // Replace with your actual image path
        alt="Moonbucks Kiosk"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};
export default Kiosk;