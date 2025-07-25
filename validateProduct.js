module.exports = (req, res, next) => {
  const { name, price, category, inStock } = req.body;
  if (!name || !category || typeof price !== 'number' || typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'Invalid product data' });
  }
  next();
};