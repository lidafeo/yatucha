let express = require('express');
let router = express.Router();

let registration = require('../modules/registration');

module.exports = function(passport) {
    /*
    router.post('/', passport.authenticate('signup', {
        successRedirect: '/users',
        failureRedirect: '/'
    }));

     */

    router.post('/', function(req, res, next) {
        registration(req.body.name, req.body.login, req.body.password, req.body.phone, function (err, user) {
            if(err) {
                console.log(err);
                res.status(err.status || 500);
                return res.render('error');
            }
            if(!user) {
                return res.json({'err': 'Логин занят'});
                console.log("Пользователь существует", user);
            }
            req.logIn(user, function(err) {
                req.login(user, function(err) {
                    console.log(user);
                    return err ? next(err) : res.json({'result': 'success'});
                });
            });
        });
    });

    return router;
}