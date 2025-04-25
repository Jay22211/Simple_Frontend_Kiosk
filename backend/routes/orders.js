const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Counter = require('../models/Counter'); // <-- import Counter model

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { items, paymentMethod, dineOption } = req.body;

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
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders); // Send orders as a response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', detail: err.message });
  }
});

// Update order status to "paid"
router.put('/mark-as-paid/:id', async (req, res) => {
  try {
    const { amountReceived } = req.body; // Amount the customer gave
    const orderId = req.params.id;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure that the amount received is greater than or equal to the total price
    const totalPrice = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (amountReceived < totalPrice) {
      return res.status(400).json({ message: 'Amount received is less than the total price' });
    }

    // Calculate change
    const changeGiven = amountReceived - totalPrice;

    // Update order fields
    order.amountReceived = amountReceived;
    order.changeGiven = changeGiven;
    order.status = 'paid';
    order.paidAt = new Date(); // Store the time of payment

    // Save updated order
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error marking order as paid:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
