const Message = require('../models').Message;
module.exports = {

    /** add a message */
    createMsg(req, res) {
        return Message
            .create({
                text: req.body.text
            })
            .then(message => res.status(200).send(message))
            .catch(error => res.status(400).send(console.log("error", error)));
    },
    /** get all messages */
    getAllMsg(req, res) {
        return Message
            .findAll({
            })
            .then(message => res.status(200).send(message))
            .catch(error => res.status(400).send(error));
    },
}