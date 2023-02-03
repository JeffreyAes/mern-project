const { Gallery } = require('../models/gallery.model')

module.exports.createCollection = (req, res) => {
    Gallery.create(req.body)
        .then(collection => res.json(collection))
        .catch(err => res.status(400).json(err))
}

module.exports.getAllCollections = (request, response) => {
    Gallery.find({})
        .then(collections => response.json(collections))
        .catch(err => response.json(err))
}

module.exports.getCollection = (request, response) => {
    Gallery.findOne({ _id: request.params.id })
        .then(colelction => response.json(collection))
        .catch(err => response.json(err))
}

module.exports.updateCollection = (request, response) => {
    Gallery.findOneAndUpdate({ _id: request.params.id }, request.body, { runValidators: true })
        .then(updatedCollection => response.json(updatedCollection))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteCollection = (request, response) => {
    Gallery.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}