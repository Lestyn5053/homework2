const BodyParser = require('body-parser');
const Express = require('express');
const User = require('../models/user');
const Service = require('../services/databaseService');
require('../server');

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

const getUserBySSN = async (request, response) => {
  try {
    await doActionThatMightFailValidation(request, response, Service.getUserBySSN(request));
  } catch (e) {
    response.sendStatus(500);
  }
};

const postUsers = async (request, response) => {
  const { user, content } = request.body;
  try {
    await doActionThatMightFailValidation(request, response, async () => {
      await Service.postUser(user, content);
      response.sendStatus(201);
    });
  } catch (e) {
    response.sendStatus(500);
  }
};
module.exports = { getUserBySSN, postUsers };
app.get('/users', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await User.find(request.query).select('-_id -__v'));
  });
});

/* app.get('/users/:ssn', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await User.findOne({ ssn: request.params.ssn }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
}); */

app.post('/users', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new User(request.body).save();
    response.sendStatus(201);
  });
});
