const userDb = require('../db/user');
const channelDb = require('../db/channel');
const bcrypt = require('bcrypt');

const User = require('../../models/user');
const Channel = require('../../models/channel');

const BCRYPT_SALT_ROUNDS = 10;

function findUser (login, callback) {
    userDb.find.findByLogin(login).then(([rows, fields]) => {
        if (rows[0] && rows[0].login === login) {
            return callback(null, new User(rows[0]));
        } else {
            return callback(null);
        }
    });
}

module.exports = function (name, login, password, phone, done) {
    findUser(login,function(err, user) {
        if (err) {
            console.log('Ошибка регистрации: ', err);
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
            newUser.name = name;
            newUser.phone = phone;
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
                newUser.password = hashedPassword;
                userDb.create.save(newUser).then(([rows, fields]) => {
                    if(!rows) {
                        console.log('Error in Saving user');
                        //throw err;
                        return done("Ошибка");
                    }
                    console.log('User Registration succesful');
                    channelDb.create.save(newUser).then(([rows, fields]) => {
                        if(!rows) {
                            console.log('Error in Saving channel');
                            //throw err;
                            return done("Ошибка");
                        }
                        let channel = new Channel({login: rows.insertId});
                        let user = new User(newUser, channel);
                        console.log('Channel create succesful');
                        return done(null, user);
                    });
                });
            });
        }
    });
}