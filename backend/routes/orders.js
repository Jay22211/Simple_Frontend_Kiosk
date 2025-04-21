const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Counter = require('../models/Counter'); // <-- import Counter model

// 🔵 Create a new order
router.post('/', async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    // 🟢 Find or create the counter
    let counter = await Counter.findOne({ name: 'orderNumber' });
    if (!counter) {
      counter = await Counter.create({ name: 'orderNumber', value: 100 });
    }

    const orderNumber = `#${counter.value}`;

    const newOrder = new Order({
      orderNumber,
      items,
      paymentMethod,
    });

    await newOrder.save();

    // After saving, increment the counter in DB
    counter.value += 1;
    await counter.save();

    res.status(201).json({ message: 'Order created successfully!', orderNumber });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// 🟡 Fetch all orders (for dashboard)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 }); // Latest orders first
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
