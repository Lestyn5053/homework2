const Express = require('express');

const Router = Express.Router();
const UserController = require('../controllers/userController');

Router.post('/', UserController.postUsers);
Router.get('/', UserController.getUsers);
Router.get('/:ssn', UserController.getUserBySSN);
module.exports = Router;
