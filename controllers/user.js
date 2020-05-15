const User = require('../models').User;
const University = require('../models').University;
const Country = require('../models').Country;
const Dorm = require('../models').Dorm;
const Specialization = require('../models').Specialization;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var secret = "123"
/** Sequelize operator */
const Op = require('Sequelize').Op


module.exports = {
    /** user registration */
    signup(req, res) {
        return User
            .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                UniversityId: req.body.University,
                CountryId: req.body.Country,
                DormId: req.body.Dorm,
                SpecializationId: req.body.Specialization
            })
            .then(user => {
                var token = jwt.sign({ id: user.id }, secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ accessToken: token, id: user.id })
            })
            .catch(error => res.status(400).send(console.log("error", error)));
    },

    /** user login */
    login(req, res) {
        return User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ isAuthenticated: false, message: "User not found" });
                }
                /** check if entered password matches saved password */
                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) {
                    return res.status(401).send({ isAuthenticated: false, accessToken: null, reason: "Invalid Password!" });
                }

                var token = jwt.sign({ id: user.id }, secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                /** initialy isVerified is false
                 * login is successful */
                res.status(200).send({ isAuthenticated: true, accessToken: token, id: user.id, isVerified: user.isVerified })
            })
            .catch(error => res.status(500).send('Error' + error));
    },

    /** search neighbor by country, university, and building number */
    searchUsers(req, res) {
        /** values received from front-end */
        let userId = req.query.userId
        let countryId = req.query.countryId
        let universityId = req.query.universityId
        let dormId = req.query.dormId

        /** create an object to be able to query multiple conditions at a time */
        let whereCondition = {}

        if (countryId > 0) {
            whereCondition['CountryId'] = countryId
        }
        if (universityId > 0) {
            whereCondition['UniversityId'] = universityId
        }
        if (dormId > 0) {
            whereCondition['DormId'] = dormId
        }

        /** Sequelize Op.ne is not equal operator
        * exclude the current user from the list with all users 
        */
        whereCondition['id'] = { [Op.ne]: userId }

        return User
            .findAll({
                where: whereCondition,
                /** join tables */
                include: [{
                    model: Country,
                    attributes: ['id', 'name'],
                },
                {
                    model: University,
                    attributes: ['id', 'name'],
                },
                {
                    model: Dorm,
                    attributes: ['id', 'buildingNr'],
                }
                ],

            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },

    /** get all users */
    getAllUser(req, res) {
        return User
            .findAll({})
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },

    /** get user by id */
    getUserById(req, res) {
        return User
            .findOne({
                where: { id: req.params.id }
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },

    /** delete a user, functionality is not implemented in front-end*/
    deleteUserById(req, res) {
        return User
            .destroy({
                where: { id: req.params.id }
            })
            .then(res.sendStatus(200))
            .catch(error => res.status(400).send(error));
    },

    /** verification by location */
    verifyUserByLocation(req, res) {
        /** Latitude and longitude received from a user */
        let userId = req.body.userId;
        let userLat = req.body.lat;
        let userLng = req.body.lng

        return User
            .findOne({
                where: { id: userId }
            })
            .then(user => {
                let dormId = user.DormId
                return Dorm.findOne({
                    where: { id: dormId }
                })
                    .then(dorm => {
                        let dormLat = dorm.latitude
                        let dormLng = dorm.longitude
                        /** dormRadius is a value, 100, saved in DB foe each building */
                        let dormRadius = dorm.radius
                        /** get calculated distance with Haversine formula and compare it with a saved value from DB */
                        let distance = this.getDistanceFromLatLonInMeter(userLat, userLng, dormLat, dormLng)
                        if (distance < dormRadius) {
                            return User
                                .update(
                                    {
                                        isVerified: true
                                    },
                                    {
                                        where: { id: userId },
                                    })
                                .then(res.status(200).send({ id: userId, isVerified: true }))
                                .catch(error => res.status(400).send(error));

                        }
                        else res.status(400).send({ id: userId, isVerified: false })
                    })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     * https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula?fbclid=IwAR2ZCHH9z7QKoEUGkydaHK8Rm-WO6p98G6CM8ZHHHeXx9JmkbqVdOpHCjS4
     * Stckoverflow, Author: Chuck
     * Haversine formula is used to great-circle distances between the two points
     * the formula receives 4 parameters, the latitude, and longitude of a user and a building
     */
    getDistanceFromLatLonInMeter(userLat, userLng, dormLat, dormLng) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(dormLat - userLat);  // deg2rad below
        var dLon = this.deg2rad(dormLng - userLng);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(userLat)) * Math.cos(this.deg2rad(dormLat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c * 1000; // Distance in m
        return d;
    },

    /** convert degrees to radians, 
     * "angles need to be in radians to pass to trig functions"*/
    deg2rad(deg) {
        return deg * (Math.PI / 180)
    },

    /** verification by QR code */
    verifyUserByQrCode(req, res) {
        let userId = req.body.userId;
        /**QR value received from a user */
        let qrValue = req.body.qrValue;
        return User
            .findOne({
                where: { id: userId }
            })
            .then(user => {
                let dormId = user.DormId
                return Dorm.findOne({
                    where: { id: dormId }
                })
                    .then(dorm => {
                        /** QR code value for a dormitory is saved in DB.
                         * It will be compared with the QR value received from a user.
                         * If values are equal -> user is verified*/
                        let dormQRCode = dorm.qrCode
                        if (qrValue == dormQRCode) {
                            return User
                                .update(
                                    {
                                        isVerified: true
                                    },
                                    {
                                        where: { id: userId },
                                    })
                                .then(res.status(200).send({ id: userId, isVerified: true }))
                                .catch(error => res.status(400).send(error));

                        }
                        else res.status(200).send({ id: userId, isVerified: false })
                    })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    /** manage token for user authentication
    * https://grokonez.com/node-js/jwt/nodejs-jwt-authentication-nodejs-express-restapis-json-web-token-bcryptjs-sequelize-mysql
    */
    verifyToken(req, res, next) {
        let token = req.headers['access-token'];

        if (!token) {
            return res.status(403).send({
                isAuthenticated: false, message: 'No token provided'
            });
        }

        /** verify if token is valid */
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    isAuthenticated: false,
                    message: 'Fail to Authentication' + err
                });
            }
            req.id = decoded.id;
            next();
        });
    },

    /** check if email already exists
    * https://grokonez.com/node-js/jwt/nodejs-jwt-authentication-nodejs-express-restapis-json-web-token-bcryptjs-sequelize-mysql
    */
    checkDuplicateUserEmail(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send("Ups. Email is already taken!");
                return;
            }
            next();
        });
    }
}