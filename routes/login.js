let express = require('express');
let router = express.Router();

module.exports = function(passport) {

    router.post('/', function (req, res, next){

        passport.authenticate('local', {successRedirect: '/cabinet'}, function(err, user){
            if(err){ return next(err); }
            if(!user) {
                return res.json({'err': 'Неверный логин или пароль'});
            }
            req.logIn(user, function(err) {
                return err ? next(err) : res.json({'result': 'success'});
            });

        })(req, res, next);
        return;
    });
    /*
    router.post('/', passport.authenticate('local'),
        function (req, res) {
            console.log("Hello");
            return res.send('Личный кабинет');
            console.log("Hello22");
        }
    );
     */
    //    successRedirect: '/users',
    //    failureRedirect: '/'
    //}));

    return router;
}
