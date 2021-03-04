const Express = require('express');

const Router = Express.Router();
const UserController = require('../controllers/userController');

Router.post('/users', UserController.postUsers);
// Router.get('/users', UserController.getUsers);
Router.get('/users/:ssn', UserController.getUserBySSN);
module.exports = Router;
