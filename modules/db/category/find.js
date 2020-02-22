const query = require('../connect_db');

let findModule = {};

findModule.findAll = function() {
    return query("SELECT * FROM categories");
}

module.exports = findModule;