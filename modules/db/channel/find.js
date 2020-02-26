const query = require('../connect_db');

let findModule = {};

findModule.findByLogin = function(login) {
    return query("SELECT * FROM channels where login=?", [login]);
}

module.exports = findModule;