const BodyParser = require('body-parser');
const Express = require('express');
const Service = require('../services/databaseService');

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

const getUsers = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Service.getUsers(request.query));
  });
};

const getUserBySSN = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Service.getUserBySSN(request);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

const postUsers = async (request, response) => {
  // const { user, content } = request.body;
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Service.postUser(request.body));
    response.sendStatus(201);
  });
};
module.exports = { getUsers, getUserBySSN, postUsers };
