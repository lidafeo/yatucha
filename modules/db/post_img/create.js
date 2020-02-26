const query = require('../connect_db');

let createModule = {};

createModule.save = function(postId, filename, main) {
    return query("INSERT INTO post_img(posts_id, filename, main) VALUES(?, ?, ?)",
        [postId, filename, main]);
}

module.exports = createModule;