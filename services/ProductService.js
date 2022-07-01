const Product = require('../models/ProductModel');

const getAll = async () => Product.getAll();

const getById = async (id) => {
  const products = await Product.getById(id);

  if (!products) {
    return {
      error: {
        status: 404,
        message: 'Product not found',
      },
    };
  }
  return products;
};

// Requisito 3
const create = async (name) => {
  const result = await Product.create(name);
  if (!result) return false;
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};