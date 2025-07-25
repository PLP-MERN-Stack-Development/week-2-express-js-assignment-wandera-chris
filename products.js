const express = require('express');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const validate = require('../middleware/validateProduct');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

let products = [];

// Middleware
router.use(auth);

// GET all products with filtering and pagination
router.get('/', (req, res) => {
  let filtered = products;
  if (req.query.category) {
    filtered = filtered.filter(p => p.category === req.query.category);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  res.json(paginated);
});

// GET product by ID
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST new product
router.post('/', validate, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', validate, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  const { name, description, price, category, inStock } = req.body;
  products[index] = { ...products[index], name, description, price, category, inStock };
  res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

// Search
router.get('/search', (req, res) => {
  const term = req.query.q?.toLowerCase();
  const result = products.filter(p => p.name.toLowerCase().includes(term));
  res.json(result);
});

// Stats
router.get('/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;