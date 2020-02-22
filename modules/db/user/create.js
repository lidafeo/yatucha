const query = require('../connect_db');

let createModule = {};

createModule.save = function(user) {
    return query("INSERT INTO users(name, login, password, phone) VALUES(?, ?, ?, ?)",
        [user.name, user.login, user.password, user.phone]);
}

module.exports = createModule;