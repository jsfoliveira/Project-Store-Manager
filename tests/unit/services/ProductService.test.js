const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductService = require('../../../services/ProductService');

describe('Camada de Services - Products', () => {
    describe('Se tiver produtos cadastrados na função "getAll"', () => {
      const products = [
        {
          id: 1,
          name: 'Martelo de Thor',
        },
      ];
      before(async () => {
        sinon.stub(connection, 'execute').resolves([products]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna um array', async () => {
        const response = await ProductService.getAll();
        expect(response).to.be.an('array');
      });
      it('Retorna todos os produtos', async () => {
        const response = await ProductService.getAll();
        expect(response).to.be.equal(products)
      });
    });
    describe('Se não tiver produtos cadastrados na função "getAll"', async () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna um objeto vazio', async () => {
        const response = await ProductService.getAll();
        expect(response).to.be.empty;
      });
  });

    describe('Verificando se tem só 1 produto no banco por seu ID na função "getById', () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      describe('Verificando se não existe o produto com o ID informado na função "getById', () => {
        const message = {
          error: { status: 404, message: 'Product not found' },
        };
        it('retorna um objeto de erro', async () => {
          const response = await ProductService.getById(52);

          expect(response).to.be.a('object');
        });
      });
      describe('Verificando se existe 1 produto com o ID informado na função "getById', () => {
        before(() => {
          sinon.stub(ProductService, 'getById')
            .resolves(
              {
                id: 1,
                name: 'Martelo de Thor'
              }
            );
        });
        after(() => { ProductService.getById.restore() });
        it('Retorna um objeto', async () => {
          const response = await ProductService.getById(1);
          expect(response).to.be.an('object');
        });
        it('Não está vazio', async () => {
          const response = await ProductService.getById(1);
          expect(response).to.be.not.empty;
        });
        it('Possui as propriedades: "id" e "name"', async () => {
          const item = await ProductService.getById(1);
          expect(item).to.include.all.keys('id', 'name');
        });
      });
    });
});