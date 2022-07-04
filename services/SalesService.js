const Sales = require('../models/SalesModel');

const getAllSales = async () => Sales.getAllSales();

const getByIdSales = async (id) => {
  const sales = await Sales.getByIdSales(id);

  if (!sales) {
    return {
      error: {
        status: 404,
        message: 'Sales not found',
      },
    };
  }
  return sales;
};

module.exports = {
  getAllSales,
  getByIdSales,
};