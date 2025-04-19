import React from 'react';
import Sidebar from "../components/Customer/Sidebar";


const Kiosk = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-8 flex flex-col items-center justify-center text-gray-500 text-xl">
        <img src="/malu.jpeg" alt="Select a category" className="w-64 h-auto mb-4" />
        <p>Please select a category from the sidebar.</p>
      </div>
    </div>
  );
};

export default Kiosk;