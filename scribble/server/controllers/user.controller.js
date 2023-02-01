const { User } = require('../models/user.model')
const myFirstSecret = process.env.FIRST_SECRET_KEY;

module.exports.register = async (req, res) => {
    User.create(req.body)({
        username,
        email,
        password
    })
        .then(user => response.json(user))
        .catch(err => response.status(400).json(err))


}