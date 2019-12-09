const User = require('../models').User;
const University = require('../models').University;
const Country = require('../models').Country;

module.exports = {
    signup(req, res) {
      return Comment
        .create({
            firstname: req.body.firstname,
            lastname: req.body.firstname,
            firstname: req.body.firstname,
            username: req.body.firstname,
            email: req.body.email,
            password: req.body.password
        })
        .then(comment => {
          console.log(comment.get());
          res.sendStatus(200)
        })
        .catch(error => res.status(400).send(console.log("error", error)));
    },
}