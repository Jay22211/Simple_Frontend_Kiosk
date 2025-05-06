const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Counter = require('../models/Counter'); // <-- import Counter model
const PaidOrder = require('../models/PaidOrder');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { items, paymentMethod, dineOption, totalPrice } = req.body;

    if (!dineOption) {
      return res.status(400).json({ error: "Dine option is required" });
    }

    // Find or create the counter
    let counter = await Counter.findOne({ name: 'orderNumber' });
    if (!counter) {
      counter = await Counter.create({ name: 'orderNumber', value: 100 });
    }

    const orderNumber = `#${counter.value}`;

    const newOrder = new Order({
      orderNumber,
      items,
      paymentMethod,
      dineOption,
      totalPrice,  // Include totalPrice
    });

    try {
      await newOrder.save();
    } catch (saveErr) {
      return res.status(500).json({ error: "Mongoose save error", detail: saveErr.message });
    }

    counter.value += 1;
    await counter.save();

    res.status(201).json({ message: 'Order created successfully!', orderNumber });

  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', detail: err.message });
  }
});

// Get all orders
router.get('/pending', async (req, res) => {
  try {
    const orders = await Order.find({ status: 'pending' });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending orders', detail: err.message });
  }
});


// Update order status to "paid"
router.put('/mark-as-paid/:id', async (req, res) => {
  try {
    const { amountReceived } = req.body;
    const orderId = req.params.id;
    const amountReceivedNumber = Number(amountReceived);

    if (isNaN(amountReceivedNumber)) {
      return res.status(400).json({ message: 'Invalid amount received' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const totalPrice = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (amountReceivedNumber < totalPrice) {
      return res.status(400).json({ message: 'Amount received is less than the total price' });
    }

    const changeGiven = amountReceivedNumber - totalPrice;

    order.amountReceived = amountReceivedNumber;
    order.changeGiven = changeGiven;
    order.status = 'paid';
    order.paidAt = new Date();

    await order.save();

    const paidOrder = new PaidOrder({
      oorderNumber: Number(order.orderNumber.toString().replace('#', '')),
      items: order.items,
      totalPrice: totalPrice,
      amountReceived: Number(order.amountReceived),
  changeGiven: Number(order.changeGiven),
      status: 'paid',
      paidAt: order.paidAt,
      paymentMethod: order.paymentMethod,
      dineOption: order.dineOption,
    });

    await paidOrder.save();
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: 'Order archived to Paid Order successfully', status: 'paid' });
  } catch (error) {
    console.error('Error archiving order:', error);
    res.status(500).json({ message: 'Server error', detail: error.message });
  }
});

module.exports = router;
