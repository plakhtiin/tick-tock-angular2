/**
 * Created by nastya on 01.03.17.
 */
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var socketIo = require("socket.io");
var db = require("./db");
var express = require("express");
var bodyParser = require("body-parser");
var server = require("http");
var loginService = require("./service/loginService");
var manageUserService = require("./service/manageUserService");
var timeService = require('./service/timeService');

db.connectToServer(function (err) {
	if (err) {
		console.log(err);
	}
	else {
	}
});
var app = express();
var exports = module.exports = {};
var port = process.env.PORT || 8888;
var io = socketIo.listen(server);
server.createServer(app);

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var connectionTester = require('connection-tester');


// if (cluster.isMaster) {
//     console.log(numCPUs)
//     for (var i = 0; i < numCPUs; i++) {
//         // Create a worker
//         cluster.fork();
//     }
// } else {
    // Workers share the TCP connection in this server
    // var app = express();
    // app.get('/', function (req, res) {
    //     res.send('Hello World!');
    // });
    // All workers use this port
    var listener = app.listen(port, function () {
        console.log('Server listening at port ' + listener.address().port);
    });
    app.use(bodyParser.json())
        .get('/', function (req, res, next) {
            res.sendFile(__dirname.replace('/api', '') + '/front/app/index.html');
        })
        .use(express.static(__dirname.replace('/api', '') + '/front/app'))
        .post("/api/login", function (req, res) {
            loginService.getUser(req.body.username, req.body.password, function (err, adminUser) {
                if (err) {
                    res.send(err);
                }
                else {
                    setToken(adminUser, function (error, result) {
                        if (error) {
                            res.send(error);
                        } else if (result) {
                            var obj = {
                                userData: adminUser,
                                result: result
                            };
                            res.send(obj);
                        }
                    });
                }
            });
        })
        .get("/api/user/data/:userId/:token", function (req, res) {
            loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    manageUserService.getUserData(req.params.userId, function (err, usersDays) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(usersDays);
                        }
                    });
                }
                else {
                    res.status(403).send('Error');
                }
            });
        })
        .get("/api/users/data/:token", function (req, res) {
            loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    manageUserService.getUsers(function (err, users) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(users);
                        }
                    });
                }
                else {
                    res.status(403).send('Error');
                }
            });
        })
        .post('/api/updateuser/data/:token', function (req, res) {
            loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    manageUserService.updateUser(req.body, function (err, user) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(user);
                        }
                    });
                }
                else {
                    res.status(403).send('Error');
                }
            });
        })
        .post('/api/createuser/data/:token', function (req, res) {
            loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    manageUserService.createUser(req.body, function (err, user) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(user);
                        }
                    });
                }
                else {
                    res.status(403).send('Error');
                }
            });
        })
        .post('/api/removeuser/data/:token', function (req, res) {
            loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    manageUserService.removeUser(req.body, function (err, user) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(user);
                        }
                    });
                }
                else {
                    res.status(403).send('Error');
                }
            });
        })
        .post('/api/schedule/start/:userId/:token', function (req, res) {
            loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    timeService.startTime(req.params.userId, function (err, startTimeId) {
                        if (err) {
                            // res.send(err);
                            res.status(404).send('Error');
                        }
                        else {
                            console.log(startTimeId);
                            res.send(startTimeId);
                        }
                    });
                }
                else {
                    res.status(403).send('Error');
                }
            });
        });

    function setToken(userData, cb) {
        db.setToken(userData.id, userData.token, function (err, res) {
            if (err) {
                cb(err, null);
            } else if (res) {
                cb(null, res);
            }
        })
    }
// }




