const bcrypt = require('bcryptjs');

const User = require('../model/user.models');


exports.create_user = (req, res) => {
    var user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)


    })
    user.save()
        .then(result => {
            res.status(201).send({
                result: result
            })
        }
        ).catch(err => {
            res.status(500).send({
                error: err.message
            });
        });
}
exports.show_user = (req, res) => {
    User.find()
        .then(result => {
            res.status(200)
                .send({
                success: true,
                result: result,
                error: null
            })
    })
    }