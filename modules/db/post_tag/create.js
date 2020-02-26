const query = require('../connect_db');

let createModule = {};

createModule.save = function(postId, tag) {
    return query("INSERT INTO post_tags(posts_id, tag) VALUES(?, ?)",
        [postId, tag]);
}

module.exports = createModule;