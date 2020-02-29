const query = require('../connect_db');

let updateModule = {};

updateModule.updateChannel = function(channel) {
    return query("UPDATE channels SET description=?, status=? where login=?",
        [channel.description, channel.status, channel.login]);
}

module.exports = updateModule;