const query = require('../connect_db');

let findModule = {};

findModule.findAllByPostId = function(id) {
    return query("SELECT * FROM post_img where posts_id=?", [id]);
}

module.exports = findModule;