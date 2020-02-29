let userDb = require('../db/user');
let channelDb = require('../db/channel');

module.exports = async function (user) {
    let rows;
    [rows] = await userDb.update.updateUser(user);
    [rows] = await channelDb.update.updateChannel(user);
    return {result: 'success'};
}