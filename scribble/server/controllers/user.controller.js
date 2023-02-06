const { User } = require('../models/user.model')
const myFirstSecret = process.env.FIRST_SECRET_KEY;
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    User.create(req.body)
        .then(user => {
            res
                .cookie(
                    "usertoken",
                    jwt.sign({ id: user._id }, process.env.SECRET_KEY),
                    {
                        httpOnly: true,
                    }
                )
                .json({ msg: "success!", id: user._id });
        })
        .catch(err => res.status(400).json(err))
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, myFirstSecret);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getAllUsers = (request, response) => {
    User.find({})
        .then(users => response.json(users))
        .catch(err => response.json(err))
}

module.exports.getUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({ _id: request.params.id }, request.body, { runValidators: true })
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.status(400).json(err))
}


module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}