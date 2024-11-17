const fs = require('fs').promises;
const path = require('path');

const productsFilePath = path.join(__dirname, 'data/products.json');

async function listProducts({ offset = 0, limit = 25, tag } = {}) {
  const data = await fs.readFile(productsFilePath, 'utf8');
  let products = JSON.parse(data);

  if (tag) {
    products = products.filter(product => product.tags.includes(tag));
  }

  return products.slice(offset, offset + limit);
}

async function getProductById(id) {
  const data = await fs.readFile(productsFilePath, 'utf8');
  const products = JSON.parse(data);
  return products.find(product => product.id === id) || null;
}

async function createProduct(newProduct) {
  const data = await fs.readFile(productsFilePath, 'utf8');
  const products = JSON.parse(data);
  products.push(newProduct);
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
  return newProduct;
}

async function updateProductById(id, updates) {
  const data = await fs.readFile(productsFilePath, 'utf8');
  const products = JSON.parse(data);
  const index = products.findIndex(product => product.id === id);

  if (index === -1) return null;

  const updatedProduct = { ...products[index], ...updates };
  products[index] = updatedProduct;
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
  return updatedProduct;
}

async function deleteProductById(id) {
  const data = await fs.readFile(productsFilePath, 'utf8');
  const products = JSON.parse(data);
  const index = products.findIndex(product => product.id === id);

  if (index === -1) return false;

  products.splice(index, 1);
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
  return true;
}

module.exports = {
  list: listProducts,
  get: getProductById,
  create: createProduct,
  update: updateProductById,
  delete: deleteProductById
};
