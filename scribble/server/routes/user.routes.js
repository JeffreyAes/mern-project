const { authenticate } = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');
const GalleryController = require('../controllers/gallery.controller');
module.exports = function (app) {
    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.get("/api/logout", UserController.logout)
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:id', UserController.getUser);
    app.put('/api/users/:id', authenticate, UserController.updateUser);
    app.delete('/api/delete/:id', authenticate, UserController.deleteUser);

    app.post("/api/gallery", GalleryController.createCollection );
    app.get("/api/gallery", GalleryController.getAllCollections);
    app.get("/api/gallery/:id", GalleryController.getCollection);
    app.put('/api/gallery/:id', GalleryController.updateCollection);
    app.get("/api/gallery/user/:id", GalleryController.getAllUsersCollections);
    app.delete("/api/delete/gallery/:id", GalleryController.deleteCollection );



}