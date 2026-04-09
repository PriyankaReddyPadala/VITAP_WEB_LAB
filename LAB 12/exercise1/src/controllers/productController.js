const store = require('../data/store');

// GET /api/products
const getAllProducts = (req, res) => {
  const { category } = req.query; // supports ?category=Electronics
  let results = store.products;
  if (category) {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  res.json({ success: true, count: results.length, data: results });
};

// GET /api/products/:id
const getProductById = (req, res) => {
  const product = store.products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, data: product });
};

// POST /api/products
const createProduct = (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ success: false, error: 'Name and price are required' });
  }
  const newProduct = {
    id: store.products.length + 1,
    name,
    price: parseFloat(price),
    category: category || 'General',
  };
  store.products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
};

// PUT /api/products/:id
const updateProduct = (req, res) => {
  const index = store.products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: 'Product not found' });

  store.products[index] = { ...store.products[index], ...req.body };
  res.json({ success: true, data: store.products[index] });
};

// DELETE /api/products/:id
const deleteProduct = (req, res) => {
  const index = store.products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: 'Product not found' });

  const deleted = store.products.splice(index, 1);
  res.json({ success: true, message: 'Product deleted', data: deleted[0] });
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };