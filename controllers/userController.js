const BodyParser = require('body-parser');
const Express = require('express');
const Service = require('../services/userService');

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
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Service.postUser(request.body));
  });
};

const deleteUsers = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Service.deleteUsers(request.query)).deletedCount > 0 ? 200 : 404);
  });
};

const deleteUserBySSN = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Service.deleteUserBySSN(request)).deletedCount > 0 ? 200 : 404);
  });
};

const putUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await Service.putUser(request);
    response.sendStatus(200);
  });
};

const patchUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await Service.patchUser(request);
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};
module.exports = {
  getUsers, getUserBySSN, postUsers, deleteUsers, deleteUserBySSN, putUser, patchUser,
};
