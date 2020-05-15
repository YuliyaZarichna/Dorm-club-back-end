const University = require('../models').University;

module.exports = {

    /** create univertisty, is not used */
    createUni(req, res) {
        return University
            .create({
                name: req.body.name,
            })
            .then(university => res.status(200).send(university))
            .catch(error => res.status(400).send(error));
    },

    /** get list with all universities */
    getAllUni(req, res) {
        return University
            .findAll({
            })
            .then(university => res.status(200).send(university))
            .catch(error => res.status(400).send(error));
    },

    /** get uni by name, is not used */
    getUniByName(req, res) {
        return University
            .findAll({
                where: { name: req.params.name }
            })
            .then(university => res.status(200).send(university))
            .catch(error => res.status(400).send(error));
    },

    /** delete uni by name, is not used */
    deleteUniByName(req, res) {
        return University
            .destroy({
                where: { name: req.params.name }
            })
            .then(res.sendStatus(200))
            .catch(error => res.status(400).send(error));
    },
};