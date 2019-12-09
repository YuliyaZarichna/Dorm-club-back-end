const Country = require('../models').Country;

module.exports = {
    getAllCountries(req, res) {
        return Country
            .findAll({
            })
            .then(country => res.status(200).send(country))
            .catch(error => res.status(400).send(error));
    },
}