const query = require('../connect_db');

let createModule = {};

createModule.save = function(user) {
    return query("INSERT INTO channels(login, description, status) VALUES(?, '', '')",
        [user.login]);
}

module.exports = createModule;