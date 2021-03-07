const Express = require('express');

const Router = Express.Router();
const ProductController = require('../controllers/productController');

Router.post('/', ProductController.postProducts);
Router.get('/', ProductController.getProducts);
Router.get('/:sku', ProductController.getProductBySKU);
Router.delete('/', ProductController.deleteProducts);
Router.delete('/:sku', ProductController.deleteProductBySKU);
Router.put('/:sku', ProductController.putProduct);
Router.patch(':/sku', ProductController.patchProduct);
module.exports = Router;
