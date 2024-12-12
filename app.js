require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const Cookies = require('js-cookie');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

// Use routes
const inventoryRoutes = require("./api/routes/inventoryRoutes");
const adminRoutes = require("./api/routes/adminRoutes");
const loginRoutes = require("./api/routes/loginRoutes");
const notificationRoutes = require("./api/routes/notificationRoutes");
const chatbotRoutes = require("./api/routes/chatbotRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");

app.use("/api", adminRoutes);
app.use("/api", loginRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", notificationRoutes);
app.use("/api", chatbotRoutes);
app.use("/api", paymentRoutes);

// Set cookies (server-side)
app.get('/set-cookie', (req, res) => {
  res.cookie('myCookie', 'cookieValue', {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
  });
  res.send('Cookie has been set');
});

// Client-side cookie setting example
Cookies.set('myCookie', 'cookieValue', {
  expires: 7,
  secure: true,
  sameSite: 'Lax',
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
