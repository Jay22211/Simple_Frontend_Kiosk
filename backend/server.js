// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orders');
const mongoURI = process.env.MONGO_URI;



const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Routes
app.use('/api/orders', orderRoutes);
