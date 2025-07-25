require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});