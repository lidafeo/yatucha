const postDb = require('../db/post');

module.exports = async function () {
    let rows;
    [rows] = await postDb.find.findAll();
    return rows;
}