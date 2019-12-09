const Hobby = require('../models').Hobby;


module.exports = {
    addHobby(req, res) {
        return Hobby
            .create({
                name: req.body.name,
            })
            .then(hobby => {
                console.log(hobby.get());
                res.sendStatus(200)
              })
            .catch(error => res.status(400).send(error));
    },

    getAllHobbies(req, res) {
        return Hobby
            .findAll({
            })
            .then(hobby => res.status(200).send(hobby))
            .catch(error => res.status(400).send(error));
    },

}