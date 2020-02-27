const query = require('../connect_db');

let findModule = {};

findModule.findByPostIdAndLogin = function(postId, login) {
    return query("SELECT * FROM post_likes where posts_id=? AND login=?", [postId, login]);
}

module.exports = findModule;