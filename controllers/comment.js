const Comment = require('../models').Comment;
const Post = require('../models').Post;

module.exports = {
  createComment(req, res) {
    return Comment
      .create({
        text: req.body.text,
        PostId: req.body.PostId
      })
      .then(comment => {
        console.log(comment.get());
        res.sendStatus(200)
      })
      .catch(error => res.status(400).send(console.log("error", error)));
  },

  getAllComments(req, res) {
    return Comment
      .findAll({

      })
      .then(comment => res.status(200).send(comment))
      .catch(error => res.status(400).send(error));
  },

  deleteCommentById(req, res) {
    return Comment
      .destroy({
        where: { id: req.params.id }
      })
      .then(res.sendStatus(200))
      .catch(error => res.status(400).send(error));
  },

  updateCommentById(req, res) {
    return Comment
      .update(
        {
          text: req.body.text,
        },
        {
          where: { id: req.params.id },
        }
      )
      .then(comment => res.status(200).send(comment))
      .catch(error => res.status(400).send(error));
  },



}