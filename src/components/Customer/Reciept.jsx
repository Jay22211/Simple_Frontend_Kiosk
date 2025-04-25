import React from 'react';

const Receipt = ({ orderNumber, cartItems, dineOption }) => {
  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2 style={{ fontSize: "24px", textAlign: "center" }}>Moonbucks Kiosk</h2>
      <p>Order Number: <strong>{orderNumber}</strong></p>
      <p>Dine Option: {dineOption}</p>
      <hr />

      <ul>
        {cartItems.map((item, idx) => (
          <li key={idx}>
            {item.name} ({item.size}, {item.temperature}) - ₱{(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <hr />
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Please proceed to the cashier to pay.
      </p>
    </div>
  );
};

export default Receipt;
