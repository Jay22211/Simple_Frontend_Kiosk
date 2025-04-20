import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Kiosk from "./pages/Kiosk";
import Cashier from "./pages/Cashier";  
import Kitchen from "./pages/Kitchen";
import Espresso from "./components/Customer/Menu/Espresso";
import FruitySoda from "./components/Customer/Menu/FruitySoda";
import NonCoffee from "./components/Customer/Menu/NonCoffee";
import Pastries from "./components/Customer/Menu/Pastries";
import PaymentMethod from "./components/Customer/PaymentMethod";  // PaymentMethod component
import CashConfirmation from "./components/Customer/PaymentConfirmation"; // CashConfirmation component
/*import GCashPage from "./pages/GCashPage"; // We'll create this later */

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kiosk" element={<Kiosk />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/payment-method" element={<PaymentMethod />} />  {/* Corrected this path */}
        <Route path="/payment/cash" element={<CashConfirmation />} />
        <Route path="/kiosk/espresso" element={<Espresso />} />
        <Route path="/kiosk/nonCoffee" element={<NonCoffee />} />
        <Route path="/kiosk/fruitySoda" element={<FruitySoda />} />
        <Route path="/kiosk/pastries" element={<Pastries />} />
      </Routes>
    </Router>
  );
}

export default App;
