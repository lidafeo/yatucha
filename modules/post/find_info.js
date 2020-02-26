const fs = require("fs");

const postDb = require('../db/post');
const postImgDb = require('../db/post_img');
const postTagDb = require('../db/post_tag');

module.exports = async function (id) {
    let rows;
    [rows] = await postDb.find.findById(id);
    return rows;
}