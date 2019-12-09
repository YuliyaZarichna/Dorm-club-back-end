let index = require('../controllers/index');

const universityController = require('../controllers').university;
const faqController = require('../controllers').faq;
const postController = require('../controllers').post
const commentController = require('../controllers').comment
const userController = require('../controllers').user
const countryController = require('../controllers').country
const hobbyController = require('../controllers').hobby


var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.send('Birds home page')
})

//User APIs
router.post('/auth/signup', (req, res) => {
    userController.signup(req, res);
})

//University APIs
router.post('/universities', (req, res) => {
    universityController.createUni(req, res);
})

router.get('/universities', (req, res) => {
    universityController.getAllUni(req, res);
})

router.get('/api/universities/:name', (req, res) => {
    universityController.getUniByName(req, res);
})

router.delete('/api/universities/:name', (req, res) => {
    universityController.deleteUniByName(req, res);
})

//FAQ APIs
router.post('/faqs', (req, res) => {
    faqController.createFaq(req, res);
});

router.get('/faqs', (req, res) => {
    faqController.getAllFaq(req, res);
})


// Post APIs
router.post('/post', (req, res) => {
    postController.createPost(req, res);
})

router.get('/posts', (req, res) => {
    postController.getAllPosts(req, res);
})

router.get('/post/:id', (req, res) => {
    postController.getCommentsToPost(req, res);
})

router.delete('/post/:id', (req, res) => {
    postController.deletePostById(req, res);
})

router.delete('/posts', (req, res) => {
    postController.deleteAllPosts(req, res);
})

router.put('/updatepost/:id', (req, res) => {
    postController.updatePostById(req, res);
})



// Comment APIs
router.post('/comment', (req, res) => {
    commentController.createComment(req, res);
})

router.get('/comments', (req, res) => {
    commentController.getAllComments(req, res);
})

router.delete('/comment/:id', (req, res) => {
    commentController.deleteCommentById(req, res);
})

router.put('/comment/:id', (req, res) => {
    commentController.updateCommentById(req, res);
})


// Country APIs
router.get('/countries', (req, res) => {
    countryController.getAllCountries(req, res);
})

// Hobby APIs
router.get('/hobbies', (req, res) => {
    hobbyController.getAllHobbies(req, res);
})

router.post('/hobby', (req, res) => {
    hobbyController.addHobby(req, res);
})





module.exports = router;


/*
module.exports = (app) => {
    app.get('/api', (res, req) => res.status(200).send({
        message: 'welcome'
    }));

    app.post('/api/university', universityController);
};
 */