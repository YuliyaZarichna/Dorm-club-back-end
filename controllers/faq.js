const Faq = require('../models').FAQ;

module.exports = {
    createFaq(req, res) {
        return Faq
            .create({
                question: req.body.question,
                answer: req.body.answer
            })
            .then(faq => res.status(200).send(faq))
            .catch(error => res.status(400).send(console.log("createFaqerror", error)));
    },

    getAllFaq (req, res) {
        return Faq
            .findAll({
            })
            .then(faq => res.status(200).send(faq))
            .catch(error => res.status(400).send(error));
    },
}