/**
 * Created by Radi on 7/22/2015.
 */
'use strict';

var User = require('../models/user');
var Vehicle = require('../models/vehicle');
var Manufacturer = require('../models/manufacturer');

var config = require('../../config');
var mySecretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

// Craete token based on username, name and my secret key
function createToken(user) {
    return jsonwebtoken.sign({
       _id: user._id,
        name: user.name,
        username: user.username
    }, mySecretKey, {
        expiresInMinute: 1440
    });
}

// Create API signup request
module.exports = function (app, express) {
    var api = express.Router();

    // Register user POST request at localhost:3000/api/signup with parameters
    api.post('/signup', function (req, res) {
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

        user.save(function (error) {
            if (error) {
                res.send(error);
                return;
            }

            res.json({ message: 'User has been created!' })
        })
    });

    // Login POST user request at localhost:3000/api/login with parameters username and password
    api.post('/login', function (req, res) {
        User.findOne({ username: req.body.username }).select('password').exec(function (error, user) {

            if (error) {
                throw error;
            }

            if (!user) {
                res.send({ message: "User doesnt exist" });
            } else {
                // Create token
                var token = createToken(user);
                res.json({
                    success: true,
                    message: "Successful login!",
                    token: token
                });
            }
        });
    });

    // Get users GET request at localhost:3000/api/users
    api.get('/users', function (req, res) {
        User.find({}, function (error, users) {
            if (error) {
                res.send(error);
                return;
            }

            res.json(users);
        });
    });

    // Get vehicles GET request at localhost:3000/api/vehicles
    api.get('/vehicles', function (req, res) {
        Vehicle.find({}, function (error, vehicles) {
            if (error) {
                res.send(error);
                return;
            }

            if (!vehicles) {
                res.json({ success: false, message: "No vehicles"});
            } else {
                res.json({ success: true, vehicles: vehicles });
            }
        });
    });

    // Get manufacturers GET request at localhost:3000/api/manufacturers
    api.get('/manufacturers', function (req, res) {
        Manufacturer.find({}, function (error, manufacturers) {
            if (error) {
                res.send(error);
                return;
            }

            if (!manufacturers) {
                res.json({ success: false, message: "No manufacturers"});
            } else {
                res.json({ success: true, manufacturers: manufacturers });
            }
        });
    });

    // Get vehicle POST request at localhost:3000/api/vehicle with model
    api.post('/vehicle', function (req, res) {
        Vehicle.findOne({ model: req.body.model }, function (error, vehicle) {
            if (error) {
                res.send(error);
                return;
            }

            if (!vehicle) {
                res.json({ success: false, message: "No vehicle with this model"});
            } else {
                res.json({ success: true, vehicle: vehicle });
            }
        });
    });

    // Get manufacturer POST request at localhost:3000/api/manufacturer with parameters id
    api.post('/manufacturer', function (req, res) {
        Manufacturer.findOne({ _id: req.body.id }, function (error, manufacturer) {
            if (error) {
                throw  error;
            }

            if (!manufacturer) {
                res.json({ success: false, message: "No such manufacturer"});
            } else {
                res.json({ success: true, manufacturer: manufacturer });
            }
        });
    });

    // Middleware => Checks if valid token to proceed
    api.use(function (req, res, next) {
        console.log("Hi somebody");
        var token = req.body.token || req.param.token || req.headers['x-access-token'];

        // Check if token exist
        if (token) {
            jsonwebtoken.verify(token, mySecretKey, function (error, decoded) {
                if (error) {
                    res.status(403).send({
                        success: false,
                        message: "Failed to authenticate user"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.status(403).send({
                success: false,
                message: "No token provided"
            });
        }
    });

    // Homepage GET request at localhost:3000/api/
    api.get('/', function (req, res) {
        res.json("Authorization passed");
    });

    // Token check passed. Authenticated methods
    // Create manufacturer POST request at localhost:3000/api/manufacturers with parameters
    api.post('/manufacturers', function (req, res) {
        var manufacturer = new Manufacturer({
            name: req.body.name,
            founded: req.body.founded,
            founders: req.body.founders,
            picturePath: req.body.picturePath, // './images/manufacturer.jpg'
            baseLocation: req.body.location,
            officialWebsite: req.body.website
        });

        manufacturer.save(function (error, result) {
            if (error) {
                res.json({
                    success: false,
                    error: error
                });
                return;
            }

            res.code(200).json({
                success: true,
                message: "Manufacturer created successfully.",
                manufacturer: result
            });
        });
    });

    // Create vehicle POST request at localhost:3000/api/vehicles with parameters
    api.post('/vehicles', function (req, res) {
        var vehicle = new Vehicle({
            model : req.body.model, // FRZ1000R
            name : req.body.name, // Thunderace
            productionStart : req.body.productionStart, // 1996
            productionEnd : req.body.productionEnd, // 2003
            weight : req.body.weight, //198
            power : req.body.power, //145
            topSpeed : req.body.topSpeed, //269
            picturePath : req.body.picturePath, //'./images/FRZ1000R.jpg'
            manufacturerId : req.body.manufacturerId, //55b13c7c6d95d15412cad39e,
            comments : req.body.comments || [],//[]
            votes: req.body.votes || 0, //0
            favs: req.body.favs || 0 //0
        });

        vehicle.save(function (error, result) {
            if (error) {
                res.json({
                    success: false,
                    error: error
                });
                return;
            }

            res.code(200).json({
                success: true,
                message: "Vehicle created successfully.",
                vehicle: result
            });
        });
    });

    api.post('/me', function (req, res) {
        res.json(req.decoded);
    });

    return api;
};