const query = require('../connect_db');

let findModule = {};

findModule.findById = function(id) {
    return query("SELECT posts.*, categories.name category_name, categories.name_eng category_name_eng " +
        "FROM posts " +
        "INNER JOIN categories ON categories.id = posts.category_id " +
        "where posts.id=?", [id]);
}

findModule.findPage = function(offset = 0) {
    return query("SELECT id FROM posts where actual=1 ORDER BY date_publication DESC LIMIT 10 OFFSET ?", [offset]);
}
/*
findModule.findPage = function(offset = 0) {
    return query("SELECT posts.*, categories.name category_name, categories.name_eng category_name_eng " +
        "FROM posts INNER JOIN categories ON categories.id = posts.category_id ORDER BY date_publication DESC " +
        "LIMIT 10 OFFSET ?", [offset]);
}
 */

module.exports = findModule;