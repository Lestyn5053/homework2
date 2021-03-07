const BodyParser = require('body-parser');
const Express = require('express');
const Service = require('../services/productService');

const app = Express();
app.use(BodyParser.json());

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
            || e.stack.includes('ValidationError')
            || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

const getProducts = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Service.getProducts(request.query));
  });
};

const getProductBySKU = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Service.getProductBySKU(request);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

const postProducts = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Service.postProducts(request.body));
  });
};

const deleteProducts = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Service.deleteProducts(request.query)).deletedCount > 0 ? 200 : 404);
  });
};

const deleteProductBySKU = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Service.deleteProductBySKU(request)).deletedCount > 0 ? 200 : 404);
  });
};

const putProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await Service.putProduct(request);
    response.sendStatus(200);
  });
};

const patchProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await Service.patchProduct(request);
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};

module.exports = {
  getProducts,
  getProductBySKU,
  postProducts,
  deleteProducts,
  deleteProductBySKU,
  putProduct,
  patchProduct,
};
