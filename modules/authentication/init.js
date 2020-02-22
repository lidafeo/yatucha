const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const authenticationMiddleware = require('./middleware');
const userDb = require('../db/user');

const User = require('../../models/user.js');

const BCRYPT_SALT_ROUNDS = 10;

function findUser (login, callback) {
    userDb.find.findByLogin(login).then(([rows, fields]) => {
        if (rows[0] && rows[0].login === login) {
            return callback(null, new User(rows[0]));
        }
        return callback(null);
    });
}

passport.serializeUser(function (user, done) {
    done(null, user.login);
});

passport.deserializeUser(function (login, done) {
    findUser(login, done);
});

function initPassport() {
    passport.use(new LocalStrategy((username, password, done) => {
        findUser(username, (err, user) => {
            if (err) {
                return done(err);
            }
            // User not found
            if (!user) {
                console.log('User not found: ', username);
                return done(null, false);
            }

            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                    return done(err);
                }
                if (!isValid) {
                    return done(null, false);
                }
                return done(null, user);
            });
        });
    }));
/*
    passport.use('signup', new LocalStrategy( (login, password, done) => {
        console.log("4546");
        findOrCreateUser = function(){
            console.log("456");
            findUser(login,function(err, user) {
                if (err){
                    console.log('Error in SignUp: ', err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false);
                } else {
                    // save the user
                    let newUser = {};
                    // set the user's local credentials
                    newUser.login = login;
                    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
                        newUser.password = hashedPassword;
                        newUser.name = login;
                        userDb.create.save(login, password).then(([rows, fields]) => {
                            if(!rows) {
                                console.log('Error in Saving user');
                                //throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        //process.nextTick(findOrCreateUser);
    }));
    console.log("helo");


 */

    passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;