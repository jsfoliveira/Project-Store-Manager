const { expect } = require('chai');
const sinon = require('sinon');
const ProductService = require('../../../services/ProductService');
const ProductController = require('../../../controllers/ProductController');

describe('Camada de Controller - Products', () => {
    describe('Verificando se tem produtos cadastrados na função "getAll"', () => {
      const res = {};
      const req = {};
      const products = [
        {
          id: 1,
          name: 'Martelo de Thor',
        },
      ];
      before(() => {
        res.status = sinon.stub()
          .returns(res);
        res.json = sinon.stub()
          .returns();

        sinon.stub(ProductService, 'getAll').resolves(products);
      });
      after(() => {
        ProductService.getAll.restore();
      });
      it('Retorna o método "status" com o código 200', async () => {
        await ProductController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('Retorna o método "json" com um objeto', async () => {
        await ProductController.getAll(req, res);
        expect(res.json.calledWith(products)).to.be.equal(true);
      });
  });

      describe('Verificando se tem produtos no banco de dados conforme ID passado com a função "getById"', async () => {
        const res = {};
        const req = {};
        const testProducts = [
          {
            id: 1,
            name: 'Martelo de Thor',
          },
        ];

        before(() => {
          req.params = {
            id: 1,
          };
          res.status = sinon.stub()
            .returns(res);
          res.json = sinon.stub()
            .returns();

          sinon.stub(ProductService, 'getById').resolves(testProducts);
        });
        after(() => {
          ProductService.getById.restore();
        });
        it('éRetorna o método "status" com o código 200', async () => {
          await ProductController.getById(req, res);
          expect(res.status.calledWith(200)).to.be.equal(true);
        });
        it('Retorna o  método "json" com um objeto', async () => {
          await ProductController.getById(req, res);
          expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
        });
      });
});