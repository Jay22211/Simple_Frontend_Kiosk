const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Counter = require('../models/Counter'); 
const PaidOrder = require('../models/PaidOrder'); 

// Create a new order
router.post('/', async (req, res) => {
  try {
    // Extract relevant order details from the request body
    const { items, paymentMethod, dineOption, totalPrice } = req.body;

    // Validation: Ensure 'dineOption' is provided (either Dine In or Take Out)
    if (!dineOption) {
      return res.status(400).json({ error: "Dine option is required" });
    }

    // Find or create the counter for order numbers (ensures order numbers are sequential)
    let counter = await Counter.findOne({ name: 'orderNumber' });
    if (!counter) {
      counter = await Counter.create({ name: 'orderNumber', value: 100 }); // Start at 100
    }

    // Generate order number based on the counter value
    const orderNumber = `#${counter.value}`;

    // Create new order using the order details from the request
    const newOrder = new Order({
      orderNumber,
      items,
      paymentMethod,
      dineOption,
      totalPrice, // Include totalPrice in the order schema
    });

    // Try saving the new order to the database
    try {
      await newOrder.save();
    } catch (saveErr) {
      // Handle error in case saving fails
      return res.status(500).json({ error: "Mongoose save error", detail: saveErr.message });
    }

    // Increment the counter value for the next order
    counter.value += 1;
    await counter.save(); // Save updated counter value

    // Send success response with the order number
    res.status(201).json({ message: 'Order created successfully!', orderNumber });

  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({ error: 'Failed to create order', detail: err.message });
  }
});

// Get all pending orders
router.get('/pending', async (req, res) => {
  try {
    // Fetch orders that are still pending from the database
    const orders = await Order.find({ status: 'pending' });
    res.status(200).json(orders); // Send the list of pending orders
  } catch (err) {
    // Handle any errors in fetching orders
    res.status(500).json({ error: 'Failed to fetch pending orders', detail: err.message });
  }
});

// Update order status to "paid"
router.put('/mark-as-paid/:id', async (req, res) => {
  try {
    // Extract amount received from the request body and order ID from the URL params
    const { amountReceived } = req.body;
    const orderId = req.params.id;
    const amountReceivedNumber = Number(amountReceived); // Ensure amount is a number

    // Validation: Ensure the amount received is valid
    if (isNaN(amountReceivedNumber)) {
      return res.status(400).json({ message: 'Invalid amount received' });
    }

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Calculate total price for the order by summing up item prices
    const totalPrice = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Validation: Ensure that the amount received is greater than or equal to the total price
    if (amountReceivedNumber < totalPrice) {
      return res.status(400).json({ message: 'Amount received is less than the total price' });
    }

    // Calculate the change to be given to the customer
    const changeGiven = amountReceivedNumber - totalPrice;

    // Update order details with payment information
    order.amountReceived = amountReceivedNumber;
    order.changeGiven = changeGiven;
    order.status = 'paid'; // Update the status to 'paid'
    order.paidAt = new Date(); // Add the payment timestamp

    // Save updated order to the database
    await order.save();

    // Create a new PaidOrder document to archive the completed order
    const paidOrder = new PaidOrder({
      orderNumber: Number(order.orderNumber.toString().replace('#', '')), // Extract order number as number
      items: order.items,
      totalPrice: totalPrice,
      amountReceived: Number(order.amountReceived),
      changeGiven: Number(order.changeGiven),
      status: 'paid',
      paidAt: order.paidAt,
      paymentMethod: order.paymentMethod,
      dineOption: order.dineOption,
    });

    // Save the completed order in the PaidOrder collection
    await paidOrder.save();

    // Delete the order from the 'Order' collection as it's now paid and archived
    await Order.findByIdAndDelete(orderId);

    // Send success response after the order has been archived
    res.status(200).json({ message: 'Order archived to Paid Order successfully', status: 'paid' });
  } catch (error) {
    // Handle errors during payment processing and order archiving
    console.error('Error archiving order:', error);
    res.status(500).json({ message: 'Server error', detail: error.message });
  }
});

module.exports = router;
