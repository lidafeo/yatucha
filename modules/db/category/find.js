const query = require('../connect_db');

let findModule = {};

findModule.findAll = function() {
    return query("SELECT * FROM categories");
}
findModule.findByNameEng = function(nameEng) {
    return query("SELECT * FROM categories where name_eng=?", [nameEng]);
}

module.exports = findModule;