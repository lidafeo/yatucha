const categoryDb = require('../db/category');
module.exports = async function (user) {
    let rows, fields;
    [rows, fields] = await categoryDb.find.findAll();
    return {
        'categories' : rows,
        'user' : user,
    };
}