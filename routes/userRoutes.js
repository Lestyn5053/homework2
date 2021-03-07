const Express = require('express');

const Router = Express.Router();
const UserController = require('../controllers/userController');

Router.post('/', UserController.postUsers);
Router.get('/', UserController.getUsers);
Router.get('/:ssn', UserController.getUserBySSN);
Router.delete('/', UserController.deleteUsers);
Router.delete('/:ssn', UserController.deleteUserBySSN);
Router.put('/:ssn', UserController.putUser);
Router.patch('/:ssn', UserController.patchUser);
module.exports = Router;
