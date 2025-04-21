// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      size: String,
      temperature: String,
      price: Number,
      quantity: Number,
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);

