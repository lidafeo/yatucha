const query = require('../connect_db');

let updateModule = {};

updateModule.addLike = function(id) {
    return query("UPDATE posts SET likes = likes + 1 where id=?", [id]);
}

module.exports = updateModule;