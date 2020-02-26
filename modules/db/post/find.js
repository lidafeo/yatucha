const query = require('../connect_db');

let findModule = {};

findModule.findById = function(id) {
    return query("SELECT posts.*, categories.name category_name FROM posts " +
        "INNER JOIN categories ON categories.id = posts.category_id " +
        "where posts.id=?", [id]);
}

findModule.findAll = function() {
    return query("SELECT posts.*, categories.name category_name FROM posts " +
        "INNER JOIN categories ON categories.id = posts.category_id");
}

module.exports = findModule;