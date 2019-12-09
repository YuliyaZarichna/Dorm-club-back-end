const University = require('../models').University;


/* https://medium.com/@prajramesh93/getting-started-with-node-express-and-mysql-using-sequelize-ed1225afc3e0 */
module.exports = {
    createUni(req, res) {
        return University
            .create({
                name: req.body.name,
            })
            .then(university => res.status(200).send(university))
            .catch(error => res.status(400).send(error));
    },

    getAllUni(req, res) {
        return University
            .findAll({
            })
            .then(university => res.status(200).send(university))
            .catch(error => res.status(400).send(error));
    },

    getUniByName(req, res) {
        return University
            .findAll({
              where: {name: req.params.name}
            })
            .then(university => res.status(200).send(university))
            .catch(error => res.status(400).send(error));
    },

    deleteUniByName(req, res) {
        return University
            .destroy({
                where: { name: req.params.name }
            })
            .then(res.sendStatus(200))
            .catch(error => res.status(400).send(error));
    },
};