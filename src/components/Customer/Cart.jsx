import React from 'react';

const CartItem = ({ name, price, img }) => (
  <div className="flex items-center justify-between mb-4">
    <img src={img} alt={name} className="w-12 h-12 rounded mr-2" />
    <div className="flex-1">
      <p className="text-sm font-medium">{name}</p>
      <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
    </div>
    <div className="flex flex-col items-center">
      <button className="text-green-500">↑</button>
      <span>1</span>
      <button className="text-green-500">↓</button>
    </div>
  </div>
);

const Cart = () => {
  return (
    <div className="w-1/4 bg-white border-l p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4">My Cart (2)</h2>
        <CartItem name="Chilaai Salad" price={6.5} img="/chili.png" />
        <CartItem name="Onion Rings" price={6.5} img="/onion.png" />
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>$32.50</span>
        </div>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;