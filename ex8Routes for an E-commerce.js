// npm install express

const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample Users
let users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    address: "123 Main St, Springfield",
    phone: "123-456-7890",
  },
];

// Sample Products
let products = [
  {
    id: 101,
    name: "Smartphone",
    description: "Latest 5G smartphone with 128GB storage",
    price: 599.99,
    category: "Electronics",
    stock: 50,
  },
];

// Sample Orders
let orders = [
  {
    orderId: 1001,
    userId: 1,
    products: [
      { productId: 101, quantity: 1 },
      { productId: 103, quantity: 2 },
    ],
    totalAmount: 899.97,
    status: "Shipped",
    orderDate: "2024-11-20",
  },
];

// Product Routes
app.get('/products', (req, res) => {
  res.json({ message: "List of products", data: products });
});

app.post('/products', (req, res) => {
  const product = req.body;
  product.id = products.length + 101; // Auto-generate product ID
  products.push(product);
  res.json({ message: "Product added", product });
});

// User Routes
app.get('/users', (req, res) => {
  res.json({ message: "List of users", data: users });
});

app.post('/users', (req, res) => {
  const user = req.body;
  user.id = users.length + 1; // Auto-generate user ID
  users.push(user);
  res.json({ message: "User registered", user });
});

// Order Routes
app.get('/orders', (req, res) => {
  res.json({ message: "List of orders", data: orders });
});

app.post('/orders', (req, res) => {
  const order = req.body;
  order.orderId = orders.length + 1001; // Auto-generate order ID
  orders.push(order);
  res.json({ message: "Order placed", order });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
