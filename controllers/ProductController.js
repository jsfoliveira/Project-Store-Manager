const ProductService = require('../services/ProductService');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const products = await ProductService.getById(id);

  if (products.error) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(...products);
};

// Requisito 3
const create = async (req, res) => {
  const { name } = req.body;
  const products = await ProductService.create(name);

  return res.status(201).json(products);
};

// Requisito 10
const updatedProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await ProductService.updatedProduct(id, name);
  const products = await ProductService.getById(id);
  if (products.error) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(...products);
};

const deleteProduct = async (req, res) => {
   const { id } = req.params;

  const products = await ProductService.getById(id);

  if (products.error) {
    return res.status(404).json({ message: 'Product not found' });
  }
    await ProductService.deleteProduct(id);
  return res.status(204).end();
}

module.exports = {
  getAll,
  getById,
  create,
  updatedProduct,
  deleteProduct,
};