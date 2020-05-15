const Specialization = require('../models').Specialization;

module.exports = {
    /** add specialization, not implemented yet */
    createSpecialization(req, res) {
        return Specialization
            .create({
                name: req.body.name,
            })
            .then(specialization => res.status(200).send(specialization))
            .catch(error => res.status(400).send(console.log("error", error)));
    },

    /** get all specializations, not implemented yet */
    getAllSpecialization(req, res) {
        return Specialization
            .findAll({
            })
            .then(specialization => res.status(200).send(specialization))
            .catch(error => res.status(400).send(error));
    },
}