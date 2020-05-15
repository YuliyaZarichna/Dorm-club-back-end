const Dorm = require('../models').Dorm;

module.exports = {

    /** get all buildings */
    getAllBuildings(req, res) {
        return Dorm
            .findAll({
            })
            .then(dorm => res.status(200).send(dorm))
            .catch(error => res.status(400).send(error));
    },
}