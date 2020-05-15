const universityController = require('../controllers').university;
const faqController = require('../controllers').faq;
const postController = require('../controllers').post
const commentController = require('../controllers').comment
const userController = require('../controllers').user
const countryController = require('../controllers').country
const dormController = require('../controllers').dorm
const hobbyController = require('../controllers').hobby
const messageController = require('../controllers').message
const specializationController = require('../controllers').specialization

var express = require('express');
var router = express.Router();

/** initial URL */
router.get('/', function (req, res) {
    res.send('Home page')
})

/**USER APIs */
/** register new user, and check for email duplication */
router.post('/auth/signup', [userController.checkDuplicateUserEmail], (req, res) => {
    userController.signup(req, res);
})

/** login a user */
router.post('/auth/signin', (req, res) => {
    userController.login(req, res);
})

/** get all users*/
router.get('/auth/users', (req, res) => {
    userController.getAllUser(req, res);
})

/** get one user by id */
router.get('/auth/user/:id', (req, res) => {
    userController.getUserById(req, res);
})

/** search for a user */
router.get('/auth/searchusers', (req, res) => {
    userController.searchUsers(req, res);
})

/** delete a user by id */
router.delete('/auth/user/:id', (req, res) => {
    userController.deleteUserById(req, res);
})

/** verify user by location */
router.post('/auth/verifybylocation', (req, res) => {
    userController.verifyUserByLocation(req, res);
})

/** verify user by QR code */
router.post('/auth/verifybyqrcode', (req, res) => {
    userController.verifyUserByQrCode(req, res);
})


/** UNIVERSITY APIs*/
/** add university */
router.post('/universities', (req, res) => {
    universityController.createUni(req, res);
})

/** get list with all universities */
router.get('/universities', (req, res) => {
    universityController.getAllUni(req, res);
})

/** get uni by name */
router.get('/api/universities/:name', (req, res) => {
    universityController.getUniByName(req, res);
})

/** delete university by name */
router.delete('/api/universities/:name', (req, res) => {
    universityController.deleteUniByName(req, res);
})


/**FAQ APIs */
/** add FAQ */
router.post('/faqs', (req, res) => {
    faqController.createFaq(req, res);
})

/** get all FAQs */
router.get('/faqs', (req, res) => {
    faqController.getAllFaq(req, res);
})


/** POST APIs */
/** add new post */
router.post('/post', (req, res) => {
    postController.createPost(req, res);
})

/** get all posts, and check for a token */
router.get('/posts', /* [userController.verifyToken],  */(req, res) => {
    postController.getAllPosts(req, res);
})

/** get a post by id */
router.get('/post/:id', (req, res) => {
    postController.getPostById(req, res);
})

/** delete a post by id */
router.delete('/post/:id', (req, res) => {
    postController.deletePostById(req, res);
})

/** delete all post, functionality is not implemented */
router.delete('/posts', (req, res) => {
    postController.deleteAllPosts(req, res);
})

/** update a pot by id, functionality is not implemented */
router.put('/updatepost/:id', (req, res) => {
    postController.updatePostById(req, res);
})


/** COMMENT APIs */
/** add a new comment */
router.post('/comment', (req, res) => {
    commentController.createComment(req, res);
})

/** get all comments */
router.get('/comments', (req, res) => {
    commentController.getAllComments(req, res);
})

/** delete a comment by id, functionality is not implemented */
router.delete('/comment/:id', (req, res) => {
    commentController.deleteCommentById(req, res);
})

/** update a comment by id, functionality is not implemented */
router.put('/comment/:id', (req, res) => {
    commentController.updateCommentById(req, res);
})

/** COUNTRY APIs */
/** get a list with all countries */
router.get('/countries', (req, res) => {
    countryController.getAllCountries(req, res);
})

/** BUILDING APIs */
/** get a list with all buildings */
router.get('/buildings', (req, res) => {
    dormController.getAllBuildings(req, res);
})

/** HOBBY APIs, functionality is not implemented*/
/** get a list with all hobbies */
router.get('/hobbies', (req, res) => {
    hobbyController.getAllHobbies(req, res);
})

/** add a hobby */
router.post('/hobby', (req, res) => {
    hobbyController.addHobby(req, res);
})

/** MESSAGE APIs functionality is not implemented */
router.post('/auth/message', (req, res) => {
    messageController.createMsg(req, res);
})

/** get all messages */
router.get('/auth/messages', (req, res) => {
    messageController.getAllMsg(req, res);
})

/** SPECIALIZATION APIs, functionality is not used */
/** add new specialization*/
router.post('/specialization', (req, res) => {
    specializationController.createSpecialization(req, res);
})

/** get a list with all specializations */
router.get('/specializations', (req, res) => {
    specializationController.getAllSpecialization(req, res);
})

module.exports = router;