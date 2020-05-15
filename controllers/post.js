const Post = require('../models').Post;
const Comment = require('../models').Comment;
const User = require('../models').User;

module.exports = {
    /** add a post */
    createPost(req, res) {
        return Post
            .create({
                title: req.body.title,
                text: req.body.text,
                UserId: req.body.userId
            })
            .then(post => {
                return Post
                    .findOne({
                        where: { id: post.id },
                        /** join user table */
                        include: [{
                            model: User,
                            required: true,
                            attributes: ['id', 'username'],
                        }]
                    })
                    .then(post => {
                        res.status(200).send(post)
                    })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(console.log("error", error)));
    },

    /** get all posts */
    getAllPosts(req, res) {
        return Post
            .findAll({
                order: [['createdAt', 'DESC']],
                /** join user and comment tables */
                include: [{
                    model: User,
                    attributes: ['id', 'username'],
                }, {
                    model: Comment,
                    include: [{
                        model: User,
                        required: true,
                        attributes: ['id', 'username'],
                    }]
                }],
                attributes: ['id', 'title', 'text', 'createdAt'],
            })
            .then(post => res.status(200).send(post))
            .catch(error => res.status(400).send(error));
    },

    /** get a post by id */
    getPostById(req, res) {
        return Post
            .findOne({
                where: { id: req.params.id },
                /** join user and comment tables */
                include: [{
                    model: User,
                    required: true,
                    attributes: ['id', 'username'],
                }, {
                    model: Comment,
                    include: [{
                        model: User,
                        required: true,
                        /*  attributes: ['id', 'text'], */
                    }]
                }]
            })
            .then(post => {
                res.status(200).send(post)
            })
            .catch(error => res.status(400).send(error));
    },

    /** get all coments to a post */
    getCommentsToPost(req, res) {
        return Post
            .findOne({
                where: { id: req.params.id },
                individualHooks: true
            })
            .then(post => {
                res.status(200).send(post)
            })
            .catch(error => res.status(400).send(error));
    },

    /** delete post by id */
    deletePostById(req, res) {
        return Post
            .destroy({
                where: { id: req.params.id },
            })
            .then(res.sendStatus(200))
            .catch(error => res.status(400).send(error));
    },

    /** delete all posts, not used */
    deleteAllPosts(req, res) {
        return Post
            .destroy({})
            .then(post => {
                console.log(post.get())
                res.status(200).send(post)
            })
            .catch(error => res.status(400).send(error));
    },

    /** update post by id, not implemented yet */
    updatePostById(req, res) {
        return Post
            .update(
                {
                    title: req.body.title,
                    text: req.body.text,
                }, {
                where: { id: req.params.id },
            })
            .then(post => res.status(200).send(post))
            .catch(error => res.status(400).send(error));
    }
}

/*     getAllComments(req, res) {
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
}, */