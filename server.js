require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { getDb } = require('./db/init');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize DB on startup
getDb();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/superAdmin'));
app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/customer', require('./routes/customer'));

// Page routes — serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/super-admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'super-admin.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/customer', (req, res) => res.sendFile(path.join(__dirname, 'public', 'customer.html')));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n  RestroHub running at http://localhost:${PORT}\n`);
  console.log('  Super Admin  — superadmin / admin123');
  console.log('  Restaurant 1 — owner@goldenspoon.in / pass123');
  console.log('  Restaurant 2 — hello@urbanbites.in / pass123\n');
});