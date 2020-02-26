const query = require('../connect_db');

let createModule = {};

createModule.save = function(user) {
    return query("INSERT INTO users(name, login, password, phone, last_visit) VALUES(?, ?, ?, ?, ?)",
        [user.name, user.login, user.password, user.phone, new Date()]);
}

module.exports = createModule;