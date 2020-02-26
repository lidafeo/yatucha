const channelDb = require('../db/channel');

module.exports = async function (login) {
    let rows;
    [rows] = await channelDb.find.findByLogin(login);
    return rows;
}