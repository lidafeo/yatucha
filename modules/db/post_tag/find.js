const query = require('../connect_db');

let findModule = {};

findModule.findAllByPostId = function(id) {
    return query("SELECT * FROM post_tags where posts_id=?", [id]);
}

module.exports = findModule;