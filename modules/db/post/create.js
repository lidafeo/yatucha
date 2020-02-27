const query = require('../connect_db');

let createModule = {};

createModule.save = function(channel, data) {
    return query("INSERT INTO posts(channel, title, body, category_id, date_publication, actual) " +
        "VALUES(?, ?, ?, ?, ?, 1)",
        [channel.login, data.title, data.text, data.categoryId, new Date()]);
}

module.exports = createModule;