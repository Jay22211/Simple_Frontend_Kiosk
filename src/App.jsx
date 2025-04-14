import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Kiosk from "./pages/Kiosk";
import Cashier from "./pages/Cashier";  
import Kitchen from "./pages/Kitchen";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/kitchen" element={<Kitchen />} />
      </Routes>
    </Router>
  );
}

export default App;