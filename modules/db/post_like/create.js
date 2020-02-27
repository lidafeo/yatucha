const query = require('../connect_db');

let createModule = {};

createModule.save = function(postId, user) {
    return query("INSERT INTO post_likes(posts_id, login, date_like) VALUES(?, ?, ?)",
        [postId, user.login, new Date()]);
}

module.exports = createModule;