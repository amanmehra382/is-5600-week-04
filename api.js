// api.js

const path = require('path');
const Products = require('./products');
const autoCatch = require('./lib/auto-catch');

// Route Handlers
async function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

async function updateProduct(req, res) {
    const { id } = req.params;
    const product = await Products.update(id, req.body);
    res.json(product);
  }

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  res.json(await Products.list({ offset: Number(offset), limit: Number(limit), tag }));
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) {
    return next();  // Calls middleware.notFound
  }
  res.json(product);
}

async function createProduct(req, res) {
  const product = await Products.create(req.body);
  res.status(201).json(product);
}



async function deleteProduct(req, res) {
  const { id } = req.params;
  await Products.delete(id);
  res.status(202).json({ message: 'Product deleted' });
}

// Exporting the functions directly
module.exports = {
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
