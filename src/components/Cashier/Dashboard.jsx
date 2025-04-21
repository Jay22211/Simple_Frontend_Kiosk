import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

const CashierDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    // Fetch orders initially
    fetchOrders();

    // Set up polling to refresh orders every 5 seconds
    const intervalId = setInterval(fetchOrders, 5000);

    // Clean up the polling when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleLogout = () => {
    // logic to log out, then redirect
    window.location.href = '/cashier';
  };

  const formatTime = (id) => {
    const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-[#4b2e2e] text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/moonbuckslogo.png" alt="Moonbucks" className="w-12 h-12" />
          <h1 className="text-2xl font-bold">Cashier Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#ecb233] text-[#143d03] px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left - Order list */}
        <div className="w-1/3 border-r p-4 overflow-y-auto bg-[#fdf6ec]">
          <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
          {orders.map(order => (
            <div
              key={order._id}
              className={`p-3 mb-3 rounded-lg cursor-pointer shadow-md border transition hover:scale-[1.01]
                ${selectedOrder?._id === order._id ? 'bg-[#ecb233] border-[#143d03]' : 'bg-white'}`}
              onClick={() => handleSelectOrder(order)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">Order {order.orderNumber}</p>
                  <p className="text-sm text-gray-600">{formatTime(order._id)}</p>
                </div>
                <span className={`text-sm font-bold px-2 py-1 rounded-full
                  ${order.status === 'Paid'
                    ? 'bg-green-200 text-green-800'
                    : order.status === 'Cancelled'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-yellow-200 text-yellow-800'}`}>
                  {order.status || 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Order Details */}
        <div className="w-2/3 p-6 overflow-y-auto">
          {selectedOrder ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Order {selectedOrder.orderNumber}</h2>
              <div className="mb-4">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.size && `Size: ${item.size} `}
                      {item.temperature && `Temp: ${item.temperature} `}
                      × {item.quantity}
                    </p>
                    <p>₱{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <p className="font-bold">Payment: {selectedOrder.paymentMethod}</p>
              <p className="font-bold text-lg mt-2">
                Total: ₱{selectedOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </p>

              <div className="mt-6 flex gap-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Mark as Paid
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  Cancel Order
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select an order to view details.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f5ead1] text-center text-sm text-[#4b2e2e] py-2">
        Moonbucks Smart Kiosk System v1.0
      </footer>
    </div>
  );
};

export default CashierDashboard;
