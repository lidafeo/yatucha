const query = require('../connect_db');

let updateModule = {};

updateModule.updateLastVisit = function(login) {
    return query("UPDATE users SET last_visit = ? where login=?",
        [new Date(), login]);
}
updateModule.updateUser = function(user) {
    return query("UPDATE users SET name=?, phone=?, email=? where login=?",
        [user.name, user.phone, user.email, user.login]);
}

module.exports = updateModule;