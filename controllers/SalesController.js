const SalesService = require('../services/SalesService');

const getAllSales = async (_req, res) => {
  const sales = await SalesService.getAllSales();

  return res.status(200).json(sales);
};

const getByIdSales = async (req, res) => {
  const { id } = req.params;

  const sales = await SalesService.getByIdSales(id);

  if (sales.error) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sales);
};

module.exports = {
  getAllSales,
  getByIdSales,
};