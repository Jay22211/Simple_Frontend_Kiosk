import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

const CashierDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [amountGiven, setAmountGiven] = useState('');
  const audioRef = React.useRef(new Audio('/soundeffects/Alert.mp3')); // Corrected path
  const [prevOrderCount, setPrevOrderCount] = useState(0);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      if (res.data.length > prevOrderCount) {
        audioRef.current.play();    
      }
      setOrders(res.data);
      setPrevOrderCount(res.data.length);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    // Load audio after user interacts (fixes autoplay restriction)
    const unlockAudio = () => {
      audioRef.current.load();
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);

    fetchOrders();
    const intervalId = setInterval(fetchOrders, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setAmountGiven(''); // Reset amount when selecting new order
  };

  const handleLogout = () => {
    window.location.href = '/cashier';
  };

  const formatTime = (id) => {
    const date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
    return date.toLocaleTimeString();
  };

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalAmount = selectedOrder ? calculateTotal(selectedOrder.items) : 0;
  const change = amountGiven ? Math.max(0, amountGiven - totalAmount).toFixed(2) : '';

  // Function to handle marking order as paid
  const handleMarkAsPaid = async () => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/orders/mark-as-paid/${selectedOrder._id}`,
      {
        amountGiven: parseFloat(amountGiven),
      }
    );

    // Handle successful payment marking
    if (response.data.status === 'Paid') {
      alert('Order marked as paid!');
      fetchOrders(); // Refetch orders to update the status
      setSelectedOrder(null); // Clear the selected order
    } else {
      alert('Failed to mark order as paid.');
    }
  } catch (error) {
    console.error('Error marking order as paid:', error);
    alert('An error occurred while marking the order as paid.');
  }
};


  return (
    <div className="flex flex-col h-screen bg-[#f4f4f9]">
      {/* Header */}
      <header className="bg-[#4b2e2e] text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <img src="/moonbuckslogo.png" alt="Moonbucks" className="w-12 h-12" />
          <h1 className="text-2xl font-bold">Cashier Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-[#ecb233] text-[#143d03] px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition duration-300 hover:bg-[#e0a32d]"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left - Order list */}
        <div className="w-1/3 border-r p-4 overflow-y-auto bg-[#fdf6ec]">
          <h2 className="text-xl font-semibold mb-4 text-[#4b2e2e]">Pending Orders</h2>
          {orders.map((order) => (
            <div
              key={order._id}
              className={`p-4 mb-4 rounded-lg cursor-pointer shadow-lg transition duration-300 transform hover:scale-[1.02]
                ${selectedOrder?._id === order._id ? 'bg-[#ecb233] border-[#143d03]' : 'bg-white border-[#ddd]'} 
                border hover:shadow-xl`}
              onClick={() => handleSelectOrder(order)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">Order {order.orderNumber}</p>
                  <p className="text-sm text-gray-600">{formatTime(order._id)}</p>
                </div>
                <span
                  className={`text-sm font-bold px-2 py-1 rounded-full
                    ${order.status === 'Paid'
                      ? 'bg-green-200 text-green-800'
                      : order.status === 'Cancelled'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-yellow-200 text-yellow-800'}`}
                >
                  {order.status || 'Pending'}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <strong>Order Type:</strong> {order.dineOption === 'dine-in' ? 'Dine In' : 'Take Out'}
              </div>
            </div>
          ))}
        </div>

        {/* Right - Order Details */}
        <div className="w-2/3 p-6 overflow-y-auto">
          {selectedOrder ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-[#4b2e2e]">Order {selectedOrder.orderNumber}</h2>
              <div className="mb-4">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="mb-4 border-b pb-4 flex flex-col space-y-2">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        {item.size && (
                          <p className="text-sm font-medium text-gray-600">
                            <strong>Size:</strong> {item.size}
                          </p>
                        )}
                        {item.temperature && (
                          <p className="text-sm font-medium text-gray-600">
                            <strong>Temp:</strong> {item.temperature}
                          </p>
                        )}
                        <p className="text-sm font-medium text-gray-600">
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-[#4b2e2e]">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-bold">Payment: {selectedOrder.paymentMethod}</p>

              <p className="font-bold text-xl mt-4 text-[#4b2e2e]">Total: ₱{totalAmount.toFixed(2)}</p>

              {/* Amount Given & Change */}
              <div className="mt-4 space-y-2">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Amount Given (₱):</label>
                  <input
                    type="number"
                    value={amountGiven}
                    onChange={(e) => setAmountGiven(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter cash amount"
                  />
                </div>
                <div className="text-lg font-bold text-green-700">
                  Change: {change !== '' ? `₱${change}` : '₱0.00'}
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  disabled={!amountGiven || parseFloat(amountGiven) < totalAmount}
                  onClick={handleMarkAsPaid}  // Call the function here
                  className={`px-6 py-3 rounded-lg transition duration-300 font-semibold ${
                    !amountGiven || parseFloat(amountGiven) < totalAmount
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  Mark as Paid
                </button>

                <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300">
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
      <footer className="bg-[#f5ead1] text-center text-sm text-[#4b2e2e] py-2 shadow-inner">
        Moonbucks Smart Kiosk System v1.0
      </footer>
    </div>
  );
};

export default CashierDashboard;
