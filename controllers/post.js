const Post = require('../models').Post;
const Comment = require('../models').Comment;
/* Comment.sync();
Post.sync(); */

module.exports = {
    createPost(req, res) {
        return Post
            .create({
                title: req.body.title,
                text: req.body.text
            })
            .then(post => {
                console.log(post.get())
                res.status(200).send(post)
            })
            .catch(error => res.status(400).send(console.log("error", error)));
    },

    getAllPosts(req, res) {
        return Post
            .findAll({
                order: [['createdAt', 'DESC']],
                include: ['postComments']
            })
            .then(post => res.status(200).send(post))
            .catch(error => res.status(400).send(error));
    },

    getCommentsToPost(req, res) {
        return Post
            .findOne({
                where: { id: req.params.id },
                individualHooks: true
                // order: [['createdAt', 'DESC']],
                // include: 'postComments'
            })
            .then(post => {
                console.log(post.get())
                res.status(200).send(post)
            })
            .catch(error => res.status(400).send(error));
    },

    deletePostById(req, res) {
        return Post
            .destroy({
                where: { id: req.params.id },
                //include: 'postComments'
            })
            .then(res.sendStatus(200))
            .catch(error => res.status(400).send(error));
    },

    deleteAllPosts(req, res) {
        return Post
            .destroy({
                where: {},
                truncate: true
            })
            .then(post => {
                console.log(post.get())
                res.status(200).send(post)
            })
            .catch(error => res.status(400).send(error));
    },


    updatePostById(req, res) {
        return Post
            .update(
                {
                    title: req.body.title,
                    text: req.body.text,
                },
                {
                    where: { id: req.params.id },
                }
            )
            .then(post => res.status(200).send(post))
            .catch(error => res.status(400).send(error));
    },
}