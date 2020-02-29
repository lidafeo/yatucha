const postDb = require('../db/post');

const getPostInfo = require('../post/find_info');
let modulePost = require('../post');

module.exports = async function (user, category, offset = 0) {
    let rows;
    [rows] = await postDb.find.findPageOfCategory(category, offset);
    let posts = [];
    for(let i = 0; i < rows.length; i++) {
        let post = await getPostInfo(rows[i].id, user);
        posts.push(post);
    }
    return posts;
}