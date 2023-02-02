const { authenticate } = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');
module.exports = function (app) {
    app.post("/api/register", Users.register);
    app.post("/api/login", Users.login);
    app.get("/api/logout", Users.logout)
    app.post('/api/users', authenticate, UserController.createUser);
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:id', UserController.getUser);
    app.put('/api/users/:id', authenticate, UserController.updateUser);
    app.delete('/api/delete/:id', authenticate, UserController.deleteUser);



}