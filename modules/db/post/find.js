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
findModule.findPageOfUser = function(user, offset = 0) {
    return query("SELECT id FROM posts where actual=1 AND channel=? ORDER BY date_publication DESC LIMIT 10 OFFSET ?",
        [user.login, offset]);
}
findModule.findPageOfCategory = function(category, offset = 0) {
    return query("SELECT posts.id FROM posts INNER JOIN categories ON categories.id=posts.category_id " +
        "where posts.actual=1 AND categories.name_eng=? ORDER BY date_publication DESC LIMIT 10 OFFSET ?",
        [category, offset]);
}
/*
findModule.findPage = function(offset = 0) {
    return query("SELECT posts.*, categories.name category_name, categories.name_eng category_name_eng " +
        "FROM posts INNER JOIN categories ON categories.id = posts.category_id ORDER BY date_publication DESC " +
        "LIMIT 10 OFFSET ?", [offset]);
}
 */

module.exports = findModule;