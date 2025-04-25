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
  totalPrice: {
    type: Number,
    required: true,
  },
  amountReceived: {
    type: Number,
    default: 0,
  },
  changeGiven: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending',
  },
  paidAt: {
    type: Date,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  dineOption: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);