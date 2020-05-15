const Comment = require('../models').Comment;
const Post = require('../models').Post;
const User = require('../models').User;

module.exports = {

  /** add comment to a post, userId and postId are foreign keys */
  createComment(req, res) {
    return Comment
      .create({
        text: req.body.text,
        PostId: req.body.PostId,
        UserId: req.body.UserId
      })
      .then(comment => {
        return Post
          .findOne({
            where: { id: comment.PostId },
            /** join user and comment tables */
            include: [{
              model: User,
              required: true,
              attributes: ['id', 'username'],
            },
            {
              model: Comment,
              include: [{
                model: User,
                required: true,
                /* attributes: ['id', 'text'], */
              }]
            }]
          })
          .then(post => {
            console.log(post.get())
            res.status(200).send(post)
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(console.log("error", error)));
  },

  /** get all comments to a post */
  getAllComments(req, res) {
    return Comment
      .findAll({
        include: [{
          model: Post,
          attributes: ['id', 'title', 'text'],
        },
          'userComments'
        ],
      })
      .then(comment => res.status(200).send(comment))
      .catch(error => res.status(400).send(error));
  },

  /** delete comment by id, is not implemented */
  deleteCommentById(req, res) {
    return Comment
      .destroy({
        where: { id: req.params.id }
      })
      .then(res.sendStatus(200))
      .catch(error => res.status(400).send(error));
  },

  /** update comment by id, is not implemented  */
  updateCommentById(req, res) {
    return Comment
      .update({
        text: req.body.text,
      },
        {
          where: { id: req.params.id }
        })
      .then(comment => res.status(200).send(comment))
      .catch(error => res.status(400).send(error));
  },
}