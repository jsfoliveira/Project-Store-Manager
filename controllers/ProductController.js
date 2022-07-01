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

module.exports = {
  getAll,
  getById,
  create,
};