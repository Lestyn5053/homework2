const User = require('../models/user');
const Server = require('../server');

Server.app.get('/users', async (request, response) => {
  await Server.doActionThatMightFailValidation(request, response, async () => {
    response.json(await User.find(request.query).select('-_id -__v'));
  });
});

Server.app.post('/users', async (request, response) => {
  await Server.doActionThatMightFailValidation(request, response, async () => {
    await new User(request.body).save();
    response.sendStatus(201);
  });
});
