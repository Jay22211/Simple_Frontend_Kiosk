// archivedOrder.js


const mongoose = require('mongoose');

const paidOrderSchema = new mongoose.Schema({
  orderNumber: Number,
  items: Array,
  totalPrice: Number,
  amountReceived: Number,
  changeGiven: Number,
  status: {
    type: String,
    default: 'paid',
  },
  paidAt: Date,
  paymentMethod: String,
  dineOption: String,
});

module.exports = mongoose.model('PaidOrder', paidOrderSchema);
