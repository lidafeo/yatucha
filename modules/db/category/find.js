const query = require('../connect_db');

let findModule = {};

findModule.findAll = function() {
    return query("SELECT * FROM categories ORDER BY sort ASC");
}
findModule.findByNameEng = function(nameEng) {
    return query("SELECT * FROM categories where name_eng=?", [nameEng]);
}

module.exports = findModule;